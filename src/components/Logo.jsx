import React from 'react';

export default function Logo({ size = 'md', showText = true }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="inline-flex items-center gap-2.5 selection:bg-none">
      {/* Brand Icon SVG */}
      <div className={`relative ${iconSizes[size]} shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <rect width="100" height="100" rx="28" fill="#0F172A" />
          <path d="M30 35L50 25L70 35L50 50Z" fill="#10B981" />
          <path d="M30 35L30 60L50 75L50 50Z" fill="#059669" opacity="0.8" />
          <path d="M70 35L70 60L50 75L50 50Z" fill="#34D399" opacity="0.95" />
          <circle cx="76" cy="24" r="8" fill="#34D399" />
          <circle cx="76" cy="24" r="4" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={`font-black tracking-tight text-slate-900 ${textSizes[size]}`}>
          Note<span className="text-emerald-500">.ly</span>
        </span>
      )}
    </div>
  );
}
