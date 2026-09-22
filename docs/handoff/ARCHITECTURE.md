# Architecture

## Runtime shape

The current implementation uses the Next.js App Router API through Vinext and Vite, with a Cloudflare Worker entry point. It is mostly presentation code: content, local assets and client-side interaction. There is no database or application API.

### Versions

- React 19.2.6
- Next.js 16.2.6
- Vinext 0.0.50
- Vite 8.0.13
- GSAP 3.15
- TypeScript 5.9
- Cloudflare Vite plugin 1.37

## Routes

| Route | Entry | Primary client component | Styles |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | `app/CanvaPortfolio.tsx` | `app/canva-portfolio.css` |
| `/work/wand` | `app/work/wand/page.tsx` | `app/work/wand/WandCaseStudy.tsx` | `app/work/wand/wand.css` |

`app/layout.tsx` supplies Onest, metadata, the skip link and global style imports.

## Active versus historical source

- `app/CanvaPortfolio.tsx` is the active homepage.
- `app/Portfolio.tsx` is the previous V7/V9 implementation retained as historical reference.
- `app/canva-portfolio.css` is the active homepage stylesheet.
- `app/portfolio.css` contains the previous visual system and several shared font declarations. It is still globally imported, so remove or split it only after visual regression testing.
- `app/content.ts` contains earlier structured content and WAND metadata. The active Canva homepage currently keeps much of its final content close to the component.

## Client-side behaviour

Both user-facing components are client components because they manage:

- GSAP and ScrollTrigger timelines.
- Mobile navigation dialog state.
- FAQ disclosure state.
- Testimonial and career controls.
- Motion pause state.

GSAP work is scoped with `gsap.context`, responsive behaviour uses `gsap.matchMedia`, and image/font completion is followed by `ScrollTrigger.refresh()`.

## Worker and hosting adapter

- `worker/index.ts` forwards App Router requests to Vinext.
- It contains a Cloudflare image optimisation endpoint using `ASSETS` and `IMAGES` bindings.
- `vite.config.ts` wires Vinext, the local Sites plugin and Cloudflare's Vite plugin.
- `.openai/hosting.json` contains no database or object-storage bindings.

This Worker is an adapter, not product logic. A Vercel or Netlify migration should preserve `app/` and `public/` first, then replace the adapter deliberately.

## Data and integrations

- No database.
- No API routes.
- No authentication.
- No analytics integration.
- No runtime uploads.
- No fetches to external content APIs.
- Contact actions use `mailto:` links.

## Rendering constraints

- Visual crops depend on exact source-image dimensions and CSS positioning.
- Desktop contains pinned/scrubbed GSAP sections; mobile replaces those with readable sequential layouts.
- The page must remain readable with JavaScript disabled or reduced motion enabled.
