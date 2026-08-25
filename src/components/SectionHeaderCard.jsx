import React from 'react';

export default function SectionHeaderCard({ section, isMatched }) {
  const getTheme = () => {
    switch (section.color) {
      case 'red':
        return {
          border: 'border-red-400',
          bg: 'bg-red-50/90',
          headerBg: 'bg-red-200/50',
          titleColor: 'text-red-700',
          numBg: 'bg-red-600 text-white',
          descColor: 'text-slate-700',
          badgeBg: 'bg-red-100 text-red-800 border-red-300'
        };
      case 'blue':
        return {
          border: 'border-blue-400',
          bg: 'bg-blue-50/90',
          headerBg: 'bg-blue-200/50',
          titleColor: 'text-blue-700',
          numBg: 'bg-blue-600 text-white',
          descColor: 'text-slate-700',
          badgeBg: 'bg-blue-100 text-blue-800 border-blue-300'
        };
      case 'green':
      default:
        return {
          border: 'border-emerald-400',
          bg: 'bg-emerald-50/90',
          headerBg: 'bg-emerald-200/50',
          titleColor: 'text-emerald-700',
          numBg: 'bg-emerald-600 text-white',
          descColor: 'text-slate-700',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300'
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      id={section.id}
      className={`relative w-72 bg-white rounded-2xl border-2 shadow-md ${theme.border} ${
        isMatched ? 'card-highlight' : ''
      } transition-all duration-300 overflow-hidden`}
    >
      {/* Header Bar */}
      <div className={`p-3.5 ${theme.headerBg} border-b ${theme.border} flex items-center gap-3`}>
        <div className={`w-8 h-8 rounded-xl ${theme.numBg} flex items-center justify-center font-bold text-base shadow-sm shrink-0`}>
          {section.number}
        </div>
        <h2 className={`font-extrabold text-base ${theme.titleColor} leading-tight`}>
          {section.title}
        </h2>
      </div>

      {/* Content */}
      <div className={`p-4 ${theme.bg} space-y-3`}>
        <p className={`text-xs ${theme.descColor} font-medium leading-relaxed`}>
          {section.description}
        </p>

        {section.badge && (
          <div className="pt-1">
            <div className={`p-2 rounded-lg border text-[11px] font-mono whitespace-pre-wrap leading-tight shadow-2xs ${theme.badgeBg}`}>
              {section.badge}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
