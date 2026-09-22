# Deployment and migration

## Production freeze

The current OpenAI Sites publication is the visual reference, not the destination for Claude's work.

- Live URL: `https://maria-lopez-design-portfolio.malapipa.chatgpt.site`
- Published version: 34
- Snapshot commit: `914dce0fc692425788b9afc9708e32d158904dde`

The transfer ZIP contains a sanitised `.openai/hosting.json` with no `project_id`. Never copy the production project ID back into the clone unless María explicitly reverses the freeze decision.

## Current adapter

The source runs through Vinext/Vite and a Cloudflare Worker. This reproduces the current publication faithfully but is not a requirement for the successor.

Provider-specific files:

- `vite.config.ts`
- `worker/index.ts`
- `build/sites-vite-plugin.ts`
- `.openai/hosting.json`

The product implementation is primarily under `app/` and `public/`.

## Recommended migration sequence

1. Install and validate the unmodified handoff.
2. Capture baseline screenshots for `/` and `/work/wand`.
3. Select one destination: Vercel, Netlify or another provider.
4. Replace only the hosting adapter and build scripts first.
5. Re-run the complete QA baseline.
6. Make redesign changes after hosting parity is established.

This separates migration regressions from intentional design changes.

## Vercel direction

Vercel is the lowest-conceptual-change option because the application already uses Next.js App Router conventions.

Expected work:

- Replace Vinext development/build scripts with standard Next.js scripts.
- Remove the Cloudflare Worker and Vite adapter once parity is proven.
- Keep `app/`, `public/`, TypeScript and GSAP source.
- Set `NEXT_PUBLIC_SITE_URL` in project environment variables.
- Confirm that client-side GSAP imports remain isolated from server rendering.
- Test the large local assets and decide whether to retain raw `<img>` elements or adopt an image loader.

## Netlify direction

Netlify can host the same Next.js application using its maintained Next runtime integration.

Expected work:

- Convert away from the Cloudflare/Vinext entry point.
- Use standard Next build semantics supported by Netlify.
- Set `NEXT_PUBLIC_SITE_URL` and the production Node version.
- Confirm route handling for `/work/wand` and static assets under `/portfolio`.
- Re-run scroll/motion checks on the deployed origin.

## Static-export option

The current product has no database or dynamic API and could potentially become a static export. Validate this only after moving to standard Next semantics. Confirm both routes, metadata, client hydration and asset paths before choosing it.

## Domain and metadata

Before a new deployment:

- Set the canonical origin in `NEXT_PUBLIC_SITE_URL`.
- Update any organisation-specific title/description only with María's approval.
- Verify `og.png` and favicon URLs on the real domain.
- Confirm mail links still point to the intended inbox.

## Rollback

The current public Site is the rollback reference and remains independent. A failed Claude/Vercel/Netlify deployment must be rolled back within its own provider; it must not trigger a deployment to OpenAI Sites.
