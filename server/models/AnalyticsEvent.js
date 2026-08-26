import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: [
      'TOPIC_VIEWED',
      'CATEGORY_VIEWED',
      'SEARCH_PERFORMED',
      'CODE_COPIED',
      'MINDMAP_OPENED',
      'PAGE_VIEWED',
      'SESSION_STARTED'
    ],
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  topicId: {
    type: String,
    default: null,
    index: true
  },
  categoryId: {
    type: String,
    default: null,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

// Compound indexes for fast aggregation queries
analyticsEventSchema.index({ timestamp: -1, eventType: 1 });
analyticsEventSchema.index({ topicId: 1, timestamp: -1 });
analyticsEventSchema.index({ categoryId: 1, timestamp: -1 });
analyticsEventSchema.index({ sessionId: 1, timestamp: -1 });

export const AnalyticsEvent =
  mongoose.models.AnalyticsEvent || mongoose.model('AnalyticsEvent', analyticsEventSchema);
