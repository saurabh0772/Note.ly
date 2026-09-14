import React from 'react';
import { Search } from 'lucide-react';

export default function Navbar({ activeNav = 'home', onNavigate }) {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Tagline */}
        <div
          onClick={() => onNavigate && onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Stylized Blue Open Book Icon */}
          <div className="w-10 h-10 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 48 48"
              className="w-9 h-9 fill-none stroke-current stroke-[2.5]"
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

          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              Notely
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wider mt-0.5">
              Learn · Build · Remember
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeNav === 'home'
                ? 'bg-indigo-50 text-indigo-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('topics')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeNav === 'topics'
                ? 'bg-indigo-50 text-indigo-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Topics
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('about')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeNav === 'about'
                ? 'bg-indigo-50 text-indigo-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('contact')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeNav === 'contact'
                ? 'bg-indigo-50 text-indigo-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Search Input + Theme Toggle + User Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search Input with Cmd+K badge */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-8 pr-12 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl w-44 lg:w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-2 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-400 select-none">
              ⌘ K
            </div>
          </div>

          {/* User Profile Avatar "S" */}
          <div
            className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-sm flex items-center justify-center shadow-2xs cursor-pointer select-none hover:ring-2 hover:ring-blue-300 transition-all"
            title="User Profile: Saurabh"
          >
            S
          </div>
        </div>
      </div>
    </header>
  );
}
