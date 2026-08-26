import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { X, BookOpen, Eye, Users, Calendar, TrendingUp, Clock } from 'lucide-react';

export default function TopicDetailModal({ topicId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('notely_auth_token');

  useEffect(() => {
    if (!topicId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/topics/${topicId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [topicId]);

  if (!topicId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold font-mono text-blue-600 uppercase tracking-wider">
                Topic Analytics Deep Dive
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {data?.topic ? data.topic.title : topicId}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium">Fetching topic metrics...</p>
          </div>
        ) : !data ? (
          <div className="p-12 text-center text-slate-400 text-sm">Failed to load topic details.</div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Topic Overview Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Total Views</div>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                  {data.metrics.totalViews.toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Unique Viewers</div>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                  {data.metrics.uniqueViewers.toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Views Today</div>
                <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
                  +{data.metrics.viewsToday}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Avg Daily Views</div>
                <div className="text-2xl font-black text-blue-600 font-mono mt-1">
                  {data.metrics.avgDailyViews}
                </div>
              </div>
            </div>

            {/* Views Over Time Chart */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Views Trend (Last 14 Days)</h4>
              <div className="h-56 w-full pt-2">
                {data.viewsOverTime && data.viewsOverTime.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.viewsOverTime}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="_id" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '0.5rem',
                          color: '#fff',
                          fontSize: '11px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#2563eb"
                        strokeWidth={2.5}
                        dot={{ fill: '#2563eb', r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                    No time series data available for this topic.
                  </div>
                )}
              </div>
            </div>

            {/* Extra Topic Info */}
            <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
              <span>Category: <strong className="font-mono text-slate-700 uppercase">{data.topic.category}</strong></span>
              <span>
                Last viewed:{' '}
                <strong className="font-mono text-slate-700">
                  {data.metrics.lastViewed ? new Date(data.metrics.lastViewed).toLocaleString() : 'Never'}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
