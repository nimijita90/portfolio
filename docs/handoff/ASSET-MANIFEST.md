# Asset manifest and usage policy

All runtime assets live under `public/portfolio`. Keep paths stable until CSS crops and responsive behaviour have been revalidated.

## Active brand and metadata assets

| Asset | Status | Usage |
| --- | --- | --- |
| `public/portfolio/assets/maria-logo-white.svg` | Active | Homepage/WAND mark and favicon. |
| `public/og.png` | Active | Open Graph and X preview, 1680×944. |

## Active homepage source sheets

These are local runtime copies derived from the supplied Canva design. `ReferenceImage` displays only image regions; copy and controls remain HTML.

| Asset | Status | Usage |
| --- | --- | --- |
| `canva/hero-photo.jpg` | Active, reconstructed | Text-free desktop hero photograph. |
| `canva/highlights.jpg` | Active source sheet | Operator-logo strip crop. |
| `canva/work.jpg` | Active source sheet | Three Selected Work cover crops. |
| `canva/people.jpg` | Active source sheet | People-section portrait crop. |
| `canva/awards.jpg` | Active source sheet | Trophy and award-mark crops. |
| `canva/faq-photo.jpg` | Active, reconstructed | Text/control-free FAQ image and WAND closing portrait. |
| `canva/beyond.jpg` | Active source sheet | Four Beyond Design image crops. |
| `canva/faq.jpg` | Reference only | Original layout reference; not used as fake video UI. |

Reconstruction prompts and exact intent are preserved in `docs/reference/canva-assets.md`.

## Active WAND assets

| Asset | Usage |
| --- | --- |
| `assets/wand-hero-banner-v2.png` | Hero banner. |
| `assets/wand-visual-complete-v2.png` | Complete section. |
| `assets/wand-visual-configure-v2.png` | Configure section. |
| `assets/wand-visual-connect-v2.png` | Connect section. |
| `assets/wand-visual-cashier-v2.png` | Cashier section. |
| `assets/wand-navigation-models.png` | Navigation models. |
| `assets/wand-dark-mode.png` | Light/dark system comparison. |
| `assets/wand-sweepstakes.png` | Sweepstakes extension. |

Treat WAND visuals as portfolio-only and review-required. They must not be extracted into product documentation, marketing material or another public case without approval.

## Fonts

Active faces are:

- `fonts/Silk Serif Regular.woff2`
- `fonts/Silk Serif Regular Italic.woff2`
- Onest Variable supplied by the npm package.

Additional Silk weights remain because the historical implementation references some of them. Before a new corporate/public deployment:

1. Confirm that the Silk Serif licence permits web embedding and transfer to the new organisation.
2. If not, replace it with an approved licensed serif and re-run visual QA.
3. Do not silently substitute a metrically different font; headline wrapping drives the composition.

## Historical/reference assets

The following groups are not required by the active homepage but are retained for traceability or previous implementations:

- `assets/LA3A7408-*`
- `assets/Logo.png`, `Logo-transparent.png`
- `assets/Photo1.png`, `Photo2.png`, `Trophy.jpg`
- `assets/beyond-design-reference.png`
- `assets/wand-canva-*`
- `assets/wand-cover-reference.png`
- `sections/01.jpg` through `sections/07.jpg`
- Unused Silk Serif weights.

Do not delete these during the initial migration. A later cleanup may move them to a separate archive after confirming no active CSS, documentation or redesign work relies on them.

## Asset rules

- Do not crop source sheets destructively; crops are encoded in CSS/component data.
- Preserve declared source dimensions.
- Keep descriptive alt text on meaningful images and empty alt text on decorative marks.
- Do not add screenshot text as a replacement for semantic HTML.
- Record source, licence and approval status for every new asset.
