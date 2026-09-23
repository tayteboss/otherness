# Asset register

Our Way mobile QA, 23 September 2026: `/Users/tayte/Desktop/Screenshot 2026-09-23 at 10.33.54 AM.png` is design evidence for the lower-half wordmark crop only. Existing wordmark SVGs reused; no screenshot pixels used as artwork or CMS/asset changes.

Updated: 22 September 2026, Results fields follow-up.

## Available and staged

| Assets | Repository location | Integration |
| --- | --- | --- |
| Wordmark and icon SVGs | `frontend/public/redesign/brand/` | Integrated; white originals retained, dark derivatives use the same paths |
| Open Graph JPEG, 1200 × 630 | `frontend/public/redesign/brand/og.jpg` | Integrated as absolute default; project/article overrides verified |
| ICO, SVG, PNG 96, Apple 180, manifest PNGs 192/512, webmanifest | `frontend/public/redesign/favicon/` | Integrated in document; paths/name/colours verified |
| 22 desktop/mobile section and full-page screenshots | `docs/redesign/references/` | Reference only; includes late mobile loading/landing images |
| Existing Baryton font family | `frontend/public/fonts/` | Retain serif role |

## Awaiting supply

- Additional Neue Montreal styles only if needed by later designs; core web weights are now ready (see below).
- Separate mobile art direction/crop acceptance if needed; the landing artwork is now published for both image slots (see Home hero QA below).
- Our Way hero and Results background originals, including appropriate mobile crops.
- Service-card imagery for each service/project selection.
- Consultation collage/artwork original.
- Testimonial client logos and approved matching quotes/client names.
- Noticed thumbnails and final entries/destinations.
- Recognition logos and final recognition list.
- Separate Contact mobile reference, only if a different composition is wanted; desktop design and booking requirements arrived 23 September (see below).

All photographic/artwork originals will be newly supplied; using existing CMS photography is not the approved sourcing choice. Existing projects may be referenced without changing their bodies or thumbnails.

## Editorial review

- Two partnership principles repeat the same text in the screenshots.
- Results screenshot pairs a Nike logo with a Medable client name.
- Noticed repeats placeholder titles/source/year.
- Recognition repeats CreativeBoom; confirm intentionality.
- Fourth partnership title is truncated in the section image.
- Social links must use current CMS destinations, not a fabricated Twitter profile.

The exact supplied filenames are preserved in `references/` for easy comparison with the specification. Do not serve these screenshot files as site sections.

## Phase 2 CMS readiness

All required image slots now exist in the redesign schemas with alt text and crop/hotspot support. No image assets were uploaded or copied from legacy content. Published Medable testimonial copy, ten real Noticed entries and existing project references are seeded; their new artwork remains pending. Seeded service selections, founder/process copy, trademark and recognition need editorial review.

## Neue Montreal arrived at phase 2 completion

18 valid font files appeared in `frontend/public/fonts/PPNeueMontreal-*` during the final check. They were supplied independently of this task and remain **untracked, untouched local files**; not yet in the remote preview. Available names: Bold (OTF/TTF), BoldItalic (TTF), Book (OTF/TTF), Italic (OTF/TTF), Light (OTF/TTF), Medium (OTF/TTF), Regular (OTF/TTF), SemiBolditalic (OTF), Thin (OTF/TTF), ThinItalic (OTF/TTF). `file` identifies valid OpenType/TrueType font data. Phase 3 should inspect actual weight/style metadata, choose needed web assets, commit the chosen assets and wire them only into redesign typography. No fonts were integrated in phase 2.

## Phase 3 typography and brand integration

Inspected the actual OS/2 weights and style names of all 18 supplied fonts. Converted **Regular 400**, **Medium 500**, and **Bold 700** OTFs to full-glyph WOFF2 using fontTools/Brotli, without subsetting. Outputs are in `frontend/public/redesign/fonts/` (49,360 / 53,196 / 53,200 bytes); source hashes and mapping are in `validation/phase3-fonts.json`. The 18 original OTF/TTF files remain untouched local supplied files; only the three web assets are committed. No runtime dependency was added.

