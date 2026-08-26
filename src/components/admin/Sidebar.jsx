import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FolderTree,
  Activity,
  Search,
  ArrowLeft,
  Shield,
  Download
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onExportClick }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'visitors', label: 'Visitors', icon: Users },
    { id: 'topics', label: 'Topics', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'activity', label: 'Activity Feed', icon: Activity },
    { id: 'searches', label: 'Search Terms', icon: Search }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight leading-none text-base">Note.ly</h1>
          <span className="text-[11px] font-medium text-blue-400 font-mono tracking-wider uppercase">
            Admin Analytics
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
          Dashboard Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.location.hash = `#/admin/${item.id}`;
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Export & Return Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={onExportClick}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all border border-slate-700/50"
        >
          <Download className="w-4 h-4 text-blue-400" />
          <span>Export CSV Reports</span>
        </button>

        <a
          href="#/"
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Note.ly</span>
        </a>
      </div>
    </aside>
  );
}
