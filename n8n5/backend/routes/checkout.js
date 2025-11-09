const express = require('express');
const stripe = require('stripe');
const paypal = require('paypal-rest-sdk');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Initialize payment providers
if (process.env.STRIPE_SECRET_KEY) {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
}

if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) {
  paypal.configure({
    mode: process.env.PAYPAL_MODE || 'sandbox', // sandbox or live
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
}

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Checkout and payment processing
 */

/**
 * @swagger
 * /api/checkout/create-session:
 *   post:
 *     summary: Create payment session
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 enum: [stripe, paypal]
 *               discountCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment session created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/create-session', authenticate, async (req, res) => {
  try {
    const { paymentMethod, discountCode } = req.body;
    
    if (!paymentMethod || !['stripe', 'paypal'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Valid payment method is required (stripe or paypal)' });
    }
    
    // Get user's cart
    const cartResult = await pool.query(
      `SELECT oi.product_id, oi.qty, oi.price_cents, p.title, p.currency
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id IN (SELECT id FROM orders WHERE user_id = $1 AND status = $2)`,
      [req.user.id, 'cart']
    );
    
    if (cartResult.rows.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Calculate total
    let subtotal = 0;
    const items = cartResult.rows.map(item => {
      const itemTotal = item.price_cents * item.qty;
      subtotal += itemTotal;
      return {
        product_id: item.product_id,
        title: item.title,
        quantity: item.qty,
        price_cents: item.price_cents,
        total_cents: itemTotal,
      };
    });
    
    // Apply discount if provided
    let discountAmount = 0;
    if (discountCode) {
      const discountResult = await pool.query(
        'SELECT id, type, amount, usage_limit, per_user_limit FROM discounts WHERE code = $1 AND starts_at <= NOW() AND expires_at >= NOW()',
        [discountCode]
      );
      
      if (discountResult.rows.length > 0) {
        const discount = discountResult.rows[0];
        
        // Check usage limits
        const usageResult = await pool.query(
          'SELECT COUNT(*) as usage_count FROM orders WHERE metadata->>\'discount_code\' = $1',
          [discountCode]
        );
        
        const userUsageResult = await pool.query(
          'SELECT COUNT(*) as user_usage_count FROM orders WHERE user_id = $1 AND metadata->>\'discount_code\' = $2',
          [req.user.id, discountCode]
        );
        
        const usageCount = parseInt(usageResult.rows[0].usage_count);
        const userUsageCount = parseInt(userUsageResult.rows[0].user_usage_count);
        
        if ((!discount.usage_limit || usageCount < discount.usage_limit) &&
            (!discount.per_user_limit || userUsageCount < discount.per_user_limit)) {
          
          if (discount.type === 'percentage') {
            discountAmount = Math.round(subtotal * (discount.amount / 100));
          } else if (discount.type === 'fixed') {
            discountAmount = discount.amount * 100; // Convert to cents
          }
        }
      }
    }
    
    const total = subtotal - discountAmount;
    
    // Create order record
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total_cents, currency, status, metadata)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        req.user.id,
        total,
        'USD',
        'pending',
        JSON.stringify({
          items,
          subtotal_cents: subtotal,
          discount_code: discountCode,
          discount_amount_cents: discountAmount,
        }),
      ]
    );
    
    const orderId = orderResult.rows[0].id;
    
    // Move cart items to order
    await pool.query(
      `UPDATE order_items SET order_id = $1 WHERE order_id IN 
       (SELECT id FROM orders WHERE user_id = $2 AND status = $3)`,
      [orderId, req.user.id, 'cart']
    );
    
    // Update cart status
    await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      ['processing', orderId]
    );
    
    // Create payment session based on method
    if (paymentMethod === 'stripe') {
      return createStripeSession(req, res, orderId, total, items, discountCode);
    } else if (paymentMethod === 'paypal') {
      return createPayPalOrder(req, res, orderId, total, items, discountCode);
    }
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Server error during checkout' });
  }
});

// Create Stripe checkout session
async function createStripeSession(req, res, orderId, total, items, discountCode) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: 'Stripe is not configured' });
    }
    
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price_cents,
      },
      quantity: item.quantity,
    }));
    
    // Add discount as a negative line item if applicable
    if (discountCode) {
      const discountResult = await pool.query(
        'SELECT type, amount FROM discounts WHERE code = $1',
        [discountCode]
      );
      
      if (discountResult.rows.length > 0) {
        const discount = discountResult.rows[0];
        let discountAmount = 0;
        
        if (discount.type === 'percentage') {
          discountAmount = Math.round(total * (discount.amount / 100));
        } else if (discount.type === 'fixed') {
          discountAmount = discount.amount * 100;
        }
        
        if (discountAmount > 0) {
          lineItems.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Discount (${discountCode})`,
              },
              unit_amount: -discountAmount,
            },
            quantity: 1,
          });
        }
      }
    }
    
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
      client_reference_id: orderId,
      metadata: {
        orderId: orderId,
        userId: req.user.id,
      },
    });
    
    // Save session ID to order
    await pool.query(
      'UPDATE orders SET provider_payment_id = $1, payment_provider = $2 WHERE id = $3',
      [session.id, 'stripe', orderId]
    );
    
    res.json({
      sessionId: session.id,
      paymentUrl: session.url,
    });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ message: 'Error creating Stripe session' });
  }
}

// Create PayPal order
async function createPayPalOrder(req, res, orderId, total, items, discountCode) {
  try {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      return res.status(500).json({ message: 'PayPal is not configured' });
    }
    
    const paymentDetails = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [{
        item_list: {
          items: items.map(item => ({
            name: item.title,
            sku: item.product_id,
            price: (item.price_cents / 100).toFixed(2),
            currency: 'USD',
            quantity: item.quantity,
          })),
        },
        amount: {
          currency: 'USD',
          total: (total / 100).toFixed(2),
        },
        description: 'E-commerce purchase',
        invoice_number: orderId,
      }],
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/checkout/paypal/success`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout/paypal/cancel`,
      },
    };
    
    paypal.payment.create(paymentDetails, async function (error, payment) {
      if (error) {
        console.error('PayPal order error:', error);
        return res.status(500).json({ message: 'Error creating PayPal order' });
      }
      
      // Save payment ID to order
      await pool.query(
        'UPDATE orders SET provider_payment_id = $1, payment_provider = $2 WHERE id = $3',
        [payment.id, 'paypal', orderId]
      );
      
      // Find approval URL
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
      
      res.json({
        paymentId: payment.id,
        approvalUrl: approvalUrl.href,
      });
    });
  } catch (error) {
    console.error('PayPal order error:', error);
    res.status(500).json({ message: 'Error creating PayPal order' });
  }
}

/**
 * @swagger
 * /api/checkout/stripe-webhook:
 *   post:
 *     summary: Handle Stripe webhook events
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Webhook processed
 *       400:
 *         description: Webhook error
 */
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
      event = stripeClient.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleSuccessfulPayment(session.client_reference_id, 'stripe', session.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send('Webhook Error');
  }
});

