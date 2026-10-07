import React, { useState } from 'react';
import { OfferContext } from '../types';

interface AnalyzeFormProps {
  onAnalyze: (data: { message_text: string; url: string; offer_type: OfferContext }) => void;
  isLoading: boolean;
}

const SAMPLE_DATA: Record<string, { text: string; url?: string; type: OfferContext }> = {
  'Fake internship': {
    text: 'Congratulations! You are selected as Web Development Intern at TechGlobal Inc. No interview required. Stipend: Rs. 35,000/month. Please pay Rs. 1,999 registration fee for kit delivery via GooglePay within 2 hours to confirm your seat. Contact HR on WhatsApp: +91 9876543210.',
    type: 'internship',
  },
  '₹1,500 Registration fee': {
    text: 'Dear Candidate, Your resume has been shortlisted for Campus Partner Role. To activate your official training portal and LMS ID, please transfer Rs. 1,500 refundable security deposit to UPI id: recruit.portal@upi today.',
    type: 'training',
  },
  'Urgent WhatsApp OTP': {
    text: 'Urgent placement update! Your campus profile was selected by MNC client. To complete identity confirmation, please forward the 6-digit verification code received on SMS immediately. Failing to do so in 15 mins will cancel your interview.',
    type: 'placement',
  },
  'Guaranteed Placement': {
    text: '100% Guaranteed Placement Program at Tier-1 Companies! Direct appointment letter without tech interview. Limited 3 seats left for your university batch. Immediate offer letter issued on token fee payment. Apply at http://free-career-offer-portal.xyz',
    url: 'http://free-career-offer-portal.xyz',
    type: 'job',
  },
};

