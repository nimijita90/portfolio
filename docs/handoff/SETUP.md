# Setup and reproducibility

## Supported baseline

- Node.js: 22.13 or newer.
- Package manager: pnpm 11.19.0.
- Operating system: macOS or Linux. The transfer package has no machine-specific absolute paths.

## Install

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the canonical origin used for local previews or the future deployment.

## Run

```bash
pnpm dev
```

Expected routes:

- `http://localhost:3000/`
- `http://localhost:3000/work/wand`

## Validate

```bash
pnpm check
```

This performs:

1. ESLint validation.
2. A production Vinext build.
3. Five server-rendered content and accessibility smoke tests.

The current lint result contains four non-blocking `no-img-element` warnings in WAND. No lint errors are expected.

## Clean-room verification

The handoff is valid only if the following works after extracting the ZIP into an empty directory:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
```

Do not copy `node_modules`, `dist`, `.vinext`, `.next`, `.wrangler`, package-manager stores or local environment files between machines.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Required before public deployment | Canonical origin for Open Graph and other absolute metadata. |

There are currently no API keys, database credentials, authentication secrets or third-party service tokens.
