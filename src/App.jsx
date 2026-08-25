import React, { useState, useEffect, useMemo } from 'react';
import CategorySelectionPage from './components/CategorySelectionPage';
import TopicSelectionPage from './components/TopicSelectionPage';
import TopicDetailPage from './components/TopicDetailPage';
import { mindmapData } from './data/mindmapData';

export default function App() {
  const [activeView, setActiveView] = useState('categories'); // 'categories' | 'topics' | 'detail'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState('sec-1');
  const [searchTerm, setSearchTerm] = useState('');

  // Synchronize component state with window.location.hash
  const syncStateFromHash = () => {
    const hash = window.location.hash; // e.g. '#/category/express' or '#/topic/sec-14'

    if (hash.startsWith('#/topic/')) {
      const topicId = hash.replace('#/topic/', '');
      const sec = mindmapData.sections.find((s) => s.id === topicId);
      if (sec) {
        setSelectedTopicId(sec.id);
        const cat = mindmapData.categories.find((c) => c.id === sec.category);
        if (cat) setSelectedCategory(cat);
        setActiveView('detail');
        return;
      }
    }

    if (hash.startsWith('#/category/')) {
      const categoryId = hash.replace('#/category/', '');
      const cat = mindmapData.categories.find((c) => c.id === categoryId);
      if (cat) {
        setSelectedCategory(cat);
        setActiveView('topics');
        return;
      }
    }

    // Default: Stage 1 Categories Landing Page
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
