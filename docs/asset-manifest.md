# Asset manifest — SPS Engineering Solutions

Each image was **opened and inspected visually**, not identified by filename. Contact sheets were made with Pillow, and SVGs were rendered in Chromium. Dimensions are intrinsic pixels.

**Original files are never modified or renamed.** `tools/optimize-images.py` reads them and writes optimised copies (WebP + PNG/JPG fallback) to `public/assets/img/`. It also writes `images.json` (sizes and source paths), which the templates use for `width`/`height`/`srcset`.

**V2 (2026-10-10):** eight credited Wikimedia Commons photographs were added. They are recorded separately in `photography-manifest.md` (files in `source-photography/`, optimised copies in `public/assets/img/photography/`). This manifest still covers every original SPS asset.

Locations:

- **Workspace root:** the 32 files Chrome downloaded with the homepage (27 images plus CSS and JS).
- **`source-original/live-assets/assets/`:** 27 images referenced by the live site but missing from the download. These were fetched on 2026-10-09 from the company's own server (spsserviceshyd.in) using the paths in the original HTML.
- **`source-original/derived/15-static-frame.png`:** static first frame of `15.svg` (see §3).

## 1. Brand

| File | Size | Verified subject | Used as |
|---|---|---|---|
| `logo.png` | 248×94 RGBA | SPS logo: green "SPS" letterforms, red lightning stroke in the "P", grey "ENGINEERING SOLUTIONS" bar | `brand/sps-logo`: header, footer (white plate), touch icon, JSON-LD |
| `live-assets/common/favicon.ico` | 48×48 | SPS favicon | `brand/favicon.ico`, every page |

Logo colours measured from pixels: `#3d7804`, `#64ba10` (greens), `#f10e09` (red) and `#464646` (grey). These drive the colour tokens in `design-system.md`.

## 2. Photography and illustrations

| Original file | Size | Verified subject | Optimised key | Where used |
|---|---|---|---|---|
| `live-assets/common/hero-bg.jpg` | 1920×1280 | Outdoor substation switchyard: gantries, isolators, instrument transformers | `photo/substation-yard` | Home hero; Services masthead; default `og:image` |
| `operator.jpg` | 1332×1020 | Technician in hard hat at a distribution panel, holding a tablet | `photo/panel-technician` | Home intro; About masthead |
| `live-assets/top-services/relay.jpeg` | 1280×720 | Gloved hands measuring panel wiring with an orange multimeter | `photo/panel-multimeter` | Services `#annual-contract` (O&M) |
| `relay.png` | 512×512 | White line icon: relay coil + contact | `icons/relay` | Home "Relay Testing" |
| `breaker.png` | 512×512 | White line icon: three-pole breaker | `icons/breaker` | Home "Breakers and CT & PT's Testing" |
| `energy.png` | 512×512 | White line icon: transformer with lightning bolt | `icons/transformer` | Home "Transformer Testing" |
| `live-assets/services/1.jpg` | 520×376 | Engineer at a relay panel with laptop and a blue/red three-phase test set | `services/relay-commissioning` | Services `#relay` |
| `live-assets/services/2.png` | 477×362 | Three light-grey numerical protection relays | `services/numerical-relays` | Services `#relay-test-kits` |
| `live-assets/services/5.png` | 800×441 | Labelled "Before Retrofitting / After Retrofitting with Numerical Relays" panel comparison | `services/retrofit-before-after` | Services `#retrofit` (natural aspect, so labels are not cropped) |
| `live-assets/services/6-1.png` | 270×187 | Control room: workstations in front of panels | `services/sas-control-room` | Services `#sas` |
| `live-assets/services/6-2.png` | 277×182 | Operator at HMI desk; single-line diagram on wall | `services/sas-operator` | Services `#sas` |
| `live-assets/services/6-3.jpg` | 424×462 | Engineer in red jacket configuring equipment at an open panel | `services/sas-engineer` | Services `#sas` |
| `live-assets/services/7.png` | 577×433 | Oil-filled power transformer (cut-out) | `services/power-transformer` | Services `#substation` |
| `live-assets/services/8.png` | 500×436 | 3D clip-art: figures with gears and wrench, "Service" badge | — | **Not displayed**: generic clip-art that undercuts the professional tone. Replaced by `photo/panel-multimeter`. File kept. |
| `live-assets/services/9.png` | 361×238 | Hands reviewing electrical drawings | `services/engineering-drawings` | Services `#substation-activity` |
| `live-assets/services/10.jpg` | 573×449 | Electronic energy meter | `services/energy-meter` | Services `#calibration-meters` |
| `live-assets/services/12.png` | 565×321 | Classroom: participants at laptops | `services/training-session` | Services `#training` |
| `live-assets/services/13.jpeg` | 800×665 | Handheld thermal camera showing a heat image | `services/thermal-camera` | Services `#thermography` |
| `live-assets/services/14.png` | 548×247 | Blue/red three-phase relay test set (OMICRON CMC style) | `services/test-set-rental` | Services `#rental`; Testing Equipment `#rental` |
| `live-assets/footer/ceo.png` | 80×80 | **Generic cartoon avatar**, not a photograph. Commented out in original HTML. | — | **Not used.** No portrait was invented. |

