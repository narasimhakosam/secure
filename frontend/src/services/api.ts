import {
  BackendAnalysisResponse,
  FormattedAnalysisResult,
  RiskLevel,
  ScamTypeInfo,
  OfferContext,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function analyzeOffer(params: {
  message_text?: string;
  url?: string;
  offer_type?: OfferContext;
}): Promise<FormattedAnalysisResult> {
  const payload: Record<string, any> = {
    context: params.offer_type || 'internship',
  };

  if (params.message_text && params.message_text.trim()) {
    payload.text = params.message_text.trim();
  }
  if (params.url && params.url.trim()) {
    payload.url = params.url.trim();
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let msg = `Analysis failed (${response.status})`;
    if (errorData.detail) {
      if (typeof errorData.detail === 'string') {
        msg = errorData.detail;
      } else if (Array.isArray(errorData.detail)) {
        msg = errorData.detail.map((d: any) => d.msg || JSON.stringify(d)).join(', ');
      }
    }
    throw new Error(msg);
  }

  const data: BackendAnalysisResponse = await response.json();

  // Normalize risk level
  let riskLevel: RiskLevel = 'SAFE';
  const rawClass = (data.classification || '').toLowerCase();
  if (rawClass === 'high_risk' || data.risk_score >= 60) {
    riskLevel = 'HIGH_RISK';
  } else if (rawClass === 'suspicious' || data.risk_score >= 25) {
    riskLevel = 'SUSPICIOUS';
  }

  // Format category title
  const categoryTitle = data.scam_category
    ? data.scam_category
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : riskLevel === 'SAFE'
    ? 'Verified Standard Offer'
    : 'Unclassified Recruitment Scam';

  // Format summary
  let summary = `ScamGuard evaluated this offer with an overall risk score of ${data.risk_score}/100. `;
  if (data.reasons && data.reasons.length > 0) {
    summary += data.reasons[0];
  } else if (riskLevel === 'SAFE') {
    summary += 'No critical fraudulent indicators were detected in the opportunity text.';
  }

  return {
    risk_score: data.risk_score,
    risk_level: riskLevel,
    scam_category: categoryTitle,
    summary,
    reasons: data.reasons || [],
    indicators: (data.indicators || []).map((i) => ({
      rule_id: i.code,
      name: i.code.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
      description: i.evidence,
      weight: i.weight,
      matched_text: i.evidence,
    })),
    url_details: data.url_details,
    recommendations: (data.recommended_actions || []).map((action, idx) => ({
      action: action,
      urgency: idx === 0 && riskLevel === 'HIGH_RISK' ? 'CRITICAL' : idx < 2 ? 'HIGH' : 'MEDIUM',
      description:
        idx === 0
          ? 'Immediate safety priority to avoid irreversible financial or credential loss.'
          : 'Verification safeguard recommended before interacting further.',
    })),
    disclaimer: data.disclaimer || 'Risk assessment only; independently verify important opportunities.',
  };
}

export async function getScamTypes(): Promise<ScamTypeInfo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/education/scam-types`);
    if (!response.ok) throw new Error('Educational endpoint not ready');
    const data = await response.json();
    return data.scam_types || [];
  } catch (err) {
    console.warn('Falling back to local scam types:', err);
    return [
      {
        id: 'registration_fee',
        title: 'Registration / Processing Fee Internships',
        description:
          'Recruiter asks candidate to pay ₹1,000–₹5,000 for training kits, background checks, or laptop security deposits before starting.',
        warning_signs: [
          'Direct payment demanded via Google Pay or UPI',
          'Offer letter sent without technical evaluation',
          'High monthly stipend promised for zero experience',
        ],
        example: 'Pay ₹1,500 security deposit for kit delivery to confirm your internship slot.',
        risk_weight: 35,
        category: 'payment_scam',
      },
      {
        id: 'telegram_rating',
        title: 'Telegram Rating & Paid Tasks Scheme',
        description:
          'Candidates are given small payouts for liking videos or rating products, then asked to deposit funds into a fake trading dashboard.',
        warning_signs: [
          'Approached by strangers on WhatsApp/Telegram',
          'Prepaid tasks where money must be invested to unlock returns',
          'Fake screenshots of other students earning lakhs daily',
        ],
        example: 'Like 3 YouTube videos to earn ₹150. Upgrade to VIP task by depositing ₹3,000.',
        risk_weight: 40,
        category: 'task_fraud',
      },
      {
        id: 'urgent_otp',
        title: 'Urgent OTP & KYC Credential Theft',
        description:
          'Fraudsters impersonate campus placement officers and create panic claiming your placement offer is expiring unless you forward SMS verification codes.',
        warning_signs: [
          'High urgency: "Forward OTP in 10 minutes or offer cancelled"',
          'Demands for banking login details or Google verification codes',
          'Unverified phone numbers claiming to be university HR',
        ],
        example: 'Placement verification required: Please forward the 6-digit OTP sent to your phone immediately.',
        risk_weight: 35,
        category: 'otp_theft',
      },
      {
        id: 'guaranteed_placement',
        title: 'Guaranteed 100% MNC Placement',
        description:
          'Institutes or agencies selling fraudulent direct appointment letters without valid corporate mandate or technical interview.',
        warning_signs: [
          'Promises of guaranteed tier-1 software jobs without interview',
          'Upfront non-refundable placement security fee',
          'Lookalike company domains and forged appointment letters',
        ],
        example: '100% Guaranteed Google / Microsoft placement! Limited 2 seats left. Token fee required.',
        risk_weight: 25,
        category: 'placement_scam',
      },
    ];
  }
}
