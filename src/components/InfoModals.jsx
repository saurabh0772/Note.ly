import React from 'react';
import { X, BookOpen, Mail, Github, Heart, Sparkles } from 'lucide-react';

export function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">About Notely</h3>
            <p className="text-xs text-slate-500 font-medium">Developer Architecture & Interactive Knowledge</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed font-medium mb-4">
          Notely is designed to turn complex architectural theory into intuitive, lasting knowledge.
          Whether studying System Design through high-resolution illustrated PDF notes or tracing
          asynchronous flows through interactive block mindmaps, Notely empowers developers to build with confidence.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Core Pillars:</span>
          </div>
          <div className="text-xs text-slate-500 pl-6 space-y-1">
            <p>• System Design illustrated PDF guides (Monoliths, Microservices, Load Balancers, Proxies & Protocols)</p>
            <p>• 24 Deep Dive Mindmap topics with interactive node graphs</p>
            <p>• Completely open, client-side, fast and distraction-free</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Get in Touch</h3>
            <p className="text-xs text-slate-500 font-medium">Feedback, suggestions & ideas</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
          Have feedback on the architecture notes, or want to contribute more system design diagrams?
          We'd love to hear from you!
        </p>

        <div className="space-y-3 mb-6">
          <a
            href="mailto:krsaurabh0772@gmail.com"
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group cursor-pointer"
            title="Send email to krsaurabh0772@gmail.com"
          >
            <Mail className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
              krsaurabh0772@gmail.com
            </span>
          </a>
          <a
            href="https://github.com/saurabh0772/Note.ly"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group cursor-pointer"
            title="Visit Note.ly GitHub repository"
          >
            <Github className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
              github.com/saurabh0772/Note.ly
            </span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}
