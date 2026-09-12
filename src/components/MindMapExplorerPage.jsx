import React, { useState } from 'react';
import {
  Network,
  Folder,
  GraduationCap,
  ArrowRight,
  MoreVertical,
  ChevronRight,
  Home,
  Layers,
  Sparkles,
  Zap,
  BookOpen,
  Route,
  Database,
  Lock
} from 'lucide-react';
import { mindmapData } from '../data/mindmapData';

export default function MindMapExplorerPage({ onSelectTopic, onBackToHome }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    mindmapData.categories[0].id
  );

  const activeCategory =
    mindmapData.categories.find((c) => c.id === selectedCategoryId) ||
    mindmapData.categories[0];

  // Topics belonging to the selected category
  const categoryTopics = mindmapData.sections.filter(
    (sec) => sec.category === activeCategory.id
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* ========================================= */}
        {/* LEFT SIDEBAR: MindMap Categories          */}
        {/* ========================================= */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
            {/* Sidebar Header */}
            <div className="flex items-start gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                  MindMap
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5 leading-snug">
                  Visual architectural maps for your learning journey
                </p>
              </div>
            </div>

            {/* Categories List */}
            <nav className="space-y-1.5">
              {mindmapData.categories.map((cat) => {
                const isActive = cat.id === selectedCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-emerald-50/90 text-emerald-900 border border-emerald-200/70 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Folder
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span className="truncate">{cat.title}</span>
                    </div>

                    <span
                      className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full shrink-0 transition-colors ${
                        isActive
                          ? 'bg-emerald-200/70 text-emerald-800'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {cat.topicCount}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Inspiration Card */}
          <div className="bg-emerald-50/70 rounded-3xl p-5 border border-emerald-100/90 flex flex-col gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 leading-tight">
                Small steps<br />lead to big progress.
              </div>
              <div className="font-caveat text-emerald-600 text-sm font-bold mt-1">
                Keep learning! ♡
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================= */}
        {/* RIGHT MAIN CONTENT: Topics List & Banner  */}
        {/* ========================================= */}
        <main className="flex-1 w-full min-w-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4 select-none">
            <button
              onClick={onBackToHome}
              className="hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="hover:text-slate-600 cursor-default">MindMap</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-bold">{activeCategory.title}</span>
          </div>

          {/* Category Banner Card with Doodle */}
          <div className="bg-gradient-to-r from-emerald-50/70 via-white to-teal-50/40 rounded-3xl p-6 sm:p-7 border border-emerald-100/80 shadow-xs mb-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Category Info */}
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs border border-emerald-200/50">
                <Network className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {activeCategory.title}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                    {activeCategory.topicCount} Detailed Mindmaps
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed max-w-xl">
                  {activeCategory.description}
                </p>

                {/* Tags Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeCategory.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-white/80 border border-slate-200/80 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: "Visualize Connect Remember" Hand-drawn Doodle */}
            <div className="hidden sm:flex items-center gap-2 shrink-0 pointer-events-none select-none">
              <div className="text-right">
                <div className="font-caveat text-slate-400 text-lg font-bold leading-tight">
                  Visualize<br />
                  Connect<br />
                  Remember
                </div>
              </div>
              {/* Curved Pointer Arrow */}
              <svg
                className="w-12 h-12 text-slate-400 -mt-2"
                viewBox="0 0 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M40 8 C 30 20, 20 32, 10 40" />
                <path d="M22 40 L 10 40 L 12 28" />
              </svg>
              {/* MindMap Diagram Sketch */}
              <div className="w-12 h-12 relative flex items-center justify-center -rotate-6">
                <div className="w-6 h-4 bg-emerald-400 rounded-md shadow-xs" />
                <div className="absolute top-1 left-0 w-2.5 h-2 bg-rose-400 rounded-full" />
                <div className="absolute top-1 right-0 w-2.5 h-2 bg-amber-400 rounded-full" />
                <div className="absolute bottom-1 left-0 w-2.5 h-2 bg-blue-400 rounded-full" />
                <div className="absolute bottom-1 right-0 w-2.5 h-2 bg-purple-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* List of Topic Cards */}
          <div className="space-y-3">
            {categoryTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs group cursor-pointer"
              >
                {/* Left: Topic Number & Title / Description */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  {/* Topic Number Badge */}
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex flex-col items-center justify-center shrink-0 shadow-2xs font-mono font-black text-xs">
                    0{topic.number}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                        {topic.title}
                      </h3>
                      {topic.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {topic.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                      {topic.description}
                    </p>
                  </div>
                </div>

                {/* Right: Blocks Count, Interactive Canvas indicator, and "Explore MindMap" button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Blocks Count */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>{topic.cards.length} Blocks</span>
                  </div>

                  {/* Explore MindMap Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTopic(topic.id);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-xs transition-all cursor-pointer group-hover:shadow-emerald-200"
                  >
                    <span>Explore MindMap</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {/* Options Menu Button */}
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Quote Bar */}
          <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-5 border border-emerald-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-emerald-400 font-serif leading-none select-none">
                ❝
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Visual notes today, a better developer tomorrow.
              </span>
            </div>
            <div className="font-caveat text-emerald-600 text-base font-bold sm:text-right select-none">
              — Notely ♡
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
