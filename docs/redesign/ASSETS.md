# Asset register

Updated: 21 September 2026, phase 2.

## Available and staged

| Assets | Repository location | Integration |
| --- | --- | --- |
| Wordmark and icon SVGs | `frontend/public/redesign/brand/` | Phase 3; originals retained without recolouring |
| Open Graph JPEG, 1200 × 630 | `frontend/public/redesign/brand/og.jpg` | Phase 3; preserve project/article overrides |
| ICO, SVG, PNG 96, Apple 180, manifest PNGs 192/512, webmanifest | `frontend/public/redesign/favicon/` | Phase 3; manifest paths/name/colours corrected |
| 22 desktop/mobile section and full-page screenshots | `docs/redesign/references/` | Reference only; includes late mobile loading/landing images |
| Existing Baryton font family | `frontend/public/fonts/` | Retain serif role |

## Awaiting supply

- Web-ready Neue Montreal variants/weight mapping: OTF/TTF originals arrived locally at phase 2 completion (see below); WOFF2 files are not present. Apply only to redesign styles.
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
