const express = require('express');
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

// In-memory cart for guest users (in production, you might want to use Redis)
let guestCarts = {};

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add/update item in cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate input
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }
    
    // Check if product exists
    const productResult = await pool.query('SELECT id, title, price_cents, stock FROM products WHERE id = $1', [productId]);
    
    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const product = productResult.rows[0];
    
    // Check stock availability
    if (product.stock !== null && quantity > product.stock) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }
    
    // For authenticated users, we would save to database
    // For guest users, we'll use in-memory storage
    const cartKey = req.user ? req.user.id : req.sessionID || 'guest';
    
    if (!req.user) {
      // Guest user cart
      if (!guestCarts[cartKey]) {
        guestCarts[cartKey] = {};
      }
      
      guestCarts[cartKey][productId] = {
        productId,
        quantity,
        price_cents: product.price_cents,
        title: product.title,
      };
      
      return res.json({
        message: 'Item added to cart',
        cart: guestCarts[cartKey],
      });
    } else {
      // Authenticated user - save to database
      const existingItem = await pool.query(
        'SELECT id, qty FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id = $1 AND status = $2) AND product_id = $3',
        [req.user.id, 'cart', productId]
      );
      
      if (existingItem.rows.length > 0) {
        // Update existing item
        await pool.query(
          'UPDATE order_items SET qty = $1 WHERE id = $2',
          [quantity, existingItem.rows[0].id]
        );
      } else {
        // Create new cart order if it doesn't exist
        const cartOrder = await pool.query(
          'SELECT id FROM orders WHERE user_id = $1 AND status = $2',
          [req.user.id, 'cart']
        );
        
        let orderId;
        if (cartOrder.rows.length === 0) {
          // Create new cart order
          const newOrder = await pool.query(
            'INSERT INTO orders (user_id, total_cents, currency, status) VALUES ($1, $2, $3, $4) RETURNING id',
            [req.user.id, 0, 'USD', 'cart']
          );
          orderId = newOrder.rows[0].id;
        } else {
          orderId = cartOrder.rows[0].id;
        }
        
        // Add item to cart
        await pool.query(
          'INSERT INTO order_items (order_id, product_id, price_cents, qty) VALUES ($1, $2, $3, $4)',
          [orderId, productId, product.price_cents, quantity]
        );
      }
      
      res.json({ message: 'Item added to cart' });
    }
  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({ message: 'Server error while updating cart' });
  }
});

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart items
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const cartKey = req.user ? req.user.id : req.sessionID || 'guest';
    
    if (!req.user) {
      // Guest user cart
      const cart = guestCarts[cartKey] || {};
      return res.json({ cart });
    } else {
      // Authenticated user - get from database
      const cartResult = await pool.query(
        `SELECT oi.product_id, oi.qty as quantity, oi.price_cents, p.title, p.images
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id IN (SELECT id FROM orders WHERE user_id = $1 AND status = $2)`,
        [req.user.id, 'cart']
      );
      
      const cart = {};
      cartResult.rows.forEach(item => {
        cart[item.product_id] = {
          productId: item.product_id,
          quantity: item.quantity,
          price_cents: item.price_cents,
          title: item.title,
          images: item.images,
        };
      });
      
      res.json({ cart });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
});

module.exports = router;