export const AnalyzeForm: React.FC<AnalyzeFormProps> = ({ onAnalyze, isLoading }) => {
  const [mode, setMode] = useState<'message' | 'url' | 'both'>('message');
  const [offerType, setOfferType] = useState<OfferContext>('internship');
  const [offerText, setOfferText] = useState('');
  const [offerUrl, setOfferUrl] = useState('');
  const [urlExpanded, setUrlExpanded] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleClear = () => {
    setOfferText('');
    setOfferUrl('');
    setValidationError('');
  };

  const handleSampleClick = (sampleKey: string) => {
    const sample = SAMPLE_DATA[sampleKey];
    if (sample) {
      setOfferText(sample.text);
      setOfferType(sample.type);
      if (sample.url) {
        setOfferUrl(sample.url);
        setUrlExpanded(true);
      }
      setValidationError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasText = offerText.trim().length > 0;
    const hasUrl = offerUrl.trim().length > 0;

    if (!hasText && !hasUrl) {
      setValidationError('Please paste an offer message or attach a link to inspect.');
      return;
    }

    setValidationError('');
    onAnalyze({
      message_text: offerText.trim(),
      url: offerUrl.trim(),
      offer_type: offerType,
    });
  };

  return (
    <section className="bg-surface rounded-2xl border border-border p-6 md:p-8 custom-shadow space-y-6">
      {/* Mode switcher & Offer type */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Segmented Mode Control */}
        <div className="inline-flex p-1 bg-primary-subtle rounded-xl border border-border" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'message'}
            onClick={() => {
              setMode('message');
              setUrlExpanded(false);
            }}
            className={`px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'message'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-secondary hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Message
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'url'}
            onClick={() => {
              setMode('url');
              setUrlExpanded(true);
            }}
            className={`px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'url'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-secondary hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">link</span>
            URL
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'both'}
            onClick={() => {
              setMode('both');
              setUrlExpanded(true);
            }}
            className={`px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'both'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-secondary hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">layers</span>
            Both
          </button>
        </div>

        {/* Category Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="offerType" className="text-xs font-semibold text-secondary hidden sm:inline">
            Offer Type:
          </label>
          <select
            id="offerType"
            value={offerType}
            onChange={(e) => setOfferType(e.target.value as OfferContext)}
            className="bg-surface-container-low border border-border text-on-surface text-sm font-medium rounded-xl px-3 py-2 focus:ring-2 focus:ring-focus-ring focus:border-primary-container outline-none transition-all cursor-pointer"
          >
            <option value="internship">Internship Offer</option>
            <option value="job">Full-time Job</option>
            <option value="scholarship">Scholarship Scheme</option>
            <option value="training">Training / Certification</option>
            <option value="placement">Campus Placement</option>
            <option value="unknown">Not sure</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Input Area (if not pure URL mode) */}
        {mode !== 'url' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="offerText" className="text-sm font-semibold text-on-surface flex items-center gap-1.5">
                <span>Offer Message or Pitch</span>
                <span className="text-error text-xs">*</span>
              </label>
              <span className="text-xs text-secondary font-mono">
                {offerText.length.toLocaleString()} / 2,000 characters
              </span>
            </div>
            <div className="relative">
              <textarea
                id="offerText"
                rows={6}
                maxLength={2000}
                value={offerText}
                onChange={(e) => {
                  setOfferText(e.target.value);
                  if (validationError) setValidationError('');
                }}
                placeholder="Paste the opportunity message you received on WhatsApp, Telegram, LinkedIn, or email..."
                className={`w-full rounded-xl border p-4 text-sm text-on-surface placeholder:text-outline-variant bg-surface focus:outline-none focus:ring-3 focus:ring-focus-ring focus:border-primary transition-all resize-y ${
                  validationError ? 'border-error ring-1 ring-error' : 'border-border'
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-secondary px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">translate</span>
                <span>Supports English, Hinglish, &amp; regional transcripts</span>
              </div>
              {offerText.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-semibold text-secondary hover:text-error transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Optional URL Input */}
        {(mode === 'url' || mode === 'both' || urlExpanded) ? (
          <div className="border border-border rounded-xl p-3.5 bg-surface-container-low space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="offerUrl" className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">add_link</span>
                Attach application link or website domain
              </label>
              {mode === 'message' && (
                <button
                  type="button"
                  onClick={() => setUrlExpanded(false)}
                  className="text-xs text-secondary hover:text-error"
                >
                  Hide URL
                </button>
              )}
            </div>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                <span className="material-symbols-outlined text-[18px]">globe</span>
              </span>
              <input
                id="offerUrl"
                type="url"
                value={offerUrl}
                onChange={(e) => {
                  setOfferUrl(e.target.value);
                  if (validationError) setValidationError('');
                }}
                placeholder="https://company-careers-verify.xyz/apply-now"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-surface text-sm text-on-surface focus:ring-2 focus:ring-focus-ring focus:border-primary outline-none"
              />
            </div>
            <p className="text-xs text-secondary flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[14px]">info</span>
              URL diagnostic checks domain age, redirects, brand spoofing, and SSL integrity.
            </p>
          </div>
        ) : (
          <div className="border border-border rounded-xl p-3.5 bg-surface-container-low">
            <button
              type="button"
              onClick={() => setUrlExpanded(true)}
              className="w-full flex items-center justify-between text-left text-sm font-semibold text-on-surface hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">add_link</span>
                Attach application link or website domain (Optional)
              </span>
              <span className="material-symbols-outlined text-[20px] text-secondary">expand_more</span>
            </button>
          </div>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3 rounded-xl bg-highrisk-bg border border-highrisk-main/30 text-highrisk-text flex items-center gap-2 text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* Realistic Quick-Test Sample Chips */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-secondary">Tap to test realistic samples:</span>
            <span className="text-[11px] font-bold text-primary tracking-wider uppercase">INSTANT DEMO</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSampleClick('Fake internship')}
              className="text-xs font-medium bg-primary-subtle text-primary border border-secondary-container hover:bg-surface-variant px-3 py-1.5 rounded-full transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">work_outline</span>
              Fake internship
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('₹1,500 Registration fee')}
              className="text-xs font-medium bg-suspicious-bg text-suspicious-text border border-suspicious-main/30 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">currency_rupee</span>
              ₹1,500 Registration fee
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('Urgent WhatsApp OTP')}
              className="text-xs font-medium bg-highrisk-bg text-highrisk-text border border-highrisk-main/30 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">lock_reset</span>
              Urgent WhatsApp OTP
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('Guaranteed Placement')}
              className="text-xs font-medium bg-surface-container text-on-surface border border-border hover:bg-surface-variant px-3 py-1.5 rounded-full transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
              Guaranteed Placement
            </button>
          </div>
        </div>

        {/* Privacy Assurance Banner */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-safe-bg/60 border border-safe-main/20 text-safe-text">
          <span className="material-symbols-outlined text-[20px] text-safe-main mt-0.5">lock</span>
          <p className="text-xs text-safe-text leading-snug">
            <strong>Privacy Guarantee:</strong> We do not store your personal messages by default. Content is analyzed strictly in-memory using stateless evaluators to calculate your real-time risk score.
          </p>
        </div>

        {/* Action Button CTA */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[52px] bg-primary hover:bg-primary-hover active:scale-[0.99] disabled:opacity-70 text-on-primary font-semibold text-base rounded-xl flex items-center justify-center gap-2.5 shadow-sm transition-all focus:ring-4 focus:ring-focus-ring/30 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[22px] animate-spin">progress_activity</span>
                <span>Evaluating Red Flags &amp; Multi-Signals...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">radar</span>
                <span>Analyze Now</span>
              </>
            )}
          </button>
          <div className="flex items-center justify-center">
            <a
              href="#red-flags"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover font-semibold transition-colors group"
            >
              Learn common scam signs
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </div>
        </div>
      </form>
    </section>
  );
};
