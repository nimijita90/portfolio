# Motion, Interaction & Visual Hierarchy Specification

> Status: **Approved for implementation, reconciled with the September Canva design**  
> Implementation status: **Implemented in the frozen production reference; see `docs/handoff` for the transferable baseline**
> Scope: María Mora Product Design portfolio  
> Visual reference: `New Assets Portfolio/Jerarquia Tipografica.png`

## Current precedence — 7 September 2026

The published Canva reference (`https://bodajaviymaria2027.my.canva.site/mariamorawebsite`) now determines DESKTOP section order, composition and visual hierarchy. This motion document applies only where compatible with that newer design. The original specification below is preserved for traceability, not as authority to reinstate removed sections.

**Mobile must NOT use the Canva website as a visual reference.** Preserve and improve the established mobile experience with independent responsive layout, readable typography, touch controls and simplified motion. Shared content and brand remain consistent; desktop composition must not be compressed into a phone layout.

Resolved: Selected Work uses three covers; Xbuilder's display label becomes Demo Casino Customiser; People uses a single manually navigable quote; Awards follows People; Beyond uses four unlabelled photographs; no separate Design Leadership section. Career is unpinned on mobile/reduced motion. Existing case-study routes and verified factual content are preserved. Missing video recordings and unpublished case studies are not fabricated.

## 1. Purpose and intended impression

Motion must reinforce hierarchy, storytelling and seniority. It must never become the main attraction.

The experience should feel:

- Precise
- Premium
- Calm
- Intentional
- Senior

The established visual world remains authoritative:

- Black background
- High-contrast serif typography for primary statements
- Clean sans serif typography for functional and supporting information
- Generous negative space
- Strong product imagery and photography
- Restrained colour, used primarily inside product work

The intended reaction is not “this designer knows how to animate a website.” It is “every decision on this website feels intentional.”

## 2. Typographic hierarchy

The separate typography guide remains the numerical source of truth:

| Role | Desktop size | Typeface and treatment | Usage |
|---|---:|---|---|
| Display / H1 | 96–112 px | Canela/Silk Serif, regular | Hero, major openings, narrative changes; maximum one per protagonist block |
| H2 | 64–72 px | Canela/Silk Serif, regular | Main section title |
| H3 | 42–48 px | Canela/Silk Serif, regular | Subsection title |
| H4 | 28–32 px | Canela/Silk Serif, regular or italic | Small title, conclusion or editorial emphasis |
| Body L | 20 px | Neue Haas Grotesk/approved sans, regular | Short contextual introduction, ideally 1–3 lines |
| Body | 16–17 px | Neue Haas Grotesk/approved sans, regular | Explanatory copy |
| Caption | 12–13 px | Sans, medium, uppercase, wide tracking | Categories, section labels, numbering |
| Micro | 10–11 px | Sans, medium, uppercase, wide tracking | Role, timeline, scope and secondary metadata |

Use no more than two or three typographic levels in one section.

### Serif roles

Use the display serif for H1, H2, major statements, large figures and editorial phrases. Regular/light is the default. Italic or semibold italic may emphasise one meaningful word or concept.

Do not create emphasis with colour or with dramatically different sizes inside the same sentence.

### Sans serif roles

Use the sans serif for body copy, captions, labels, metadata, navigation, functional information and controls. It must never compete visually with the serif.

### Caption system

Captions are small uppercase sans-serif labels with generous tracking. Their treatment must remain consistent across the whole site.

Examples: `HIGHLIGHTS`, `EXPERTISE IN`, `CAREER JOURNEY`, `DESIGN LEADERSHIP`, `SELECTED WORK`.

## 3. Global motion system

### Motion hierarchy

- Large serif statements receive the strongest reveals.
- Body copy receives quieter animation.
- Captions and metadata receive minimal animation.
- Product imagery may use controlled masking or clipping.
- Functional interactions respond quickly.
- Mobile motion is simpler than desktop motion.

### Reusable primitives

#### Soft reveal

- Opacity: `0 → 1`
- Vertical travel: `20–32 px → 0`
- Duration: approximately `0.7–0.9 s`

#### Masked headline reveal

- Reveal the complete typographic line from behind an overflow-hidden mask.
- Use a small upward movement.
- Do not animate individual letters.

#### Image reveal

- Clip or mask
- Opacity
- Subtle vertical movement
- Optional scale: `1.02 → 1`

#### Stagger group

- Use approximately `70–120 ms` only when sequencing reinforces hierarchy.

#### Easing

