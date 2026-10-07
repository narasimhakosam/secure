# UI/UX Specification — Student ScamGuard AI

## 1. UX Objective
The interface should let a student understand the risk in under 10 seconds. Avoid cybersecurity jargon; use plain language and strong visual hierarchy.

## 2. Design Principles
- Mobile-first responsive design
- One clear primary action per screen
- Color is supportive, not the only severity signal
- Show “Why?” immediately after the score
- Never shame users for suspicious interactions
- Keep recommendations actionable

## 3. Screen Map

```text
Home
 ├── Analyze Message
 ├── Check URL
 ├── Combined Check
 └── Learn About Scams

Analysis Result
 ├── Risk Score
 ├── Classification
 ├── Why We Flagged It
 ├── Evidence
 ├── What You Should Do
 └── Re-analyze / New Check

Education
 ├── Fake Internship
 ├── Fake Job
 ├── Scholarship Scam
 ├── OTP/Payment Scam
 └── Phishing
```

## 4. Home Screen
### Header
**Student ScamGuard AI**  
Subtitle: **Check before you click, pay, or share.**

### Primary input card
Tabs or segmented control:
- Message
- URL
- Both

Textarea placeholder:
“Paste the opportunity message you received…”

Primary CTA:
**Analyze Now**

Secondary CTA:
**Learn common scam signs**

## 5. Analysis Result Screen

### Result Hero
Example:
```text
HIGH RISK
87 / 100

This opportunity shows multiple scam indicators.
```

Use a risk meter or progress indicator. Do not rely only on red/yellow/green.

### Why We Flagged It
Display indicator cards:
- Payment request
- Urgency
- Guaranteed placement
- Suspicious URL

Each card contains:
- icon
- short title
- one-sentence explanation
- optional evidence snippet

### What You Should Do
Use action cards with imperative language:
- Don’t make the payment.
- Don’t share your OTP or password.
- Verify the organization using an independently found official contact.

### Disclaimer
“ScamGuard provides a risk assessment, not a guarantee of legitimacy.”

## 6. Loading State
Text:
“Analyzing message and checking risk signals…”

Show separate status steps where possible:
1. Reading message
2. Checking scam indicators
3. Checking URL signals
4. Building your safety recommendation

## 7. Error States
Examples:
- Empty input: “Paste a message or URL to analyze.”
- Invalid URL: “That doesn’t look like a valid web address.”
- Service unavailable: “We could not complete all checks. Showing the available analysis.”

## 8. Accessibility
- WCAG-minded contrast
- keyboard navigation
- visible focus states
- semantic headings
- screen-reader labels
- do not encode meaning by color alone

## 9. Responsive Layout
Desktop: two-column result layout when appropriate.  
Mobile: single-column stacked layout.  
Primary action remains reachable without excessive scrolling.

## 10. Visual Tone
Trustworthy, calm, student-friendly, modern. Avoid overly alarming visuals except where immediate danger is indicated.
