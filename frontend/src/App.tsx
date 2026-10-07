import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AnalyzeForm } from './components/AnalyzeForm';
import { AnalysisResultView } from './components/AnalysisResultView';
import { RightRail } from './components/RightRail';
import { RedFlagsSection } from './components/RedFlagsSection';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { EducationModal } from './components/EducationModal';
import { ChecklistModal } from './components/ChecklistModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ReportModal } from './components/ReportModal';
import { FormattedAnalysisResult, ScanHistoryItem, OfferContext } from './types';
import { analyzeOffer } from './services/api';

const LOCAL_STORAGE_KEY = 'scamguard_scan_history';

export const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<FormattedAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Modals & Drawers state
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Scan History state
  const [historyItems, setHistoryItems] = useState<ScanHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(historyItems));
    } catch (e) {
      console.warn('Could not save history to localStorage:', e);
    }
  }, [historyItems]);

  const handleAnalyze = async (data: { message_text: string; url: string; offer_type: OfferContext }) => {
    setIsLoading(true);
    setErrorBanner(null);

    try {
      const response = await analyzeOffer({
        message_text: data.message_text || undefined,
        url: data.url || undefined,
        offer_type: data.offer_type,
      });

      setAnalysisResult(response);

      // Save to local scan history
      const newHistoryItem: ScanHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        preview: data.message_text ? data.message_text.slice(0, 100) + '...' : data.url,
        risk_score: response.risk_score,
        risk_level: response.risk_level,
        category: response.scam_category,
      };

      setHistoryItems((prev) => [newHistoryItem, ...prev.slice(0, 19)]); // keep last 20
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorBanner(err.message || 'Unable to complete evaluation. Please try again or check backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
  };

  const handleSelectHistory = (item: ScanHistoryItem) => {
    setIsHistoryOpen(false);
    // If the item has full response we could show it, or we trigger an analysis for the preview
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col justify-between selection:bg-secondary-container selection:text-primary pb-16 md:pb-0">
      {/* Sticky Header */}
      <Header
        onOpenLearn={() => setIsLearnOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        historyCount={historyItems.length}
      />

      {/* Main Canvas Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-12">
        {/* Error message banner if API failed */}
        {errorBanner && (
          <div className="p-4 rounded-xl bg-highrisk-bg border border-highrisk-main/30 text-highrisk-text flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">error</span>
              <span>{errorBanner}</span>
            </div>
            <button
              onClick={() => setErrorBanner(null)}
              className="text-xs font-semibold underline hover:text-black"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero Section */}
        <Hero />

        {/* Dual-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Input Card OR Result Card (7 Cols) */}
          <div className="lg:col-span-7">
            {analysisResult ? (
              <AnalysisResultView
                result={analysisResult}
                onReset={() => setAnalysisResult(null)}
              />
            ) : (
              <AnalyzeForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            )}
          </div>

          {/* RIGHT COLUMN: Trust, Signals & How It Works Panel (5 Cols) */}
          <RightRail />
        </div>

        {/* Red Flags Section: 4 Bento Cards */}
        <RedFlagsSection />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenLearn={() => setIsLearnOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        onOpenLearn={() => setIsLearnOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onAnalyzeTab={() => setAnalysisResult(null)}
      />

      {/* Modals & Drawers */}
      <EducationModal
        isOpen={isLearnOpen}
        onClose={() => setIsLearnOpen(false)}
      />
      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={historyItems}
        onClear={handleClearHistory}
        onSelect={handleSelectHistory}
      />
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
};

export default App;
