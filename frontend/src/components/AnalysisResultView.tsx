import React, { useState } from 'react';
import { FormattedAnalysisResult } from '../types';

interface AnalysisResultViewProps {
  result: FormattedAnalysisResult;
  onReset: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const getRiskConfig = () => {
    switch (result.risk_level) {
      case 'SAFE':
        return {
          bgColor: 'bg-safe-bg',
          borderColor: 'border-safe-main/30',
          textColor: 'text-safe-text',
          mainColor: 'text-safe-main',
          meterBg: 'bg-safe-main',
          icon: 'check_circle',
          badge: 'Safe & Verified Signals',
        };
      case 'SUSPICIOUS':
        return {
          bgColor: 'bg-suspicious-bg',
          borderColor: 'border-suspicious-main/30',
          textColor: 'text-suspicious-text',
          mainColor: 'text-suspicious-main',
          meterBg: 'bg-suspicious-main',
          icon: 'warning',
          badge: 'Caution — Suspicious Signals',
        };
      case 'HIGH_RISK':
      default:
        return {
          bgColor: 'bg-highrisk-bg',
          borderColor: 'border-highrisk-main/30',
          textColor: 'text-highrisk-text',
          mainColor: 'text-highrisk-main',
          meterBg: 'bg-highrisk-main',
          icon: 'gpp_bad',
          badge: 'High Scam Probability',
        };
    }
  };

  const config = getRiskConfig();

  const handleCopyReport = () => {
    const textToCopy = `Student ScamGuard AI Assessment
Risk Score: ${result.risk_score} / 100 (${result.risk_level})
Category: ${result.scam_category || 'General'}
Summary: ${result.summary}

Flagged Indicators:
${result.indicators.map((i) => `• ${i.name} (Weight: +${i.weight}): ${i.description}`).join('\n')}

Action Directives:
${result.recommendations.map((r) => `[${r.urgency}] ${r.action}: ${r.description}`).join('\n')}

Disclaimer: ${result.disclaimer}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-surface rounded-2xl border border-border p-6 md:p-8 custom-shadow space-y-8 animate-fadeIn">
      {/* Top Banner with Score Gauge */}
      <div className={`p-6 rounded-2xl border ${config.bgColor} ${config.borderColor} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/80 border border-border">
            <span className={`material-symbols-outlined text-[18px] ${config.mainColor}`}>{config.icon}</span>
            <span className={`text-xs font-bold uppercase tracking-wider ${config.textColor}`}>{config.badge}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-on-surface">
            {result.scam_category ? result.scam_category : result.risk_level === 'SAFE' ? 'Low Risk Offer' : 'Potential Scam Detected'}
          </h2>
          <p className="text-sm text-secondary max-w-xl leading-relaxed">
            {result.summary}
          </p>
        </div>

        {/* Big Score Gauge Meter */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface border border-border shadow-sm min-w-[160px]">
          <span className="text-xs uppercase font-bold text-secondary tracking-wider">Risk Score</span>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`text-5xl md:text-6xl font-display font-extrabold ${config.mainColor}`}>
              {result.risk_score}
            </span>
            <span className="text-lg font-semibold text-secondary">/100</span>
          </div>
          <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden mt-1 border border-border">
            <div
              className={`h-full ${config.meterBg} transition-all duration-700 ease-out`}
              style={{ width: `${Math.max(5, result.risk_score)}%` }}
            />
          </div>
          <span className={`text-[11px] font-bold mt-2 uppercase ${config.textColor}`}>
            {result.risk_level.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Flagged Red Flag Signals Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-lg font-display font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">flaky</span>
            Why This Was Flagged ({result.indicators.length} {result.indicators.length === 1 ? 'Signal' : 'Signals'})
          </h3>
          <span className="text-xs text-secondary font-medium">Explainable Detection Rules</span>
        </div>

        {result.indicators.length === 0 ? (
          <div className="p-4 rounded-xl bg-safe-bg/60 border border-safe-main/20 text-safe-text text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-safe-main">check_circle</span>
            <span>No explicit high-risk scam indicators detected in the message text. Still exercise standard precaution.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.indicators.map((indicator, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border bg-surface-container-low/60 hover:bg-surface-container-low transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error flex-shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">{indicator.name}</span>
                  </div>
                  <span className="text-xs font-bold text-error bg-error-container/60 px-2 py-0.5 rounded-full">
                    +{indicator.weight} pts
                  </span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  {indicator.description}
                </p>
                {indicator.matched_text && (
                  <div className="text-[11px] font-mono bg-surface border border-border rounded px-2 py-1 text-on-surface-variant truncate">
                    Evidence: &ldquo;{indicator.matched_text}&rdquo;
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* URL Diagnostic Report (if available) */}
      {result.url_details && (
        <div className="space-y-3 p-4 rounded-xl border border-border bg-surface-container-low">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">link</span>
              URL &amp; Domain Diagnostic
            </h4>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              result.url_details.risk_score > 30 ? 'bg-highrisk-bg text-highrisk-text' : 'bg-safe-bg text-safe-text'
            }`}>
              URL Risk: {result.url_details.risk_score}/100
            </span>
          </div>
          <div className="text-xs text-secondary break-all font-mono">
            {result.url_details.url}
          </div>
          {result.url_details.suspicious_tokens.length > 0 && (
            <p className="text-xs text-error flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">report_problem</span>
              Suspicious keywords in domain: {result.url_details.suspicious_tokens.join(', ')}
            </p>
          )}
          {result.url_details.is_shortener && (
            <p className="text-xs text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              URL Shortener detected (often conceals real destination).
            </p>
          )}
        </div>
      )}

      {/* Action Directives / What You Should Do */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-lg font-display font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">checklist</span>
            Recommended Action Directives
          </h3>
          <span className="text-xs text-secondary font-medium">Safe Next Steps</span>
        </div>

        <div className="space-y-2.5">
          {result.recommendations.map((rec, idx) => {
            const isCritical = rec.urgency === 'CRITICAL' || rec.urgency === 'HIGH';
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  isCritical
                    ? 'bg-highrisk-bg/40 border-highrisk-main/30'
                    : 'bg-surface-container-low border-border'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] mt-0.5 ${
                    isCritical ? 'text-highrisk-main' : 'text-primary'
                  }`}
                >
                  {isCritical ? 'do_not_disturb_on' : 'verified'}
                </span>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-on-surface">
                    {rec.action}
                  </p>
                  <p className="text-xs text-secondary leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mandatory Advisory Notice */}
      <div className="p-3.5 rounded-xl bg-primary-subtle border border-secondary-container flex items-start gap-2.5 text-secondary text-xs leading-relaxed">
        <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">info</span>
        <span>{result.disclaimer}</span>
      </div>

      {/* Bottom CTA Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface border border-border hover:border-primary text-sm font-semibold text-on-surface hover:text-primary transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Analyze Another Offer</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopyReport}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary-subtle hover:bg-secondary-container text-primary text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary Report'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
