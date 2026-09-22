# María Mora portfolio

Production snapshot of María Mora's editorial portfolio and the WAND case study.

This repository is the source snapshot used to prepare an independent Claude handoff. The currently published OpenAI Sites version is frozen at version 34 and must not be modified or redeployed from this handoff without María's explicit approval.

## Routes

- `/` — portfolio home: hero, highlights, expertise, selected work, career, recommendations, awards, FAQ, beyond design and contact.
- `/work/wand` — complete WAND case study, including the pinned Evolution sequence, product sections, results and closing contact.

## Requirements

- Node.js 22.13 or newer.
- pnpm 11.19.0, declared through `packageManager`.

## Local development

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000` and `http://localhost:3000/work/wand`.

## Validation

```bash
pnpm check
```

The command runs lint, the production build and rendered-output tests. The existing `<img>` lint notices in WAND are documented and are not build failures.

## Start here for the handoff

Read [`CLAUDE.md`](./CLAUDE.md) and [`docs/handoff/START-HERE.md`](./docs/handoff/START-HERE.md) before changing architecture, assets, motion or hosting.

## Important boundaries

- The root `.openai/hosting.json` belongs to the existing production Site. A Claude transfer package contains a sanitised copy with no project ID.
- `app/CanvaPortfolio.tsx` is the active homepage. `app/Portfolio.tsx` is legacy/reference code and must not be treated as the current page.
- Desktop follows the September Canva composition. Mobile is intentionally independent and must not be produced by shrinking the desktop layout.
- WAND assets and narrative include confidentiality constraints. Read the asset manifest before reuse.
- Confirm the Silk Serif webfont licence before publishing a new corporate deployment.

## Main implementation files

- `app/CanvaPortfolio.tsx` — active homepage structure and interaction logic.
- `app/canva-portfolio.css` — active homepage visual system and responsive rules.
- `app/work/wand/WandCaseStudy.tsx` — WAND content and GSAP timelines.
- `app/work/wand/wand.css` — WAND visual system and responsive rules.
- `app/layout.tsx` — global metadata, fonts and shared styles.
- `public/portfolio` — production and historical visual assets.
- `docs/handoff` — authoritative handoff documentation.
