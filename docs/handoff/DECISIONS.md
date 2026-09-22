# Decision record

## D1 — Freeze production and fork future work

The OpenAI Sites version 34 is the approved reference and remains untouched. The Claude package is a detached clone. Its active Sites project identifier is removed during packaging to prevent accidental deployment over production.

## D2 — Canva controls desktop composition

The September Canva website became the authoritative desktop reference for section order, imagery, typography and overall hierarchy. Older V7/V9 files remain useful for context, but they do not override the current desktop composition.

## D3 — Mobile is independently composed

The Canva page was not used as a mobile blueprint. Mobile keeps the same content and brand but uses its own crops, reading order, spacing, controls and simplified motion. Do not shrink or squeeze the desktop layout into a phone viewport.

## D4 — Preserve real HTML over screenshot text

Canva sheets are used only for photographic, product and logo crops. Headings, paragraphs, navigation, metrics and controls are real HTML for accessibility, responsiveness and maintainability.

## D5 — Local assets over runtime Canva dependency

All required visual assets are stored under `public/portfolio`. The live site does not depend on the Canva URL at runtime.

## D6 — GSAP for authored motion

GSAP and ScrollTrigger were chosen for coordinated timelines, scroll-linked storytelling, pinning, reversibility and responsive cleanup. Native scrolling is preserved; there is no scroll hijacking or snapping.

## D7 — Reduced motion is a first-class layout

Pinned timelines, automatic text cycling, parallax and large entrance movement are removed or flattened when `prefers-reduced-motion` is active. The fallback is a normal readable sequence, not a disabled or empty presentation.

## D8 — Honest incomplete content

Missing videos and unpublished case studies are not fabricated. FAQ media is labelled pending. XSITE and Demo Casino Customiser use request-by-email actions until real public cases exist.

## D9 — WAND is a product narrative, not a component gallery

WAND explains context, ownership, system evolution, product decisions, delivery impact and the transition to XSITE. The central sequence is Complete, Configure, Connect, followed by concrete product evolution and results.

## D10 — Preserve confidentiality boundaries

WAND uses approved or reconstructed presentation visuals. The full internal design system is not distributed. The closing section explicitly offers a private walkthrough instead.

## D11 — Provider migration follows reproduction

The successor should first reproduce the baseline, then migrate hosting. This keeps visual or behavioural regressions separate from adapter changes and makes failures easier to diagnose.
