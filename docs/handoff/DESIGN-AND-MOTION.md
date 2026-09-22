# Design and motion system

## Visual thesis

The portfolio is a cinematic editorial presentation of a design leader, not a gallery of UI cards. The design relies on near-black surfaces, ivory typography, large-scale photography, restrained product colour and generous negative space.

## Typography

- Display: Silk Serif, exposed in current CSS as `Silk Editorial` and historical `Silk Serif` aliases.
- Functional/body: Onest Variable from `@fontsource-variable/onest`.
- Captions: uppercase sans serif with wide letter spacing.
- Major headings: large serif with occasional meaningful italic emphasis.
- Main body copy should remain at least 16px and use controlled line lengths.

The new organisation must confirm the Silk Serif webfont licence before publishing. Georgia is the declared fallback.

## Colour and surfaces

- Home background: black or near-black.
- Primary text: warm ivory/off-white.
- Supporting text: neutral grey with sufficient contrast.
- Product colour appears mainly inside imagery.
- WAND adds restrained electric blue to connect its product visuals and result charts.

## Responsive strategy

- Desktop uses wide editorial compositions, large headlines and selected pinned sequences.
- Tablet collapses complex grids and removes layouts that require excessive lateral space.
- Mobile prioritises readable order, stable controls, intentional crops and shorter motion.
- No horizontal overflow is acceptable at 320px or wider.

## Motion principles

- Motion reinforces hierarchy and storytelling.
- Headings may use strong masked vertical entrances.
- Supporting copy moves less and settles before reading.
- Product imagery uses clip reveals, controlled parallax and subtle hover response.
- Animations normally run once; pinned timelines reverse naturally when scroll direction changes.
- Do not animate individual letters, hijack scrolling, snap the page, bounce elements or use elastic easing.

## Homepage motion

- Hero: staged navigation, portrait and whole-line identity reveal.
- Highlights: large `10+` transition followed by once-only metric counters.
- Operator strip: slow seamless CSS marquee.
- Expertise: stable frame with vertically masked terms; pausable and static under reduced motion.
- Selected Work: visible masked entry plus restrained image/link hover response.
- Career: desktop pinned progression; manual controls and a sequential mobile layout.
- People, Awards, FAQ and Beyond: progressively quieter reveals to support reading.

Implementation lives primarily in the first `useLayoutEffect` of `app/CanvaPortfolio.tsx`.

## WAND signature motion

The Evolution section is the primary scroll-storytelling moment:

- Desktop pins the section for approximately 430% scroll distance.
- The left introduction remains anchored.
- The right milestone strip presents one complete active milestone and a partial next milestone.
- Every milestone follows Enter, Hold and Exit.
- Large vertical travel and clipping create a physical sense of moving through time.
- 2019 and 2024–2025 receive longer reading holds.
- The timeline line progresses from the first node and reverses with upward scrolling.
- Mobile and reduced-motion layouts render all milestones as a standard vertical sequence.

Other WAND sections use stronger masked heading entrances, product-image reveals, restrained parallax and pointer-only microinteractions. Results bars grow from their baseline. The closing portrait uses a circular clip entrance and slow image depth.

## GSAP lifecycle requirements

- Register ScrollTrigger client-side.
- Scope selectors with `gsap.context`.
- Use `gsap.matchMedia` for desktop/mobile/reduced-motion branches.
- Recalculate after fonts and images decode.
- Revert contexts and media matches on unmount.
- Avoid applying CSS hover transforms to the same element whose transform is owned by GSAP; animate a child instead.

## Reduced motion acceptance

When `prefers-reduced-motion: reduce` is active:

- All copy and images are visible.
- No pinned scroll sequence is required to reach content.
- No automatic rotating text is required to understand expertise.
- No parallax or marquee movement is required.
- Native scrolling remains intact.
