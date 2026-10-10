# Design system: SPS Engineering Solutions (V2)

The site should look warm, precise and editorial-industrial, like an established engineering firm's printed technical brochure, not a SaaS landing page. All tokens live in `:root` in `src/styles/main.css`.

V2 (2026-10-10) kept the V1 identity (ivory/white/graphite, logo-derived greens, Manrope + Inter, hairline rules) and rebuilt the parts that made it hard to read:

- the type scale
- label styling
- service discoverability
- table readability
- spacing consistency
- the motion system

## Colour

The accents follow the real SPS logo (`#3d7804`/`#64ba10` greens, `#f10e09` red, `#464646` grey). The copper palette proposed in the original brief was rejected because it clashes with the logo.

| Token | Value | Role |
|---|---|---|
| `--ivory` | `#f6f5f0` | Page background, header, card surfaces on white |
| `--white` | `#ffffff` | Content sections, logo tiles, tables, form |
| `--stone` | `#e7e5dd` | Alternating band (equipment), image mats |
| `--graphite` | `#20292b` | Text, mastheads, primary buttons, 2 px section rules |
| `--graphite-deep` | `#182022` | Footer, hero spec band |
| `--slate` | `#344347` | "Top Services" band, secondary text on light |
| `--text-2` | `#4f5959` | Supporting text. **V2: darkened from `#586161`** to 7.2:1 on white, 6.6:1 on ivory, 5.7:1 on stone. |
| `--text-3` | `#5f6969` | Tertiary text (credits, arrows): 5.7:1 on white, 5.2:1 on ivory |
| `--green` | `#3b6b1f` | Accent on light: labels, indices, bullets, active states, focus ring |
| `--green-tint` | `#eef3e8` | V2: active/hover wash (TOC, category bar, count chips) |
| `--green-bright` | `#82cf34` | Accent on dark grounds: 5.4:1 on slate, 7.7:1 on graphite |
| `--signal` | `#b3241c` | Logo red, deepened. Required marks and errors only. |

No gradients except dark photo scrims. No glows, glass, coloured shadows, or blue/purple gradients.

## Typography

| Use | Family | Weights |
|---|---|---|
| Headings, service titles, contact numbers | **Manrope** | 600 / 700 / 800 |
| Body, tables, UI, **labels** | **Inter** | 400 / 500 / 600 / 700 |
| Index numerals, model numbers, specs | **IBM Plex Mono** | 400 / 500 |

**V2 change:** eyebrows, table headers, fact labels and TOC group names were 11–12 px uppercase mono. They are now **13–15 px Inter 600**, or Manrope for TOC groups. Mono is kept only where it helps scanning: index numerals (01, 02…), equipment numbers, and rating/spec values (`CBA-3000 · ISA make`, `80 kV DC / 70 kV AC`).

### Scale (fluid `clamp()`; value at 1440 px in brackets)

| Token | Value | Use |
|---|---|---|
| `--fs-hero` | `clamp(2.6rem, 1.55rem + 3.6vw, 4.25rem)` [68] | Home hero |
| `--fs-h1` | `clamp(2.25rem, 1.45rem + 2.5vw, 3.5rem)` [56] | Inner-page headings |
| `--fs-h2` | `clamp(1.9rem, 1.35rem + 1.6vw, 2.625rem)` [42] | Major sections, service-group titles |
| `--fs-h3` | `clamp(1.45rem, 1.2rem + 0.75vw, 1.875rem)` [~28] | Service titles, statements, inventory categories |
| `--fs-h4` | `clamp(1.2rem, 1.08rem + 0.35vw, 1.4375rem)` [~22] | Cards, further services |
| `--fs-lead` | `clamp(1.125rem, 1.02rem + 0.4vw, 1.375rem)` [~22] | Leads, mission/vision text on About |
| `--fs-body` | `clamp(1rem, 0.94rem + 0.26vw, 1.125rem)` [18] | Body. Never below 16 px. |
| `--fs-desc` | `clamp(1rem, 0.96rem + 0.12vw, 1.0625rem)` [17] | Service descriptions, technical lists |
| `--fs-table` | same as desc [17] | Table content |
| `--fs-th` | 14 px | Table column headings |
| `--fs-nav` | 15.5 px | Navigation |
| `--fs-label` | 13 px | Eyebrows and labels (uppercase, +0.08–0.1em) |
| Specs | 15.5 px Plex Mono 500 | Equipment ratings |

Line heights: body 1.7, technical text 1.6, headings 1.04–1.25. Paragraphs use `text-wrap: pretty`; headings use `balance`. `--measure: 68ch` caps technical list items.

Mobile: body and descriptions stay at least 16 px, tables never shrink (they restack), and labels stay 13 px. `tests/qa.mjs` enforces these minimums at five widths.

## Space, grid and shape

| Token | Value |
|---|---|
| `--s-1…--s-9` | 4, 8, 12, 16, 24, 32, 48, 64, 96 px: the only spacing values used for component gaps |
| `--wrap` | 1280 px max content width (V1: 1240) |
| `--gutter` | `clamp(16px, 4vw, 48px)` |
| `--section` | `clamp(64px, 7.5vw, 112px)` |
| `--radius` | 3 px everywhere |
| `--header-h` | 76 px. Also drives `scroll-padding-top`. The equipment page adds the 65 px category bar. |

