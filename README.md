# SPS Engineering Solutions — website redesign

Static multi-page site, built with a zero-dependency Node script.

## Run locally

```
npm start          # builds to dist/ and serves http://localhost:4173
```

Requires Node ≥ 18. No `npm install` is needed.

| Command | What it does |
|---|---|
| `npm run build` | Render `src/` → `dist/` |
| `npm run serve` | Serve `dist/` on port 4173 (`PORT=…` to change) |
| `npm run images` | Regenerate optimised images from the originals and `source-photography/` (needs Python + Pillow, and Playwright for the SVG frame) |
| `python tools/fetch-photography.py` | Re-download the 8 credited Wikimedia Commons photos and rewrite `source-photography/credits.json` from Commons licence metadata (only needed if the set changes) |
| `npm run qa` | Browser QA (needs Playwright; server must be running). Add `-- --shots` for screenshots. |
| `node tests/content-check.mjs` | Verify original text is preserved |

## Deploy

Upload the contents of `dist/` to any static host. Pages are folder routes (`/services/index.html`), so `/services/` and `/services` both work on standard hosts. `404.html` is included.

## Structure

```
src/data/        content (single source of truth, transcribed from the original site)
src/templates/   layout (head/SEO, header, footer, image helper) and shared components
src/pages/       one module per page
src/styles/      main.css (design tokens in :root)
src/scripts/     main.js (progressive enhancement only)
public/assets/   optimised images + images.json (generated)
tools/           image pipeline
tests/           browser QA + content check
docs/            content inventory, asset + photography manifests, design system, QA checklist, screenshots
source-original/ original HTML pages and live-site assets (read-only reference)
source-photography/ third-party photos as downloaded + credits.json (licence record; read-only)
```

The original downloaded files in this folder (`*.png`, `*.gif`, `*.svg`, `*.css`, `bootstrap.bundle.js.download`) are left untouched.
