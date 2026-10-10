# Content inventory — SPS Engineering Solutions

Reference for content QA. Every meaningful item from the original website, its source, and where it now lives.

## Sources

| Key | File (preserved, unmodified) | Origin |
|---|---|---|
| **HOME** | `source-original/original-homepage-download.html` | Chrome "Save page" of https://spsserviceshyd.in/ (found at `D:\DOWNLOAADS\SPS Engineering Solutions.html`) |
| **HOME-LIVE** | `source-original/original-homepage-live.html` | Fetched from https://spsserviceshyd.in/ on 2026-10-09. Its visible text is **identical** to HOME (programmatic diff: 4,388 characters, 0 differences). |
| **SVC** | `source-original/original-services-live.html` | Fetched from https://spsserviceshyd.in/services on 2026-10-09. Not part of the download; all Services content comes from here. |

The original HTML at `D:\DOWNLOAADS\SPS Engineering Solutions.html` remains untouched.

## How content is stored

All copy lives in `src/data/*.mjs`, not in templates:

- `site.mjs`: company facts, contact details, hero, mission/vision, leadership and careers.
- `services.mjs`: featured services, the 17 homepage service lines, all Services-page sections and tables.
- `equipment.mjs`: the 30-item equipment list, with the exact original text kept as `source` beside each item.
- `customers.mjs`: the 16 customer-logo slots.

`node tests/content-check.mjs` extracts every text fragment from HOME and SVC and confirms it appears in the built site after normalisation. Normalisation ignores case, spacing, punctuation and unit spacing such as "765kv" vs "765 kV".

