import express from 'express';
import { AnalyticsEvent } from '../models/AnalyticsEvent.js';
import { validateEvent } from '../middleware/validateEvent.js';

const router = express.Router();

// Public endpoint for anonymous analytics ingestion (NO authentication required)
router.post('/track', validateEvent, async (req, res) => {
  try {
    const { eventType, sessionId, topicId, categoryId, metadata } = req.cleanEvent;

    await AnalyticsEvent.create({
      eventType,
      sessionId,
      topicId,
      categoryId,
      timestamp: new Date(),
      metadata
    });

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to record event' });
  }
});

export default router;
