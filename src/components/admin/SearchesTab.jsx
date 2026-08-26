import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, TrendingUp } from 'lucide-react';

export default function SearchesTab({ dateRange }) {
  const [searchTerms, setSearchTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('notely_auth_token');

  const fetchSearches = async () => {
    try {
      const res = await fetch(`/api/admin/searches?range=${dateRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSearchTerms(data.data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearches();
  }, [dateRange]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Search Analytics</h3>
          <p className="text-xs text-slate-500">
            Insights into developer queries and missing documentation topics
          </p>
        </div>
        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
          <Search className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {searchTerms.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Search className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium">No search queries recorded in this timeframe.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Rank</th>
                  <th className="px-6 py-3.5">Search Term</th>
                  <th className="px-6 py-3.5 text-right">Search Volume</th>
                  <th className="px-6 py-3.5 text-right">Zero-Result Searches</th>
                  <th className="px-6 py-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {searchTerms.map((s, idx) => (
                  <tr key={s.query} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400">#{idx + 1}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 font-mono">
                      "{s.query}"
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                      {s.count.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-amber-600 font-semibold">
                      {s.noResultsCount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {s.noResultsCount > 0 ? (
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200 inline-flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Needs Content</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                          Covered
                        </span>
                      )}
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