**Result (latest run):** 193 fragments checked, 177 found verbatim. The other 16 are the deliberate edits in the [edit log](#edit-log) below. None are missing.

---

## 1. Company and global content

| Item | Original content | Source | New location |
|---|---|---|---|
| Company name | SPS Engineering Solutions | HOME `<title>`, footer | Header logo alt text, all page titles, footer, JSON-LD |
| Logo | `logo.png` | HOME nav and footer | Header, footer (on a white plate, as originally), apple-touch-icon, JSON-LD logo |
| Favicon | `assets/common/favicon.ico` | HOME `<link rel=icon>` (live URL) | All pages |
| Positioning heading | We *electrify*, *automate* and *digitalize* the world around us | HOME intro `h2` | Home "Who we are" heading; About masthead H1; footer tagline |
| Hero heading | Keeping Your / System Stable | HOME `#home` | Home hero H1 |
| Hero line | We aim to set the benchmark in the way we "electrify, automate and digitalize" the world around us | HOME `#home` | Home hero lead; About masthead lead |
| Hero CTA | Explore More → /services | HOME | "Explore Our Services" → `/services/` (wording per brief) plus "Contact Our Team" |
| Our Mission | Full paragraph | HOME | Home `#mission`; About `#mission` (verbatim) |
| Our Vision | Full paragraph | HOME | Home `#vision`; About `#vision` (verbatim) |
| Leading the Way | Full paragraph | HOME | Home `#leading`; About `#leading` (first letter capitalised) |
| Copyright | All rights reserved @ SPS Engineering Solutions. | HOME and SVC footer | Footer on every page (verbatim) |

## 2. Leadership, careers, contact

| Item | Original | New location |
|---|---|---|
| Name | VENU GOPAL CHITLA | Home and About `#leadership` (set in title case); Contact page; JSON-LD `employee` |
| Role | MANAGING DIRECTOR | Same |
| Line 1 | Ex General Electric Employee | Same (verbatim) |
| Line 2 | 10+ years of experience in protection field | Same (verbatim) |
| Portrait | `assets/footer/ceo.png` (commented out in source) | **Not used.** The file is a generic avatar icon, not a photograph. See QA open items. |
| Careers text | "Unlock your potential with us! …excellence." | Home and About `#careers`; Contact page careers note (verbatim) |
| Careers CTA | Send Your CV → `mailto:relay@spsserviceshyd.in` | "Send Your CV" mailto (subject pre-filled "CV submission") |
| Location | Hyderabad, India. | Contact band, footer, Contact page, JSON-LD `addressLocality` |
| Phones | +91 9581283853, +91 9052269804 | Contact band, footer, Contact page; `tel:+919581283853`, `tel:+919052269804` |
| Emails | relay@spsserviceshyd.in, spsserviceshyd@gmail.com | Contact band, footer, Contact page; enquiry form recipient = relay@ |

No street address, social accounts, hours or extra contact details were added.

## 3. Homepage "Our Top Services" (HOME `#top-services`)

| Original title | Icon | New location | Description shown |
|---|---|---|---|
| Relay Testing | `relay.png` | Home `#top-services` → `/services/#relay` | Homepage service 1 text (verbatim) |
| Breakers and CT&PT's Testing | `breaker.png` | → `/services/#substation` | Composed from source phrases: homepage service 5 + SVC "Instrument Transformers – CT, PT, CVT" |
| Transformer Testing | `energy.png` | → `/services/#substation` | Composed from the SVC `#substation` transformer line |

The originals were just a title and an icon, with no descriptions. The descriptions shown are built only from existing source wording.

## 4. Homepage "Services We offer" (17 cards)

All 17 appear on Home `#services` in original order and wording. Each links to a real anchor:

| # | Original text (abridged) | Original link | New link |
|---|---|---|---|
| 1 | Testing and Commissioning of Advanced Microprocessor/Numerical Based Protection Relays | /services#relay | /services/#relay |
| 2 | Sales & Supply of Numerical Relays of popular makes … & also Electromechanical relays supply | #sales-relay | #sales-relay |
| 3 | Retrofitting of Old Relays/Electromechanical Relays with Numerical Relays | #retrofit | #retrofit |
| 4 | Testing of Electrical Equipments – Generator, Transformers, Motors, Breakers, CT, PT, Lightning/Surge Arrestors & HT Cables | #substation | #substation |
| 5 | All Types of Breaker Service and Testing | #substation | #breaker-service (cross-links to #substation) |
| 6 | Relay Co-ordination, Load flow Studies, Short circuit Studies, Harmonic Analysis, Arc Flash Study, Energy Auditing | /services (no anchor) | #studies |
| 7 | Testing and Commissioning of Substation Automation Products – RTU's, Bay control units | #sas | #sas |
| 8 | Operation and Maintenance (O & M) – Annual Testing Contracts, Annual Maintenance Contracts & Annual Rate contracts with MNC's | #annual-contract | #annual-contract |
| 9 | Electrical Substation Engineering Activities | #substation-activity | #substation-activity |
| 10 | Installation & Commissioning of Tele communication panels of PLCC, SCADA, RTU, FOTE (SDH/PDH), OLTE, HMI Products | /services | #telecom |
| 11 | Installation, Testing and Commissioning of Phasor Measurement Units (PMU) and Controlled Switching Devices (CSD) for Transmission Substations | #sas | #pmu-csd |
| 12 | Installation, Commissioning & Support of PLC, SCADA, HMI, VFD Drives (AC & DC) Panels for Industrial Automation Process | #relay | #industrial-automation |
| 13 | Renewable Energy Support – Solar Energy | /services | #renewable |
| 14 | Calibration of various Meters | #calibration-meters | #calibration-meters |
| 15 | Thermography | #thermography | #thermography |
| 16 | Supply, Installation & Testing of Advanced Lightning protection systems and maintenance free Earthing | #substation | #lightning-earthing |
| 17 | Customer Training on protection & SAS | #training | #training |

Items 5, 6, 10, 11, 12, 13 and 16 have **no detailed section** on the original Services page. They now appear in the Services page "Further services" section (`#further`), using the homepage wording with nothing added. Several of their original links pointed to unrelated sections; for example, Industrial Automation linked to `#relay`.

## 5. Services page (SVC) — section by section

All sections keep their original order and original anchor IDs (`/services#relay` etc. still resolve).

| # | Original heading | Anchor | Bullets | Image (original) | Notes |
|---|---|---|---|---|---|
| 1 | Testing and Commissioning of Advanced Microprocessor/Numerical Based Protection Relays | `#relay` | 8/8 | `services/1.jpg` | All relay makes kept: ABB/Hitachi, GE/Alstom, SIEMENS, Schneider Electric, SEL, NR Electric, Toshiba, L&T, Easun Reyrolle, Ashida, Avana, JVS, Megawin. All schemes kept: Feeder Management, Distance, Transformer, Busbar, Motor, Generator, Line Differential. 400 V – 765 kV kept. |
| 2 | Calibrated Test Kits used for Testing Protection Relays | `#relay-test-kits` (new; original had none) | 5/5 | `services/2.png` | Sudhershan insulation single-phase kit; CMC 356 OMICRON; Omicron, Megger-MPRT, SMRT, PULSAR, Freja300, PONOVO, ISA; Fluke multimeters; configuration laptops. Also repeated on the Testing Equipment page. |
| 3 | We have good experience on handling following Make Protection Relays and their Software | `#sales-relay` | table 7/7 rows | — | Manufacturer → Software Tool table, verbatim |
| 4 | Calibrated Test Kits | `#test-kits` | gallery 10/10 | `services/s1/1–10.png` | Gallery has no text in the source. Alt text describes what is visible. |
| 5 | Retrofitting of Old Relays/Electromechanical Relays with Numerical Relays | `#retrofit` | 5/5 | `services/5.png` | Protocols IEC 61850 Ed1 & Ed2, DNP3.0, MODBUS, IEC 101, 103, 104 & Courier; scheme drawings; SCADA integration |
| 6 | Testing and Commissioning of Substation Automation System (SAS) Products | `#sas` | 18/18 | `services/6-1.png`, `6-2.png`, `6-3.jpg` | Voltage levels, database, EFS/LIU/FO/OTDR, HMI, Gateway-101/104, BCU/BCPU/RTU, point-to-point, GOOSE, disturbance recorder, ICD/SCD/CID, third-party IEDs, interlocks, SLD/metering, auto-recloser/synchrocheck/CVT-PT selection, protocols, SAT |
| 7 | We are well experienced on working following Make Substation Automation SAS Products and their Softwares | `#sas-software` (new) | table 4/4 rows | — | Manufacturer → SCADA / HMI Software table, verbatim |
| 8 | Erection, Testing & Commissioning of Substation Equipments | `#substation` | 10/10 | `services/7.png` | Two-column list |
| 9 | Operation and Maintenance (O & M) – ATC, AMC & Annual Rate contracts with MNC's | `#annual-contract` | 4/4 | was `services/8.png` (clip-art); now `top-services/relay.jpeg` | CEIG statement kept verbatim |
| 10 | Electrical Substation Engineering Activities | `#substation-activity` | 8/8 | `services/9.png` | AIS & GIS up to 765 kV, BCU/BCPU/RTU, cable schedules, scheme checking, ETAP/E-TAP, CAD/PDF drawings, transformer/CT/PT-CVT sizing, cable tray, earthing layouts, wiring schedule, cable sizing |
| 11 | Calibration of various Meters | `#calibration-meters` | 7/7 | `services/10.jpg` | Two-column list |
| 12 | Customer Training | `#training` | 4/4 + audience 2/2 | `services/12.png` | Includes Sifang. "To Whom we provide Training?" block kept. |
| 13 | Thermo-scanning | `#thermography` | 2/2 | `services/13.jpeg` | Eyebrow reads "Thermography" (the homepage name); heading keeps "Thermo-scanning" |
| 14 | Rental Services | `#rental` | 1/1 | `services/14.png` | The source's second, empty bullet was dropped. Also on the Testing Equipment page `#rental`. |
| — | *(new)* Further services we offer | `#further` | 7 | — | Homepage-only services; see §4 |

### Tables (verbatim)

**Protection relays — Manufacturer / Software Tool:** ABB/Hitachi – PCM 600 · GE/Alstom Grid – Enervista UR & 8-Series Setup for GE Relays, Micom S1 Agile for ALSTOM Relays · SIEMENS – DIGSI4, DIGSI5 · Schneider Electric – EASERGY STUDIO, GBD, Esetup Easergy Pro · SEL-Schweitzer Eng. Laboratories – SURVALENT, ZENON, ACSELERATOR · NR Electric – CSPC · Toshiba – RSM100, GSC1000.

**SAS — Manufacturer / SCADA / HMI Software:** ABB/Hitachi – MICROSCADA · GE/Alstom Grid – A-View, GE Simplicity, DS AGILE · SIEMENS – SICAM PAS, SICAM 230 HMI, WINCC HMI, TOOL BOX II · Schneider Electric – PACIS, ECOSUI, VJEO CITECT.

## 6. Calibrated testing primary equipment (HOME `#equipment`, 30 items)

Shown in full on Home `#equipment` (names and specs) and on `/testing-equipment/` (table with original item numbers).

Each item is split into **Equipment** and **Rating, range or make**. Every word, value and make in the source is preserved. Grouping by test area is editorial and is labelled as such in `equipment.mjs`.

| No. | Original text | Shown as (name · spec) | Category |
|---|---|---|---|
| 01 | Tandelta test Kit upto 12kv, Omicron & Eltel Make. | Tan delta test kit · Up to 12 kV · OMICRON & Eltel make | Insulation & high voltage |
| 02 | Circuit Breaker Analyser (CBA-3000) - ISA make. | Circuit breaker analyser · CBA-3000 · ISA make | Circuit breakers |
| 03 | High potential Testing kit (HI Pot) - 80kv DC / 70kv AC. | High potential testing kit (Hi-Pot) · 80 kV DC / 70 kV AC | Insulation & high voltage |
| 04 | Circuit Breaker Timer – CRM kit. | Circuit breaker timer · CRM kit | Circuit breakers |
| 05 | Sweep Frequency Analyser. | Sweep frequency analyser | Transformers |
| 06 | Winding Resistance meter-10A. | Winding resistance meter · 10 A | Transformers |
| 07 | Earth Resistace meter. | Earth resistance meter (typo fixed) | Measurement |
| 08 | Loading Transformer for primary injection upto 2000A. | Loading transformer for primary injection · Up to 2000 A | Injection |
| 09 | Secondary Injection kit of 50A & 100A. | Secondary injection kit · 50 A & 100 A | Injection |
| 10 | Battery & Hand Operated Megger upto 5kv. | Battery & hand-operated Megger · Up to 5 kV | Insulation & high voltage |
| 11 | Single phase variac/Dimmerstat. | Single-phase variac / dimmerstat | Injection |
| 12 | Multimeters-Fluke. | Multimeters · Fluke | Measurement |
| 13 | Tong tester. | Tong tester | Measurement |
| 14 | CT Clamp meter-to measure mA & mV. | CT clamp meter · To measure mA & mV | Measurement |
| 15 | 1-pole & 3-pole Timers- CB timing test. | 1-pole & 3-pole timers · CB timing test | Circuit breakers |
| 16 | Frequency Generator 45Hz to 55Hz. | Frequency generator · 45 Hz to 55 Hz | Injection |
| 17 | Three phase Shifter-500VA. | Three-phase shifter · 500 VA | Injection |
| 18 | Step-Up Transformer, 1.5KVA, 230v, 5kv. | Step-up transformer · 1.5 kVA, 230 V, 5 kV | Insulation & high voltage |
| 19 | Phase angle meter (3-ph metering). | Phase angle meter · 3-ph metering | Measurement |
| 20 | SF6 Dew point measuring Instrument. | SF6 dew point measuring instrument | Circuit breakers |
| 21 | CT analyser-secondary. | CT analyser · Secondary | Transformers |
| 22 | Thermography Equipment for Temp Scanning. | Thermography equipment · For temperature scanning | Measurement |
| 23 | Leakage current Analyzer (3rd Harmonic test). | Leakage current analyzer · 3rd harmonic test | Insulation & high voltage |
| 24 | 3-ph Harmonic Analyzer. | 3-ph harmonic analyzer | Measurement |
| 25 | Circuit Breaker analyser with DCRM. | Circuit breaker analyser · With DCRM | Circuit breakers |
| 26 | Primary current and Multifunction test kit (CPC 100). | Primary current and multifunction test kit · CPC 100 | Transformers |
| 27 | PT Polarity test kit. | PT polarity test kit | Transformers |
| 28 | Phase Sequence Indicator. | Phase sequence indicator | Measurement |
| 29 | Winding Turns Ratio tester 3-PH. | Winding turns ratio tester · 3-PH | Transformers |
| 30 | Micro Ohm Meter DC current (100A). | Micro ohm meter · DC current (100 A) | Circuit breakers |

Count check: 6 + 6 + 5 + 5 + 8 = **30**.

## 7. Customers

All **16** original logo slots, in original order, on Home `#customers` and `/customers/`. See `asset-manifest.md` §3 for files and identification.

Sector and industry facts on About and Customers are quoted from SVC:

- "We offer Services to Power Generation Plants, Transmission, Distribution & Industries of Various domains."
- Industries list (Cement, Sugar, Steel, Refineries, Power Plants) from the SVC O&M bullet.

## 8. Facts reused as reference strips (no new claims)

| Strip | Facts | Source |
|---|---|---|
| Home hero strip | 400 V to 765 kV control & relay panels; AIS & GIS up to 765 kV; IEC 61850 Ed1 & Ed2, DNP3.0, MODBUS, IEC 101/103/104; 30 instruments | SVC `#relay`, `#substation-activity`, `#sas`; HOME equipment count |
| About "scope" list | Voltage range, substations, SAS voltage levels, protocols, relay makes, ETAP/CAD | SVC `#annual-contract`, `#substation-activity`, `#sas`, `#retrofit`, `#relay` |

There are no counters, statistics, testimonials, certifications, awards or project claims.

---

## V2 refinement: editorial navigation aids (2026-10-10)

These additions help visitors find their way. They add no facts, and all original text is still present (`node tests/content-check.mjs`: 193 fragments, 177 verbatim, the same 16 logged edits as V1, 0 missing).

| Addition | Where | Notes |
|---|---|---|
| Short titles for the 17 homepage service lines (e.g. "Relay retrofitting", "PMU & CSD commissioning") | `overview[].title` in `src/data/services.mjs`; Home `#services` | Each original sentence stays underneath as the description. If the sentence only repeats the title (line 15, "Thermography."), it is not printed twice. |
| Grouping of the 17 lines into 5 disciplines | `overviewGroups` | Protection relays (1–3) · Equipment testing & diagnostics (4, 5, 14, 15, 16) · Automation, SCADA & communication (7, 10–12) · Engineering & power system studies (9, 6) · Maintenance, renewables, training & rental (8, 13, 17). Display numbers 01–19 follow this order; `n` keeps the original position. |
| Two extra homepage entries from the Services page | `overviewGroups[].extra` | "Calibrated relay test kits" (text = original SVC bullet "Three Phase Numerical Secondary Injection Kit – CMC 356 OMICRON energy make.") and "Test kit rental" (text = original SVC rental sentence). |
| "Service group 0X / 05" openers on Services, listing that group's sections | `/services/` | Uses existing group titles and nav labels |
| Heading levels on Services: group h2 → service h3 → audience h4 | `/services/` | Was service h2. Text unchanged. |
| Instrument counts per equipment category ("6 instruments") | Home, Testing Equipment | A count of the source list, as in V1's "30 instruments" |
| "Not specified" in place of "—" for items with no rating in the source | Testing Equipment | The source gives no rating for these 8 items. Nothing was invented. |
| Section labels "Technical capability at a glance", "Complete service range", "Core capability" | About, Home | Headings only. The facts under them are the existing quoted scope facts. |

## Client feedback pass: repetition audit (2026-10-10)

The client said some information felt repeated. All six pages, the 404 page and the shared header, footer and contact band were audited from the rendered text (not just by string search). Each page now has one job: Home introduces and links onward, About holds mission/vision/leadership, Services holds the full technical text, Testing Equipment holds the inventory and rental, Customers holds the logos and sectors, and Contact holds contact details, the form and careers.

**Nothing was deleted from the site.** Each item below keeps its full original text in the location named. `content-check.mjs` after the pass: 193 fragments, 177 verbatim, the same 16 logged edits, **0 missing**. Counts unchanged (19 home service rows, 15 + 7 services, 2 manufacturer tables, 30 instruments, 16 logos). A new browser check fails if any paragraph of 60+ characters appears twice on the same page.

| Repetition found | Resolution | Full text now lives on |
|---|---|---|
| The slogan "electrify, automate and digitalize" appeared 4× on Home (hero lead, intro heading, "Leading the Way", footer) and 3× in the About masthead area (h1, lead, "Leading the Way") | Home intro heading is now "About SPS Engineering Solutions". About lead is now a plain factual summary of the services and sectors (no new claims). The hero, the About h1, "Leading the Way" and the footer tagline keep the slogan. | About (all three statements) |
| Mission, Vision and Leading the Way: full paragraphs duplicated on Home and About | Home shows the **opening sentence** of Mission and Vision with a "Mission, vision and leadership" link to About. "Leading the Way" is shown on About only (it repeats the Home hero line). | About `#mission`, `#vision`, `#leading` |
| Featured card "Relay Testing" and service row 01 printed the identical sentence one section apart. Featured "Breakers…" and row 06 repeated "All Types of Breaker Service and Testing." | A service row omits its sentence when a featured card above already shows it. The row keeps its title and link. | Home featured cards; Services `#relay`, `#breaker-service` |
| "Complete technical detail" button and "All technical services" link both went to `/services/` from adjacent Home sections | One label, "All services", in the Top Services header. The overview lead already explains that every row links to its detail. | — |
| Home customers: "Customers & sectors" link appeared twice (section header and the closing logo cell) | Closing cell keeps the sectors sentence only | — |
| Leadership + careers block identical on Home and About | About shows leadership only (side-by-side layout). Careers lives on Home and Contact. Footer "Careers" link now points to `/contact/#careers` (was `/about/#careers`). | Contact `#careers`, Home |
| About "Who we work with": heading restated the sentence beneath it | Heading is now "Sectors we serve". The sentence is unchanged. | About |
| Customers page: the sectors sentence as the masthead lead **and** in the logo grid, the five sectors twice (dot line in the grid **and** a tag list), and the full O&M paragraph (verbatim duplicate of Services `#annual-contract`) | The masthead has no lead. The grid's closing cell carries the sectors sentence, as on Home. The sectors appear once, as tags. The O&M paragraph is replaced by the link "Operation & maintenance contract details". | Services `#annual-contract` |
| Testing Equipment: all five "Calibrated Test Kits used for Testing Protection Relays" bullets were a verbatim copy of Services `#relay-test-kits` | Equipment keeps the two kit bullets (the instruments themselves) under "Calibrated relay test kits" and links to "Full relay test kit details". Simulators, Fluke multimeters and configuration laptops remain on Services. | Services `#relay-test-kits` |
| Testing Equipment: the masthead lead and inventory lead both said "30 instruments… follow the original equipment list" | The masthead lead is now general. The inventory lead keeps the count and the provenance note, stated once. | Testing Equipment |
| Services: the five service groups were listed 3× before any content (masthead chips, sidebar TOC, and every group opener's chips repeated its own sections) | Masthead chips removed. Group openers show "N services" instead of repeating section links. The TOC (desktop sidebar or mobile "Jump to a service" bar) is the single navigation. | Services TOC |
| Contact form: a notice above the form and the status message after submit both explained the email hand-off | A single helper line sits under the "Send request" button. The required-fields note moved to the top of the form. | Contact |
| Footer "Discuss a Project" button sat directly under the contact band's "Send an enquiry" (same destination) | Footer button removed. The header CTA and the contact band remain. Footer contact details are unchanged (global role). | — |

**Intentionally kept (different purpose):**
- Home service rows that summarise a service which Services then details.
- The three-fact spec band (Home hero) alongside About's fuller "Technical capability at a glance".
- The rental sentence on Home (row 19), Services `#rental` (legacy anchor) and Testing Equipment (with the rental enquiry button).
- The sectors sentence on Services (original bullet), About and the logo grid.
- Footer contact details on every page.

## Edit log

Edits are limited to spacing, capitalisation, unit formatting and obvious typos. The 16 fragments that `tests/content-check.mjs` reports as not verbatim are all listed here.

| Original | Now | Reason |
|---|---|---|
| Nav "About Us", "Contact Us", "Customer" | "About", "Contact", "Customers" | New navigation labels (brief §Phase 4) |
| "Explore More" (hero), "Explore More →" (services) | "Explore Our Services", "Complete technical detail →" | CTA wording per brief |
| Breakers and CT&PT's Testing | Breakers and CT & PT's Testing | Spacing |
| Tandelta test Kit upto 12kv, Omicron & Eltel Make. | Tan delta test kit · Up to 12 kV · OMICRON & Eltel make | Name/spec split, spelling, units |
| Earth Resistace meter. | Earth resistance meter | Typo |
| Secondary Injection kit of 50A & 100A. | Secondary injection kit · 50 A & 100 A | Name/spec split, units |
| Single phase variac/Dimmerstat. | Single-phase variac / dimmerstat | Hyphenation, spacing |
| Thermography Equipment for Temp Scanning. | Thermography equipment · For temperature scanning | Abbreviation expanded |
| Testing of Electromechanical /Auxiliary Relays… | Electromechanical/Auxiliary | Spacing |
| …Equipment & C& R panels… up to 765kV | …& C&R panels… up to 765 kV | Spacing, units |
| Engineering College Students of EEE,ECE Disciplines. We also conduct work Shops | …of EEE, ECE Disciplines. We also conduct workshops. | Spacing, spelling |
| With the thermography services we can detect the faulty locations before happening, these thermography services in India are increasing day by day which results the positive output… | …before happening. These thermography services in India are increasing day by day, which results **in** the positive output… | Sentence split, missing "in" |
| we can detect the amount of heat generating inside the panel then we can analyze… | We can detect the amount of heat generating inside the panel, then we can analyze… | Capitalisation, comma |
| Leading the Way: "we strive…" | "We strive…" | Capitalisation |
| All "…kv", "…v", "…A" values | "kV", "V", "A" with a space | Unit formatting (all numbers unchanged) |
| "upto" | "up to" | Spelling |
| Rental: second empty bullet | Removed | Empty in source |
| VENU GOPAL CHITLA (all caps) | Venu Gopal Chitla | Display casing only |

## Discrepancies recorded for client review (source preserved as-is)

| # | Item | Observation |
|---|---|---|
| D1 | SAS voltage levels "11kV, 33kV, 132kV, 220kV, **440kV**, 765kV" | Indian transmission levels are normally 400 kV; 440 kV may be a typo. Shown as written. |
| D2 | SEL software "SURVALENT, ZENON, ACSELERATOR" | SURVALENT and ZENON are SCADA platforms, not SEL relay tools. Shown as written. |
| D3 | "VJEO CITECT" | Schneider's product is spelt "Vijeo Citect". Shown as written. |
| D4 | "CEIG License No." | The statement is kept, but no licence number is published. Client may wish to add it. |
| D5 | "MFM Global Positioning System" | Unusual phrasing (MFM = multifunction meter?). Shown as written. |
| D6 | Logo alt text "SPS Engineering Services" vs company name "SPS Engineering Solutions" | The new site uses "Solutions" everywhere. |
| D7 | Relay makes differ between lists (e.g. Sifang only in Training; SEL not in Retrofit) | Kept per list, as in source. |
| D8 | Seven homepage services have no detailed Services-page content (§4) | Shown with homepage wording only. Client may supply detail. |
| D9 | Customer slot 11 logo (oval "apt" monogram) | Company name cannot be confirmed from the artwork. Alt text says so. |
