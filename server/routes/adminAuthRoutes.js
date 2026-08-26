import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'notely_admin_super_secret_jwt_key_2026';

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide admin email and password'
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      token,
      email: admin.email
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error during admin authentication'
    });
  }
});

// GET /api/admin/me
router.get('/me', requireAdmin, (req, res) => {
  return res.json({
    success: true,
    email: req.admin.email,
    createdAt: req.admin.createdAt
  });
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  res.clearCookie('admin_token');
  return res.json({ success: true, message: 'Logged out from Admin portal' });
});

export default router;
