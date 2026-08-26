import express from 'express';
import { AnalyticsEvent } from '../models/AnalyticsEvent.js';
import { requireAdmin } from '../middleware/auth.js';
import { mindmapData } from '../../src/data/mindmapData.js';

const router = express.Router();

// Guard ALL /api/admin routes with requireAdmin
router.use(requireAdmin);

// Helper topic & category maps
const topicMap = new Map();
mindmapData.sections.forEach((sec) => {
  topicMap.set(sec.id, { id: sec.id, title: sec.title, category: sec.category });
});

function getRangeDate(range) {
  const now = new Date();
  switch (range) {
    case 'today':
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '30d':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case '90d':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    case '1y':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    case 'all':
    default:
      return null;
  }
}

// GET /api/admin/overview
router.get('/overview', async (req, res) => {
  try {
    const range = req.query.range || 'all';
    const startDate = getRangeDate(range);
    const timeMatch = startDate ? { timestamp: { $gte: startDate } } : {};

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 1. Visitor KPIs (Anonymous Session Identifiers)
    const allSessions = await AnalyticsEvent.distinct('sessionId');
    const totalVisitors = allSessions.length;

    const activeEvents = ['TOPIC_VIEWED', 'MINDMAP_OPENED', 'SEARCH_PERFORMED', 'PAGE_VIEWED'];

    const dauSessions = await AnalyticsEvent.distinct('sessionId', {
      eventType: { $in: activeEvents },
      timestamp: { $gte: todayStart }
    });
    const dau = dauSessions.length;

    const wauSessions = await AnalyticsEvent.distinct('sessionId', {
      eventType: { $in: activeEvents },
      timestamp: { $gte: weekStart }
    });
    const wau = wauSessions.length;

    const mauSessions = await AnalyticsEvent.distinct('sessionId', {
      eventType: { $in: activeEvents },
      timestamp: { $gte: monthStart }
    });
    const mau = mauSessions.length;

    // 2. View KPIs
    const viewMatch = startDate
      ? { eventType: 'TOPIC_VIEWED', timestamp: { $gte: startDate } }
      : { eventType: 'TOPIC_VIEWED' };

    const totalViews = await AnalyticsEvent.countDocuments(viewMatch);
    const viewsToday = await AnalyticsEvent.countDocuments({
      eventType: 'TOPIC_VIEWED',
      timestamp: { $gte: todayStart }
    });
    const viewsThisWeek = await AnalyticsEvent.countDocuments({
      eventType: 'TOPIC_VIEWED',
      timestamp: { $gte: weekStart }
    });
    const viewsThisMonth = await AnalyticsEvent.countDocuments({
      eventType: 'TOPIC_VIEWED',
      timestamp: { $gte: monthStart }
    });

    const totalTopics = mindmapData.sections.length;
    const totalCategories = mindmapData.categories.length;

    // 3. Top Topics Leaderboard Aggregation
    const topicAgg = await AnalyticsEvent.aggregate([
      { $match: { eventType: 'TOPIC_VIEWED', topicId: { $ne: null }, ...timeMatch } },
      {
        $group: {
          _id: '$topicId',
          totalViews: { $sum: 1 },
          sessions: { $addToSet: '$sessionId' },
          viewsToday: {
            $sum: { $cond: [{ $gte: ['$timestamp', todayStart] }, 1, 0] }
          },
          viewsThisWeek: {
            $sum: { $cond: [{ $gte: ['$timestamp', weekStart] }, 1, 0] }
          }
        }
      },
      { $sort: { totalViews: -1 } },
      { $limit: 10 }
    ]);

    const topTopics = topicAgg.map((t, index) => {
      const topicInfo = topicMap.get(t._id) || { title: t._id, category: 'general' };
      const uniqueViewers = t.sessions.length;

      return {
        rank: index + 1,
        topicId: t._id,
        title: topicInfo.title,
        category: topicInfo.category,
        totalViews: t.totalViews,
        uniqueViewers,
        viewsToday: t.viewsToday,
        viewsThisWeek: t.viewsThisWeek
      };
    });

    // 4. Top Categories Summary Aggregation
    const categoryAgg = await AnalyticsEvent.aggregate([
      { $match: { eventType: 'TOPIC_VIEWED', categoryId: { $ne: null }, ...timeMatch } },
      {
        $group: {
          _id: '$categoryId',
          totalViews: { $sum: 1 },
          sessions: { $addToSet: '$sessionId' }
        }
      },
      { $sort: { totalViews: -1 } }
    ]);

    const topCategories = mindmapData.categories.map((cat) => {
      const found = categoryAgg.find((c) => c._id === cat.id);
      const totalViews = found ? found.totalViews : 0;
      const uniqueViewers = found ? found.sessions.length : 0;
      const topicCount = cat.topicCount || 3;
      const avgViewsPerTopic = topicCount > 0 ? (totalViews / topicCount).toFixed(1) : 0;

      return {
        categoryId: cat.id,
        title: cat.title,
        totalViews,
        uniqueViewers,
        topicCount,
        avgViewsPerTopic: Number(avgViewsPerTopic)
      };
    });

    return res.json({
      success: true,
      data: {
        kpis: {
          totalVisitors,
          dau,
          wau,
          mau,
          totalViews,
          viewsToday,
          viewsThisWeek,
          viewsThisMonth,
          totalTopics,
          totalCategories
        },
        topTopics,
        topCategories
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch overview metrics' });
  }
});

// GET /api/admin/visitors/stats
router.get('/visitors/stats', async (req, res) => {
  try {
    const range = req.query.range || '30d';
    const startDate = getRangeDate(range) || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const davTrend = await AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: { $in: ['TOPIC_VIEWED', 'MINDMAP_OPENED', 'SEARCH_PERFORMED', 'PAGE_VIEWED'] },
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            session: '$sessionId'
          }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          activeVisitors: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.json({
      success: true,
      data: { davTrend }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch visitor analytics' });
  }
});

// GET /api/admin/topics/stats
router.get('/topics/stats', async (req, res) => {
  try {
    const range = req.query.range || 'all';
    const sortBy = req.query.sortBy || 'totalViews';
    const startDate = getRangeDate(range);
    const timeMatch = startDate ? { timestamp: { $gte: startDate } } : {};

    const agg = await AnalyticsEvent.aggregate([
      { $match: { eventType: 'TOPIC_VIEWED', topicId: { $ne: null }, ...timeMatch } },
      {
        $group: {
          _id: '$topicId',
          totalViews: { $sum: 1 },
          sessions: { $addToSet: '$sessionId' },
          lastViewed: { $max: '$timestamp' }
        }
      }
    ]);

    let topicsStats = mindmapData.sections.map((sec) => {
      const found = agg.find((a) => a._id === sec.id);
      const totalViews = found ? found.totalViews : 0;
      const uniqueViewers = found ? found.sessions.length : 0;
      const lastViewed = found ? found.lastViewed : null;

      return {
        topicId: sec.id,
        title: sec.title,
        category: sec.category,
        number: sec.number,
        totalViews,
        uniqueViewers,
        lastViewed
      };
    });

    if (sortBy === 'uniqueViewers') {
      topicsStats.sort((a, b) => b.uniqueViewers - a.uniqueViewers);
    } else if (sortBy === 'recent') {
      topicsStats.sort((a, b) => new Date(b.lastViewed || 0) - new Date(a.lastViewed || 0));
    } else {
      topicsStats.sort((a, b) => b.totalViews - a.totalViews);
    }

    return res.json({ success: true, data: topicsStats });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch topic analytics' });
  }
});

// GET /api/admin/topics/:topicId
router.get('/topics/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params;
    const sec = mindmapData.sections.find((s) => s.id === topicId);

    if (!sec) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const totalViews = await AnalyticsEvent.countDocuments({ eventType: 'TOPIC_VIEWED', topicId });
    const viewsToday = await AnalyticsEvent.countDocuments({
      eventType: 'TOPIC_VIEWED',
      topicId,
      timestamp: { $gte: todayStart }
    });
    const viewsThisWeek = await AnalyticsEvent.countDocuments({
      eventType: 'TOPIC_VIEWED',
      topicId,
      timestamp: { $gte: weekStart }
    });
    const viewsThisMonth = await AnalyticsEvent.countDocuments({
      eventType: 'TOPIC_VIEWED',
      topicId,
      timestamp: { $gte: monthStart }
    });

    const uniqueSessions = await AnalyticsEvent.distinct('sessionId', {
      eventType: 'TOPIC_VIEWED',
      topicId
    });
    const uniqueViewers = uniqueSessions.length;

    const lastEvent = await AnalyticsEvent.findOne({ eventType: 'TOPIC_VIEWED', topicId }).sort({
      timestamp: -1
    });

    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const viewsOverTime = await AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'TOPIC_VIEWED',
          topicId,
          timestamp: { $gte: fourteenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.json({
      success: true,
      data: {
        topic: {
          id: sec.id,
          title: sec.title,
          category: sec.category,
          number: sec.number,
          description: sec.description
        },
        metrics: {
          totalViews,
          uniqueViewers,
          viewsToday,
          viewsThisWeek,
          viewsThisMonth,
          avgDailyViews: Number((viewsThisMonth / 30).toFixed(1)),
          lastViewed: lastEvent ? lastEvent.timestamp : null
        },
        viewsOverTime
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch topic details' });
  }
});

// GET /api/admin/categories/stats
router.get('/categories/stats', async (req, res) => {
  try {
    const range = req.query.range || 'all';
    const startDate = getRangeDate(range);
    const timeMatch = startDate ? { timestamp: { $gte: startDate } } : {};

    const agg = await AnalyticsEvent.aggregate([
      { $match: { eventType: 'TOPIC_VIEWED', categoryId: { $ne: null }, ...timeMatch } },
      {
        $group: {
          _id: '$categoryId',
          totalViews: { $sum: 1 },
          sessions: { $addToSet: '$sessionId' }
        }
      }
    ]);

    const categoriesStats = mindmapData.categories.map((cat) => {
      const found = agg.find((a) => a._id === cat.id);
      const totalViews = found ? found.totalViews : 0;
      const uniqueViewers = found ? found.sessions.length : 0;
      const topicCount = cat.topicCount || 3;
      const avgViewsPerTopic = topicCount > 0 ? Number((totalViews / topicCount).toFixed(1)) : 0;

      return {
        categoryId: cat.id,
        title: cat.title,
        color: cat.color,
        topicCount,
        totalViews,
        uniqueViewers,
        avgViewsPerTopic
      };
    });

    return res.json({ success: true, data: categoriesStats });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch category stats' });
  }
});

// GET /api/admin/searches
router.get('/searches', async (req, res) => {
  try {
    const range = req.query.range || 'all';
    const startDate = getRangeDate(range);
    const timeMatch = startDate ? { timestamp: { $gte: startDate } } : {};

    const searchAgg = await AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'SEARCH_PERFORMED',
          'metadata.query': { $exists: true, $ne: '' },
          ...timeMatch
        }
      },
      {
        $group: {
          _id: { $toLower: '$metadata.query' },
          count: { $sum: 1 },
          noResultsCount: {
            $sum: { $cond: [{ $eq: ['$metadata.resultsCount', 0] }, 1, 0] }
          }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 30 }
    ]);

    const searchTerms = searchAgg.map((s) => ({
      query: s._id,
      count: s.count,
      noResultsCount: s.noResultsCount
    }));

    return res.json({ success: true, data: searchTerms });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch search analytics' });
  }
});

// GET /api/admin/activity
router.get('/activity', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const eventType = req.query.eventType || null;

    const query = eventType ? { eventType } : {};
    const skip = (page - 1) * limit;

    const total = await AnalyticsEvent.countDocuments(query);
    const events = await AnalyticsEvent.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      success: true,
      data: {
        events,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch activity feed' });
  }
});

// GET /api/admin/export/:type
router.get('/export/:type', async (req, res) => {
  try {
    const { type } = req.params;

    if (type === 'topics') {
      const agg = await AnalyticsEvent.aggregate([
        { $match: { eventType: 'TOPIC_VIEWED', topicId: { $ne: null } } },
        {
          $group: {
            _id: '$topicId',
            totalViews: { $sum: 1 },
            sessions: { $addToSet: '$sessionId' }
          }
        }
      ]);

      let csv = 'Topic ID,Title,Category,Total Views,Unique Viewers\n';
      mindmapData.sections.forEach((sec) => {
        const found = agg.find((a) => a._id === sec.id);
        const totalViews = found ? found.totalViews : 0;
        const uniqueViewers = found ? found.sessions.length : 0;
        csv += `"${sec.id}","${sec.title.replace(/"/g, '""')}","${sec.category}",${totalViews},${uniqueViewers}\n`;
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="topics-analytics.csv"');
      return res.send(csv);
    }

    if (type === 'categories') {
      const agg = await AnalyticsEvent.aggregate([
        { $match: { eventType: 'TOPIC_VIEWED', categoryId: { $ne: null } } },
        {
          $group: {
            _id: '$categoryId',
            totalViews: { $sum: 1 },
            sessions: { $addToSet: '$sessionId' }
          }
        }
      ]);

      let csv = 'Category ID,Title,Topic Count,Total Views,Unique Viewers,Avg Views/Topic\n';
      mindmapData.categories.forEach((cat) => {
        const found = agg.find((a) => a._id === cat.id);
        const totalViews = found ? found.totalViews : 0;
        const uniqueViewers = found ? found.sessions.length : 0;
        const avg = cat.topicCount > 0 ? (totalViews / cat.topicCount).toFixed(1) : 0;
        csv += `"${cat.id}","${cat.title.replace(/"/g, '""')}",${cat.topicCount},${totalViews},${uniqueViewers},${avg}\n`;
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="categories-analytics.csv"');
      return res.send(csv);
    }

    if (type === 'activity') {
      const events = await AnalyticsEvent.find().sort({ timestamp: -1 }).limit(1000);
      let csv = 'Event ID,Event Type,Session ID,Topic ID,Category ID,Timestamp\n';
      events.forEach((e) => {
        csv += `"${e._id}","${e.eventType}","${e.sessionId}","${e.topicId || ''}","${e.categoryId || ''}","${e.timestamp.toISOString()}"\n`;
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="activity-logs.csv"');
      return res.send(csv);
    }

    return res.status(400).json({ success: false, message: 'Invalid export type' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to generate CSV export' });
  }
});

export default router;
