import React from 'react';

interface FooterProps {
  onOpenLearn: () => void;
  onOpenChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLearn, onOpenChecklist }) => {
  return (
    <footer className="mt-16 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-subtle text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <span className="text-base font-display font-bold text-on-surface">Student ScamGuard AI</span>
            </div>
            <p className="text-xs md:text-sm text-secondary max-w-md leading-relaxed">
              An open educational defense system created for university students, interns, and early career candidates to identify fraudulent opportunities before financial or identity harm occurs.
            </p>
          </div>

          {/* Col 2: Student Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-on-surface">Resources</h4>
            <ul className="space-y-2 text-xs md:text-sm text-secondary">
              <li>
                <button type="button" onClick={onOpenLearn} className="hover:text-primary transition-colors text-left">
                  Scam Knowledge Base
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenChecklist} className="hover:text-primary transition-colors text-left">
                  Internship Safety Checklist
                </button>
              </li>
              <li>
                <a href="#red-flags" className="hover:text-primary transition-colors">
                  Common Red Flags
                </a>
              </li>
              <li>
                <span className="text-secondary/70">Sample Scam Database (Built-in)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Verification Bodies */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-on-surface">Official Portals</h4>
            <ul className="space-y-2 text-xs md:text-sm text-secondary">
              <li>
                <a
                  className="hover:text-primary transition-colors flex items-center gap-1"
                  href="https://cybercrime.gov.in"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>National Cyber Crime Portal</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors flex items-center gap-1"
                  href="https://www.ugc.gov.in"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>UGC Fake University Advisories</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors flex items-center gap-1"
                  href="https://www.mca.gov.in"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>MCA Company Master Verification</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal & Technical Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-primary-subtle border border-secondary-container flex items-start gap-3">
          <span className="material-symbols-outlined text-[20px] text-primary flex-shrink-0 mt-0.5">info</span>
          <p className="text-xs text-secondary leading-relaxed">
            <strong>Mandatory Advisory Notice:</strong> ScamGuard provides an automated risk assessment, not a legal guarantee of legitimacy. Always verify directly through university placement cells or official corporate portals before transferring funds or sharing identification credentials.
          </p>
        </div>

        {/* Copyright & System Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-secondary pt-4 border-t border-border gap-4">
          <span>&copy; {new Date().getFullYear()} Student ScamGuard AI. Free open educational student service.</span>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-safe-text font-medium">
              <span className="w-2 h-2 rounded-full bg-safe-main animate-pulse"></span>
              System Engine Status: Active
            </span>
            <span className="text-secondary/80">Stateless &amp; Privacy-First</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
