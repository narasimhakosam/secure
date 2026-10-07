import React from 'react';

interface HeaderProps {
  onOpenLearn: () => void;
  onOpenChecklist: () => void;
  onOpenHistory: () => void;
  onOpenReport: () => void;
  activeTab?: string;
  historyCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLearn,
  onOpenChecklist,
  onOpenHistory,
  onOpenReport,
  activeTab = 'analyze',
  historyCount = 0,
}) => {
  return (
    <header className="bg-surface dark:bg-inverse-surface border-b border-border dark:border-outline shadow-sm top-0 sticky z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-16 max-w-7xl mx-auto">
        {/* Left: Brand Logo */}
        <a href="/" className="text-lg md:text-xl font-display font-bold text-primary dark:text-inverse-primary flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="leading-none tracking-tight">ScamGuard AI</span>
            <span className="text-[11px] text-secondary font-medium tracking-normal mt-0.5">Student Verification Network</span>
          </div>
        </a>

        {/* Center: Main Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full border border-border">
          <button
            type="button"
            className={`flex items-center gap-2 font-medium text-sm px-4 py-1.5 rounded-full transition-all ${
              activeTab === 'analyze'
                ? 'text-primary bg-surface shadow-sm font-semibold'
                : 'text-secondary hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">security</span>
            Analyze
          </button>
          <button
            type="button"
            onClick={onOpenLearn}
            className="flex items-center gap-2 text-secondary hover:text-primary font-medium text-sm px-3.5 py-1.5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            Learn About Scams
          </button>
          <button
            type="button"
            onClick={onOpenChecklist}
            className="flex items-center gap-2 text-secondary hover:text-primary font-medium text-sm px-3.5 py-1.5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            Safety Checklist
          </button>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-primary font-medium text-sm px-3.5 py-1.5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">account_balance</span>
            Official Portals
          </a>
        </nav>

        {/* Right: Utility Action CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-secondary hover:text-primary rounded-xl hover:bg-primary-subtle transition-colors relative"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenReport}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">flag</span>
            <span>Report a Scam</span>
          </button>
        </div>
      </div>
    </header>
  );
};
