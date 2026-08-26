// Anonymous client-side analytics tracker for Note.ly (NO user authentication required)

function getOrCreateSessionId() {
  if (typeof window === 'undefined') return 'server-session';
  let sessionId = localStorage.getItem('notely_session_id');
  if (!sessionId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      sessionId = crypto.randomUUID();
    } else {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    }
    localStorage.setItem('notely_session_id', sessionId);
  }
  return sessionId;
}

// Client-side cache to prevent duplicate topic view events during React re-renders
const topicViewCache = new Map();
const DEBOUNCE_MS = 15000; // 15 seconds cooldown per topic view per session

export async function trackEvent(eventType, { topicId = null, categoryId = null, metadata = {} } = {}) {
  try {
    const sessionId = getOrCreateSessionId();

    // De-duplicate TOPIC_VIEWED events
    if (eventType === 'TOPIC_VIEWED' && topicId) {
      const lastViewed = topicViewCache.get(topicId);
      const now = Date.now();
      if (lastViewed && now - lastViewed < DEBOUNCE_MS) {
        return; // skip duplicate event
      }
      topicViewCache.set(topicId, now);
    }

    await fetch('/api/events/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventType,
        sessionId,
        topicId,
        categoryId,
        metadata
      })
    });
  } catch (err) {
    // Fail silently to never disrupt core application user experience
  }
}
