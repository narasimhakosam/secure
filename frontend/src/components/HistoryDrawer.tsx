import React from 'react';
import { ScanHistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ScanHistoryItem[];
  onClear: () => void;
  onSelect: (item: ScanHistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onClear,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface w-full max-w-md h-full flex flex-col shadow-2xl border-l border-border animate-slideLeft">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px] text-primary">history</span>
            <h2 className="text-lg font-display font-bold text-on-surface">Recent Scan History</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-secondary flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List of Scans */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <span className="material-symbols-outlined text-4xl text-secondary">history_toggle_off</span>
              <p className="text-sm font-medium text-on-surface">No scans recorded yet</p>
              <p className="text-xs text-secondary max-w-xs mx-auto">
                Any offer you analyze will be stored locally on your device for your reference.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const badgeClass =
                item.risk_level === 'SAFE'
                  ? 'bg-safe-bg text-safe-text border-safe-main/30'
                  : item.risk_level === 'SUSPICIOUS'
                  ? 'bg-suspicious-bg text-suspicious-text border-suspicious-main/30'
                  : 'bg-highrisk-bg text-highrisk-text border-highrisk-main/30';

              return (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="p-3.5 rounded-xl border border-border bg-surface hover:border-primary transition-all cursor-pointer space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-secondary">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                      Score {item.risk_score} • {item.risk_level}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface line-clamp-2 leading-relaxed font-normal">
                    {item.preview}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border flex justify-between items-center bg-surface-container-low">
            <span className="text-xs text-secondary">{items.length} saved scans</span>
            <button
              onClick={onClear}
              className="text-xs font-semibold text-error hover:underline transition-all"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
