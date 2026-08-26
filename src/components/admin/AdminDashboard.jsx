import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import OverviewTab from './OverviewTab';
import VisitorsTab from './VisitorsTab';
import TopicsTab from './TopicsTab';
import CategoriesTab from './CategoriesTab';
import ActivityTab from './ActivityTab';
import SearchesTab from './SearchesTab';
import TopicDetailModal from './TopicDetailModal';
import AdminLoginModal from './AdminLoginModal';
import ForbiddenPage from './ForbiddenPage';

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('all');
  const [overviewData, setOverviewData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const token = localStorage.getItem('notely_admin_token');

  // Parse hash URL e.g. #/admin/visitors
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/admin/')) {
        const tab = hash.replace('#/admin/', '');
        if (['overview', 'visitors', 'topics', 'categories', 'activity', 'searches'].includes(tab)) {
          setActiveTab(tab);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Fetch overview data
  const fetchOverview = async () => {
    if (!isAdmin) return;
    try {
      setDataLoading(true);
      const res = await fetch(`/api/admin/overview?range=${dateRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setOverviewData(json.data);
      }
    } catch (e) {
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchOverview();
    }
  }, [isAdmin, dateRange]);

  const handleCSVExport = (type = 'topics') => {
    window.open(`/api/admin/export/${type}?token=${token}`, '_blank');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Verifying admin authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <ForbiddenPage
          onOpenLogin={() => setShowLoginModal(true)}
          onBackToApp={() => (window.location.hash = '#/')}
        />
        <AdminLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            fetchOverview();
          }}
        />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportClick={() => handleCSVExport(activeTab === 'visitors' ? 'categories' : 'topics')}
      />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          dateRange={dateRange}
          setDateRange={setDateRange}
          onRefresh={fetchOverview}
          loading={dataLoading}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === 'overview' && (
            <OverviewTab
              overviewData={overviewData}
              onTopicClick={(topicId) => setSelectedTopicId(topicId)}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.location.hash = `#/admin/${tab}`;
              }}
            />
          )}

          {activeTab === 'visitors' && <VisitorsTab dateRange={dateRange} />}

          {activeTab === 'topics' && (
            <TopicsTab
              dateRange={dateRange}
              onTopicSelect={(topicId) => setSelectedTopicId(topicId)}
            />
          )}

          {activeTab === 'categories' && <CategoriesTab dateRange={dateRange} />}

          {activeTab === 'activity' && <ActivityTab />}

          {activeTab === 'searches' && <SearchesTab dateRange={dateRange} />}
        </main>
      </div>

      {/* Topic Detail Modal */}
      {selectedTopicId && (
        <TopicDetailModal
          topicId={selectedTopicId}
          onClose={() => setSelectedTopicId(null)}
        />
      )}
    </div>
  );
}