### Homepage equipment photographs (`#equipment`)

| File | Size | Verified subject | Key | Caption policy |
|---|---|---|---|---|
| `1.png` | 180×178 | Portable test instrument in rugged black case, lid open | `equipment/eq-1` | No model claimed |
| `2.png` | 422×418 | Similar instrument in rugged case, front view | `equipment/eq-2` | No model claimed |
| `3.jpg` | 1156×867 | Test panel: digital meters, selector switches, wiring diagram in door | `equipment/eq-3` | No model claimed; Testing Equipment masthead |
| `4.png` | 150×100 | Multimeter in use at a panel (very small source) | `equipment/eq-4` | No model claimed; shown small |
| `5.png` | 283×283 | Two blue units labelled **"CPC"** and **"CP TD1"** | `equipment/eq-5` | Captioned "CPC 100 with CP TD1 (unit labels visible in photograph)". Matches inventory items 01 (OMICRON tan delta) and 26 (CPC 100). |
| `6.png` | 225×225 | Enclosed transformer unit with copper terminals | `equipment/eq-6` | No model claimed |

### Services "Calibrated Test Kits" gallery (`services/s1/1–10.png`)

Shown on Services `#test-kits` under the original heading, with no claim that SPS owns the items pictured.

| File | Size | Verified subject | Key |
|---|---|---|---|
| `s1/1.png` | 509×258 | OMICRON CMC 356 test set ("CMC 356" visible) | `gallery/kit-01` (also on Testing Equipment `#relay-test-kits`) |
| `s1/2.png` | 517×199 | Three yellow handheld digital multimeters | `gallery/kit-02` |
| `s1/3.png` | 386×200 | Two numerical relays, "ABB" visible | `gallery/kit-03` |
| `s1/4.png` | 233×158 | Numerical relay, large display, "ABB" visible | `gallery/kit-04` |
| `s1/5.png` | 364×206 | Two dark-faced numerical relays | `gallery/kit-05` |
| `s1/6.png` | 602×177 | Two rack-mount numerical relays | `gallery/kit-06` |
| `s1/7.png` | 602×197 | Three numerical relays of different sizes | `gallery/kit-07` |
| `s1/8.png` | 570×204 | Three numerical relays | `gallery/kit-08` |
| `s1/9.png` | 538×183 | Electromechanical relays in transparent cases | `gallery/kit-09` |
| `s1/10.png` | 561×198 | Electromechanical relays | `gallery/kit-10` |

Alt text names a manufacturer only where its name is legible in the photo (ABB, OMICRON CMC 356).

## 3. Customer logos — all 16 original slots

Names are read from the artwork; the original HTML used `alt="brand-1"`…`"brand-16"`. Logos are trimmed of surrounding white or transparent margin and height-capped at 160 px (2× display). **Aspect ratios are never changed.** On screen they are sized by visual area so wide and compact marks carry similar weight.

