import React from 'react';
import { Search, ArrowRight, ArrowLeft, X, Layers, Zap, BookOpen, Route, Database, Sparkles, Lock, FileText, Network } from 'lucide-react';
import Logo from './Logo';
import PdfNotesView from './PdfNotesView';

export default function CategorySelectionPage({
  categories,
  onSelectCategory,
  searchTerm,
  setSearchTerm,
  sections,
  onSelectTopic,
  homeTab = 'mindmap',
  onTabChange,
  onBackToHome
}) {
  const getCategoryTheme = (color) => {
    switch (color) {
      case 'red':
        return {
          border: 'border-red-200 hover:border-red-400',
          bg: 'bg-gradient-to-br from-red-50/90 via-white to-pink-50/60',
          badgeBg: 'bg-red-600 text-white',
          titleColor: 'text-red-950',
          numColor: 'text-red-500',
          tagBg: 'bg-red-100/80 text-red-800 border-red-200',
          buttonBg: 'group-hover:bg-red-600 group-hover:text-white',
          icon: <Zap className="w-7 h-7 text-red-600" />
        };
      case 'green':
        return {
          border: 'border-emerald-200 hover:border-emerald-400',
          bg: 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60',
          badgeBg: 'bg-emerald-600 text-white',
          titleColor: 'text-emerald-950',
          numColor: 'text-emerald-500',
          tagBg: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
          buttonBg: 'group-hover:bg-emerald-600 group-hover:text-white',
          icon: <BookOpen className="w-7 h-7 text-emerald-600" />
        };
      case 'orange':
        return {
          border: 'border-amber-200 hover:border-amber-400',
          bg: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/60',
          badgeBg: 'bg-amber-600 text-white',
          titleColor: 'text-amber-950',
          numColor: 'text-amber-500',
          tagBg: 'bg-amber-100/80 text-amber-800 border-amber-200',
          buttonBg: 'group-hover:bg-amber-600 group-hover:text-white',
          icon: <Route className="w-7 h-7 text-amber-600" />
        };
      case 'purple':
        return {
          border: 'border-purple-200 hover:border-purple-400',
          bg: 'bg-gradient-to-br from-purple-50/90 via-white to-fuchsia-50/60',
          badgeBg: 'bg-purple-600 text-white',
          titleColor: 'text-purple-950',
          numColor: 'text-purple-500',
          tagBg: 'bg-purple-100/80 text-purple-800 border-purple-200',
          buttonBg: 'group-hover:bg-purple-600 group-hover:text-white',
          icon: <Lock className="w-7 h-7 text-purple-600" />
        };
      case 'teal':
      default:
        return {
          border: 'border-teal-200 hover:border-teal-400',
          bg: 'bg-gradient-to-br from-teal-50/90 via-white to-cyan-50/60',
          badgeBg: 'bg-teal-600 text-white',
          titleColor: 'text-teal-950',
          numColor: 'text-teal-500',
          tagBg: 'bg-teal-100/80 text-teal-800 border-teal-200',
          buttonBg: 'group-hover:bg-teal-600 group-hover:text-white',
          icon: <Database className="w-7 h-7 text-teal-600" />
        };
    }
  };

  // Global search results filtering across all topics
  const searchResults = searchTerm.trim()
    ? sections.filter((sec) => {
        const query = searchTerm.toLowerCase();
        return (
          sec.title.toLowerCase().includes(query) ||
          sec.description.toLowerCase().includes(query) ||
          (sec.badge && sec.badge.toLowerCase().includes(query)) ||
          sec.cards.some(
            (c) =>
              c.title.toLowerCase().includes(query) ||
              (c.code && c.code.toLowerCase().includes(query))
          )
        );
      })
    : [];

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {onBackToHome && (
        <div className="mb-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Home</span>
          </button>
        </div>
      )}
      {/* Top Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-extrabold border border-emerald-200 mb-5 shadow-2xs">
          <Logo size="sm" showText={false} />
          <span>Note.ly • Developer Architecture Suite</span>
        </div>

        <div className="flex justify-center mb-3">
          <Logo size="lg" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Developer Architecture & Knowledge
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Access high-scale system design PDF notes or explore interactive block-by-block mindmaps.
        </p>

        {/* Home Page Two Button Icons Switcher */}
        <div className="flex items-center justify-center mt-7">
          <div className="inline-flex p-1.5 bg-white border-2 border-slate-200/90 rounded-2xl shadow-sm gap-2">
            {/* First Button Icon: Pdf Notes */}
            <button
              type="button"
              id="pdf-notes-tab-btn"
              onClick={() => onTabChange && onTabChange('pdf')}
              className={`flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                homeTab === 'pdf'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <FileText className={`w-4 h-4 sm:w-5 sm:h-5 ${homeTab === 'pdf' ? 'text-white' : 'text-indigo-600'}`} />
              <span>Pdf Notes</span>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  homeTab === 'pdf'
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}
              >
                System Design
              </span>
            </button>

            {/* Second Button Icon: MindMap */}
            <button
              type="button"
              id="mindmap-tab-btn"
              onClick={() => onTabChange && onTabChange('mindmap')}
              className={`flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                homeTab === 'mindmap'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-200 ring-2 ring-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Network className={`w-4 h-4 sm:w-5 sm:h-5 ${homeTab === 'mindmap' ? 'text-white' : 'text-emerald-600'}`} />
              <span>MindMap</span>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  homeTab === 'mindmap'
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                24 Topics
              </span>
            </button>
          </div>
        </div>

        {/* Global Search Input (MindMap Mode Only) */}
        {homeTab === 'mindmap' && (
          <div className="mt-8 relative max-w-xl mx-auto animate-in fade-in duration-200">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search all 24 topics, code, methods (e.g. JWT, RBAC, app.use, fs.readFile)..."
                className="w-full pl-12 pr-10 py-3.5 text-sm bg-white border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Home Content View */}
      {homeTab === 'pdf' ? (
        <div className="animate-in fade-in duration-300">
          <PdfNotesView />
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          {/* Global Search Results Dropdown Overlay */}
          {searchTerm.trim() ? (
            <div className="max-w-3xl mx-auto mb-12 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Search Results ({searchResults.length})
                </span>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Clear Search
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No matching topics found for "{searchTerm}".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map((section) => (
                    <div
                      key={section.id}
                      onClick={() => onSelectTopic(section.id)}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                          Topic 0{section.number}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-2">{section.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{section.description}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-blue-600">
                        <span>Open Mindmap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* Category Cards Grid (4 Cards Only - Kept as is) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {categories.map((cat) => {
              const theme = getCategoryTheme(cat.color);

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`group cursor-pointer rounded-3xl border-2 p-8 shadow-sm transition-all duration-300 flex flex-col justify-between topic-card-hover ${
                    theme.bg
                  } ${theme.border}`}
                >
                  <div>
                    {/* Top Badge & Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-black px-3.5 py-1 rounded-full ${theme.badgeBg} shadow-2xs`}>
                          CATEGORY {cat.number}
                        </span>
                        {theme.icon}
                      </div>
                      <span className={`text-3xl font-black font-mono opacity-30 ${theme.numColor}`}>
                        {cat.number}
                      </span>
                    </div>

                    {/* Category Title */}
                    <h2 className={`text-2xl font-black ${theme.titleColor} group-hover:text-black transition-colors mb-1.5`}>
                      {cat.title}
                    </h2>

                    {/* Category Subtitle */}
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-4">
                      {cat.subtitle}
                    </p>

                    {/* Category Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
                      {cat.description}
                    </p>

                    {/* Tags Preview */}
                    <div className="mb-6">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">
                        Key Concepts & APIs
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-3 py-1 rounded-xl border font-semibold ${theme.tagBg}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="pt-5 border-t border-slate-200/80 flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-extrabold text-slate-700">
                        {cat.topicCount} Detailed Mindmaps
                      </span>
                    </div>
                    <div className={`w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-all ${theme.buttonBg} shadow-2xs`}>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
