---
name: Student ScamGuard AI
colors:
  surface: '#FFFFFF'
  surface-dim: '#d4d9f3'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#ebedff'
  surface-container-high: '#e3e7ff'
  surface-container-highest: '#dce1fc'
  on-surface: '#151b2e'
  on-surface-variant: '#444654'
  inverse-surface: '#2a3043'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d6'
  surface-tint: '#3052d2'
  primary: '#1a40c2'
  on-primary: '#ffffff'
  primary-container: '#3b5bdb'
  on-primary-container: '#e2e5ff'
  inverse-primary: '#b8c3ff'
  secondary: '#545e7a'
  on-secondary: '#ffffff'
  secondary-container: '#d2dcfe'
  on-secondary-container: '#56607d'
  tertiary: '#00518f'
  on-tertiary: '#ffffff'
  tertiary-container: '#0069b8'
  on-tertiary-container: '#dae7ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001355'
  on-primary-fixed-variant: '#0736ba'
  secondary-fixed: '#dae2ff'
  secondary-fixed-dim: '#bcc6e7'
  on-secondary-fixed: '#101b34'
  on-secondary-fixed-variant: '#3c4661'
  tertiary-fixed: '#d3e4ff'
  tertiary-fixed-dim: '#a2c9ff'
  on-tertiary-fixed: '#001c38'
  on-tertiary-fixed-variant: '#004881'
  background: '#F8F9FC'
  on-background: '#151b2e'
  surface-variant: '#dce1fc'
  primary-hover: '#324ABF'
  primary-subtle: '#EDF2FF'
  border: '#D9DEEA'
  safe-main: '#2B8A3E'
  safe-bg: '#EBFBEE'
  safe-text: '#1B5E2B'
  suspicious-main: '#E67700'
  suspicious-bg: '#FFF4E0'
  suspicious-text: '#7A4100'
  highrisk-main: '#C92A2A'
  highrisk-bg: '#FFF0F0'
  highrisk-text: '#8A1C1C'
  focus-ring: '#1C7ED6'
typography:
  display-score:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-score-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md-medium:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  overline:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

This design system embodies the presence of a calm, knowledgeable senior student mentor: protective, reassuring, transparent, and grounded. The aesthetic blends **Modern Corporate** reliability with **Soft Humanist Utility**, avoiding intimidating cybersecurity tropes (no glowing neon terminals, skulls, punitive red alarms, or dense threat telemetry). 

### Personality & Values
- **Clarity over alarmism:** Communicates danger without panic. Evaluates risk objectively so students feel supported, not blamed or naive.
- **Explainability first:** Every score is immediately justified by plain-English signals ("Why we flagged it") and actionable next steps ("What you should do").
- **Approachability:** Soft rounded geometries (12–16px radii), open typography, and structured micro-surfaces create an interface that feels like an approachable educational companion rather than a bureaucratic compliance scanner.

### Design Style
The system employs clean, layered surfaces on an airy slate-tinted canvas (`#F8F9FC`), punctuated by an authoritative royal blue primary action color (`#3B5BDB`) and carefully graded, WCAG AA compliant semantic alerts.

## Colors

The color system is calibrated for strict accessibility and cognitive ease.

### Roles & Application
- **Primary (`#3B5BDB`)**: Represents focused analysis, key interactions, actionable submit buttons, and active system states. It pairs with `#EDF2FF` for gentle selection backgrounds.
- **Neutral Deep (`#1A2033`)**: Used for high-contrast primary typography and heavy glyphs, providing an anchoring foundation that avoids harsh pitch black.
- **Secondary Neutral (`#4A5470`)**: Used for supporting metadata, subheadings, character counters, and secondary context.
- **Surface & Canvas (`#FFFFFF` & `#F8F9FC`)**: Provide a crisp, non-distracting reading plane with low visual fatigue.

### Risk Severity Tiers
Severity is never signaled by color alone; it must always be backed by iconography and clear label tags:
1. **Safe / Low Concern (0–29)**: `#2B8A3E` text/border on `#EBFBEE` background. Signifies "no major indicators found," explicitly avoiding definitive declarations of absolute safety.
2. **Suspicious / Review Carefully (30–59)**: `#E67700` text/border on `#FFF4E0` background. Encourages critical inspection and double-checking of official sources.
3. **High Risk / Avoid Until Verified (60–100)**: `#C92A2A` text/border on `#FFF0F0` background. Calls out immediate red flags such as payment or credential solicitations without using accusatory language.

## Typography

Typography pairs **Plus Jakarta Sans** for display, headings, and quantitative score telemetry with **Inter** for scanning long text strings, risk analysis snippets, and user actions.

- **Plus Jakarta Sans**: Adds a modern, optimistic geometric voice that softens technical evaluation contexts.
- **Inter**: Maximizes legibility for suspicious quote comparisons, conversational message excerpts, and dense URL security diagnostics.
- Body copy maintains a strict minimum size of 16px on mobile viewports to prevent auto-zooming and support stress-free scanning under sunlight or on campus walks. Text column line-lengths must not exceed 70 characters for sustained legibility.

## Layout & Spacing

Layout adheres to an 8px base rhythm (with 4px half-steps for micro-alignments) optimized for single-thumb mobile ergonomics and clean desktop dashboard layouts.

