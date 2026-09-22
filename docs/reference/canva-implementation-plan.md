# Canva desktop redesign / independent mobile experience

Reference: https://bodajaviymaria2027.my.canva.site/mariamorawebsite
Date: 2026-09-07

## Contract

- Desktop: reproduce the supplied composition, imagery, editorial type, order and spacing. Canva wins over older reference sheets or conflicting motion instructions.
- Mobile: **do not use Canva as reference**. Retain useful existing mobile patterns and improve reading order, spacing, image crops and touch interaction. No desktop scaling or long pinned sequences.
- Motion: use the internal motion specification only where compatible with the newer composition. Respect reduced motion and render readable content without JavaScript.
- Preserve WAND and existing case-study content. Do not invent videos, links, dates or achievements.
- Use scoped styles to prevent the homepage redesign from modifying WAND.

## Section-by-section implementation and verification

1. Hero: full-bleed portrait, editorial identity and minimal navigation. Whole-line entrance, no character animation. Mobile retains its portrait crop and accessible menu.
2. Highlights: 10+ statement above four metrics, then logo rail. Scroll-settling 10+ and once-only counters; mobile 2×2 metrics without scrub.
3. Expertise: consistent italic typography and stable changing frame. Enter only in view, pause control, reduced-motion static list.
4. Selected Work: three supplied covers, concise descriptions, understated links. Independent single-column mobile cards; preserve WAND route and honest unavailable-case handling.
5. Career Journey: one-line desktop title, numbered stages and balanced detail columns. Reversible desktop scroll progression; mobile readable stacked stages.
6. People: full-width editorial portrait and one quote, manual controls. Mobile separates photo and text for contrast.
7. Awards: trophy at left and structured award entries at right. Quiet reveals; mobile stacked image and entries.
8. FAQ: clearly separated caption/headline, coordinated accordion, supplied video portrait. No faux playable recordings; existing authored answers remain available.
9. Beyond: four square images and editorial introduction. Mobile retains comfortable image grid and text-first reading order.
10. Contact: large closing statement, email row and footer. Mobile wrapping, safe-area padding and touch-size targets.

## QA / delivery

- Build and lint; server-render tests cover section order, real links, pending media and accessibility.
- Desktop visual comparisons against each supplied sheet, including motion end states.
- Mobile checks at narrow and typical phone widths: no horizontal overflow, readable text, no pinning, touch controls, FAQ open/close and menu focus.
- Reduced-motion: content visible, no scroll-controlled animation, no automatic text cycling.
- Keep existing public preview/SEO image. Publish only after successful verification.

## Current status

All ten homepage sections implemented. Desktop follows the supplied Canva composition; mobile has independent responsive layouts. WAND remains on its existing route.

Verification completed on 2026-09-08: desktop visual checks, mobile at 390px and 320px, menu keyboard/focus behavior, FAQ single-open behavior, counters and motion controls. Final narrow-screen contact check confirms no horizontal overflow and a visible footer; the footer reveal now starts when it reaches the viewport rather than requiring an unreachable scroll position. Updated horizontal hero inspected at 1440px.

The homepage and WAND route are published in OpenAI Sites version 34 and are now frozen as the handoff reference. Production build and five rendered-output tests pass. Recordings remain pending and clearly labelled; XSITE and Demo Casino Customiser use request links until their case-study pages exist. Future work continues only in an independent clone unless María explicitly reopens the existing publication.