`redesign-fonts.css` declares the opt-in family. `redesignScope` explicitly applies it to chrome descendants because legacy global rules assign fonts to individual elements. Work's font files, global variables, theme and body styles are unchanged. Baryton remains the footer serif.

`logo-word-dark.svg` and `logo-icon-dark.svg` are colour-only derivatives of the supplied white originals; paths/viewBoxes are identical. The header uses the white wordmark over the temporary legacy homepage hero and dark on interior pages; phase 5 owns the final landing treatment. Trademark remains omitted while its CMS field is empty. Clean artwork and Contact design dependencies are unchanged.

## Phase 4 Home sections

No new production artwork was supplied or added. Service cards, Results backgrounds/client logo and Noticed thumbnails use explicitly labelled development placeholders. Published project names, Medable quote/attribution and ten real Noticed entries are rendered without copying legacy photography. Introduction statement and service descriptions still await publication; optional card captions are omitted while empty. Scoped Neue Montreal and Baryton are used in the new sections. The legacy HomeHero remains an unchanged temporary phase 5 dependency, including its existing media.

`Artwork.tsx` supports responsive CDN widths, editorial crop, hotspot positioning and failure placeholders; optional results mobile art can override desktop art. Final crop/art-direction acceptance requires the pending originals. The local two-result test used clearly named fixture content and existing brand files only; that fixture was removed from frontend routes before building.

## Phase 5 landing and intro

Clean desktop/mobile landing artwork is still pending. The legacy video/photography is no longer rendered on the homepage; a labelled neutral development placeholder fills the landing. Published Home New statement/loading pairs, supplied SVG icon/wordmark and scoped Neue Montreal/Baryton are integrated. The responsive picture supports separate mobile art, CDN widths, editorial crop/hotspot, and image-error fallback. Final artwork/crop/readability acceptance awaits originals. No new artwork, font source, CMS asset or screenshot crop was added.

## Phase 6 Our Way

No new originals were supplied. Hero and consultation artwork use labelled development placeholders; no reference screenshots or legacy photography were used. Our Way hero supports separate desktop/mobile images, responsive widths and editorial crop/hotspot; consultation uses the existing responsive Artwork component. Recognition logos remain pending, so the published page shows a labelled placeholder. Motion validation used supplied Otherness SVGs only in a removed local fixture, not as claimed recognition. Hero statement, sector introduction, partnership heading/founder note/four principles, consultation text and client/recognition lists remain editorial dependencies. The complete published founder biography and four-stage process are rendered; their length/copy differs from the draft screenshots and should be reviewed in Studio. Neue Montreal/Baryton remain scoped to redesigned content. Contact desktop/mobile designs are the next phase's prerequisite.

## Home hero QA — 22 September 2026

Published Home New now supplies `image-cc7a66c030f495015d130543124ff21f07a95e20-2500x1751-jpg` for both desktop and mobile landing slots, with alt text “Home page hero” and no editorial crop/hotspot. The clean sliced artwork is rendered through the existing responsive picture. This task read the existing published asset; it did not upload or mutate CMS content. Other missing artwork/copy remains pending; the current content checker lists 72 issues, down from 76 after the two landing image slots were populated.

## Introduction QA references — 22 September 2026

User supplied Desktop screenshots `Screenshot 2026-09-22 at 2.06.20 PM.png` and `Screenshot 2026-09-22 at 2.07.23 PM.png` as section/button spacing references (original filenames contain a narrow no-break space before PM). Used as design evidence only; no screenshot pixels became production assets. Existing Neue Montreal Bold WOFF2 supplies the requested 700 weight. The published agency statement remains empty; screenshot copy was not published or silently substituted. Other artwork and Contact dependencies remain unchanged.

## Services QA references and publication — 22 September 2026

