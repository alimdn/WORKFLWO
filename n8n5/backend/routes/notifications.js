const express = require('express');
const nodemailer = require('nodemailer');
const { pool } = require('../config/database');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Email notification endpoints
 */

// Create email transporter
let transporter;
if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
  transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * @swagger
 * /api/notifications/email:
 *   post:
 *     summary: Send email notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - text
 *             properties:
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               text:
 *                 type: string
 *               html:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/email', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    
    // Validate input
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ message: 'To, subject, and text or html are required' });
    }
    
    // Check if email is configured
    if (!transporter) {
      return res.status(500).json({ message: 'Email service is not configured' });
    }
    
    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    // Log the email sending
    await pool.query(
      `INSERT INTO audit_logs (action, entity_type, metadata) VALUES ($1, $2, $3)`,
      [
        'email_sent',
        'notification',
        JSON.stringify({ to, subject, messageId: info.messageId }),
      ]
    );
    
    res.json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Server error while sending email' });
  }
});

module.exports = router;