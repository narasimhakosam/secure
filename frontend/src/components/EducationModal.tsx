import React, { useEffect, useState } from 'react';
import { ScamTypeInfo } from '../types';
import { getScamTypes } from '../services/api';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EducationModal: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  const [scamTypes, setScamTypes] = useState<ScamTypeInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      getScamTypes().then((data) => {
        setScamTypes(data);
        setLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface rounded-2xl border border-border w-full max-w-3xl max-h-[85vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-on-surface">Student Scam Knowledge Base</h2>
              <p className="text-xs text-secondary">Learn common recruitment traps targeting college students</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-surface-container-low text-secondary flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-secondary">
              <span className="material-symbols-outlined text-2xl animate-spin mr-2">progress_activity</span>
              <span>Loading educational guides...</span>
            </div>
          ) : (
            scamTypes.map((type) => (
              <div key={type.id} className="p-5 rounded-xl border border-border bg-surface-container-low/60 space-y-3">
                <h3 className="text-base font-display font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
                  {type.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {type.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-lg bg-highrisk-bg border border-highrisk-main/20 space-y-1.5">
                    <span className="text-[11px] font-bold text-highrisk-main uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">flag</span>
                      Key Warning Signs
                    </span>
                    <ul className="text-xs text-highrisk-text space-y-1 list-disc list-inside">
                      {(type.warning_signs || []).map((sign: string, i: number) => (
                        <li key={i}>{sign}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-primary-subtle border border-secondary-container space-y-1.5">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">chat_error</span>
                      Real-world Fraud Example
                    </span>
                    <p className="text-xs text-secondary italic leading-relaxed">
                      &ldquo;{type.example}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
