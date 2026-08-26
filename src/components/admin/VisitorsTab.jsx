import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Users, Activity, Globe } from 'lucide-react';

export default function VisitorsTab({ dateRange }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('notely_admin_token');

  const fetchVisitorStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/visitors/stats?range=${dateRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitorStats();
  }, [dateRange]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Daily Active Visitors Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Daily Active Visitors (DAV)</h3>
            <p className="text-xs text-slate-500">
              Unique anonymous session identifiers active per day
            </p>
          </div>
          <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          {stats?.davTrend && stats.davTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.davTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="_id" stroke="#64748b" fontSize={11} tickLine={false} />
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
                <Bar dataKey="activeVisitors" name="Active Visitors" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
              No visitor activity recorded in this time range.
            </div>
          )}
        </div>
      </div>

      {/* Analytics Explanation Banner */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2.5 text-white font-bold text-sm">
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Privacy-Preserving Anonymous Analytics</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-400">
          Note.ly is 100% open and requires zero visitor sign-in. Visitor counts are derived strictly from privacy-conscious, client-side session identifiers (<code className="text-amber-300 font-mono">crypto.randomUUID()</code>). No personal data or user accounts are stored.
        </p>
      </div>
    </div>
  );
}
