import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [platform, setPlatform] = useState('whatsapp');
  const [scammerContact, setScammerContact] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface rounded-2xl border border-border w-full max-w-xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-highrisk-bg text-highrisk-main flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">flag</span>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-on-surface">Report a Fraudulent Offer</h2>
              <p className="text-xs text-secondary">Protect other students across university campuses</p>
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
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Quick Helplines Box */}
          <div className="p-4 rounded-xl bg-primary-subtle border border-secondary-container space-y-2">
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">emergency</span>
              Official Cyber Crime Immediate Helpline
            </span>
            <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface">
              <div className="font-semibold flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">call</span>
                Dial 1930 (Toll Free)
              </div>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline flex items-center gap-1"
              >
                cybercrime.gov.in
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-safe-bg/60 rounded-xl border border-safe-main/30">
              <span className="material-symbols-outlined text-4xl text-safe-main">check_circle</span>
              <h3 className="text-base font-bold text-safe-text">Incident Logged Locally</h3>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                Thank you! Incident recorded for training data synthesis. Be sure to report directly to National Cyber Crime portal if financial loss occurred.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-secondary">Scammer Platform / Channel</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-surface border border-border text-on-surface text-sm rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-focus-ring"
                >
                  <option value="whatsapp">WhatsApp Recruiter</option>
                  <option value="telegram">Telegram Task Channel</option>
                  <option value="linkedin">Fake LinkedIn Job Post</option>
                  <option value="email">Unsolicited Email</option>
                  <option value="sms">SMS / Message</option>
                  <option value="campus">Campus Notice / Flyer</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-secondary">Recruiter Phone / UPI / Email (Optional)</label>
                <input
                  type="text"
                  value={scammerContact}
                  onChange={(e) => setScammerContact(e.target.value)}
                  placeholder="+91 98765 43210 or scammer@upi"
                  className="w-full bg-surface border border-border text-on-surface text-sm rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-focus-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-secondary">Scam Details / What Happened</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe how they approached you, what money or documents they demanded..."
                  className="w-full bg-surface border border-border text-on-surface text-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-focus-ring"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-on-primary text-sm font-semibold rounded-xl transition-all"
              >
                Submit Anonymous Report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
