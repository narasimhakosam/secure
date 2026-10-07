import React from 'react';

export const RedFlagsSection: React.FC = () => {
  const flags = [
    {
      title: 'Upfront Payment Demands',
      icon: 'payments',
      desc: 'Legitimate companies never ask candidates to pay for training kits, laptop security deposits, or file processing.',
      badge: 'High Risk Signal (+35)',
      badgeIcon: 'flag',
      bgClass: 'bg-highrisk-bg text-highrisk-main',
      badgeClass: 'text-highrisk-main',
    },
    {
      title: 'Direct Offer No Interview',
      icon: 'sentiment_satisfied',
      desc: 'Receiving an instant appointment letter or 100% stipend guarantee without any technical test or telephonic screen.',
      badge: 'Suspicious Pattern (+25)',
      badgeIcon: 'warning',
      bgClass: 'bg-suspicious-bg text-suspicious-main',
      badgeClass: 'text-suspicious-main',
    },
    {
      title: 'Artificial Urgency',
      icon: 'timer',
      desc: 'Pressure tactics like "Offer expires in 2 hours" or "Only 3 seats remaining for this stipend batch" to prevent research.',
      badge: 'Coercion Trigger (+20)',
      badgeIcon: 'speed',
      bgClass: 'bg-highrisk-bg text-highrisk-main',
      badgeClass: 'text-highrisk-main',
    },
    {
      title: 'Disposable / Spoofed URLs',
      icon: 'link_off',
      desc: 'Free hosting sites, Google Forms for sensitive KYC data, or lookalike brand domains (e.g., google-careers.biz).',
      badge: 'Domain Anomaly (+30)',
      badgeIcon: 'dns',
      bgClass: 'bg-primary-subtle text-primary',
      badgeClass: 'text-primary',
    },
  ];

  return (
    <section className="pt-6 space-y-6" id="red-flags">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-border pb-4">
        <div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider">STUDENT SAFETY GUIDE</span>
          <h2 className="text-xl md:text-2xl font-display font-bold text-on-surface mt-1">
            Common Scam Red Flags at a Glance
          </h2>
        </div>
        <p className="text-xs md:text-sm text-secondary max-w-md">
          Legitimate employers and university programs follow transparent hiring frameworks. Watch for these signals:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {flags.map((flag, idx) => (
          <div
            key={idx}
            className="bg-surface p-5 rounded-2xl border border-border custom-shadow custom-hover-shadow space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${flag.bgClass}`}>
                <span className="material-symbols-outlined text-[22px]">{flag.icon}</span>
              </div>
              <h3 className="text-base font-display font-semibold text-on-surface">
                {flag.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                {flag.desc}
              </p>
            </div>
            <div className="pt-2">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${flag.badgeClass}`}>
                <span className="material-symbols-outlined text-[14px]">{flag.badgeIcon}</span>
                {flag.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