### Structural Breakpoints
- **Mobile (360px – 767px)**: Single-column linear layout. Inputs span full width (`margin: 1rem`). The Result screen flows vertically: Score Hero $\rightarrow$ Action Directives $\rightarrow$ Signal Drivers ("Why") $\rightarrow$ Technical URL breakdown $\rightarrow$ Mandatory Disclaimer.
- **Tablet (768px – 1023px)**: Center-bounded frame (`margin: 1.5rem`, max width 720px), maintaining single-column focus with amplified touch paddings.
- **Desktop (1024px – 1440px)**: Centered container max-width 1120px with a 12-column fluid grid. Results split into an asymmetrical 5:7 grid where the Score Meter & Action summary stick on the left column, while granular signal breakdown cards and URL security panels scroll along the right.

## Elevation & Depth

This system avoids heavy drop shadows, instead using **crisp ghost outlines** combined with **soft ambient shadows** to establish structured tactile layers.

### Elevation Hierarchy
- **Level 0 (App Canvas)**: Flat `#F8F9FC`, clean background canvas.
- **Level 1 (Card & Content Containers)**: Solid `#FFFFFF` fill with a `1px solid #D9DEEA` perimeter border, underpinned by an ambient floor shadow: `0 2px 8px rgba(26, 32, 51, 0.05)`.
- **Level 2 (Dropdowns, Floating Pickers, Hover States)**: `1px solid #D9DEEA` border with elevated depth: `0 6px 16px rgba(26, 32, 51, 0.08)`.
- **Level 3 (Modals & Critical Overlays)**: `0 12px 32px rgba(26, 32, 51, 0.16)`, framed by a semi-opaque `#1A2033` backdrop overlay with subtle 4px blur.

Interactive cards (such as Scam Type education modules) transition smoothly on pointer hover: the border shifts toward `#3B5BDB` while elevation raises from Level 1 to Level 2 (`150ms ease-out`).

## Shapes

The design system uses a rounded geometry scale (`roundedness: 2`) to balance friendly approachability with disciplined utility:

- **Surface Cards & Modular Panels**: `16px` (`rounded-lg`) border radius creates comfortable containers that keep dense risk information visually approachable.
- **Inputs, Buttons, & Interactive Selectors**: `12px` border radius produces clear, click-friendly targets with ample internal touch margins.
- **Pills, Badges, & Severity Chips**: `999px` full capsule styling to set metadata, classification tags, and score weights clearly apart from rectangular layout cards.

## Components

### Buttons
- **Primary**: Solid `#3B5BDB` fill, `#FFFFFF` text, `12px` border radius, minimum height 48px. Hover state shifts to `#324ABF`. Full width on mobile screens. Active focus presents an unmistakable `3px solid #1C7ED6` outline with a 2px offset.
- **Secondary / Ghost**: Transparent fill with `1.5px solid #D9DEEA`, `#1A2033` text, hovering to `#EDF2FF` with `#3B5BDB` label color.
- **Action CTA**: Actionable directives within recommendations (e.g., "Report to Placement Cell") feature a clear leading utility icon alongside bold verbs.

### Input Fields & Controls
- **Textarea**: White card background, minimum 6 rows height, `12px` radius, `1px solid #D9DEEA`. Focus renders `#3B5BDB` border with `3px focus-ring`. Helper text and character counter sit symmetrically below the input area.
- **Segmented Control (Input Mode Switcher)**: Pill or 12px-radius segmented track (`#EDF2FF`) housing **Message | URL | Both**. Active selection features an animated white tile with `#3B5BDB` text and subtle lift shadow. Minimum target height 44px.

### Risk Score Hero & Horizontal Gauge
- Houses the display score (`Plus Jakarta Sans 56px`), accompanied by an inline icon and an uppercase severity badge (e.g., `HIGH RISK`, `SUSPICIOUS`, `LOW CONCERN`).
- **Risk Meter**: A 12px-thick horizontal continuous track partitioned into three color-accented segments: Low (0–29, `#2B8A3E`), Suspicious (30–59, `#E67700`), and High (60–100, `#C92A2A`). A contrasting pill marker points directly to the calculated score with animated entry (`600ms ease-out`, disabled under `prefers-reduced-motion`).

### Indicator Cards ("Why we flagged it")
- Surface container with `16px` radius. Left-aligned severity icon (e.g., Alert Triangle, Shield Alert, Banknote).
- Prominent heading (e.g., "Upfront Training Fee Requested"), accompanied by an explanation paragraph in `#4A5470` body text.
- Evidence quotes appear nested inside an `#EDF2FF` or `#FFF0F0` blockquote with an indented 3px left border, highlighting the extracted suspicious text verbatim.
- Displays an inline severity tag alongside the numerical score weight (e.g., `+25 Risk`).

### Action Cards ("What you should do")
- Numbered list design using solid `#EDF2FF` numeric badge anchors.
- Strong verb imperative headlines: "Do not make the payment.", "Verify company registration on MCA/official site."
- Collapsible "Why?" disclosures provide quick context on demand without cluttering the primary advice.

### URL Diagnostics Panel
- Structured key-value rows detailing Domain, SSL/HTTPS presence, Subdomain anomaly counts, and URL Shortener status.
- Each row pair incorporates a 16px semantic pass/warn indicator glyph.

### Disclaimer Banner
- Anchored at the base of every assessment: muted `#4A5470` text on `#EDF2FF` background with an info-circle icon. Clarifies that the evaluation is an automated assistive check and never a legal guarantee of legitimacy.