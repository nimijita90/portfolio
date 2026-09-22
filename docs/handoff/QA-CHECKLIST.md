# QA checklist

Complete this checklist before accepting a migration or publishing a successor.

## Clean installation

- [ ] Extract into an empty directory.
- [ ] Install with `pnpm install --frozen-lockfile`.
- [ ] Set `NEXT_PUBLIC_SITE_URL`.
- [ ] Run `pnpm check` successfully.
- [ ] Confirm no secrets or production project IDs exist in the clone.

## Routes and content

- [ ] `/` loads without console or hydration errors.
- [ ] `/work/wand` loads directly and through the WAND Selected Work link.
- [ ] Home always starts at the hero (first visit, reload, or returning from WAND); WAND "Back to home" links go to `/`.
- [ ] XSITE and Demo Casino Customiser remain honest request links unless their cases have been supplied.
- [ ] All email links use the approved address and subjects.
- [ ] No image displays broken, clipped text or unintended screenshot UI.

## Desktop baseline

Test at 1440×900 or larger.

- [ ] Hero fills the viewport and its identity sequence feels deliberate.
- [ ] Highlights counters finish at the correct values.
- [ ] Expertise text remains in one stable frame.
- [ ] Selected Work entrances and hovers are visible but controlled.
- [ ] Career progression pins, advances and reverses naturally.
- [ ] People controls, Awards, FAQ and Beyond remain readable.
- [ ] WAND Evolution shows one complete milestone plus only a preview of the next.
- [ ] Evolution has clear Enter, Hold and Exit phases.
- [ ] WAND image reveals, Results charts and closing section animate without conflicts.

## Mobile baseline

Test at 390×844 and 320×700.

- [ ] No horizontal overflow.
- [ ] Navigation dialog opens, traps meaningful interaction and closes correctly.
- [ ] Touch targets are at least 44px where appropriate.
- [ ] Hero crop keeps María visible and text remains legible.
- [ ] Metrics use the intended compact grid.
- [ ] Selected Work is a readable single-column sequence.
- [ ] Career and WAND Evolution are unpinned and readable vertically.
- [ ] FAQ opens one item without hiding or clipping its answer.
- [ ] Long WAND headings retain sufficient spacing from captions.

## Accessibility

- [ ] Skip link works.
- [ ] Keyboard focus is visible.
- [ ] Menu, FAQ, career and testimonial controls are operable by keyboard.
- [ ] Heading order remains logical.
- [ ] Decorative images have empty alt text; meaningful images have useful alt text.
- [ ] Content remains understandable without hover.
- [ ] Text remains usable at 200% zoom.

## Reduced motion

- [ ] Enable `prefers-reduced-motion: reduce`.
- [ ] All content is visible without waiting for a trigger.
- [ ] No pinned section blocks progress.
- [ ] Expertise becomes readable without automatic cycling.
- [ ] Marquees, parallax and large transitions stop or flatten.

## Performance and metadata

- [ ] Hero asset loads with acceptable LCP on the destination provider.
- [ ] Lazy images do not cause broken ScrollTrigger geometry.
- [ ] Page title, description, favicon and social preview resolve on the final origin.
- [ ] No production URL from a different environment appears in metadata.

## Approval gate

- [ ] Silk Serif licence confirmed or an approved replacement tested.
- [ ] WAND visuals/content approved for the new destination.
- [ ] María approves the target domain and final visual comparison.
