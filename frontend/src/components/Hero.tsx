import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="max-w-4xl space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle border border-secondary-container text-primary">
        <span className="material-symbols-outlined text-[16px]">verified</span>
        <span className="text-[11px] font-bold uppercase tracking-wider">EXPLAINABLE SCAM PROTECTION</span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-[40px] font-display font-bold text-on-surface tracking-tight leading-tight">
        Check before you click, pay, or share.
      </h1>
      <p className="text-base md:text-lg text-secondary max-w-3xl leading-relaxed">
        Paste a suspicious internship, job, scholarship, or placement offer or link and get a transparent risk score in seconds. Built specifically for university students and fresh graduates.
      </p>
    </section>
  );
};
