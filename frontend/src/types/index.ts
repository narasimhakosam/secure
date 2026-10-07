export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK';

export type OfferContext = 'internship' | 'job' | 'scholarship' | 'training' | 'placement' | 'unknown';

export interface IndicatorItem {
  code: string;
  severity: string;
  source: string;
  evidence: string;
  weight: number;
}

export interface URLDetails {
  url: string;
  is_https: boolean;
  hostname_length: number;
  subdomain_count: number;
  has_ip_literal: boolean;
  has_punycode: boolean;
  suspicious_tokens: string[];
  is_shortener: boolean;
  risk_score: number;
  indicators: IndicatorItem[];
}

export interface BackendAnalysisResponse {
  analysis_id: string;
  model_version: string;
  ruleset_version: string;
  risk_score: number;
  classification: string; // 'safe' | 'suspicious' | 'high_risk'
  scam_category?: string;
  confidence: number;
  indicators: IndicatorItem[];
  reasons: string[];
  recommended_actions: string[];
  url_details?: URLDetails | null;
  disclaimer: string;
}

export interface FormattedIndicator {
  rule_id: string;
  name: string;
  description: string;
  weight: number;
  matched_text?: string;
}

export interface FormattedRecommendation {
  action: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
}

export interface FormattedAnalysisResult {
  risk_score: number;
  risk_level: RiskLevel;
  scam_category?: string;
  summary: string;
  reasons: string[];
  indicators: FormattedIndicator[];
  url_details?: URLDetails | null;
  recommendations: FormattedRecommendation[];
  disclaimer: string;
}

export interface ScamTypeInfo {
  id: string;
  title: string;
  description: string;
  warning_signs: string[];
  example: string;
  risk_weight: number;
  category: string;
}

export interface ScanHistoryItem {
  id: string;
  timestamp: string;
  preview: string;
  risk_score: number;
  risk_level: RiskLevel;
  category?: string;
}
