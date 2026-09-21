# Asset register

Updated: 21 September 2026, phase 5.

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
- Clean desktop/mobile landing artwork (including the sliced treatment, without UI/text).
- Our Way hero and Results background originals, including appropriate mobile crops.
- Service-card imagery for each service/project selection.
- Consultation collage/artwork original.
- Testimonial client logos and approved matching quotes/attributions.
- Noticed thumbnails and final entries/destinations.
- Recognition logos and final recognition list.
- Contact desktop/mobile designs and content/functionality requirements.

All photographic/artwork originals will be newly supplied; using existing CMS photography is not the approved sourcing choice. Existing projects may be referenced without changing their bodies or thumbnails.

## Editorial review

- Two partnership principles repeat the same text in the screenshots.
- Results pairs a Nike logo with a Medable attribution.
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
