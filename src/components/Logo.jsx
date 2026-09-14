import React from 'react';

export default function Logo({ size = 'md', showText = true }) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      {/* Brand Icon SVG: Stylized Blue Open Book */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center text-blue-600`}>
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full fill-none stroke-current stroke-[2.5]"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Book Spine & Left Page */}
          <path d="M24 38V12C21 9 15 9 8 11V37C15 35 21 35 24 38Z" fill="#3B82F6" stroke="#2563EB" />
          {/* Right Page */}
          <path d="M24 38V12C27 9 33 9 40 11V37C33 35 27 35 24 38Z" fill="#3B82F6" stroke="#2563EB" />
          {/* Book Lines / Emboss */}
          <line x1="12" y1="20" x2="20" y2="18.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="26" x2="20" y2="24.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="18.5" x2="36" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="24.5" x2="36" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Bookmark / Ribbon */}
          <path d="M24 12V24L21 21.5L18 24V10.5" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={`font-black tracking-tight text-slate-900 ${textSizes[size]}`}>
          Note<span className="text-blue-600">.ly</span>
        </span>
      )}
    </div>
  );
}
