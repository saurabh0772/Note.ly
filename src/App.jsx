import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import NotelyLandingHome from './components/NotelyLandingHome';
import PdfNotesPage from './components/PdfNotesPage';
import MindMapExplorerPage from './components/MindMapExplorerPage';
import CategorySelectionPage from './components/CategorySelectionPage';
import TopicSelectionPage from './components/TopicSelectionPage';
import TopicDetailPage from './components/TopicDetailPage';
import AdminDashboard from './components/admin/AdminDashboard';
import { AboutModal, ContactModal } from './components/InfoModals';
import { mindmapData } from './data/mindmapData';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'pdf' | 'mindmap' | 'topics' | 'detail' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState('sec-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Synchronize component state with window.location.hash
  const syncStateFromHash = () => {
    const hash = window.location.hash; // e.g. '#/', '#/pdf-notes', '#/mindmap', '#/category/express', '#/topic/sec-14', '#/admin'

    if (hash.startsWith('#/admin')) {
      setActiveView('admin');
      return;
    }

    if (hash.startsWith('#/pdf-notes')) {
      setActiveView('pdf');
      setSelectedCategory(null);
      return;
    }

    if (hash.startsWith('#/mindmap') || hash.startsWith('#/categories')) {
      setActiveView('mindmap');
      setSelectedCategory(null);
      return;
    }

    if (hash.startsWith('#/topic/')) {
      const topicId = hash.replace('#/topic/', '');
      const sec = mindmapData.sections.find((s) => s.id === topicId);
      if (sec) {
        setSelectedTopicId(sec.id);
        const cat = mindmapData.categories.find((c) => c.id === sec.category);
        if (cat) setSelectedCategory(cat);
        setActiveView('detail');

        // Anonymous Analytics Tracking (NO login required)
        trackEvent('TOPIC_VIEWED', {
          topicId: sec.id,
          categoryId: sec.category,
          metadata: { title: sec.title }
        });
        trackEvent('MINDMAP_OPENED', {
          topicId: sec.id,
          categoryId: sec.category
        });
        return;
      }
    }

    if (hash.startsWith('#/category/')) {
      const categoryId = hash.replace('#/category/', '');
      const cat = mindmapData.categories.find((c) => c.id === categoryId);
      if (cat) {
        setSelectedCategory(cat);
        setActiveView('topics');

        // Anonymous Analytics Tracking (NO login required)
        trackEvent('CATEGORY_VIEWED', {
          categoryId: cat.id,
          metadata: { title: cat.title }
        });
        return;
      }
    }

    // Default: Notely Landing Home Page (Exact Reference Image Design)
    setActiveView('landing');
    setSelectedCategory(null);
  };

  // Sync state on mount and listen for hashchange (browser back/forward & touchpad swipe-back)
  useEffect(() => {
    syncStateFromHash();

    const handleHashChange = () => {
      syncStateFromHash();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track search query execution anonymously with debounce
  useEffect(() => {
    if (!searchTerm.trim()) return;
    const timer = setTimeout(() => {
      const query = searchTerm.toLowerCase();
      let count = 0;
      mindmapData.sections.forEach((sec) => {
        if (
          sec.title.toLowerCase().includes(query) ||
          sec.description.toLowerCase().includes(query)
        ) {
          count++;
        }
      });

      trackEvent('SEARCH_PERFORMED', {
        metadata: {
          query: searchTerm.trim(),
          resultsCount: count
        }
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Navigation handlers that update URL hash
  const handleSelectCategory = (categoryId) => {
    window.location.hash = `#/category/${categoryId}`;
  };

  const handleSelectTopic = (topicId) => {
    window.location.hash = `#/topic/${topicId}`;
  };

  const handleOpenPdfNotes = () => {
    window.location.hash = '#/pdf-notes';
  };

  const handleOpenMindmap = () => {
    window.location.hash = '#/mindmap';
  };

  const handleBackToHome = () => {
    window.location.hash = '#/';
  };

  const handleBackToCategories = () => {
    window.location.hash = '#/mindmap';
  };

  const handleBackToTopics = () => {
    window.location.hash = '#/mindmap';
  };

  const handleNavClick = (dest) => {
    if (dest === 'home') {
      window.location.hash = '#/';
    } else if (dest === 'topics') {
      window.location.hash = '#/mindmap';
    } else if (dest === 'about') {
      setShowAboutModal(true);
    } else if (dest === 'contact') {
      setShowContactModal(true);
    }
  };

  // Currently selected section for detail view
  const currentSection = useMemo(() => {
    return (
      mindmapData.sections.find((s) => s.id === selectedTopicId) ||
      mindmapData.sections[0]
    );
  }, [selectedTopicId]);

  // Highlight matching cards if searching
  const matchedIds = useMemo(() => {
    if (!searchTerm.trim()) return new Set();
    const query = searchTerm.toLowerCase();
    const matches = new Set();

    mindmapData.sections.forEach((sec) => {
      if (
        sec.title.toLowerCase().includes(query) ||
        sec.description.toLowerCase().includes(query) ||
        (sec.badge && sec.badge.toLowerCase().includes(query)) ||
        sec.cards.some(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            (c.code && c.code.toLowerCase().includes(query))
        )
      ) {
        matches.add(sec.id);
      }
    });

    return matches;
  }, [searchTerm]);

  if (activeView === 'admin') {
    return <AdminDashboard />;
  }

  const activeNav =
    activeView === 'landing'
      ? 'home'
      : activeView === 'mindmap' || activeView === 'topics' || activeView === 'detail'
      ? 'topics'
      : 'home';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-100 flex flex-col">
      {/* Top Navbar matching the reference design */}
      <Navbar activeNav={activeNav} onNavigate={handleNavClick} />

      {/* Main Views */}
      <main className="flex-1">
        {/* Stage 1: Exact Notely Home Page Design from Image */}
        {activeView === 'landing' && (
          <NotelyLandingHome
            onOpenPdfNotes={handleOpenPdfNotes}
            onOpenMindmap={handleOpenMindmap}
          />
        )}

        {/* Stage 2: In-Browser PDF Notes matching exact design */}
        {activeView === 'pdf' && (
          <PdfNotesPage onBackToHome={handleBackToHome} />
        )}

        {/* Stage 3: Mindmap Explorer Page (Matching exact layout and design system) */}
        {activeView === 'mindmap' && (
          <MindMapExplorerPage
            onSelectTopic={handleSelectTopic}
            onBackToHome={handleBackToHome}
          />
        )}

        {/* Stage 4: Topics Selection Page */}
        {activeView === 'topics' && (
          <TopicSelectionPage
            category={selectedCategory}
            sections={mindmapData.sections}
            onSelectTopic={handleSelectTopic}
            onBackToCategories={handleBackToCategories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            matchedIds={matchedIds}
          />
        )}

        {/* Stage 5: Topic Detail / Interactive MindMap Canvas */}
        {activeView === 'detail' && (
          <TopicDetailPage
            section={currentSection}
            onBack={handleBackToTopics}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            matchedIds={matchedIds}
          />
        )}
      </main>

      {/* Info Modals */}
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
}