- Preferred character: `cubic-bezier(0.22, 1, 0.36, 1)` or a perceptually equivalent ease-out.

### Triggering and lifecycle

- Entrance animation normally runs once when approximately 15–25% of a section enters the viewport.
- Once revealed, content remains static unless the section explicitly defines a controlled interactive state.
- The page must remain readable when JavaScript, animation or motion is unavailable.
- Support `prefers-reduced-motion`.

### Global prohibitions

Avoid bouncing, elastic springs, spinning, strong blur, excessive parallax, exaggerated scale, animated cursors, unnecessary horizontal movement, scroll-jacking, animation on every word and arbitrary movement.

## 4. Motion emphasis map

The four strongest motion moments are:

1. Hero — identity
2. `10+ Years → Highlights` — experience and scale
3. Product Expertise — specialisation
4. Career Journey — evolution

All remaining chapters support those moments:

- Design Leadership: authoritative
- Selected Work: product-focused
- Recognition: restrained
- What People Say: human and quiet
- FAQ: functional
- Beyond Design: warm and human
- Contact: final and settling

## 5. Section specifications

### 5.1 Hero

Preserve the approved visual composition.

Hierarchy:

1. Monogram/navigation
2. `MARÍA MORA`
3. `LEAD PRODUCT DESIGNER`
4. Portrait

Initial load sequence:

1. Navigation and monogram fade in softly.
2. Portrait appears through a clean vertical mask. Optional scale is limited to `1.02 → 1`; no dramatic zoom.
3. `MARÍA MORA` appears through a masked upward reveal, emerging from an invisible baseline.
4. `LEAD PRODUCT DESIGNER` enters with quieter opacity and small vertical movement.

Complete the full sequence in approximately `1.3–1.6 s`. The hero remains static after the reveal. No continuous portrait animation or floating movement.

### 5.2 Highlights and operators

This chapter has three distinct motion moments.

#### A. `10+ Years` transition

- `10+` receives its own hero-scale moment and must not initially behave like another KPI.
- It may occupy a significant part of the viewport, accompanied subtly by `YEARS IN iGAMING` or approved equivalent wording.
- Scroll progress controls the transformation from the large display state to the number’s final position inside Highlights.
- Scale and position change gradually and remain tied to user scroll.
- Reveal the remaining Highlights content only after `10+` settles.
- Do not use an automatic huge-to-small jump.
- If literal DOM scaling causes blur, layout instability or poor rendering, use coordinated large and final states with a crossfade/morph illusion.
- Do not add a second `0 → 10` counter animation.

#### B. Metric counters

Target values:

- `7` Designers Led
- `43` Operator Brands Designed
- `22` Casino Launches Delivered
- `15+` Markets Reached; the plus sign remains static

Rules:

- Animate once from zero to the final value.
- Duration: `0.8–1.2 s`.
- Ease-out.
- Start almost simultaneously with approximately `80 ms` stagger.
- Labels remain static.
- No odometer, slot-machine, bounce, overshoot or rolling-digit effect.

#### C. Operator marquee

- Narrow horizontal marquee after the metrics.
- Automatic, slow, seamless loop at constant speed.
- No arrows and no visible restart jump.
- Desktop hover may slow it slightly but must not stop it abruptly.
- Prefer CSS transforms over continuous React state updates.

### 5.3 Product Expertise

- Caption: `EXPERTISE IN`.
- One very large serif expertise statement is visible at a time.
- Potential sequence: `CASINO PLATFORM.`, `PRODUCT DESIGN.`, `DESIGN SYSTEMS.`, `PROTOTYPING.`, `DESIGN LEADERSHIP.` Final wording remains adjustable.
- Use the supplied BY/FORM reference for the transition concept, not its visual styling.
- The previous state masks or moves away while the next state is uncovered inside the same visual frame.
- Every term uses the same position, baseline, container dimensions, typography and visual weight.
- No layout jump, visible list, character-by-character animation, arrows or random motion.
- Readable hold per statement: approximately `1.5–2.2 s`.
- The transition itself remains relatively quick.

### 5.4 Career Journey

Hierarchy:

- `CAREER JOURNEY`
- Large serif `A journey of growth.`
- States `01`, `02`, `03`
- Active discipline and supporting content

States:

1. Graphic Design
2. Product Design
3. Design Leadership

Desktop scroll behaviour:

