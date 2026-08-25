import React from 'react';

export default function RootCard({ data, isMatched }) {
  return (
    <div
      id={data.id}
      className={`relative w-72 rounded-2xl bg-[#0B192C] text-white p-6 shadow-xl border-2 border-slate-700/80 flex flex-col justify-between ${
        isMatched ? 'card-highlight' : ''
      } transition-all duration-300`}
    >
      {/* Node.js Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-xl bg-slate-900/80 border border-slate-700 p-2.5 flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 128 128" className="w-full h-full">
            <path
              fill="#68A063"
              d="M64 4.5L12.5 34.2v59.6L64 123.5l51.5-29.7V34.2L64 4.5zm0 14.5l38.9 22.5v45L64 109 25.1 86.5v-45L64 19z"
            />
            <path
              fill="#68A063"
              d="M64 36.5c-15.2 0-27.5 12.3-27.5 27.5S48.8 91.5 64 91.5 91.5 79.2 91.5 64 79.2 36.5 64 36.5zm-5 42.5h-5V49h5v30zm15 0h-5V49h5v30z"
            />
            <text
              x="64"
              y="74"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="34"
              fontWeight="bold"
              fontFamily="Fira Code, monospace"
            >
              JS
            </text>
          </svg>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center my-3">
        <h1 className="text-xl font-extrabold tracking-tight leading-snug text-white">
          Asynchronous Programming
        </h1>
        <p className="text-sm font-semibold text-emerald-400 mt-1">
          in Node.js
        </p>
      </div>

      {/* Topics list */}
      <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs font-medium text-slate-300">
        {data.topics.map((topic, idx) => (
          <div key={idx} className="flex items-center gap-2.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span>{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
