import React, { useState } from 'react';
import {
  Users,
  Eye,
  BookOpen,
  FolderTree,
  TrendingUp,
  Activity,
  Award,
  ArrowUpRight
} from 'lucide-react';

export default function OverviewTab({ overviewData, onTopicClick, onNavigateTab }) {
  const [topicSort, setTopicSort] = useState('totalViews');

  if (!overviewData) return null;

  const { kpis, topTopics = [], topCategories = [] } = overviewData;

  const sortedTopics = [...topTopics].sort((a, b) => {
    if (topicSort === 'uniqueViewers') return b.uniqueViewers - a.uniqueViewers;
    return b.totalViews - a.totalViews;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Visitors */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Total Visitors
            </span>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.totalVisitors.toLocaleString()}
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              Sessions
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Unique anonymous session IDs</p>
        </div>

        {/* Daily Active Visitors (DAU) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Active Visitors Today
            </span>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.dau.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-medium space-x-1">
              <span>7d: <strong className="text-slate-800 font-mono">{kpis.wau}</strong></span>
              <span>•</span>
              <span>30d: <strong className="text-slate-800 font-mono">{kpis.mau}</strong></span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Active sessions today</p>
        </div>

        {/* Total Views */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Total Topic Views
            </span>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.totalViews.toLocaleString()}
            </div>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {kpis.viewsToday} today
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            This week: <span className="font-mono text-slate-700 font-medium">{kpis.viewsThisWeek}</span>
          </p>
        </div>

        {/* Content Inventory */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Content Library
            </span>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.totalTopics}
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
              {kpis.totalCategories} Categories
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Interactive developer topics</p>
        </div>
      </div>

      {/* TOP TOPICS LEADERBOARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Top Topics Leaderboard</h3>
              <p className="text-xs text-slate-500">Most engaged developer topics in Note.ly</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <button
              onClick={() => setTopicSort('totalViews')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                topicSort === 'totalViews'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Total Views
            </button>
            <button
              onClick={() => setTopicSort('uniqueViewers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                topicSort === 'uniqueViewers'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Unique Viewers
            </button>
          </div>
        </div>

        {sortedTopics.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm font-medium">No topic views recorded yet.</p>
            <p className="text-xs mt-1">
              Views will automatically register when visitors open topics in Note.ly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Rank</th>
                  <th className="px-6 py-3.5">Topic Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5 text-right">Total Views</th>
                  <th className="px-6 py-3.5 text-right">Unique Viewers</th>
                  <th className="px-6 py-3.5 text-right">Views Today</th>
                  <th className="px-6 py-3.5 text-right">Views This Week</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedTopics.map((t) => (
                  <tr
                    key={t.topicId}
                    onClick={() => onTopicClick && onTopicClick(t.topicId)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-slate-400 group-hover:text-blue-600">
                      #{t.rank}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                      <span>{t.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full uppercase tracking-wider font-mono">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                      {t.totalViews.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">
                      {t.uniqueViewers.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600 font-semibold">
                      +{t.viewsToday}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-700">
                      {t.viewsThisWeek}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TOP CATEGORIES SUMMARY */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Top Categories Breakdown</h3>
              <p className="text-xs text-slate-500">Category-level engagement overview</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab && onNavigateTab('categories')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {topCategories.map((cat) => (
            <div key={cat.categoryId} className="p-6 hover:bg-slate-50/50 transition-colors">
              <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                {cat.categoryId}
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">{cat.title}</h4>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total Views:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {cat.totalViews.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Unique Viewers:</span>
                  <span className="font-mono text-slate-700">{cat.uniqueViewers}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Topics Count:</span>
                  <span className="font-mono text-slate-700">{cat.topicCount}</span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100">
                  <span>Avg Views/Topic:</span>
                  <span className="font-mono font-semibold text-blue-600">
                    {cat.avgViewsPerTopic}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