- The main visual block becomes sticky/pinned when reached.
- Normal wheel/trackpad scroll controls progress.
- Approximate total distance: `250–300 vh`, to be tuned through browser testing.
- Transition `01 → 02`: old number changes white to grey, new number becomes white; old content fades slightly and moves `8–12 px` upward; new content fades in and moves `16–24 px` upward into position.
- Repeat the same hierarchy for `02 → 03`.
- Reverse naturally on upward scroll: `03 → 02 → 01`.
- Release the sticky section after state 03.
- It must not feel like a carousel, slideshow, snap sequence or hijacked browser.
- GSAP ScrollTrigger `pin + scrub`, or equivalent motion-progress mapping, is appropriate.

### 5.5 Design Leadership

> Current content/placement must be reconciled before implementation; see Open Decisions.

- Caption: `DESIGN LEADERSHIP`.
- Large centred serif headline: `Turning people and ideas / into products that matter.`
- Keep approximately two desktop lines with one intentional italic emphasis, currently `matter`.
- Below, use two balanced top-aligned sans-serif body columns with similar widths and controlled line lengths, centred as one block.

Entrance:

1. Caption soft reveal.
2. Entire two-line headline enters as one masked serif reveal; do not animate the italic word independently.
3. Reveal both body columns simultaneously or with approximately `100 ms` difference.

No CTA, cards, icons, decorative dividers, parallax or columns flying in from opposing sides.

### 5.6 Selected Work

> This specification proposes a three-cover layout and conflicts with the current stacked/accordion implementation. Resolve before implementation.

Hierarchy:

- `SELECTED WORK`
- Large serif section title
- Three project covers: `WAND`, `XSITE`, `Demo Casino Customiser`
- Concise annotation and `VIEW PROJECT` aligned exactly to each image edge

Do not repeat project names below when already present inside covers.

Entrance:

1. Caption
2. Section title
3. Project covers

Each cover uses bottom-to-top clipping, opacity `0 → 1` and vertical movement of approximately `24 px → 0`. Use an `80–100 ms` stagger across the three covers, without slowly completing one whole card before beginning the next.

Desktop hover:

- Image scale `1 → 1.015`.
- Slightly strengthen the coloured light already inside the cover.
- Brighten `VIEW PROJECT`.
- Move arrow `3–4 px` diagonally.

No elevation, drop shadows, large zoom, external glow, cursor gimmicks or dashboard behaviour.

### 5.7 Awards / Recognition

- Caption: `AWARDS`.
- Large serif: `International recognition.`
- Award information remains further right.
- Preserve intentional empty space on the left.

Entrance order: caption, title, then award entries with subtle stagger. Use only opacity and `16–20 px` vertical movement. The result should resemble information appearing in an exhibition catalogue. Do not animate trophies or add decorative graphics.

### 5.8 What People Say

Hierarchy: section caption, section title, testimonial, author/role metadata.

- Use a simple opacity entrance; avoid dramatic masks.
- Testimonial rotation, if retained, uses a quiet crossfade with optional `8–12 px` vertical movement.
- Allow enough reading time.
- Provide manual navigation when several testimonials are presented.
- Do not use a continuously moving horizontal testimonial carousel.

### 5.9 FAQ and video

Hierarchy: `FAQ`, large serif `Questions I get asked.`, short introduction, question list, active video/answer.

Entrance order: caption, headline, introduction, then questions with a very short stagger.

Accordion behaviour:

- Expand the video/answer container smoothly using measured height or motion-layout transitions, not a crude `height: 0 → auto` implementation.
- Keep the active question visually stronger.
- Fade the video in while its container opens.
- Closing the previous answer and opening the next should read as one coordinated transition.
- Avoid excessive movement of surrounding questions.
- Use dividers only between questions: none above the first and none below the last.

### 5.10 Beyond Design

> This specification proposes four square, unlabelled images and conflicts with the current six-item labelled strip. Resolve before implementation.

- Caption: `BEYOND DESIGN`.
- Large serif: `There’s more to life than pixels.`
- Short body copy.
- Four colour photographs in a clean, equal 2×2 square grid with consistent gaps.
- No overlaps, labels, artificial black borders or inconsistent dimensions.

Entrance order: caption, headline, body, then photographs. Images may use opacity, small vertical movement and optional clipping with approximately `80 ms` stagger.

Desktop hover may use a very subtle scale. No rotation, floating, scrapbook movement, overlap or exaggerated parallax. Keep colour grading restrained and consistent.

### 5.11 Contact

Hierarchy:

- `CONTACT`
- Large serif `Let’s make something exceptional.`
- `hello@mariamora.design ↗`
- Footer metadata: name/role, location, LinkedIn and copyright

Entrance order:

