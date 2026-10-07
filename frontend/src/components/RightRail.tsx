import React from 'react';

export const RightRail: React.FC = () => {
  return (
    <aside className="lg:col-span-5 space-y-6">
      {/* How ScamGuard Protects You: 3-step vertical card */}
      <div className="bg-surface rounded-2xl border border-border p-6 custom-shadow space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <h2 className="text-base md:text-lg font-display font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">auto_awesome</span>
            How ScamGuard Protects You
          </h2>
          <span className="text-xs font-semibold text-secondary">3 Steps</span>
        </div>
        <div className="space-y-5">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5 group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-subtle text-primary font-bold flex items-center justify-center text-sm border border-secondary-container">
              1
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                Paste Any Offer
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                WhatsApp forwards, Telegram recruiter texts, stipend promises, or unverified registration links.
              </p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex items-start gap-3.5 group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-subtle text-primary font-bold flex items-center justify-center text-sm border border-secondary-container">
              2
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                Real-time Multi-Signal AI
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Cross-examines upfront fee demands, disposable domain age, brand spoofing, and artificial urgency cues.
              </p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex items-start gap-3.5 group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-subtle text-primary font-bold flex items-center justify-center text-sm border border-secondary-container">
              3
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                Plain-English Action Steps
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Receive an explainable 0–100 risk meter along with unambiguous, student-safe directives to safeguard yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Student Threat Trends Card */}
      <div className="bg-surface rounded-2xl border border-border p-6 custom-shadow space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-error">LIVE THREAT MONITOR</span>
          </div>
          <span className="text-xs text-secondary">Updated today</span>
        </div>
        <h3 className="text-sm md:text-base font-display font-semibold text-on-surface">
          Top active scams reported this week
        </h3>
        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-highrisk-bg border border-highrisk-main/20 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-highrisk-main mt-0.5">warning</span>
            <p className="text-xs text-highrisk-text leading-snug">
              <strong>Fake AI Internships:</strong> Demanding ₹2,000 &ldquo;Starter Kit&rdquo; or &ldquo;Certification processing charges&rdquo; before onboarding.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-suspicious-bg border border-suspicious-main/20 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-suspicious-main mt-0.5">trending_up</span>
            <p className="text-xs text-suspicious-text leading-snug">
              <strong>Telegram Rating Gigs:</strong> Paying ₹150 for Google reviews, then soliciting crypto deposits to unlock funds.
            </p>
          </div>
        </div>
      </div>

      {/* Student Endorsement / Trust Stat Badge */}
      <div className="bg-gradient-to-r from-primary-subtle to-surface-container-low rounded-2xl border border-secondary-container p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[24px]">school</span>
        </div>
        <div>
          <p className="text-sm md:text-base font-display font-bold text-on-surface leading-tight">
            15,000+ Students Protected
          </p>
          <p className="text-xs text-secondary mt-0.5">
            Active across 120+ university placement cells and career clubs nationwide.
          </p>
        </div>
      </div>
    </aside>
  );
};
