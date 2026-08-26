import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FolderTree, Award, Users, BookOpen } from 'lucide-react';

export default function CategoriesTab({ dateRange }) {
  const [categoriesStats, setCategoriesStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('notely_auth_token');

  const fetchCategoryStats = async () => {
    try {
      const res = await fetch(`/api/admin/categories/stats?range=${dateRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCategoriesStats(data.data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryStats();
  }, [dateRange]);

  const mostPopular = [...categoriesStats].sort((a, b) => b.totalViews - a.totalViews)[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Popular Category Banner */}
      {mostPopular && (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                Most Popular Category
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">{mostPopular.title}</h3>
              <p className="text-xs text-blue-200 mt-1">
                {mostPopular.totalViews.toLocaleString()} total views • {mostPopular.uniqueViewers}{' '}
                unique viewers
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right font-mono">
            <div className="text-2xl font-black text-amber-400">
              {mostPopular.avgViewsPerTopic}
            </div>
            <div className="text-xs text-blue-300">Avg Views / Topic</div>
          </div>
        </div>
      )}

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Category Views Distribution</h3>
            <p className="text-xs text-slate-500">Comparison of total views across categories</p>
          </div>
          <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <FolderTree className="w-5 h-5" />
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          {categoriesStats.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="title" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '0.75rem',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="totalViews" name="Total Views" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
              No category view data available.
            </div>
          )}
        </div>
      </div>

      {/* Category Stats Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">Detailed Category Breakdown</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5 text-right">Topics Count</th>
                <th className="px-6 py-3.5 text-right">Total Views</th>
                <th className="px-6 py-3.5 text-right">Unique Viewers</th>
                <th className="px-6 py-3.5 text-right">Avg Views / Topic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoriesStats.map((c) => (
                <tr key={c.categoryId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    <div>{c.title}</div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase font-normal">
                      {c.categoryId}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-slate-700">
                    {c.topicCount}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                    {c.totalViews.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-600">
                    {c.uniqueViewers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-purple-600">
                    {c.avgViewsPerTopic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
