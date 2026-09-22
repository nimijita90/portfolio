# Instructions for Claude

This package is an independent working copy of María Mora's portfolio. It is not authorisation to edit or publish the existing production website.

## First actions

1. Read `docs/handoff/START-HERE.md`.
2. Read `docs/handoff/DECISIONS.md` and `docs/handoff/DESIGN-AND-MOTION.md` before proposing a redesign.
3. Install with the frozen pnpm lockfile and run `pnpm check` before changing source.
4. Treat `/` and `/work/wand` as the acceptance baseline.

## Non-negotiable context

- The OpenAI Sites production version is frozen at version 34.
- Do not connect this package to that production project or reuse its project ID.
- The clone may later target Vercel, Netlify or another provider. Choose the provider explicitly before replacing the current Vinext/Cloudflare adapter.
- Preserve the current copy, factual claims and confidentiality boundaries unless María supplies replacements.
- Do not invent missing videos, case studies, LinkedIn URLs, metrics, logos or product imagery.
- Desktop follows the supplied Canva-led composition. Mobile is a separate responsive composition.
- Preserve native scrolling, keyboard access and `prefers-reduced-motion` fallbacks.
- Do not remove assets merely because they are not used by the active page; some are documented historical references.
- Confirm Silk Serif licensing before a new public or corporate deployment.

## Active source

- Home: `app/CanvaPortfolio.tsx` and `app/canva-portfolio.css`.
- WAND: `app/work/wand/WandCaseStudy.tsx` and `app/work/wand/wand.css`.
- Shared metadata/styles: `app/layout.tsx`, `app/globals.css` and selected global font declarations in `app/portfolio.css`.

`app/Portfolio.tsx` is a previous implementation retained for traceability. Do not start new work there unless intentionally recovering an older pattern.

## Before delivery

- Set `NEXT_PUBLIC_SITE_URL` to the new canonical origin.
- Run the complete QA checklist in `docs/handoff/QA-CHECKLIST.md`.
- Verify both routes at desktop, mobile and reduced-motion settings.
- Review the asset and licensing notes.
- Publish only to a newly approved destination.
