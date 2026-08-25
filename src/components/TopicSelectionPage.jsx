import React from 'react';
import { Search, ArrowLeft, ArrowRight, X, BookOpen, Layers, Zap, Globe, Route, Server, Database } from 'lucide-react';
import Logo from './Logo';

export default function TopicSelectionPage({
  category,
  sections,
  onSelectTopic,
  onBackToCategories,
  searchTerm,
  setSearchTerm,
  matchedIds
}) {
  const getTheme = (color) => {
    switch (color) {
      case 'red':
        return {
          border: 'border-red-200 hover:border-red-400',
          bg: 'bg-gradient-to-br from-red-50/90 via-white to-pink-50/50',
          badgeBg: 'bg-red-600 text-white',
          numColor: 'text-red-500',
          titleColor: 'text-red-950',
          hoverBg: 'group-hover:bg-red-600 group-hover:text-white',
          tagBg: 'bg-red-100/70 text-red-800 border-red-200',
          icon: <Layers className="w-6 h-6 text-red-600" />
        };
      case 'blue':
        return {
          border: 'border-blue-200 hover:border-blue-400',
          bg: 'bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/50',
          badgeBg: 'bg-blue-600 text-white',
          numColor: 'text-blue-500',
          titleColor: 'text-blue-950',
          hoverBg: 'group-hover:bg-blue-600 group-hover:text-white',
          tagBg: 'bg-blue-100/70 text-blue-800 border-blue-200',
          icon: <Zap className="w-6 h-6 text-blue-600" />
        };
      case 'green':
        return {
          border: 'border-emerald-200 hover:border-emerald-400',
          bg: 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50',
          badgeBg: 'bg-emerald-600 text-white',
          numColor: 'text-emerald-500',
          titleColor: 'text-emerald-950',
          hoverBg: 'group-hover:bg-emerald-600 group-hover:text-white',
          tagBg: 'bg-emerald-100/70 text-emerald-800 border-emerald-200',
          icon: <BookOpen className="w-6 h-6 text-emerald-600" />
        };
      case 'purple':
        return {
          border: 'border-purple-200 hover:border-purple-400',
          bg: 'bg-gradient-to-br from-purple-50/90 via-white to-indigo-50/50',
          badgeBg: 'bg-purple-600 text-white',
          numColor: 'text-purple-500',
          titleColor: 'text-purple-950',
          hoverBg: 'group-hover:bg-purple-600 group-hover:text-white',
          tagBg: 'bg-purple-100/70 text-purple-800 border-purple-200',
          icon: <Globe className="w-6 h-6 text-purple-600" />
        };
      case 'orange':
        return {
          border: 'border-amber-200 hover:border-amber-400',
          bg: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50',
          badgeBg: 'bg-amber-600 text-white',
          numColor: 'text-amber-500',
          titleColor: 'text-amber-950',
          hoverBg: 'group-hover:bg-amber-600 group-hover:text-white',
          tagBg: 'bg-amber-100/70 text-amber-800 border-amber-200',
          icon: <Route className="w-6 h-6 text-amber-600" />
        };
      case 'teal':
      default:
        return {
          border: 'border-teal-200 hover:border-teal-400',
          bg: 'bg-gradient-to-br from-teal-50/90 via-white to-cyan-50/50',
          badgeBg: 'bg-teal-600 text-white',
          numColor: 'text-teal-500',
          titleColor: 'text-teal-950',
          hoverBg: 'group-hover:bg-teal-600 group-hover:text-white',
          tagBg: 'bg-teal-100/70 text-teal-800 border-teal-200',
          icon: <Database className="w-6 h-6 text-teal-600" />
        };
    }
  };

  // Filter sections belonging exclusively to this category
  const filteredSections = sections.filter((sec) => sec.category === category?.id);

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToCategories}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </button>

        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="text-xs font-extrabold text-slate-600 bg-slate-200/80 px-3.5 py-1 rounded-full border border-slate-300/50">
            Category 0{category?.number} • {filteredSections.length} Mindmaps
          </span>
        </div>
      </div>

      {/* Category Banner Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {category?.title}
        </h1>

        <p className="mt-2 text-sm text-slate-600 font-medium">
          {category?.subtitle} — Select a mindmap topic below to open full visual details.
        </p>

        {/* Global Search Bar */}
        <div className="mt-6 relative max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics in this category..."
              className="w-full pl-12 pr-10 py-3 text-sm bg-white border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Topic Cards Grid for Selected Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filteredSections.map((section) => {
          const theme = getTheme(section.color);
          const isMatched = matchedIds.has(section.id);
          const numFormatted = Number(section.number) < 10 ? `0${section.number}` : section.number;

          return (
            <div
              key={section.id}
              onClick={() => onSelectTopic(section.id)}
              className={`group cursor-pointer rounded-3xl border-2 p-7 shadow-sm transition-all duration-300 flex flex-col justify-between topic-card-hover ${
                theme.bg
              } ${theme.border} ${isMatched ? 'card-highlight' : ''}`}
            >
              <div>
                {/* Header Badge & Topic Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${theme.badgeBg} shadow-2xs`}>
                      Topic {numFormatted}
                    </span>
                    {theme.icon}
                  </div>
                  <span className={`text-2xl font-black font-mono opacity-30 ${theme.numColor}`}>
                    {numFormatted}
                  </span>
                </div>

                {/* Section Title */}
                <h2 className={`text-xl font-extrabold ${theme.titleColor} group-hover:text-black transition-colors mb-3`}>
                  {section.title}
                </h2>

                {/* Section Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-6">
                  {section.description}
                </p>

                {/* Code Badge Preview */}
                {section.badge && (
                  <div className="mb-6 p-2.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] border border-slate-800">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-semibold">Signature / Syntax</div>
                    <code className="text-emerald-300">{section.badge}</code>
                  </div>
                )}

                {/* Cards Preview Tags */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Includes Blocks</div>
                  <div className="flex flex-wrap gap-1.5">
                    {section.cards.map((card) => (
                      <span
                        key={card.id}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${theme.tagBg}`}
                      >
                        {card.letter}. {card.title.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">
                  Open Mindmap
                </span>
                <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-all ${theme.hoverBg}`}>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
