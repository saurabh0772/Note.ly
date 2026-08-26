import React, { useState, useEffect, useMemo } from 'react';
import CategorySelectionPage from './components/CategorySelectionPage';
import TopicSelectionPage from './components/TopicSelectionPage';
import TopicDetailPage from './components/TopicDetailPage';
import AdminDashboard from './components/admin/AdminDashboard';
import { mindmapData } from './data/mindmapData';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [activeView, setActiveView] = useState('categories'); // 'categories' | 'topics' | 'detail' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState('sec-1');
  const [searchTerm, setSearchTerm] = useState('');

  // Synchronize component state with window.location.hash
  const syncStateFromHash = () => {
    const hash = window.location.hash; // e.g. '#/category/express', '#/topic/sec-14', '#/admin'

    if (hash.startsWith('#/admin')) {
      setActiveView('admin');
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

    // Default: Stage 1 Categories Landing Page (100% Open & Public)
    setActiveView('categories');
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

  const handleBackToCategories = () => {
    window.location.hash = '#/';
  };

  const handleBackToTopics = () => {
    if (selectedCategory) {
      window.location.hash = `#/category/${selectedCategory.id}`;
    } else {
      window.location.hash = '#/';
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-blue-200">
      {activeView === 'categories' && (
        <CategorySelectionPage
          categories={mindmapData.categories}
          sections={mindmapData.sections}
          onSelectCategory={handleSelectCategory}
          onSelectTopic={handleSelectTopic}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

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

      {activeView === 'detail' && (
        <TopicDetailPage
          section={currentSection}
          onBack={handleBackToTopics}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          matchedIds={matchedIds}
        />
      )}
    </div>
  );
}
