import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import { Admin } from './models/Admin.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  let uri = process.env.MONGODB_URI;

  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      console.error('FATAL ERROR: MONGODB_URI environment variable is missing in production!');
      process.exit(1);
    } else {
      console.log('Local dev: MONGODB_URI missing. Starting mongodb-memory-server...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log(`Local MongoMemoryServer connected at: ${uri}`);
    }
  }

  await mongoose.connect(uri);
  isConnected = true;
  console.log('MongoDB connected successfully.');

  await seedAdminAccount();
}

async function seedAdminAccount() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      if (process.env.NODE_ENV !== 'production') {
        const defaultEmail = 'admin@notely.com';
        const existingDefault = await Admin.findOne({ email: defaultEmail });
        if (!existingDefault) {
          const hashedPassword = await bcrypt.hash('adminpassword123', 10);
          await Admin.create({
            email: defaultEmail,
            password: hashedPassword
          });
          console.log(`[Dev Seed] Admin created: ${defaultEmail} / adminpassword123`);
        }
      }
      return;
    }

    const cleanEmail = adminEmail.toLowerCase().trim();
    const existing = await Admin.findOne({ email: cleanEmail });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await Admin.create({
        email: cleanEmail,
        password: hashedPassword
      });
      console.log(`Admin account seeded for: ${cleanEmail}`);
    } else {
      console.log(`Admin account ${cleanEmail} already exists. Skipping password overwrite.`);
    }
  } catch (err) {
    console.error('Failed to seed admin account:', err.message);
  }
}

// API Routes
app.use('/api/events', eventRoutes);          // Public anonymous analytics tracking
app.use('/api/admin/auth', adminAuthRoutes);  // Admin authentication (login, logout, me)
app.use('/api/admin', adminRoutes);           // Protected Admin Analytics Dashboard APIs

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Note.ly Backend Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;
