# QA checklist: SPS Engineering Solutions

**Last run:** 2026-10-10 (client-feedback pass: "Send request", repetition audit, UI polish; previously V2 design refinement) against `npm start` (http://localhost:4173), Chromium via Playwright.

Reproduce:

```
npm start                       # terminal 1: build + serve
node tests/qa.mjs --shots       # terminal 2: browser QA (+ screenshots in docs/screenshots/)
node tests/content-check.mjs    # content preservation vs. original HTML
```

Legend: ✅ verified (automated or by inspection, as stated) · ⚠️ verified, with an open item for the client · ❌ not done

**Result of the final run:** `tests/qa.mjs --shots`: **198 checks, 0 problems** ("All browser QA checks passed"). `content-check.mjs`: 193 fragments, 177 verbatim, the same 16 logged edits, **0 missing**.

## What the client-feedback pass changed in testing

- **Enquiry form, now at 1440 and 390:**
  - the submit button reads exactly "Send request" and is visible
  - the hand-off helper text is visible
  - an empty submit flags the 3 required fields
  - an invalid email is rejected
  - entered values are kept after failed validation
  - a valid submit composes a `mailto:relay@spsserviceshyd.in?subject=Project enquiry…` URL containing the entered details (captured from the browser's navigation attempt)
  - the status message makes no delivery claim
  - the form is not cleared afterwards
- **Repetition guard:** on every page, no paragraph, list item or table cell of 60+ characters may appear twice on the same page.
- **Anchor landings, checked by script at 1440 and 390:**
  - `/services/#sas`
  - `/testing-equipment/#insulation`
  - `/contact/#enquiry`
  - `/#customers`

  All four land below the sticky header, and below the category bar or TOC bar where present.
- **Internal links:** 157 instances, 0 broken. This is down from 162 because the Services masthead and group-opener chip links were removed as duplicate navigation.
- **Deduplication record:** see `content-inventory.md`, "Client feedback pass: repetition audit".

## What V2 changed in testing

- **Viewports:** now **1440 / 1024 / 768 / 390 / 360** (V1: 1440 / 834 / 390). Screenshots are taken at 1440, 768 and 390.
- **New automated checks:**
  - minimum computed font sizes per role (reading text, service descriptions, table cells and headers, labels, nav)
  - web fonts loaded
  - content counts
  - a visible credit for every third-party photo
  - keyboard focus ring on first Tab
  - all pages static under `prefers-reduced-motion`

## Content preservation

| Check | Result | Evidence |
|---|---|---|
| All 17 original homepage service lines | ✅ | Home `#services`: 19 cards (17 lines + test-kit and rental entries from the Services page), **automated count**. Original sentences verbatim (content-check). Grouping and short titles logged in `content-inventory.md` (V2 section). |
| Every Services-page section | ✅ | 15 `section.svc` (13 original + 2 tables) and 7 further services, **automated count**. Both manufacturer tables present (2), **automated**. |
| Every technical description | ✅ | `content-check.mjs`: 0 missing, same 16 logged edits as V1 |
| 30 instruments with all specs | ✅ | Testing Equipment: 30 table rows, **automated count**. Category totals 6+6+5+5+8. Spec strings unchanged in `equipment.mjs`. 8 unrated items now read "Not specified" instead of "—". |
| 16 customer logos | ✅ / ⚠️ | 16 on Home and 16 on Customers, **automated count**. Original files, never recoloured or distorted. Slot 11 name still unconfirmed (D9). |
| Phone numbers and emails | ✅ | Automated: every `tel:` is one of the 2 originals and every `mailto:` one of the 2 originals, on all pages |
| Leadership | ⚠️ | Name, role and both lines verbatim. No portrait (none exists); none invented. |
| No unsupported claims | ✅ | Manual review of all V2 copy. New text is limited to navigation labels and section headings (listed in `content-inventory.md`). No statistics, testimonials, certifications or project claims. One V2 lead initially said specs were shown "exactly as listed"; reworded to "follow the original SPS equipment list" because units were normalised in V1. |
| Original downloaded files untouched | ✅ | Originals in the workspace root and `source-original/` were not modified. New photographs are stored separately in `source-photography/`. |

## Functionality

| Check | Result | Evidence |
|---|---|---|
| Build | ✅ | `npm run build`: 7 pages + sitemap + robots |
| 6 pages return 200; unknown URL returns styled 404 | ✅ | Automated at 5 viewports. 404 also inspected visually (spacing fixed). |
| Internal links and `#anchors` | ✅ | **157** link instances checked (client-feedback pass; 162 in V2), 0 broken (includes every service card, group chip, TOC entry and equipment category link) |
| Legacy URLs (`/services`, `/services#relay`, `#sas`, `#rental`, `/#customers`, `/#contact`, `/#services`, `/#equipment`) | ✅ | Automated |
| Images load | ✅ | 0 broken at every page × viewport. One V2 regression was caught here (About photo hidden on mobile never loaded) and fixed. |
| Console and network errors | ✅ | 0 across 30 page loads. On the 404 URL, Chromium logs the intended 404 document status; that is expected. |
| Mobile menu | ✅ | Opens, `aria-expanded`, focus trap, Esc closes; automated at 1024/768/390/360 |
| Enquiry form ("Send request") | ✅ / ⚠️ | Automated at 1440 and 390: label, helper text, 3 required-field errors, invalid email rejected, input kept after errors, `mailto:` composed with subject and details, status message with no delivery claim, input kept after hand-off. Still no backend (open item 4). The page never says the request was sent; it says the email application should now be open. |
| Services TOC | ✅ | Desktop: sticky, with scroll-spy. ≤1080 px: sticky "Jump to a service" bar shows the current section, closes on selection or Esc. Inspected at 390 px. |
| Equipment category bar | ✅ | Sticky under the header, scroll-spy highlight; horizontal scroll on small screens. Anchor offsets account for header + bar. Inspected at 1440/390. |

## Typography and readability (V2)

| Check | Result | Evidence |
|---|---|---|
| Reading text ≥ 15 px, service descriptions ≥ 16 px, table cells ≥ 15 px, table headers ≥ 13 px, labels ≥ 12.5 px, nav ≥ 15 px | ✅ | Automated (computed `font-size`) on all 6 pages at all 5 widths. At 1440 px: body 18, descriptions/tables 17, table headers 14, labels 13, nav 15.5, specs 15.5. |
| Web fonts load | ✅ | Automated `document.fonts.check`: Inter, Manrope, and IBM Plex Mono on pages that use it |
| Tables never shrink to fit on phones | ✅ | Inventory rows restack (no. + name, then labelled rating) at full size; manufacturer tables restack as label/value. Inspected at 390 px. |
| Desktop sizes at 1440 match targets | ✅ | Hero 68, inner h1 56, h2 42, service titles ~28, cards ~22, body 18 (computed from the tokens; see `design-system.md`) |

## Responsive (1440 / 1024 / 768 / 390 / 360)

| Check | Result | Notes |
|---|---|---|
| No horizontal page overflow | ✅ | Automated, every page at every width. One V2 regression was caught (Services at 390/360: grid column grew to the table's min-content) and fixed with `minmax(0,1fr)`. |
| Visual inspection | ✅ | Viewport-by-viewport captures at 1440 (all pages) and 390 (all pages). Issues found and fixed: clipped featured icon, misaligned card bottoms from credit lines, ambiguous zero-padded counts, two-line TOC summary, cramped About service areas, 404 spacing. |
| Screenshots | ✅ | `docs/screenshots/{desktop,tablet,mobile}-*.png`: 18 full-page captures (1440, 768, 390), regenerated after the client-feedback pass. Contact captures show the form after the automated hand-off test (filled fields and status message). |

## Accessibility

| Check | Result |
|---|---|
| One `<h1>` per page | ✅ Automated |
| Heading order on Services (group h2 → service h3 → audience h4) | ✅ Manual review |
| Skip link + visible focus ring | ✅ Automated: first Tab focuses the skip link with a ≥ 2 px outline, on all pages |
| Contrast (computed WCAG) | ✅ Supporting text `#4f5959`: 7.2:1 white, 6.6:1 ivory, 5.7:1 stone. Tertiary `#5f6969`: 5.7:1 white. Green `#3b6b1f`: 5.0:1 (stone) to 6.3:1 (white), 5.6:1 on the tint. Bright green: 5.4:1 slate, 7.7:1 graphite. |
| Touch targets | ✅ Nav, TOC, chips, buttons and form fields 40–56 px |
| `prefers-reduced-motion` | ✅ Automated on all 6 pages: no `motion-ready` class, 0 hidden `.reveal`, `scroll-behavior: auto` |
| Hover never the only route to information | ✅ Every hover effect decorates a visible link; nothing is hover-revealed |

## Imagery and licensing (V2)

| Check | Result | Evidence |
|---|---|---|
| Third-party photos downloaded and inspected | ✅ | 8 Wikimedia Commons files, inspected visually; licences read from Commons metadata. See `photography-manifest.md`. |
| Every third-party photo credited on the page | ✅ | Automated on all 6 pages |
| No third-party photo presented as SPS work | ✅ | All labelled "Illustrative photo" |
| Responsive sizes and lazy loading | ✅ | 640/960/1280/1920 WebP + JPG fallback via `srcset`. Mastheads load eagerly; everything else is lazy. |

## Client-feedback pass: UI review (2026-10-10)

The review method was full-page and cropped captures at 1440 and 390, plus the automated checks at 1440, 1024, 768, 390 and 360.

**Fixed:**
- **Home service list:** removing duplicated sentences left empty cards, so the list is now rows (number · title · sentence · arrow). This also ends the uneven 2-column card heights.
- **About service-area cards:** they now stretch, so bottoms align in each row.
- **About leadership:** shown alone, the block had a large empty right half. It now uses a two-column layout.
- **Customers logo grid:** the closing cell had become an empty stone block; it now carries the sectors sentence, as on Home.
- **Home intro:** the "Mission, vision and leadership" link aligns with the statement text.
- **Contact:** the hand-off helper sits under the button, and the required-fields note is at the top of the form.

**Caught during the pass:** a CSS edit left an unclosed `@media` block, which removed all styling below the masthead rules. It was visible on the Contact capture and fixed before the final run.

**Reviewed and left unchanged:**
- **CTA casing:** "Explore Our Services", "Contact Our Team", "Discuss a Project" and "Send Your CV" are title case because the brief or original site specified them. "Send request" uses the client's own wording. See open item 9.
- **Credit overlays:** on the two featured photos they wrap to two lines at some widths but stay legible.

## Performance (localhost transfer, Chromium; not a field test; measured in V2, not re-measured in the feedback pass: no images were added and only markup was removed)

| Page | 1440 px | 390 px |
|---|---|---|
| Home | 826 KB / 16 requests (V1: 732 KB) | 519 KB (V1: 373 KB) |
| About | 563 KB / 11 requests | 406 KB |
| Services | 504 KB / 12 requests (V1: 489 KB) | 373 KB (V1: 362 KB) |
| Testing Equipment | 258 KB / 9 requests | 225 KB |

The Home increase comes from the new featured-service and contact-band photographs. About was 790 KB before a 960 px variant was added (the masthead had jumped from 640 to 1280 px). No Lighthouse or field metrics were run.

---

## Open items requiring client attention

1. **Leadership portrait:** none exists. None invented.
2. **Customer slot 11:** oval "apt" monogram; company name unconfirmed.
3. **Original photo and logo permissions:** licence status of the photographs taken from the original site (hero, technician, SAS, training, thermography) is unknown.
4. **Enquiry form delivery:** opens the visitor's email app. A form endpoint is needed for direct submission.
5. **Source discrepancies (D1–D8):** "440 kV", SURVALENT/ZENON under SEL, "VJEO CITECT", CEIG licence number not published, "MFM Global Positioning System", and seven homepage services without detailed descriptions.
6. **Deployment:** canonical URLs assume `https://spsserviceshyd.in` with folder routes.
7. **New in V2, third-party photography:** confirm the client is comfortable with 8 credited illustrative photos (CC0 / CC BY / CC BY-SA). Authentic SPS project photographs would be preferable wherever available.
8. **New in V2, service grouping and short titles:** please review the five discipline groups and the short service titles on the homepage. They are editorial and easy to change in `src/data/services.mjs`.
9. **CTA wording and casing:** labels are mixed: "Discuss a Project" (title case, per brief) and "Send request" (client's wording). Please confirm whether to standardise all buttons to sentence case ("Discuss a project", "Explore our services", "Send your CV").
10. **Contact band vs header CTA:** both lead to the enquiry form, labelled "Send an enquiry" (matching the form's heading) and "Discuss a Project". Please confirm whether they should share one label.
