import React, { useState } from 'react';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHECKLIST_ITEMS = [
  { id: '1', title: 'Zero Upfront Payments', desc: 'No registration fees, laptop security deposits, or file charges requested.', critical: true },
  { id: '2', title: 'Official Domain Verification', desc: 'Email came from @company.com, not @gmail.com or disposable webmail.', critical: true },
  { id: '3', title: 'Structured Hiring Process', desc: 'You had at least one real interview or technical evaluation before receiving an offer.', critical: false },
  { id: '4', title: 'No OTP or Sensitive Credentials Shared', desc: 'Recruiter never asked for SMS OTPs, UPI PINs, or original Aadhaar/Govt IDs.', critical: true },
  { id: '5', title: 'Verified on MCA / LinkedIn', desc: 'Company is registered on MCA portal and recruiter profile exists on LinkedIn.', critical: false },
  { id: '6', title: 'Written Offer Letter with GSTIN', desc: 'Offer document has legitimate registered address, contact phone, and official seal.', critical: false },
  { id: '7', title: 'Confirmed with College Placement Cell', desc: 'Verified whether this organization is a recognized campus recruitment partner.', critical: false },
];

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ isOpen, onClose }) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const completedCount = checkedIds.length;
  const totalCount = CHECKLIST_ITEMS.length;
  const isAllDone = completedCount === totalCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface rounded-2xl border border-border w-full max-w-2xl max-h-[85vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">fact_check</span>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-on-surface">Internship Safety Checklist</h2>
              <p className="text-xs text-secondary">Verify these safety standards before signing or transferring funds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-surface-container-low text-secondary flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-surface-container-low border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-secondary">
            Verified Checks: {completedCount} / {totalCount}
          </span>
          <div className="w-32 bg-surface h-2 rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-safe-bg/40 border-safe-main/30'
                    : 'bg-surface border-border hover:border-primary-container'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 text-primary rounded border-border focus:ring-primary cursor-pointer"
                />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${isChecked ? 'text-safe-text line-through' : 'text-on-surface'}`}>
                      {item.title}
                    </span>
                    {item.critical && (
                      <span className="text-[10px] font-bold text-error bg-error-container/60 px-1.5 py-0.5 rounded">
                        CRITICAL
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-secondary">
            {isAllDone ? '🎉 All criteria verified safe!' : 'Tick all items before proceeding with the recruiter.'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
