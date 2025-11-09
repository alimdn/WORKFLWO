const express = require('express');
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Referrals
 *   description: Referral system endpoints
 */

/**
 * @swagger
 * /api/referrals/generate:
 *   post:
 *     summary: Generate referral link for user
 *     tags: [Referrals]
 *     responses:
 *       200:
 *         description: Referral link generated
 *       500:
 *         description: Server error
 */
router.post('/generate', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's referral code
    const userResult = await pool.query(
      'SELECT referral_code FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const referralCode = userResult.rows[0].referral_code;
    const referralLink = `${process.env.FRONTEND_URL}/register?ref=${referralCode}`;
    
    res.json({
      referralCode,
      referralLink,
    });
  } catch (error) {
    console.error('Referral generation error:', error);
    res.status(500).json({ message: 'Server error while generating referral link' });
  }
});

/**
 * @swagger
 * /api/referrals/{userId}:
 *   get:
 *     summary: Get referral information for user
 *     tags: [Referrals]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Referral information
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user's referral information
    const userResult = await pool.query(
      `SELECT u.referral_code, u.name,
              COUNT(r.id) as referrals_count,
              SUM(r.commission_amount_cents) as total_commission_cents
       FROM users u
       LEFT JOIN referrals r ON u.id = r.referrer_user_id AND r.status = 'completed'
       WHERE u.id = $1
       GROUP BY u.id`,
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userInfo = userResult.rows[0];
    
    res.json({
      referralCode: userInfo.referral_code,
      userName: userInfo.name,
      referralsCount: parseInt(userInfo.referrals_count) || 0,
      totalCommissionCents: parseInt(userInfo.total_commission_cents) || 0,
    });
  } catch (error) {
    console.error('Referral info error:', error);
    res.status(500).json({ message: 'Server error while fetching referral information' });
  }
});

module.exports = router;