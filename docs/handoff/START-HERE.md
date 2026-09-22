# Start here

This handoff captures the portfolio as it existed on 21 September 2026. It is intended to let Claude or another engineering team reproduce the current work, understand the decisions behind it and create a separate successor.

## Frozen production baseline

- Public reference: `https://maria-lopez-design-portfolio.malapipa.chatgpt.site`
- WAND reference: `https://maria-lopez-design-portfolio.malapipa.chatgpt.site/work/wand`
- Published version: 34
- Product snapshot commit: `914dce0fc692425788b9afc9708e32d158904dde`
- Status: frozen; do not modify or republish without María's explicit approval.

The handoff package deliberately removes the active Sites project ID. It is a clone, not a control surface for the live website.

## Reading order

1. `CLAUDE.md`
2. `SETUP.md`
3. `ARCHITECTURE.md`
4. `DECISIONS.md`
5. `DESIGN-AND-MOTION.md`
6. `CONTENT-AND-ROUTES.md`
7. `ASSET-MANIFEST.md`
8. `DEPLOYMENT.md`
9. `KNOWN-ISSUES.md`
10. `QA-CHECKLIST.md`

## What currently works

- Complete editorial homepage on `/`.
- Complete WAND case study on `/work/wand`.
- Desktop and independent mobile layouts.
- Keyboard-operable menu, FAQ, testimonial and career controls.
- GSAP entrance sequences, counters, parallax and pinned storytelling.
- `prefers-reduced-motion` fallbacks.
- Metadata, favicon and social preview image.
- Production build and rendered-output tests.

## Intentionally incomplete content

- FAQ recordings are not supplied and are labelled as pending.
- XSITE and Demo Casino Customiser do not have public case-study routes.
- Some reference and legacy assets remain for traceability.
- A new public deployment must confirm Silk Serif licensing and WAND confidentiality.

## Success condition for a successor

A successor may change technology, design or hosting, but it should first reproduce both current routes and pass the baseline QA. Differences should then be intentional and documented rather than accidental consequences of migration.
