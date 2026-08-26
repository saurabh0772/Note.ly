import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, Filter, Clock, User, Eye, Search, Copy, Sparkles } from 'lucide-react';

export default function ActivityTab() {
  const [events, setEvents] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('notely_auth_token');

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const url = `/api/admin/activity?page=${page}&limit=20${
        eventTypeFilter ? `&eventType=${eventTypeFilter}` : ''
      }`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.data.events);
        setTotalPages(data.data.pagination.pages);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [page, eventTypeFilter]);

  // Auto refresh interval (15s)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchActivity();
    }, 15000);
    return () => clearInterval(interval);
  }, [autoRefresh, page, eventTypeFilter]);

  const getEventBadge = (type) => {
    switch (type) {
      case 'USER_REGISTERED':
        return { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: User, label: 'New User Registered' };
      case 'USER_LOGIN':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: User, label: 'User Signed In' };
      case 'TOPIC_VIEWED':
        return { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Eye, label: 'Topic Viewed' };
      case 'CATEGORY_VIEWED':
        return { color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: Activity, label: 'Category Opened' };
      case 'SEARCH_PERFORMED':
        return { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Search, label: 'Search Executed' };
      case 'CODE_COPIED':
        return { color: 'bg-teal-100 text-teal-800 border-teal-200', icon: Copy, label: 'Code Snippet Copied' };
      case 'MINDMAP_OPENED':
        return { color: 'bg-pink-100 text-pink-800 border-pink-200', icon: Sparkles, label: 'Mindmap Opened' };
      default:
        return { color: 'bg-slate-100 text-slate-800 border-slate-200', icon: Activity, label: type };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Real-Time Activity Stream</h3>
          <p className="text-xs text-slate-500">Live feed of user interactions across Note.ly</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Event Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 ml-1" />
            <select
              value={eventTypeFilter}
              onChange={(e) => {
                setEventTypeFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Event Types</option>
              <option value="USER_REGISTERED">USER_REGISTERED</option>
              <option value="USER_LOGIN">USER_LOGIN</option>
              <option value="TOPIC_VIEWED">TOPIC_VIEWED</option>
              <option value="CATEGORY_VIEWED">CATEGORY_VIEWED</option>
              <option value="SEARCH_PERFORMED">SEARCH_PERFORMED</option>
              <option value="CODE_COPIED">CODE_COPIED</option>
            </select>
          </div>

          {/* Auto Refresh Toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Auto-Refresh (15s)</span>
          </label>

          {/* Manual Refresh */}
          <button
            onClick={fetchActivity}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {events.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Activity className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium">No activity events recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Event Type</th>
                  <th className="px-6 py-3.5">User / Session</th>
                  <th className="px-6 py-3.5">Target Content</th>
                  <th className="px-6 py-3.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((evt) => {
                  const badge = getEventBadge(evt.eventType);
                  const Icon = badge.icon;

                  return (
                    <tr key={evt._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border inline-flex items-center gap-1.5 ${badge.color}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 font-mono text-xs">
                        {evt.userId ? (
                          <div className="font-semibold text-slate-900">
                            {evt.userId.name || evt.userId.email}
                          </div>
                        ) : (
                          <span className="text-slate-400" title={evt.sessionId}>
                            Session: {evt.sessionId.slice(0, 12)}...
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-xs font-medium text-slate-800">
                        {evt.topicId && (
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono mr-2">
                            Topic: {evt.topicId}
                          </span>
                        )}
                        {evt.categoryId && (
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono mr-2">
                            Category: {evt.categoryId}
                          </span>
                        )}
                        {evt.metadata?.query && (
                          <span className="italic text-slate-600">
                            "{evt.metadata.query}"
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right font-mono text-xs text-slate-500">
                        <div className="flex items-center justify-end gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
