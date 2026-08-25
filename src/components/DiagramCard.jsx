import React from 'react';
import CodeBlock from './CodeBlock';
import { Check, X, ArrowDown, ArrowRight, Info } from 'lucide-react';

export default function DiagramCard({ card, sectionColor, isMatched }) {
  const getTheme = () => {
    switch (sectionColor) {
      case 'red':
        return {
          border: 'border-red-200',
          headerBg: 'bg-red-100/60',
          titleColor: 'text-red-900',
          letterBg: 'bg-red-500 text-white',
          bulletColor: 'bg-red-400',
          calloutBg: 'bg-red-50/80 border-red-200 text-red-950'
        };
      case 'blue':
        return {
          border: 'border-blue-200',
          headerBg: 'bg-blue-100/60',
          titleColor: 'text-blue-900',
          letterBg: 'bg-blue-600 text-white',
          bulletColor: 'bg-blue-400',
          calloutBg: 'bg-blue-50/80 border-blue-200 text-blue-950'
        };
      case 'green':
      default:
        return {
          border: 'border-emerald-200',
          headerBg: 'bg-emerald-100/60',
          titleColor: 'text-emerald-900',
          letterBg: 'bg-emerald-600 text-white',
          bulletColor: 'bg-emerald-500',
          calloutBg: 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      id={card.id}
      className={`relative bg-white rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md ${
        theme.border
      } ${isMatched ? 'card-highlight' : ''}`}
    >
      {/* Header */}
      <div className={`px-3.5 py-2 rounded-t-xl border-b ${theme.headerBg} flex items-center gap-2`}>
        <span className={`w-5 h-5 rounded-full ${theme.letterBg} flex items-center justify-center text-[11px] font-bold shadow-xs shrink-0`}>
          {card.letter}
        </span>
        <h3 className={`font-bold text-xs ${theme.titleColor} tracking-tight`}>
          {card.title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-3.5 text-xs text-slate-700 space-y-2.5">
        {/* Subtitle */}
        {card.subtitle && (
          <p className="text-[11px] text-slate-600 font-medium leading-tight bg-slate-50 p-2 rounded border border-slate-200/80">
            {card.subtitle}
          </p>
        )}

        {/* Bullets */}
        {card.bullets && (
          <ul className="space-y-1.5 pl-0.5">
            {card.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[11.5px] leading-relaxed">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bulletColor} mt-1.5 shrink-0`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Bullets with Syntax detail (e.g. Error handling) */}
        {card.bulletsWithSyntax && (
          <div className="space-y-1.5">
            {card.bulletsWithSyntax.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bulletColor} shrink-0`} />
                <span className="font-medium text-slate-700">{item.label}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-[11px] font-medium border border-slate-200">
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
          <div className="space-y-1.5">
            {card.methods.map((method, idx) => (
              <div key={idx} className="text-[11px] bg-slate-50/80 p-1.5 rounded border border-slate-100 flex flex-col gap-0.5">
                <code className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-1 py-0.5 rounded w-fit text-[10.5px]">
                  {method.name}
                </code>
                <span className="text-slate-600 pl-1">{method.desc}</span>
              </div>
            ))}
          </div>
        )}

        {/* Advantages & Disadvantages Grid */}
        {(card.advantages || card.disadvantages) && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Advantages */}
            <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/80">
              <div className="text-[11px] font-bold text-emerald-800 border-b border-emerald-200 pb-1 mb-1.5 flex items-center gap-1">
                <span>Advantages</span>
              </div>
              <ul className="space-y-1">
                {card.advantages?.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1 text-[10.5px] text-emerald-900 leading-tight">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="bg-red-50/60 p-2.5 rounded-lg border border-red-200/80">
              <div className="text-[11px] font-bold text-red-800 border-b border-red-200 pb-1 mb-1.5 flex items-center gap-1">
                <span>Disadvantages</span>
              </div>
              <ul className="space-y-1">
                {card.disadvantages?.map((dis, idx) => (
                  <li key={idx} className="flex items-start gap-1 text-[10.5px] text-red-900 leading-tight">
                    <X className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sub-Callouts inside card / inline */}
        {card.flow && (
          <div className="mt-2 p-2.5 rounded-lg bg-red-50/90 border border-red-200">
            <h4 className="font-bold text-[11px] text-red-800 mb-1.5 border-b border-red-200 pb-1">
              {card.flow.title}
            </h4>
            <div className="flex flex-col items-center gap-1 text-[10.5px]">
              {card.flow.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-white px-2 py-1 rounded border border-red-200 text-slate-700 w-full text-center font-medium shadow-2xs">
                    {step}
                  </div>
                  {idx < card.flow.steps.length - 1 && (
                    <ArrowDown className="w-3.5 h-3.5 text-red-400 my-0.5" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {card.problems && (
          <div className="mt-2 p-2.5 rounded-lg bg-red-100/60 border border-red-300">
            <h4 className="font-bold text-[11px] text-red-900 mb-1 border-b border-red-300 pb-1">
              {card.problems.title}
            </h4>
            <ul className="space-y-1 text-[10.5px] text-red-950">
              {card.problems.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {card.states && (
          <div className="mt-2 p-2 rounded-lg bg-blue-50/90 border border-blue-200">
            <h4 className="font-bold text-[11px] text-blue-900 mb-1 border-b border-blue-200 pb-0.5">
              {card.states.title}
            </h4>
            <ul className="space-y-0.5 text-[10.5px] text-blue-950">
              {card.states.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {card.keyPoints && (
          <div className="mt-2 p-2 rounded-lg bg-blue-100/60 border border-blue-300">
            <h4 className="font-bold text-[11px] text-blue-900 mb-1 border-b border-blue-300 pb-0.5">
              {card.keyPoints.title}
            </h4>
            <ul className="space-y-1 text-[10.5px] text-blue-950">
              {card.keyPoints.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {card.note && (
          <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex gap-2 items-start">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-tight font-medium">{card.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
