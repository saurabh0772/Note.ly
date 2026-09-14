import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Check,
  ExternalLink,
  Download,
  Maximize2,
  Minimize2,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Network,
  Cpu,
  Server,
  Layers,
  Info
} from 'lucide-react';
import { pdfCategories } from '../data/pdfNotesData';

export default function PdfNotesView({ onBackToHome }) {
  // Currently we focus on the System Design category
  const systemDesignCategory =
    pdfCategories.find((c) => c.title.toLowerCase().includes('system design')) ||
    pdfCategories[0] || { documents: [] };
  const [selectedDocId, setSelectedDocId] = useState(
    systemDesignCategory.documents[0]?.id || ''
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDocInfo, setShowDocInfo] = useState(true);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const activeDocIndex = systemDesignCategory.documents.findIndex(
    (doc) => doc.id === selectedDocId
  );
  const activeDoc =
    (activeDocIndex >= 0 ? systemDesignCategory.documents[activeDocIndex] : null) ||
    systemDesignCategory.documents[0] ||
    {};

  const handleSelectDoc = (docId) => {
    setSelectedDocId(docId);
    setIsDropdownOpen(false);
  };

  const handlePrevDoc = () => {
    if (activeDocIndex > 0) {
      setSelectedDocId(systemDesignCategory.documents[activeDocIndex - 1].id);
    }
  };

  const handleNextDoc = () => {
    if (activeDocIndex < systemDesignCategory.documents.length - 1) {
      setSelectedDocId(systemDesignCategory.documents[activeDocIndex + 1].id);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header & Dropdown Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          )}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-2">
            <Server className="w-3.5 h-3.5 text-indigo-600" />
            <span>Architecture Guides • High-Scale Notes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            System Design Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Browse and read comprehensive, illustrated PDF deep dives directly in your browser.
          </p>
        </div>

        {/* System Design Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Select System Design Note</span>
            <span className="text-indigo-600 font-extrabold">{systemDesignCategory.documents.length} Available</span>
          </div>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            className="w-full md:w-80 flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/40 border-2 border-indigo-200 hover:border-indigo-400 rounded-2xl shadow-xs transition-all text-left group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                {activeDoc.number}
              </div>
              <div className="truncate">
                <div className="text-xs font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                  {activeDoc.title}
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate">
                  System Design • {activeDoc.fileSize}
                </div>
              </div>
            </div>
            {isDropdownOpen ? (
              <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
            )}
          </button>

          {/* Dropdown Menu Overlay */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full md:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-30 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  System Design Dropdown
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  {systemDesignCategory.documents.length} Guides
                </span>
              </div>

              <div className="divide-y divide-slate-100 mt-1">
                {systemDesignCategory.documents.map((doc) => {
                  const isCurrent = doc.id === selectedDocId;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => handleSelectDoc(doc.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                        isCurrent
                          ? 'bg-indigo-50/80 border border-indigo-200 text-indigo-950 font-bold'
                          : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                          isCurrent
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {doc.number}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">
                            {doc.title}
                          </span>
                          {isCurrent && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-1" />}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                          {doc.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                            {doc.fileSize}
                          </span>
                          <span className="text-[10px] text-indigo-600 font-semibold">
                            Read inline →
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Selection Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
          Quick Switch:
        </span>
        {systemDesignCategory.documents.map((doc) => {
          const isActive = doc.id === selectedDocId;
          return (
            <button
              key={doc.id}
              onClick={() => handleSelectDoc(doc.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-500'}`} />
              <span>
                {doc.number}. {doc.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Responsive In-Browser PDF Reader Card */}
      <div
        className={`bg-white rounded-3xl border border-slate-200 shadow-md flex flex-col overflow-hidden transition-all ${
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none border-0 shadow-none bg-slate-900 text-white'
            : 'w-full mb-8'
        }`}
      >
        {/* PDF Reader Toolbar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b ${
            isFullscreen
              ? 'bg-slate-800/90 border-slate-700 text-slate-100 backdrop-blur-sm'
              : 'bg-slate-50/90 border-slate-200 text-slate-800'
          }`}
        >
          {/* Active Note Details */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              {activeDoc.number}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold truncate">
                {activeDoc.title}
              </h3>
              <p
                className={`text-[11px] truncate ${
                  isFullscreen ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                System Design • {activeDoc.fileSize} • Responsive Browser Viewer
              </p>
            </div>
          </div>

          {/* Controls & Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Prev / Next Document */}
            <div className="flex items-center border rounded-xl overflow-hidden mr-1 border-slate-300">
              <button
                onClick={handlePrevDoc}
                disabled={activeDocIndex === 0}
                className="p-1.5 hover:bg-slate-200/70 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Previous Document"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold px-2 py-1 select-none">
                {activeDocIndex + 1} / {systemDesignCategory.documents.length}
              </span>
              <button
                onClick={handleNextDoc}
                disabled={activeDocIndex === systemDesignCategory.documents.length - 1}
                className="p-1.5 hover:bg-slate-200/70 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Next Document"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Summary/Info */}
            {!isFullscreen && (
              <button
                onClick={() => setShowDocInfo(!showDocInfo)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  showDocInfo
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                title="Toggle Note Overview"
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Overview</span>
              </button>
            )}

            {/* Open in New Tab */}
            <a
              href={activeDoc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all shadow-2xs"
              title="Open PDF directly in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            {/* Download */}
            <a
              href={activeDoc.url}
              download={activeDoc.filename}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all shadow-2xs"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-1.5 rounded-xl border transition-all ${
                isFullscreen
                  ? 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Expand Fullscreen Reader'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* The PDF Viewport Container */}
        <div
          className={`w-full relative bg-slate-900/10 flex items-center justify-center ${
            isFullscreen
              ? 'flex-1 h-[calc(100vh-60px)]'
              : 'h-[76vh] min-h-[580px] max-h-[950px]'
          }`}
        >
          <iframe
            key={activeDoc.url}
            src={`${activeDoc.url}#view=FitH&toolbar=1`}
            title={activeDoc.title}
            className="w-full h-full border-0 rounded-b-3xl bg-slate-100"
          />

          {/* Non-intrusive fallback for devices where iframes might block inline PDF rendering */}
          <noscript>
            <div className="p-6 text-center">
              <p className="text-sm text-slate-700 mb-3">
                Inline PDF rendering is not supported in this browser environment.
              </p>
              <a
                href={activeDoc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
              >
                <ExternalLink className="w-4 h-4" />
                Open PDF Note
              </a>
            </div>
          </noscript>
        </div>
      </div>

      {/* Collapsible Document Summary & Key Architectural Topics */}
      {showDocInfo && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-12 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  System Design Note {String(activeDoc.number || 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-semibold">
                  {activeDoc.fileSize}
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 mb-1">
                {activeDoc.title}
              </h4>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                {activeDoc.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {activeDoc.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {(activeDoc.tags || []).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Topics Included */}
            <div className="md:w-80 bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Core Topics Inside</span>
              </div>
              <ul className="space-y-2">
                {(activeDoc.topics || []).map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
