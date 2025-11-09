const express = require('express');
const { pool } = require('../config/database');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin panel endpoints
 */

// Apply authentication and admin authorization middleware to all routes
router.use(authenticate);
router.use(authorizeAdmin);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get admin statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin statistics
 *       500:
 *         description: Server error
 */
router.get('/stats', async (req, res) => {
  try {
    // Get total sales
    const salesResult = await pool.query(
      'SELECT COUNT(*) as total_orders, SUM(total_cents) as total_revenue FROM orders WHERE status = $1',
      ['completed']
    );
    
    // Get total users
    const usersResult = await pool.query('SELECT COUNT(*) as total_users FROM users');
    
    // Get total products
    const productsResult = await pool.query('SELECT COUNT(*) as total_products FROM products');
    
    res.json({
      stats: {
        totalOrders: parseInt(salesResult.rows[0].total_orders) || 0,
        totalRevenue: parseInt(salesResult.rows[0].total_revenue) || 0,
        totalUsers: parseInt(usersResult.rows[0].total_users) || 0,
        totalProducts: parseInt(productsResult.rows[0].total_products) || 0,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
});

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price_cents
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               price_cents:
 *                 type: integer
 *               currency:
 *                 type: string
 *               is_paid:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               download_url:
 *                 type: string
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/products', async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      price_cents,
      currency = 'USD',
      is_paid = true,
      images,
      download_url,
      stock,
      category,
    } = req.body;
    
    // Validate required fields
    if (!title || price_cents === undefined) {
      return res.status(400).json({ message: 'Title and price_cents are required' });
    }
    
    // Generate slug if not provided
    const productSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Insert product
    const result = await pool.query(
      `INSERT INTO products (title, slug, description, price_cents, currency, is_paid, images, download_url, stock, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, productSlug, description, price_cents, currency, is_paid, images, download_url, stock, category]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
});

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               price_cents:
 *                 type: integer
 *               currency:
 *                 type: string
 *               is_paid:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               download_url:
 *                 type: string
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      price_cents,
      currency,
      is_paid,
      images,
      download_url,
      stock,
      category,
    } = req.body;
    
    // Check if product exists
    const existingProduct = await pool.query('SELECT id FROM products WHERE id = $1', [id]);
    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    let index = 1;
    
    if (title !== undefined) {
      updates.push(`title = $${index}`);
      values.push(title);
      index++;
    }
    
    if (slug !== undefined) {
      updates.push(`slug = $${index}`);
      values.push(slug);
      index++;
    }
    
    if (description !== undefined) {
      updates.push(`description = $${index}`);
      values.push(description);
      index++;
    }
    
    if (price_cents !== undefined) {
      updates.push(`price_cents = $${index}`);
      values.push(price_cents);
      index++;
    }
    
    if (currency !== undefined) {
      updates.push(`currency = $${index}`);
      values.push(currency);
      index++;
    }
    
    if (is_paid !== undefined) {
      updates.push(`is_paid = $${index}`);
      values.push(is_paid);
      index++;
    }
    
    if (images !== undefined) {
      updates.push(`images = $${index}`);
      values.push(images);
      index++;
    }
    
    if (download_url !== undefined) {
      updates.push(`download_url = $${index}`);
      values.push(download_url);
      index++;
    }
    
    if (stock !== undefined) {
      updates.push(`stock = $${index}`);
      values.push(stock);
      index++;
    }
    
    if (category !== undefined) {
      updates.push(`category = $${index}`);
      values.push(category);
      index++;
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    
    values.push(id); // Add ID for WHERE clause
    
    const query = `UPDATE products SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${index} RETURNING *`;
    const result = await pool.query(query, values);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Product update error:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const existingProduct = await pool.query('SELECT id FROM products WHERE id = $1', [id]);
    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Delete product
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Product deletion error:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 */
router.get('/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    
    let query = `
      SELECT o.*, u.name as user_name, u.email as user_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      query += ` WHERE o.status = $${paramCount}`;
      params.push(status);
    }
    
    query += ` ORDER BY o.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    
    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM orders o';
    if (status) {
      countQuery += ' WHERE o.status = $1';
      const countResult = await pool.query(countQuery, [status]);
      const total = parseInt(countResult.rows[0].count);
      res.json({
        orders: result.rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } else {
      const countResult = await pool.query('SELECT COUNT(*) FROM orders');
      const total = parseInt(countResult.rows[0].count);
      res.json({
        orders: result.rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    }
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

module.exports = router;