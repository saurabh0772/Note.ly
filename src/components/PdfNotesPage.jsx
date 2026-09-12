import React, { useState } from 'react';
import {
  FileText,
  Folder,
  GraduationCap,
  Eye,
  MoreVertical,
  ChevronRight,
  Home,
  BookOpen,
  X,
  ExternalLink,
  Download,
  Maximize2,
  Minimize2,
  ArrowLeft
} from 'lucide-react';
import { pdfCategories } from '../data/pdfNotesData';

export default function PdfNotesPage({ onBackToHome }) {
  // Active category selected in the sidebar
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    pdfCategories.length > 0 ? pdfCategories[0].id : ''
  );

  // Active viewing PDF for in-browser reader modal
  const [viewingPdf, setViewingPdf] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Find active category
  const activeCategory =
    pdfCategories.find((cat) => cat.id === selectedCategoryId) ||
    pdfCategories[0] || {
      id: 'empty',
      title: 'No Folders Found',
      description: 'Add a folder to src/pdfContent/ to start organizing PDF notes.',
      documents: []
    };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* ========================================= */}
        {/* LEFT SIDEBAR: Dynamic Folder Categories   */}
        {/* ========================================= */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
            {/* Sidebar Header */}
            <div className="flex items-start gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                  PDF Notes
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5 leading-snug">
                  Organized notes for your learning journey
                </p>
              </div>
            </div>

            {/* Dynamic Folders List from pdfContent */}
            <nav className="space-y-1.5">
              {pdfCategories.map((cat) => {
                const isActive = cat.id === selectedCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-indigo-50/90 text-indigo-900 border border-indigo-200/70 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Folder
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span className="truncate">{cat.title}</span>
                    </div>

                    <span
                      className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full shrink-0 transition-colors ${
                        isActive
                          ? 'bg-indigo-200/70 text-indigo-800'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {cat.documents.length}
                    </span>
                  </button>
                );
              })}

              {pdfCategories.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400 font-medium">
                  No folders found in pdfContent.
                </div>
              )}
            </nav>
          </div>

          {/* Sidebar Bottom Inspiration Card */}
          <div className="bg-indigo-50/70 rounded-3xl p-5 border border-indigo-100/90 flex flex-col gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 leading-tight">
                Small steps<br />lead to big progress.
              </div>
              <div className="font-caveat text-indigo-600 text-sm font-bold mt-1">
                Keep learning! ♡
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================= */}
        {/* RIGHT MAIN CONTENT: Notes List & Banner   */}
        {/* ========================================= */}
        <main className="flex-1 w-full min-w-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4 select-none">
            <button
              onClick={onBackToHome}
              className="hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="hover:text-slate-600 cursor-default">PDF Notes</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-bold">{activeCategory.title}</span>
          </div>

          {/* Category Banner Card with Doodle */}
          <div className="bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/40 rounded-3xl p-6 sm:p-7 border border-indigo-100/80 shadow-xs mb-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Folder Info */}
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100/90 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs border border-indigo-200/50">
                <Folder className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {activeCategory.title}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200/60">
                    {activeCategory.documents.length} Notes
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed max-w-xl">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            {/* Right: "Read Learn Apply Grow" Hand-drawn Doodle */}
            <div className="hidden sm:flex items-center gap-2 shrink-0 pointer-events-none select-none">
              <div className="text-right">
                <div className="font-caveat text-slate-400 text-lg font-bold leading-tight">
                  Read<br />
                  Learn<br />
                  Apply<br />
                  Grow
                </div>
              </div>
              {/* Curved Pointer Arrow */}
              <svg
                className="w-12 h-12 text-slate-400 -mt-2"
                viewBox="0 0 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M40 8 C 30 20, 20 32, 10 40" />
                <path d="M22 40 L 10 40 L 12 28" />
              </svg>
              {/* Stacked Sheet Sketch */}
              <div className="w-10 h-12 bg-white/90 rounded-lg border border-slate-300 shadow-2xs p-1.5 flex flex-col justify-between -rotate-6">
                <div className="w-5 h-1 bg-slate-200 rounded" />
                <div className="w-7 h-1 bg-slate-200 rounded" />
                <div className="w-6 h-1 bg-slate-200 rounded" />
                <div className="w-4 h-1 bg-slate-200 rounded" />
              </div>
            </div>
          </div>

          {/* List of PDF Documents */}
          <div className="space-y-3">
            {activeCategory.documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs group"
              >
                {/* Left: Red PDF Icon & Title / Description */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  {/* Red PDF Icon matching screenshot */}
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/80 text-red-600 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                    <span className="text-[10px] font-black tracking-tighter text-red-600">
                      PDF
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {doc.filename}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                      {doc.description}
                    </p>
                  </div>
                </div>

                {/* Right: File Size, Pages, "View PDF" button, and More Options */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* File Size */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{doc.fileSize}</span>
                  </div>

                  {/* Pages Count */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{doc.pages}</span>
                  </div>

                  {/* View PDF Button */}
                  <button
                    type="button"
                    onClick={() => setViewingPdf(doc)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs shadow-xs transition-all cursor-pointer group-hover:shadow-indigo-200"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View PDF</span>
                  </button>

                  {/* Options Menu Button */}
                  <button
                    type="button"
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Quote Bar */}
          <div className="bg-indigo-50/50 rounded-2xl p-4 sm:p-5 border border-indigo-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-indigo-400 font-serif leading-none select-none">
                ❝
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Good notes today, a better developer tomorrow.
              </span>
            </div>
            <div className="font-caveat text-indigo-600 text-base font-bold sm:text-right select-none">
              — Notely ♡
            </div>
          </div>
        </main>
      </div>

      {/* ================================================= */}
      {/* IN-BROWSER RESPONSIVE PDF VIEWER MODAL            */}
      {/* ================================================= */}
      {viewingPdf && (
        <div
          className={`fixed inset-0 z-50 flex flex-col bg-slate-900/90 backdrop-blur-sm transition-all ${
            isFullscreen ? 'p-0' : 'p-2 sm:p-6'
          }`}
        >
          <div className="bg-white rounded-3xl w-full h-full flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            {/* Viewer Header Toolbar */}
            <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 shadow-2xs">
                  PDF
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-900 truncate">
                    {viewingPdf.filename}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    {activeCategory.title} • {viewingPdf.fileSize}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Open in New Tab */}
                <a
                  href={viewingPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all shadow-2xs"
                  title="Open PDF directly in a new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>

                {/* Download PDF */}
                <a
                  href={viewingPdf.url}
                  download={viewingPdf.filename}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all shadow-2xs"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setViewingPdf(null);
                    setIsFullscreen(false);
                  }}
                  className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 text-slate-600 transition-all cursor-pointer"
                  title="Close Reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Iframe */}
            <div className="flex-1 w-full bg-slate-100 relative">
              <iframe
                src={`${viewingPdf.url}#view=FitH&toolbar=1`}
                title={viewingPdf.filename}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
