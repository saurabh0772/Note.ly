import React from 'react';
import CodeBlock from './CodeBlock';
import { Check, X, ArrowDown, ArrowRight, Info } from 'lucide-react';

export default function BlockCard({ card, sectionColor, isMatched }) {
  const getTheme = () => {
    switch (sectionColor) {
      case 'red':
        return {
          border: 'border-red-200 hover:border-red-300',
          headerBg: 'bg-red-100/70',
          titleColor: 'text-red-950',
          letterBg: 'bg-red-600 text-white',
          bulletColor: 'bg-red-500',
        };
      case 'blue':
        return {
          border: 'border-blue-200 hover:border-blue-300',
          headerBg: 'bg-blue-100/70',
          titleColor: 'text-blue-950',
          letterBg: 'bg-blue-600 text-white',
          bulletColor: 'bg-blue-500',
        };
      case 'green':
        return {
          border: 'border-emerald-200 hover:border-emerald-300',
          headerBg: 'bg-emerald-100/70',
          titleColor: 'text-emerald-950',
          letterBg: 'bg-emerald-600 text-white',
          bulletColor: 'bg-emerald-600',
        };
      case 'purple':
        return {
          border: 'border-purple-200 hover:border-purple-300',
          headerBg: 'bg-purple-100/70',
          titleColor: 'text-purple-950',
          letterBg: 'bg-purple-600 text-white',
          bulletColor: 'bg-purple-600',
        };
      case 'orange':
        return {
          border: 'border-amber-200 hover:border-amber-300',
          headerBg: 'bg-amber-100/70',
          titleColor: 'text-amber-950',
          letterBg: 'bg-amber-600 text-white',
          bulletColor: 'bg-amber-600',
        };
      case 'teal':
      default:
        return {
          border: 'border-teal-200 hover:border-teal-300',
          headerBg: 'bg-teal-100/70',
          titleColor: 'text-teal-950',
          letterBg: 'bg-teal-600 text-white',
          bulletColor: 'bg-teal-600',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      id={card.id}
      className={`bg-white rounded-2xl border-2 shadow-xs transition-all duration-200 flex flex-col h-full ${
        theme.border
      } ${isMatched ? 'card-highlight' : ''}`}
    >
      {/* Header */}
      <div className={`px-4 py-3 rounded-t-2xl border-b ${theme.headerBg} flex items-center gap-2.5`}>
        <span className={`w-6 h-6 rounded-full ${theme.letterBg} flex items-center justify-center text-xs font-bold shadow-xs shrink-0`}>
          {card.letter}
        </span>
        <h3 className={`font-bold text-sm ${theme.titleColor} tracking-tight`}>
          {card.title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 text-xs text-slate-700 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Subtitle */}
          {card.subtitle && (
            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              {card.subtitle}
            </p>
          )}

          {/* Bullets */}
          {card.bullets && (
            <ul className="space-y-2 pl-0.5">
              {card.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <span className={`w-2 h-2 rounded-full ${theme.bulletColor} mt-1.5 shrink-0`} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Bullets with Syntax detail */}
          {card.bulletsWithSyntax && (
            <div className="space-y-2">
              {card.bulletsWithSyntax.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className={`w-2 h-2 rounded-full ${theme.bulletColor} shrink-0`} />
                  <span className="font-semibold text-slate-800">{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <code className="bg-slate-100 text-pink-600 px-2 py-0.5 rounded font-mono text-xs font-medium border border-slate-200">
                    {item.detail}
                  </code>
                </div>
              ))}
            </div>
          )}

          {/* Code Snippet */}
          {card.code && (
            <CodeBlock code={card.code} />
          )}

          {/* Core Methods list */}
          {card.methods && (
            <div className="space-y-2">
              {card.methods.map((method, idx) => (
                <div key={idx} className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <code className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md text-xs border border-emerald-200/60 w-fit">
                    {method.name}
                  </code>
                  <span className="text-slate-600 text-[11px] sm:text-xs">{method.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Callouts / Grids */}
        <div className="space-y-3 pt-1">
          {/* Advantages & Disadvantages Grid */}
          {(card.advantages || card.disadvantages) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Advantages */}
              <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800 border-b border-emerald-200 pb-1.5 mb-2 flex items-center gap-1.5">
                  <span>Advantages</span>
                </div>
                <ul className="space-y-1.5">
                  {card.advantages?.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-emerald-950 leading-tight">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disadvantages */}
              <div className="bg-red-50/80 p-3 rounded-xl border border-red-200">
                <div className="text-xs font-bold text-red-800 border-b border-red-200 pb-1.5 mb-2 flex items-center gap-1.5">
                  <span>Disadvantages</span>
                </div>
                <ul className="space-y-1.5">
                  {card.disadvantages?.map((dis, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-red-950 leading-tight">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Flow Diagram Box */}
          {card.flow && (
            <div className="p-3 rounded-xl bg-red-50/90 border border-red-200">
              <h4 className="font-bold text-xs text-red-800 mb-2 border-b border-red-200 pb-1">
                {card.flow.title}
              </h4>
              <div className="flex flex-col items-center gap-1.5 text-xs">
                {card.flow.steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="bg-white px-3 py-1.5 rounded-lg border border-red-200 text-slate-800 w-full text-center font-medium shadow-2xs">
                      {step}
                    </div>
                    {idx < card.flow.steps.length - 1 && (
                      <ArrowDown className="w-4 h-4 text-red-400 my-0.5" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Problems Box */}
          {card.problems && (
            <div className="p-3 rounded-xl bg-red-100/70 border border-red-300">
              <h4 className="font-bold text-xs text-red-900 mb-1.5 border-b border-red-300 pb-1">
                {card.problems.title}
              </h4>
              <ul className="space-y-1.5 text-xs text-red-950">
                {card.problems.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* States Box */}
          {card.states && (
            <div className="p-3 rounded-xl bg-blue-50/90 border border-blue-200">
              <h4 className="font-bold text-xs text-blue-900 mb-1.5 border-b border-blue-200 pb-1">
                {card.states.title}
              </h4>
              <ul className="space-y-1.5 text-xs text-blue-950">
                {card.states.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Points Box */}
          {card.keyPoints && (
            <div className="p-3 rounded-xl bg-blue-100/70 border border-blue-300">
              <h4 className="font-bold text-xs text-blue-900 mb-1.5 border-b border-blue-300 pb-1">
                {card.keyPoints.title}
              </h4>
              <ul className="space-y-1.5 text-xs text-blue-950">
                {card.keyPoints.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Note Box */}
          {card.note && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex gap-2.5 items-start">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium whitespace-pre-line">{card.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
