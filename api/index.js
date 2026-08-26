import app, { connectDB } from '../server/index.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error('Vercel API Handler Error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Database connection error on server'
    });
  }
}