Supplied Desktop screenshots `Screenshot 2026-09-22 at 2.31.28 PM.png`, `2.34.48 PM.png` and `2.35.40 PM.png` (original filenames use a narrow no-break space) are grid/layout references only. No screenshot pixels were used as production assets. The existing published Home New now contains introduction copy, service descriptions/captions and service artwork; Branding has four cards (Aero, Famille Elastique, Artem Watch Straps, SES Menswear). Existing published images are rendered through Artwork; no CMS writes/uploads occurred. Final artwork crops/curation remain subject to acceptance. Current build reports 38 remaining content issues, principally Results, Noticed, Our Way and trademark; Contact designs remain pending.

## Footer refinement references — 22 September 2026

Tayte supplied `/Users/tayte/Desktop/footer.jpg` and `/Users/tayte/Desktop/Screenshot 2026-09-22 at 4.53.06 PM.png` as footer copy/style and button-padding references. Used only as design evidence; no screenshot pixels are served. Existing Neue Montreal Medium WOFF2 supplies weight 500. Legal text now matches the explicit request in the local frontend; published CMS copyright/trademark values were not changed. Social destinations retain their configured values.

## Mobile menu QA reference — 23 September 2026

Tayte supplied `/Users/tayte/Desktop/Menu Open.jpg`, preserved as `references/Menu Open.jpg`. It is menu design evidence only; no screenshot pixels are served as artwork. Existing Neue Montreal fonts and navigation destinations are reused.

## Mobile Results QA reference — 23 September 2026

Tayte supplied `/Users/tayte/Desktop/results-mobile.jpg`, preserved as `references/results-mobile.jpg`. Used for quote/tab spacing and carousel composition only; not a background asset or approval to replace published copy. Existing CMS quotes, logos and backgrounds remain unchanged.

## Mobile Noticed/footer references — 23 September 2026

`references/noticed.jpg` and `references/footer-mobile-spacing.png` are Tayte’s design references only, copied from the supplied Desktop files. No screenshot pixels are served. Mobile thumbnails use existing legacy Noticed thumbnail URLs; real titles, sources, dates and destinations are preserved, including internal project references. No CMS writes or new artwork.

## Our Way credentials reference — 23 September 2026

`/Users/tayte/Desktop/Home About.jpg` supplied as copy/design reference only; no screenshot pixels used as artwork. Services, clients and recognition text are now seeded exactly in order (including repeated CreativeBoom), without links. Tayte’s five previously published recognition SVGs remain unchanged and load in the local preview. Their existing generic titles/alt labels were not edited. This supersedes earlier notes that recognition logos/lists were absent.

## Our Way hero motion QA — 23 September 2026

Uses the existing published Our Way hero artwork and crop configuration. No new assets, screenshot crops or CMS mutations. Desktop/mobile images were rendered in the in-app browser; final artwork/crop acceptance remains with Tayte.

## Our Way process reference — 23 September 2026

`/Users/tayte/Desktop/process-tgoetehr.jpg` supplied as copy/design reference only. Published the section heading, four stage titles and 17 service items without links. No screenshot pixels uploaded as artwork. Existing process introduction retained under the requested titles/items-only scope.

## Our Way header active-state reference — 23 September 2026

`/Users/tayte/Desktop/Screenshot 2026-09-23 at 10.25.59 AM.png` is active-menu design evidence only. The header now uses its solid contrasting rectangle without an underline. Existing Neue Montreal Regular WOFF2 supplies the requested Body Large 400 weight. No new artwork, font conversion or CMS changes.

## Contact / Cal.com — 23 September 2026

`/Users/tayte/Desktop/Contact.jpg` is preserved as `references/Contact.jpg`; design evidence only. Live page uses existing SVG brand assets, scoped Neue Montreal and Baryton, not screenshot pixels. `/Users/tayte/Downloads/Logistics Discussion.rtf` supplies HTML, React and Atoms alternatives for the same `otherness/discovery` Cal event. Implemented the HTML element-click alternative with no package additions. Hardcoded page/event is explicitly requested; no new Sanity content/schema. Separate mobile design not supplied; responsive adaptation uses established site conventions. Direct event is live (30 minute discovery call, available slots); embedded calendar loading remains an in-app validation blocker.
