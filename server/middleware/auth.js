import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'notely_admin_super_secret_jwt_key_2026';

export async function requireAdmin(req, res, next) {
  try {
    let token = null;

    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Admin authentication required'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found or unauthorized'
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Admin authentication required'
    });
  }
}
