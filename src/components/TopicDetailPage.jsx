import React from 'react';
import BlockCard from './BlockCard';
import { ArrowLeft, Search, X } from 'lucide-react';
import Logo from './Logo';

export default function TopicDetailPage({
  section,
  onBack,
  searchTerm,
  setSearchTerm,
  matchedIds
}) {
  const getBannerTheme = () => {
    switch (section.color) {
      case 'red':
        return {
          bg: 'bg-gradient-to-r from-red-600 to-pink-600 text-white',
          badgeBg: 'bg-white/20 text-white border-white/30',
          numBg: 'bg-white text-red-600',
          codeBg: 'bg-red-950/60 text-red-200 border-red-500/40'
        };
      case 'blue':
        return {
          bg: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
          badgeBg: 'bg-white/20 text-white border-white/30',
          numBg: 'bg-white text-blue-600',
          codeBg: 'bg-blue-950/60 text-blue-200 border-blue-500/40'
        };
      case 'green':
        return {
          bg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
          badgeBg: 'bg-white/20 text-white border-white/30',
          numBg: 'bg-white text-emerald-600',
          codeBg: 'bg-emerald-950/60 text-emerald-200 border-emerald-500/40'
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
          badgeBg: 'bg-white/20 text-white border-white/30',
          numBg: 'bg-white text-purple-600',
          codeBg: 'bg-purple-950/60 text-purple-200 border-purple-500/40'
        };
      case 'orange':
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
          badgeBg: 'bg-white/20 text-white border-white/30',
          numBg: 'bg-white text-amber-600',
          codeBg: 'bg-amber-950/60 text-amber-200 border-amber-500/40'
        };
      case 'teal':
      default:
        return {
          bg: 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white',
          badgeBg: 'bg-white/20 text-white border-white/30',
          numBg: 'bg-white text-teal-600',
          codeBg: 'bg-teal-950/60 text-teal-200 border-teal-500/40'
        };
    }
  };

  const bannerTheme = getBannerTheme();

  return (
    <div className="min-h-screen bg-slate-50/80 pb-20 overflow-x-hidden">
      {/* Top Header Control Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs transition-all shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Topics</span>
          </button>

          {/* Note.ly Brand Logo */}
          <div className="hidden sm:block">
            <Logo size="sm" />
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in this topic..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Topic Title Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl shadow-md ${bannerTheme.bg} relative overflow-hidden`}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl ${bannerTheme.numBg} flex items-center justify-center font-black text-sm shadow-sm`}>
                  0{section.number}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bannerTheme.badgeBg}`}>
                  Topic 0{section.number}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {section.title}
              </h1>

              <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-medium pt-1">
                {section.description}
              </p>
            </div>

            {section.badge && (
              <div className={`p-3.5 rounded-2xl border font-mono text-xs whitespace-pre-line shadow-inner ${bannerTheme.codeBg} shrink-0`}>
                <div className="text-[10px] uppercase opacity-75 mb-1 font-sans font-bold">Code Badge</div>
                {section.badge}
              </div>
            )}
          </div>
        </div>

        {/* Multi-Column Block-Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {section.cards.map((card) => {
            const isMatched = matchedIds.has(card.id);
            // Span 2 columns for wider cards like Advantages/Disadvantages or Pyramid of Doom code
            const isWide = card.advantages || card.flow || card.code?.length > 250;

            return (
              <div
                key={card.id}
                className={isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
              >
                <BlockCard
                  card={card}
                  sectionColor={section.color}
                  isMatched={isMatched}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
