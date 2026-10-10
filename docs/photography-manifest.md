# Photography manifest: third-party images

The original SPS assets remain the factual and identity foundation of the site: logo, customer logos, equipment photographs, test-kit gallery and service photographs (see `asset-manifest.md`). Eight third-party photographs were added in the V2 refinement. They fill gaps where no suitable original existed, or where the original was too small or off-subject for a large placement.

## How they were sourced

- **Source:** Wikimedia Commons only. Candidates were found with the Commons API and judged visually from 800 px previews; about 45 were reviewed.
- **Licence data:** read from each file's Commons `extmetadata` (LicenseShortName, LicenseUrl, Artist) by `tools/fetch-photography.py`, not typed by hand. The record is in `source-photography/credits.json`.
- **Download:** official Commons rendition URLs (2560 px request; Commons served originals or near-originals). Files are saved untouched in `source-photography/`.
- **Optimisation:** `tools/optimize-images.py` writes WebP at 640/960/1280/1920 px plus a JPG fallback to `public/assets/img/photography/`. Crops are display-only (`object-fit`); source pixels are not altered.
- **Rejected sources:** paid stock (Getty, Adobe, Shutterstock), sites with ambiguous terms (Freepik/Magnific, Vista), and Unsplash (its API is not reachable without a key). No thumbnails or hotlinked URLs are used.

## Attribution policy (on the site)

Every third-party photo carries a visible credit next to it:

> Illustrative photo · *Author* / Wikimedia Commons · *Licence (linked)*

- **"Illustrative photo":** makes clear the image does not show SPS staff, sites or projects. No caption claims otherwise.
- **CC0 images:** credited too, as a courtesy.
- **CC BY-SA images:** used unmodified apart from display cropping. If they are ever edited (recoloured or composited), the edited file must also be released under CC BY-SA.
- **Browser QA:** `tests/qa.mjs` fails if any `/photography/` image on a page lacks a credit.

## Files

| Key / filename | Subject (verified visually) | Section | Original size | Licence | Author | Source | Status |
|---|---|---|---|---|---|---|---|
| `hv-circuit-breakers` | Outdoor HV circuit breakers, Pont-l'Abbé substation | Home: "Breakers and CT & PT's Testing" card | 3917×2881 | CC0 | PtiBzh | [Commons](https://commons.wikimedia.org/wiki/File:Pont-l%27Abb%C3%A9_high-voltage_substation_13_-_Circuits_breaker.jpg) | Downloaded, optimised, credited |
| `power-transformer-yard` | Oil-filled power transformer with bushings and radiators | Home: "Transformer Testing" card | 4896×3672 | CC BY-SA 4.0 | Yoshieslunchbox | [Commons](https://commons.wikimedia.org/wiki/File:Substation_Power_Transformer_1.jpg) | Downloaded, optimised, credited |
| `gis-420kv` | 420 kV gas-insulated switchgear | Services: group 03 opener (Substation Equipment, O&M and Engineering) | 2560×1920 | CC BY-SA 3.0 | Dingy | [Commons](https://commons.wikimedia.org/wiki/File:GIS_420kV.jpg) | Downloaded, optimised, credited |
| `relay-panels` | Control & relay panels, co-generation plant, Maharashtra, India | Services: group 01 opener (Protection Relays); About: "Who we work with" | 2592×1728 | CC BY-SA 3.0 | Shailesh_telang | [Commons](https://commons.wikimedia.org/wiki/File:Electrical_panels_at_co-generation_plant_at_Maharashtra,_India.jpg) | Downloaded, optimised, credited |
| `scada-control-room` | SCADA control room with operator consoles | Services: group 02 opener (Substation Automation) | 3798×2848 | CC BY-SA 4.0 | Z22 | [Commons](https://commons.wikimedia.org/wiki/File:NEWater_S.C.A.D.A._room.jpg) | Downloaded, optimised, credited |
| `switchyard-gantries` | HV switchyard with lattice gantries | Services masthead | 3648×2736 | CC0 | Novoklimov | [Commons](https://commons.wikimedia.org/wiki/File:High_voltage_switchgear.jpg) | Downloaded, optimised, credited |
| `aerial-breaker-bay` | Aerial view of a 230 kV breaker bay | About masthead | 4032×3024 | CC0 | Rsparks3 | [Commons](https://commons.wikimedia.org/wiki/File:230kV_circuit_breaker.jpg) | Downloaded, optimised, credited |
| `transmission-sunset` | Transmission towers at sunset | Contact band (all pages except Contact) | 6960×4640 | CC BY 4.0 | Kkiefuik | [Commons](https://commons.wikimedia.org/wiki/File:Transmission_Lines_at_Sunset.jpg) | Downloaded, optimised, credited |

The `Kkiefuik` credit is a display override: the Commons Artist field also contains camera notes ("This photo was taken with Canon EOS 90D"). The raw value is kept as `authorRaw` in `credits.json`.

## Placement decisions

| Page | Decision |
|---|---|
| Home | Hero keeps the original SPS substation photo. The three featured services now use photographs: the original relay-commissioning photo, plus two new photos for breakers and transformers, which had only line icons before. The original icons stay as badges. The full service list is typographic on purpose. The contact band gains a very dark transmission-line photo for warmth. |
| About | Aerial switchyard masthead, so it no longer repeats the technician photo used on Home. The technician moves to the Purpose section. The relay-panel photo supports "Who we work with". |
| Services | New masthead (no longer the Home hero repeated). Photos appear only in the three group openers where they clarify the discipline. Each technical section keeps its original SPS image. |
| Testing Equipment | No new imagery. The original equipment photographs and the readable inventory take priority. |
| Customers | No new imagery. Only the 16 original logos. |
| Contact | No new imagery. Focused on contact details and the form. |

## Rejected candidates (examples)

| Candidate | Reason |
|---|---|
| NYC MTA "Systems testing…" series (CC BY 2.0) | Relevant subject, but documentary snapshots with burned-in date stamps, below the art-direction standard |
| Indian substation gates/compound photos (Chillakallu, Patigadda, Daltonganj) | Weak composition (walls, roads, fences) |
| "Power Transformer 02/03" | Despite the title, they show an old brick building with overhead lines |
| Commons "protection relay" results | Mostly small speaker or signal relays, not power-system protection relays |
| "Relay protection (Релейная защита)" | Terminal-block close-up, not legible as relay protection |

## Open items

- Before launch the client should confirm they are comfortable using third-party illustrative photography alongside their own. Any image can be replaced by an authentic SPS project photograph by swapping the key in `src/data/services.mjs` or the page module.
- Licence status of the **original** site photography (hero, technician, SAS, training, thermography) is still unknown. See `qa-checklist.md`, open item 3.
