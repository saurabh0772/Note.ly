import { mindmapData } from '../../src/data/mindmapData.js';

const ALLOWED_CLIENT_EVENTS = new Set([
  'TOPIC_VIEWED',
  'CATEGORY_VIEWED',
  'SEARCH_PERFORMED',
  'CODE_COPIED',
  'MINDMAP_OPENED',
  'PAGE_VIEWED',
  'SESSION_STARTED'
]);

const VALID_TOPIC_IDS = new Set(mindmapData.sections.map((s) => s.id));
const VALID_CATEGORY_IDS = new Set(mindmapData.categories.map((c) => c.id));

export function validateEvent(req, res, next) {
  try {
    const { eventType, topicId, categoryId, sessionId, metadata } = req.body || {};

    // 1. Validate Event Type Allowlist
    if (!eventType || typeof eventType !== 'string' || !ALLOWED_CLIENT_EVENTS.has(eventType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or forbidden eventType'
      });
    }

    // 2. Validate Session ID
    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'sessionId is required'
      });
    }

    // 3. Dynamic Topic & Category Validation
    if (topicId && typeof topicId === 'string') {
      if (VALID_TOPIC_IDS.size > 0 && !VALID_TOPIC_IDS.has(topicId)) {
        if (!topicId.startsWith('sec-') && topicId.length > 50) {
          return res.status(400).json({ success: false, message: 'Invalid topicId' });
        }
      }
    }

    if (categoryId && typeof categoryId === 'string') {
      if (VALID_CATEGORY_IDS.size > 0 && !VALID_CATEGORY_IDS.has(categoryId)) {
        if (categoryId.length > 50) {
          return res.status(400).json({ success: false, message: 'Invalid categoryId' });
        }
      }
    }

    // 4. Sanitize Metadata (strip $, userId, role, admin)
    let cleanMetadata = {};
    if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
      for (const [key, val] of Object.entries(metadata)) {
        if (key.startsWith('$') || ['userId', 'role', 'admin', 'isAdmin'].includes(key)) continue;
        if (typeof val === 'string') {
          cleanMetadata[key] = val.slice(0, 300);
        } else if (typeof val === 'number' || typeof val === 'boolean') {
          cleanMetadata[key] = val;
        }
      }
    }

    req.cleanEvent = {
      eventType,
      sessionId: sessionId.slice(0, 100),
      topicId: topicId && typeof topicId === 'string' ? topicId.slice(0, 100) : null,
      categoryId: categoryId && typeof categoryId === 'string' ? categoryId.slice(0, 100) : null,
      metadata: cleanMetadata
    };

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed request payload'
    });
  }
}