| Slot | File | Size (orig → optimised) | Verified company | Key |
|---|---|---|---|---|
| 1 | `1-n.png` | 232×128 → 200×128 | Rajiv Gandhi International Airport, Hyderabad (GMR Aero Enterprise) | `customers/c01` |
| 2 | `2-n.png` | 430×146 → 359×126 | Ganpati Sugar Industries Limited | `customers/c02` |
| 3 | `3-n.png` | 146×30 | Blue Star | `customers/c03` |
| 4 | `4-n.png` | 165×69 | AM/NS India | `customers/c04` |
| 5 | `5-n.png` | 143×36 | NAVA | `customers/c05` |
| 6 | `6-n.svg` | vector, 250×100 mm artboard | Voltech ("Excellence in Engineering Products & Services") | `customers/c06.svg`, copied byte-for-byte |
| 7 | `7-n.png` | 1200×428 → 449×160 | Jindal Steel & Power | `customers/c07` |
| 8 | `8-n.png` | **3508×2480** → 434×160 | Nutan Ispat & Power Pvt. Ltd. (source is an A4-size canvas, mostly white) | `customers/c08` |
| 9 | `9-n.png` | 418×179 → 373×108 | Sanvira | `customers/c09` |
| 10 | `10-n.png` | 399×67 | Enmas India | `customers/c10` |
| 11 | `11-n.png` | 91×70 → 90×61 | **Oval monogram reading "apt" with a lightning bolt. Company not confirmed.** Alt text describes the mark. | `customers/c11` |
| 12 | `12-n.png` | 214×50 | Jakson | `customers/c12` |
| 13 | `13.png` | 1386×566 → 532×160 | Amara Raja | `customers/c13` |
| 14 | `14.gif` | 510×47 (static GIF) | Jindal India Thermal Power Ltd. | `customers/c14` (PNG/WebP; spans two cells, as in the original wide slot) |
| 15 | `15.svg` | vector 387×180 | Hindustan Unilever Limited | `customers/c15`, rasterised from the static first frame (below) |
| 16 | `16.gif` | 161×64 (static GIF) | Toshiba | `customers/c16` |

**15.svg note:** the original SVG contains 25 `<animate>` elements that loop a multicolour shimmer across the "U" mark every 8 seconds. In a calm logo grid this is distracting and ignores `prefers-reduced-motion`. `tools/rasterize-svg.mjs` renders the first frame at 3× (300 ms, before the animation starts at 4 s) to `source-original/derived/15-static-frame.png`. The artwork is otherwise unchanged and the original SVG stays in place.

## 4. Original CSS / JS (not used by the new site; kept untouched)

| File | Notes |
|---|---|
| `bootstrap.min.css`, `bootstrap.bundle.js.download` | Bootstrap CSS v5.1.3 and JS bundle v5.3.3 (mismatched versions in the original). Replaced by a small custom stylesheet and script. |
| `boxicons.min.css`, `boxicons(1).min.css` | Icon font CSS (identical files, 68,028 bytes each). The font files themselves were not downloaded. Replaced by inline SVG icons. |
| `styles.css` | Original site styles: Lato, orange `#FF5F00`. Used to understand the original layout only. |

## 5. Referenced by the original but missing or unused

| Reference | Status |
|---|---|
| Homepage `favicon.ico`, `hero-bg.jpg`, `top-services/relay.jpeg` (CSS backgrounds) | Not in the download; fetched from the live site |
| All `assets/services/*` and `services/s1/*` | Not in the download; fetched from the live site |
| `assets/footer/ceo.png` | Fetched; a placeholder avatar, not used |
| Boxicons font files (`.woff2` etc.) | Not downloaded; not needed |

**No referenced image is missing.** Every `<img>` in the built site loads, verified by `tests/qa.mjs` at 3 viewports.

## 6. Stock and licensing note

Several original images look like stock photography: hero-bg, operator, top-services/relay, services/1, 6-1, 6-2, 6-3, 9, 12 and 13. They came from the company's own website, but their licence status is unknown. The new site never captions them as SPS projects, staff or sites, and alt text describes only what is visible. **V1 introduced no new stock photography. V2 added eight credited Wikimedia Commons photos, each labelled "Illustrative photo" (see `photography-manifest.md`).**
