import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ArrowUpRight, Clock, Eye, Users } from 'lucide-react';

export default function TopicsTab({ dateRange, onTopicSelect }) {
  const [topicsStats, setTopicsStats] = useState([]);
  const [sortBy, setSortBy] = useState('totalViews'); // totalViews | uniqueViewers | recent
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('notely_auth_token');

  const fetchTopicsStats = async () => {
    try {
      const res = await fetch(`/api/admin/topics/stats?range=${dateRange}&sortBy=${sortBy}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTopicsStats(data.data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicsStats();
  }, [dateRange, sortBy]);

  const filteredTopics = topicsStats.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.topicId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Topic Analytics Leaderboard</h3>
          <p className="text-xs text-slate-500">Track metrics and engagement for all topics</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topic or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-60"
            />
          </div>

          {/* Sort Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium border border-slate-200">
            {[
              { id: 'totalViews', label: 'Most Viewed', icon: Eye },
              { id: 'uniqueViewers', label: 'Unique Viewers', icon: Users },
              { id: 'recent', label: 'Recently Viewed', icon: Clock }
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => setSortBy(btn.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    sortBy === btn.id
                      ? 'bg-white text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Topics Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredTopics.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium">No topic analytics found matching search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">#</th>
                  <th className="px-6 py-3.5">Topic Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5 text-right">Total Views</th>
                  <th className="px-6 py-3.5 text-right">Unique Viewers</th>
                  <th className="px-6 py-3.5 text-right">Last Viewed</th>
                  <th className="px-6 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTopics.map((t, idx) => (
                  <tr
                    key={t.topicId}
                    onClick={() => onTopicSelect(t.topicId)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 group-hover:text-blue-600">
                      {t.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-medium rounded-full uppercase">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                      {t.totalViews.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">
                      {t.uniqueViewers.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-slate-500">
                      {t.lastViewed ? new Date(t.lastViewed).toLocaleString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
