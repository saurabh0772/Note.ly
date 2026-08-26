import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { RefreshCw, Calendar, LogOut } from 'lucide-react';

export default function AdminHeader({ dateRange, setDateRange, onRefresh, loading }) {
  const { adminEmail, logoutAdmin } = useAdminAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Admin Portal</h2>
        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
          Owner Mode
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Global Date Range Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-500 ml-2" />
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '90d', label: '90 Days' },
            { id: '1y', label: '1 Year' },
            { id: 'all', label: 'All Time' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setDateRange(r.id)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                dateRange === r.id
                  ? 'bg-white text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 disabled:opacity-50"
          title="Refresh Dashboard Data"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
        </button>

        {/* Admin Info & Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
              A
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-slate-800 leading-tight">Site Owner</div>
              <div className="text-[10px] text-slate-400 font-mono leading-none">
                {adminEmail || 'admin@notely.com'}
              </div>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Log out from Admin portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