1. Caption.
2. Complete serif statement as one masked reveal.
3. Email row fade.
4. Footer metadata with simple opacity.

Thin email-row rules may animate with `scaleX: 0 → 1`. Keep the email readable immediately.

Desktop email hover: slight brightening and approximately `4 px` diagonal arrow movement. Motion should settle rather than escalate.

### 5.12 Navigation

- Minimal navigation.
- If sticky, begin transparent over the Hero and become slightly more opaque only when readability requires it after leaving the Hero.
- Transition duration: `250–350 ms`.
- Hover uses simple opacity or underline response.
- No animated pill backgrounds or large cursor interactions.

### 5.13 Page transitions

- Opening a case study should take approximately `400–600 ms`.
- Homepage content may fade slightly.
- A very short black transition layer is acceptable.
- Begin loading the case-study hero immediately.
- Browser Back should feel equally smooth.
- Avoid dramatic full-screen wipes, long loading sequences, complex morphs or animation that delays access.

## 6. Responsive and reduced-motion behaviour

Desktop contains the richest version. Tablet and mobile simplify rather than compress it.

On mobile:

- Reduce travel distances and stagger.
- Remove hover-only behaviour.
- Simplify complex masks.
- Reconsider long sticky sections.
- Shorten Career Journey’s scroll distance if necessary.

For `prefers-reduced-motion`:

- Remove large scale transformations.
- Remove scrub-heavy motion.
- Simplify sticky sequences.
- Replace them with short opacity reveals.
- Keep all content readable and reachable.

## 7. Implementation architecture

Create shared motion primitives before section-specific work. Suggested primitives:

- `softReveal`
- `maskedHeadline`
- `imageReveal`
- `staggerGroup`
- `hoverArrow`
- `counter`
- `scrollProgressSection`

Use CSS for marquee movement, hover states and basic opacity/transform transitions.

Use GSAP or an equivalent motion library only where necessary for coordinated masked headlines, accordion layout, page transitions, scroll progress and pinned storytelling.

Priority technical candidates:

- Career Journey: ScrollTrigger pin + scrub or equivalent.
- Product Expertise: fixed, stable stage with no layout shift.
- Highlights `10+`: scroll-progress mapping between large and final states.
- Metric counters: one-shot animation.

Do not hard-code an unrelated animation language for every section.

## 8. Performance requirements

- Prioritise `transform` and `opacity`.
- Prefer CSS animation where suitable.
- Use IntersectionObserver or viewport APIs for simple triggers.
- Avoid continuous JavaScript scroll listeners and layout thrashing.
- Avoid React state updates on every frame unless unavoidable.
- Optimise and load product imagery appropriately.
- Motion must never make the portfolio feel slow.

## 9. Validation criteria

Every section must be checked at desktop and mobile sizes for:

- Correct typographic role and scale
- Stable layout before, during and after motion
- Triggering when 15–25% of the section becomes visible
- One-shot versus reversible behaviour according to the specification
- Natural upward-scroll reversal where required
- Keyboard and touch compatibility
- No inaccessible hidden content
- No unexpected horizontal overflow
- Correct reduced-motion fallback
- Smooth transform/opacity performance without layout thrashing
- Fidelity to the supplied visual references

## 10. Open decisions and conflicts

Do not resolve these until the remaining instructions arrive:

1. **Section map:** Design Leadership is specified as a standalone chapter but its final placement/content must be reconciled with the current homepage.
2. **Selected Work:** the requested three-cover grid conflicts with the current stacked accordion and with the earlier stacking-animation reference.
3. **Project naming:** `Demo Casino Customiser` must be reconciled with current `Xbuilder` naming.
4. **Beyond Design:** requested four-square 2×2 grid without labels conflicts with the current six-image labelled presentation and earlier visual reference.
5. **Recognition:** caption wording changes from the current `Recognition` treatment to `AWARDS`; confirm final copy.
6. **Testimonials:** manual navigation and rotating single-quote behaviour must be reconciled with the current multi-quote editorial layout.
7. **Contact:** specification adds `CONTACT` and `LINKEDIN`; confirm final metadata and URL.
8. **Expertise wording:** final rotating terms remain open.
9. **Highlights transformation:** confirm the exact final `10+` location and whether coordinated duplicate states are acceptable.
10. **Mobile Career Journey:** final pinning/scroll distance must be decided after mobile-specific instructions and testing criteria arrive.

## 11. Pending additions

This document is intentionally incomplete. Append the next instruction blocks here before producing the implementation plan. No implementation should begin until María confirms that all instructions have been supplied.