Every grid column is `minmax(0, …)`, so wide tables scroll inside their own region instead of stretching the page.

## Components

| Component | Where | V2 notes |
|---|---|---|
| Header | All | 48 px logo, 15.5 px nav with 44 px targets, green underline grows on hover and stays on the current page (also 600 weight). Solid graphite "Discuss a Project" with arrow. Turns white with a hairline after 8 px of scroll. ≤1080 px: labelled "Menu" toggle and full-height panel with staggered items (30 ms). |
| Hero | Home | 68 px title. **Spec band:** solid near-black with a 2 px logo-green top rule, numbered labels and 20 px Manrope values. |
| Statements | Home (stacked, numbered), About (rows with 22 px text) | No longer three equal columns on About |
| Featured services | Home | Image-led modules on slate: photo, original line icon as an overlapping badge, number, title, description, "View technical details". Credit overlay sits on the photo, outside the link. |
| Service groups | Home `#services` | 5 discipline rows: sticky group label and count on the left; on the right, a hairline-separated list of service rows (number · short title · original sentence · arrow; the sentence stacks under the title below 760 px). Every row links to its Services anchor. A sentence already shown on a featured card above is not repeated. (Feedback pass: replaced 2-column cards.) |
| Equipment summary | Home | Original panel photo, captioned CPC 100 cut-out, 5 category rows with count chips and every instrument name |
| Group opener | Services | Ivory panel: "Service group 0X / 05", 42 px title, "N services" count, optional photo with credit. Section links live only in the TOC (feedback pass: chips removed as duplicate navigation; masthead group chips also removed). |
| Service section | Services | Bordered index badge, group kicker, 28 px title, sticky image column, 17 px list with 8 px green squares. Divider: hairline plus a 72 px green segment that draws in on reveal. |
| TOC | Services | Desktop: sticky; Manrope group names with mono numbers; 15 px links; active = green bar + tint. ≤1080 px: sticky "Jump to a service" bar under the header showing the current section; expands to the full list and closes on selection or Esc. |
| Category bar | Testing Equipment | Sticky under the header: 5 categories with count chips, scroll-spy (tint + 3 px underline). Scrolls horizontally on small screens and keeps the active item in view. |
| Data tables | Services, Testing Equipment | 2 px graphite top rule, ivory header row (14 px Inter 600), 17 px rows with 18 px padding, row hover tint. Inventory: one full-width table per category (no. / name / rating). ≤640 px: rows restack as number + name, then labelled rating, at full size. |
| Logo wall | Home, Customers | Logos sized by visual area (7600 px²), never recoloured or distorted. Wide marks span two cells. 14 px captions on Customers. |
| Leadership / careers | Home (both), About (leadership only, two-column: name/role, then facts) | Name at 46 px; careers in an ivory panel with "Send Your CV" and the visible email address. Careers also on Contact `#careers` (footer link target). |
| Enquiry form | Contact | Required note at top; "Send request" button with the hand-off helper line beneath it (`aria-describedby`); live-region status after hand-off, never a delivery claim |
| Contact band | All but Contact | Dark scrim over the transmission-line photo; 28 px tappable phone/email lines with an underline that grows on hover |
| Credit | Wherever third-party photos appear | 12 px "Illustrative photo · Author / Wikimedia Commons · Licence" (see `photography-manifest.md`) |

## Motion

One easing family (`--ease` `cubic-bezier(0.2,0.7,0.2,1)`, `--ease-out` for image zoom) and three durations:

| Token | Value | Use |
|---|---|---|
| `--t-fast` | 180 ms | Link colour, nav background, chip states |
| `--t-med` | 260 ms | Button and card surfaces, borders, arrow nudge (4 px), underline growth, mobile menu |
| `--t-slow` | 640 ms | Section reveal (16 px fade-up); image zoom (1.04, 600 ms) on featured cards only |

- **Divider reveal:** the eyebrow rule and the green service divider scale in from the left (700 ms, short delay).
- **Hero:** 700 ms entrance with 60 ms stagger.
- **Reveal is safe without JS:** content is hidden only after JS runs, and anything already in view is shown first.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables transitions, animations, smooth scroll and zoom. QA verifies all 6 pages are static and fully visible under it.

Not used: parallax, counters, moving backgrounds, 3D, glows.

## Imagery rules

- Original SPS assets are kept wherever they carry identity or technical credibility: logo, customer logos, equipment photos, test-kit gallery, service photos.
- Eight Wikimedia Commons photographs (CC0 / CC BY / CC BY-SA) fill specific gaps. Each one is credited on the page as "Illustrative photo" and never captioned as SPS work. See `photography-manifest.md`.
- No photo appears in two adjacent sections. The Home hero photo is no longer reused as the Services masthead.
- Typography-led sections (complete service list, inventory, contact) carry no photos on purpose.
- Product cut-outs use `contain` on white and are never upscaled past their small originals. Labelled diagrams keep their natural ratio.

## Footer

Logo, tagline, Company / Services / Contact columns, copyright, back-to-top. The feedback pass removed the footer "Discuss a Project" button: it repeated the contact band's enquiry button directly above it.
