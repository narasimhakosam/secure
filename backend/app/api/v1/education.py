"""Education endpoint — scam awareness content (HLD §3, PRD FR-09)."""

from fastapi import APIRouter

from app.schemas.analyze import EducationResponse, ScamTypeInfo

router = APIRouter(tags=["Education"])

# Static education content for MVP
_SCAM_TYPES: list[ScamTypeInfo] = [
    ScamTypeInfo(
        id="fake_internship",
        title="Fake Internship",
        description="Scammers post convincing internship listings on social media or messaging platforms. They may impersonate real companies and demand registration fees, training charges, or kit deposits before any actual work begins.",
        warning_signs=[
            "Registration or processing fee required before joining",
            "No formal interview or technical screening",
            "Guaranteed stipend without evaluation",
            "Communication only through WhatsApp or Telegram",
            "Generic email addresses (Gmail, Yahoo) instead of corporate domains",
        ],
        example="'Congratulations! You are selected as a Web Developer Intern at TechGlobal Inc. No interview required. Stipend: ₹35,000/month. Pay ₹1,999 registration fee via GooglePay within 2 hours.'",
        risk_weight=35,
        category="high_risk",
    ),
    ScamTypeInfo(
        id="fake_job",
        title="Fake Job / Placement",
        description="Fraudulent job postings that promise high salaries, guaranteed placements, or direct appointment letters without any screening process. They often target fresh graduates looking for their first job.",
        warning_signs=[
            "Direct appointment letter without interview",
            "100% placement guarantee",
            "Unrealistically high salary for entry-level position",
            "Vague job descriptions",
            "Request for processing fees or security deposits",
        ],
        example="'100% Guaranteed Placement at Tier-1 Companies! Direct appointment letter without tech interview. Limited 3 seats left. Immediate offer on token fee payment.'",
        risk_weight=30,
        category="high_risk",
    ),
    ScamTypeInfo(
        id="scholarship_scam",
        title="Fake Scholarship",
        description="Scammers offer fake scholarships that require application fees or personal documents. They may impersonate government schemes or well-known educational foundations.",
        warning_signs=[
            "Application or processing fee for the scholarship",
            "Request for bank details to 'credit the scholarship'",
            "Unusual URL or unofficial communication channel",
            "Pressure to apply quickly before deadline",
            "No verifiable information about the scholarship body",
        ],
        example="'Congratulations! You have been awarded a ₹50,000 scholarship. To process your disbursement, please pay a ₹500 processing fee and share your bank account details.'",
        risk_weight=25,
        category="suspicious",
    ),
    ScamTypeInfo(
        id="otp_theft",
        title="OTP / Credential Theft",
        description="Scammers trick you into sharing OTPs, passwords, or PINs by posing as recruiters, bank officials, or platform support. They may claim your profile needs 'verification' for a placement or offer.",
        warning_signs=[
            "Request to share OTP received on your phone",
            "Asking for login passwords or PINs",
            "Claims that sharing OTP is part of verification",
            "Urgency — 'share within 15 minutes or lose the offer'",
            "Unsolicited calls asking for security codes",
        ],
        example="'Urgent placement update! Your profile was selected by an MNC client. Forward the 6-digit verification code received on SMS immediately. Failing to do so in 15 minutes will cancel your interview.'",
        risk_weight=35,
        category="critical",
    ),
    ScamTypeInfo(
        id="payment_scam",
        title="Payment / Registration Fee Scam",
        description="The most common student scam. You are asked to pay various fees — training kits, registration, processing, security deposit, or laptop charges — before any legitimate work or onboarding.",
        warning_signs=[
            "Any upfront monetary request from a recruiter",
            "Payment via UPI, GooglePay, PhonePe to personal accounts",
            "Fees described as 'refundable' that never get refunded",
            "Multiple rounds of payment requests",
            "No official invoice or receipt",
        ],
        example="'To activate your training portal and LMS ID, transfer ₹1,500 refundable security deposit to UPI id: recruit.portal@upi today.'",
        risk_weight=30,
        category="high_risk",
    ),
    ScamTypeInfo(
        id="phishing",
        title="Phishing / Login Impersonation",
        description="Fake login pages that look exactly like legitimate websites (banks, colleges, job portals). They steal your credentials when you type in your username and password.",
        warning_signs=[
            "URL looks similar but not identical to the real website",
            "Free hosting or unusual domain extensions",
            "Page asks for login credentials immediately",
            "Email or message creating urgency to click a link",
            "No padlock icon or suspicious SSL certificate",
        ],
        example="'Your college portal account will be deactivated. Login immediately at college-portal-verify.xyz to prevent suspension.'",
        risk_weight=30,
        category="high_risk",
    ),
]


@router.get(
    "/education/scam-types",
    response_model=EducationResponse,
    summary="Scam awareness content",
)
async def get_scam_types():
    """Return education content about common student scam patterns."""
    return EducationResponse(scam_types=_SCAM_TYPES)
