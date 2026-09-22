# Known issues and controlled debt

## Content gaps

- FAQ videos have not been supplied. Current UI explicitly says recording pending.
- XSITE and Demo Casino Customiser do not have public case studies.
- The current home uses image crops from Canva source sheets instead of separate original files for every image.

- WAND "Brand customisation" section (above Results) has a dashed placeholder where the laptop mock-up with customised brands belongs. No image exists in the repo; María must supply it.
- WAND "Next case study" now points to Demo Casino Customiser as a request-by-email link (no public case study exists yet).
- WAND mobile/tablet (≤1023px): Evolution is a native swipe carousel, subsection titles are smaller, and the Approach and "As WAND grew" intros use a lighter black (`--w-tone`). Desktop is unchanged.
- The People section is now titled "In their words." (proposed by Claude; confirm with María).

## Licensing and confidentiality

- Silk Serif webfont transfer/publication rights require confirmation.
- WAND imagery and detailed product-system material remain review-required.
- Do not infer broader permission from the fact that the current portfolio is public.

## Technical debt

- `app/Portfolio.tsx` and much of `app/portfolio.css` are historical implementation surfaces.
- Several historical assets remain in `public/portfolio`.
- Active content is partly embedded in `CanvaPortfolio.tsx` rather than fully separated into a CMS or data file.
- WAND uses raw `<img>` elements. ESLint reports four optimisation warnings, but no errors.
- Automated tests cover rendered structure/content, not pixel-level visual regression or real scroll timing.
- The Vinext build reports that route classification is not fully detectable through static analysis; both routes still build and render.

## Provider migration risks

- Replacing Vinext/Cloudflare and redesigning simultaneously makes regressions difficult to attribute.
- Different font rendering can change headline wrapping and section height.
- GSAP pin distances must be retested after any typography, viewport or rendering change.
- Image optimisation services may alter crop dimensions or loading order and therefore ScrollTrigger refresh timing.

## Documentation precedence

The files in `docs/handoff` describe the transferred state. Older planning files remain for history and may contain outdated status text. Where they conflict, the rendered production baseline and handoff documentation win.
