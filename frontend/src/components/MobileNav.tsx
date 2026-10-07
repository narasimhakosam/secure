import React from 'react';

interface MobileNavProps {
  onOpenLearn: () => void;
  onOpenHistory: () => void;
  onAnalyzeTab: () => void;
  activeTab?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  onOpenLearn,
  onOpenHistory,
  onAnalyzeTab,
  activeTab = 'analyze',
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 bg-surface border-t border-border shadow-lg">
      <button
        type="button"
        onClick={onAnalyzeTab}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          activeTab === 'analyze'
            ? 'bg-primary-subtle text-primary'
            : 'text-secondary hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">security</span>
        <span>Analyze</span>
      </button>

      <button
        type="button"
        onClick={onOpenLearn}
        className="flex flex-col items-center justify-center text-secondary hover:text-primary px-4 py-1.5 rounded-xl text-xs font-semibold transition-all"
      >
        <span className="material-symbols-outlined text-[22px]">menu_book</span>
        <span>Learn</span>
      </button>

      <button
        type="button"
        onClick={onOpenHistory}
        className="flex flex-col items-center justify-center text-secondary hover:text-primary px-4 py-1.5 rounded-xl text-xs font-semibold transition-all"
      >
        <span className="material-symbols-outlined text-[22px]">history</span>
        <span>History</span>
      </button>
    </nav>
  );
};