/**
 * @swagger
 * /api/checkout/paypal-webhook:
 *   post:
 *     summary: Handle PayPal webhook events
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Webhook processed
 *       400:
 *         description: Webhook error
 */
router.post('/paypal-webhook', express.json(), async (req, res) => {
  try {
    // In a real implementation, you would verify the PayPal webhook signature
    // This is a simplified version
    
    const { event_type, resource } = req.body;
    
    if (event_type === 'PAYMENT.SALE.COMPLETED') {
      await handleSuccessfulPayment(resource.invoice_number, 'paypal', resource.parent_payment);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(400).send('Webhook Error');
  }
});

// Handle successful payment
async function handleSuccessfulPayment(orderId, paymentProvider, paymentId) {
  try {
    // Update order status
    await pool.query(
      'UPDATE orders SET status = $1, provider_payment_id = $2 WHERE id = $3',
      ['completed', paymentId, orderId]
    );
    
    // Log the successful payment
    await pool.query(
      `INSERT INTO audit_logs (action, entity_type, entity_id, metadata) 
       VALUES ($1, $2, $3, $4)`,
      [
        'payment_completed',
        'order',
        orderId,
        JSON.stringify({ paymentProvider, paymentId }),
      ]
    );
    
    // TODO: Send email notification to user
    // TODO: Generate download links for digital products
    // TODO: Update inventory for physical products
    
    console.log(`Payment completed for order ${orderId} via ${paymentProvider}`);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

module.exports = router;