import React from 'react';
import { Search, ZoomIn, ZoomOut, RotateCcw, X, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function HeaderControls({
  searchTerm,
  setSearchTerm,
  matchCount,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom
}) {
  const { isAdmin } = useAdminAuth();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-200/90 text-slate-700 transition-all">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search topics, code, methods..."
          className="w-48 sm:w-56 md:w-72 pl-9 pr-8 py-1.5 text-xs bg-slate-100/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Match Counter Badge */}
      {searchTerm && (
        <span className="text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
          {matchCount} {matchCount === 1 ? 'match' : 'matches'}
        </span>
      )}

      <div className="h-5 w-px bg-slate-200 my-auto" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onZoomOut}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-medium text-slate-600 w-12 text-center select-none">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={onZoomIn}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={onResetZoom}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors ml-1"
          title="Reset Zoom / Fit View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-px bg-slate-200 my-auto" />

      {/* Discreet Admin Portal Link */}
      <a
        href="#/admin"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          isAdmin
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
        }`}
        title="Admin Portal Dashboard"
      >
        <ShieldCheck className="w-4 h-4" />
        <span className="hidden sm:inline">Admin</span>
      </a>
    </div>
  );
}
