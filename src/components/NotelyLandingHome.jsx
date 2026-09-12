import React from 'react';
import { Zap, Target, BarChart2, Users, ArrowRight } from 'lucide-react';

export default function NotelyLandingHome({ onOpenPdfNotes, onOpenMindmap }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#FDFCFB] via-[#FAF8F6] to-[#F5F3EF] relative overflow-hidden flex flex-col justify-between select-none">
      {/* Background Soft Studio Lighting Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full flex-1 flex flex-col justify-center">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Centered Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-100/90 text-indigo-600 text-xs font-bold mb-4 shadow-2xs">
            <span className="text-indigo-500 font-bold">✦</span>
            <span>Your Learning Companion</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
              Notely
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-xl mx-auto">
            Turn your practice into lasting knowledge. Choose how you want to explore your notes and start learning.
          </p>
        </div>

        {/* Center Cards Area with Doodles and Side Decorative Elements */}
        <div className="relative max-w-5xl mx-auto w-full my-2">
          {/* Left Hand-drawn Annotation: "Study Smarter Not Harder!" */}
          <div className="hidden lg:block absolute -top-12 left-10 xl:left-14 -rotate-6 z-10 pointer-events-none">
            <div className="font-caveat text-slate-400 text-2xl font-bold leading-tight">
              Study Smarter<br />
              <span className="ml-2">Not Harder!</span>
            </div>
            <svg
              className="w-14 h-12 text-slate-400 ml-12 mt-1"
              viewBox="0 0 50 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Curved downward arrow */}
              <path d="M10 5 C 20 20, 28 35, 38 42" />
              <path d="M28 42 L 38 42 L 36 32" />
            </svg>
          </div>

          {/* Right Hand-drawn Annotation: "Visualize Connect Remember" */}
          <div className="hidden lg:block absolute -top-12 right-10 xl:right-14 rotate-6 z-10 pointer-events-none text-right">
            <div className="font-caveat text-slate-400 text-2xl font-bold leading-tight">
              Visualize<br />
              Connect<br />
              Remember
            </div>
            <svg
              className="w-14 h-12 text-slate-400 mr-12 mt-1"
              viewBox="0 0 50 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Curved downward arrow pointing left */}
              <path d="M40 5 C 30 20, 22 35, 12 42" />
              <path d="M22 42 L 12 42 L 14 32" />
            </svg>
          </div>

          {/* Left Decorative Decor: Potted Plant & Book Stack (Pastel Books) */}
          <div className="hidden xl:flex flex-col items-center absolute -left-36 bottom-2 z-0 pointer-events-none select-none">
            {/* Plant Leaves */}
            <svg className="w-28 h-32 -mb-5" viewBox="0 0 100 120" fill="none">
              {/* Central stem */}
              <path d="M50 110 Q 50 60, 52 30" stroke="#4B7A56" strokeWidth="3" strokeLinecap="round" />
              {/* Leaves */}
              <path d="M50 85 Q 20 75, 15 50 C 35 50, 48 70, 50 85Z" fill="#588B63" opacity="0.9" />
              <path d="M50 70 Q 80 60, 85 35 C 65 35, 52 55, 50 70Z" fill="#4B7A56" />
              <path d="M51 50 Q 25 35, 20 15 C 40 18, 48 38, 51 50Z" fill="#699D74" />
              <path d="M52 35 Q 75 25, 78 5 C 60 8, 52 25, 52 35Z" fill="#588B63" />
            </svg>

            {/* Stack of 3 Pastel Books */}
            <div className="flex flex-col items-center drop-shadow-md">
              {/* Top Book (Lavender) */}
              <div className="w-36 h-8 bg-gradient-to-r from-[#B9B4E3] via-[#C7C3EE] to-[#DDD9F8] rounded-md border border-[#A8A2DB] flex items-center justify-center shadow-xs">
                <span className="font-caveat text-white text-base font-bold tracking-wide">
                  Same Notes
                </span>
              </div>
              {/* Middle Book (Coral/Pink) */}
              <div className="w-40 h-8 bg-gradient-to-r from-[#F5BFB6] via-[#FAC9C1] to-[#FCE0DB] rounded-md border border-[#EDB0A5] -mt-1 flex items-center justify-center shadow-xs">
                <span className="font-caveat text-[#783E34] text-base font-bold tracking-wide">
                  Better Understanding
                </span>
              </div>
              {/* Bottom Book (Cream/Yellow) */}
              <div className="w-44 h-9 bg-gradient-to-r from-[#F5E6CC] via-[#FAEDD7] to-[#FFF7E8] rounded-md border border-[#E8D4B4] -mt-1 flex items-center justify-center shadow-sm">
                <span className="font-caveat text-[#6B5532] text-base font-bold tracking-wide">
                  Brighter You
                </span>
              </div>
            </div>
          </div>

          {/* Right Decorative Decor: Coffee Cup with Sleeve */}
          <div className="hidden xl:flex flex-col items-center absolute -right-36 bottom-2 z-0 pointer-events-none select-none drop-shadow-md">
            {/* Coffee Cup */}
            <div className="relative w-28 flex flex-col items-center">
              {/* Lid */}
              <div className="w-24 h-4 bg-[#292524] rounded-t-lg" />
              <div className="w-26 h-2 bg-[#1C1917] rounded-sm -mt-0.5" />
              {/* Cup Body */}
              <div className="w-22 h-36 bg-gradient-to-b from-[#F5F2EC] to-[#EBE4D8] border-x border-[#DDD5C7] relative flex flex-col items-center overflow-hidden rounded-b-xl shadow-sm">
                {/* Cardboard Sleeve */}
                <div className="absolute top-10 w-full h-20 bg-gradient-to-r from-[#DFCCA8] via-[#EADBBE] to-[#D9C49D] border-y border-[#CCAFA7] flex flex-col items-center justify-center px-1 shadow-inner">
                  <span className="font-caveat text-[#4A3B2C] text-sm font-bold leading-tight text-center">
                    Good<br />Ideas<br />Take Time
                  </span>
                  <span className="text-[10px] text-[#4A3B2C] tracking-widest font-bold -mt-1">
                    ...
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* The Two Main Central Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch max-w-3xl mx-auto relative z-10">
            {/* Card 1: PDF Notes */}
            <div
              onClick={onOpenPdfNotes}
              className="cursor-pointer group relative bg-gradient-to-b from-[#F6F4FE] via-[#FAF9FE] to-white/95 rounded-[32px] p-8 sm:p-10 border-2 border-[#E9E5FC] hover:border-indigo-300 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center justify-between"
            >
              {/* 3D PDF Document Graphic */}
              <div className="w-full flex justify-center pt-2 pb-4">
                <div className="relative w-28 h-32 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                  {/* Paper Base with Soft 3D Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-200 rounded-2xl shadow-lg shadow-purple-200/50 border border-slate-200/80">
                    {/* Folded Top Corner */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-slate-200 to-slate-100 rounded-bl-xl border-l border-b border-slate-300/80 shadow-2xs" />

                    {/* Document Lines */}
                    <div className="p-4 pt-6 space-y-2.5">
                      <div className="w-10 h-1.5 bg-slate-300/70 rounded-full" />
                      <div className="w-14 h-1.5 bg-slate-300/60 rounded-full" />
                      <div className="w-12 h-1.5 bg-slate-300/50 rounded-full" />
                      <div className="w-14 h-1.5 bg-slate-300/40 rounded-full" />
                    </div>
                  </div>

                  {/* Overlaid Red 3D "PDF" Pill Badge */}
                  <div className="relative z-10 -ml-6 mt-2 px-3 py-1.5 bg-gradient-to-b from-[#EF4444] to-[#DC2626] rounded-xl shadow-md shadow-red-500/40 border border-red-400 flex items-center justify-center transform -rotate-1">
                    <span className="text-white font-black text-sm tracking-wider">
                      PDF
                    </span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-2 mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                  PDF Notes
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
                  Read clean, structured notes in PDF format.
                </p>
              </div>

              {/* Action Button: "Open PDF Notes →" */}
              <button
                type="button"
                className="w-full max-w-xs py-3.5 px-6 rounded-full bg-[#4F46E5] group-hover:bg-[#4338CA] text-white font-bold text-sm shadow-md shadow-indigo-300/70 transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
              >
                <span>Open PDF Notes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Card 2: MindMap */}
            <div
              onClick={onOpenMindmap}
              className="cursor-pointer group relative bg-gradient-to-b from-[#F2FBF6] via-[#F7FCF9] to-white/95 rounded-[32px] p-8 sm:p-10 border-2 border-[#E1F6EB] hover:border-emerald-300 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center justify-between"
            >
              {/* 3D MindMap Diagram Graphic */}
              <div className="w-full flex justify-center pt-2 pb-4">
                <div className="relative w-36 h-32 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                  {/* SVG Connecting Branches */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 144 128"
                  >
                    {/* Top-Left link */}
                    <path
                      d="M72 64 C 55 64, 45 40, 36 30"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Top-Right link */}
                    <path
                      d="M72 64 C 89 64, 99 40, 108 30"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Bottom-Left link */}
                    <path
                      d="M72 64 C 55 64, 45 88, 36 98"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Bottom-Right link */}
                    <path
                      d="M72 64 C 89 64, 99 88, 108 98"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Satellite Node 1: Top Left (Coral/Pink) */}
                  <div className="absolute top-4 left-3 w-10 h-6 bg-gradient-to-b from-[#FB7185] to-[#F43F5E] rounded-full shadow-md shadow-rose-300/50 border border-rose-300/80" />

                  {/* Satellite Node 2: Top Right (Golden Amber) */}
                  <div className="absolute top-4 right-3 w-10 h-6 bg-gradient-to-b from-[#FBBF24] to-[#F59E0B] rounded-full shadow-md shadow-amber-300/50 border border-amber-300/80" />

                  {/* Satellite Node 3: Bottom Left (Emerald Green) */}
                  <div className="absolute bottom-4 left-3 w-10 h-6 bg-gradient-to-b from-[#34D399] to-[#10B981] rounded-full shadow-md shadow-emerald-300/50 border border-emerald-300/80" />

                  {/* Satellite Node 4: Bottom Right (Lavender Purple) */}
                  <div className="absolute bottom-4 right-3 w-10 h-6 bg-gradient-to-b from-[#A78BFA] to-[#8B5CF6] rounded-full shadow-md shadow-purple-300/50 border border-purple-300/80" />

                  {/* Central Node (Royal Blue) */}
                  <div className="relative z-10 w-16 h-10 bg-gradient-to-b from-[#3B82F6] to-[#2563EB] rounded-2xl shadow-lg shadow-blue-400/50 border border-blue-300 flex items-center justify-center">
                    <div className="w-8 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-2 mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                  MindMap
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
                  Explore visual mind maps for better understanding.
                </p>
              </div>

              {/* Action Button: "Open MindMap →" */}
              <button
                type="button"
                className="w-full max-w-xs py-3.5 px-6 rounded-full bg-[#10B981] group-hover:bg-[#059669] text-white font-bold text-sm shadow-md shadow-emerald-300/70 transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
              >
                <span>Open MindMap</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Handwritten Annotation: "Small Steps Big Progress ♡" */}
        <div className="text-center my-6">
          <span className="font-caveat text-slate-400 text-xl sm:text-2xl font-bold tracking-wide">
            Small Steps&nbsp;&nbsp;&nbsp;&nbsp;Big Progress&nbsp;&nbsp;♡
          </span>
        </div>

        {/* Feature Highlights Row */}
        <div className="max-w-4xl mx-auto w-full pt-4 border-t border-slate-200/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-between">
            {/* Feature 1: Structured Learning */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  Structured Learning
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Well organized notes
                </div>
              </div>
            </div>

            {/* Feature 2: Concept Clarity */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  Concept Clarity
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Simple explanations
                </div>
              </div>
            </div>

            {/* Feature 3: Better Retention */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <BarChart2 className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  Better Retention
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Visual learning
                </div>
              </div>
            </div>

            {/* Feature 4: Build Confidence */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  Build Confidence
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Practice with purpose
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
