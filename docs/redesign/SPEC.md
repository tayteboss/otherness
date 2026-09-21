# Otherness redesign — approved specification

Approved 21 September 2026. Implement **one numbered phase per conversation**, then stop and update HANDOFF.md. Do not automatically start the next phase. This document and the supplied reference images are the persistent source of truth; the original conversation is not required.

## Isolation and scope

- Work on `codex/site-redesign`, created from freshly fetched `origin/staging` at `2707efad642d6be8a6c5461351851b10e7bd96f3`. Staging and master matched at branch creation.
- Preserve staging's branch/deployment. Use a separate, noindex branch preview. Never point a production/staging alias or deploy hook at the redesign during development.
- Keep Next.js Pages Router, styled-components and Framer Motion; no framework upgrade.
- Keep `/work` and project bodies unchanged: content, layout, typography, filters, media, subprojects and archive behaviour. Apply only the new shared header/footer.
- Add `/our-way`. Redirect `/working-together` permanently **at launch**, not during baseline work. Preserve its old Sanity document for rollback.
- Preserve Conversations, Privacy and other existing routes even when removed from primary navigation.
- Contact is deferred pending design. Future route `/contact`; use the current CMS consultation destination for interim Contact navigation. Do not invent a contact form or submission backend.

## Sanity architecture

Use the existing `vdwu088q` / `production` dataset with additive redesign singletons, not a cloned dataset. Create a **Website Redesign** Studio group:

| Studio label | Fixed ID and document type | Content |
| --- | --- | --- |
| Home New | `homePageV2` | Loading pairs, landing media/statement, introduction, services, results, Noticed |
| Our Way | `ourWayPage` | Hero, introduction, principles, founder, process, consultation, credentials |
| Redesign Settings | `siteSettingsV2` | Navigation, consultation destination, footer, socials, default SEO |
| Contact (phase 7) | `contactPage` | Define after receiving its design |

- Query by fixed ID. Never introduce a second `homePage` document: legacy queries select by type without choosing a particular ID.
- Existing Home, Working Together, Site Settings and all projects remain unchanged.
- Enforce singleton structure plus creation/action restrictions; exclude from generic creation lists.
- Use `defineType`, `defineField`, `defineArrayMember`, meaningful grouped fields and stable array `_key`s.
- Use structured sections rather than a general-purpose page builder. Model editorial meaning, not arbitrary styling settings.
- Services, testimonials, Noticed entries, process stages, recognition lists and logos are ordered arrays.
- Services reference existing projects. Redesign-only card image/caption overrides belong to Home New, not project documents.
- New photography/artwork is supplied separately and uploaded as Sanity images with alt text and crop/hotspot support.
- Seed new settings from fresh **published** Sanity settings, never the checked-in JSON. At planning time the current consultation URL was `https://app.tezzera.co/meet/otherness-discovery`; re-read before seeding.
- Keep redesign queries/types separate from legacy Work contracts; do not impose new fields on existing documents.
- Keep build-time publication. Configure a separate redesign preview rebuild destination; inspect deployed Vercel/Sanity hooks before any external changes. Local source inspection alone cannot verify hosted hooks.
- At launch, change the Studio display label Home New to Home while retaining its internal ID and the old documents.

## Design system and shared chrome

Use section references for desktop detail and full-page/mobile references for responsive order and proportion. All screenshots are under `references/` and are design evidence, not production backgrounds.

- Warm off-white / near-black / muted taupe palette, ample negative space, thin rules, rectangular buttons.
- Use serif typography wherever shown in the screenshots. Retain Baryton unless supplied assets establish another serif.
- **Neue Montreal replaces Classic Grotesque Pro** in the redesigned sans-serif text styles: body, navigation, labels, buttons. Font files/weights are still pending. Existing fonts are temporary development fallbacks only.
- Scope new styles to redesigned page/chrome wrappers; never replace Work's global font variables/styles.
- Use the supplied icon and wordmark SVGs in light/dark variants.
- Desktop links: Our Work / Our Way / Contact, with active state.
- Interior/scrolled header: oversized deliberately top-cropped wordmark. Landing starts with a smaller wordmark near the bottom.
- On homepage scroll, transition to the oversized treatment; compact navigation remains sticky when the wordmark leaves view.
- Mobile wordmark sits above a full-width Menu bar. Menu panel supports close, Escape, focus trapping/return, route-close behaviour and restored scrolling.
- Footer: dark area, icon, large serif “Let’s work together.”, consultation button, configured social links, copyright, trademark and Privacy.
- Desktop includes white wordmark/nav strip beneath footer; mobile omits it.
- Do not invent a Twitter account from the design; use actual configured social destinations.

## Home sections

### Loading and landing

- Play intro on first homepage visit **once per browser-tab session**. Do not replay on return navigation or refresh in that session.
- Three word pairs: Poetry / Power → Strategy / Design → Endurance / Distinction.
- Each pair lasts ~1.5s including soft blur/fade in, readable hold and blur/fade out. Total ~4.5s then fade into landing.
- Desktop words spread horizontally; mobile words stack in the centre (Loading Mobile.png).
- Use Framer Motion, clear timers, support Escape to bypass (no visible skip button, per Tayte’s phase 5 instruction), honour reduced motion by bypassing timed intro, and never wait indefinitely for media.
- Main content must render independently of animation; an intro error cannot trap the visitor.
- Landing is full-viewport **static supplied artwork**, with desktop/mobile crops, live serif statement “Everything in between is otherness.” and icon/wordmark/nav near bottom.
- Mobile includes the landing and loader; the later supplied Loading Mobile.png and Landing Mobile.png resolve their omission from Home Mobile.png.
- The sliced-artwork effect comes from the clean supplied asset, not animated rebuilt layers.

### Introduction

Off-white section with “Own your intersections”, uppercase agency statement and What to expect → linking to `/our-way`. Match mobile heading wrapping and text width.

### Services

- Dark accordion; Branding initially open; one open at a time and open item can close.
- One CMS order across devices: Branding, Strategy, Art direction, Packaging, Digital. Desktop/mobile mockups disagree; the approved default is this order.
- Expanded service contains description, Get in touch → and ordered project cards.
- Three desktop cards with varied image proportions. Mobile horizontal track reveals the next card and retains every card for swipe/scroll.
- Accessible accordion buttons, plus/minus, `aria-expanded`, labelled content regions; project links remain real links.

### Results

- Full-bleed image and readability overlay, client logo, serif quote, attribution tabs.
- Background/logo/quote/attribution change together. Touch and keyboard support. No autoplay by default.
- Preserve tall mobile composition and mobile “Results & social proof” label.

### Noticed

- Off-white ordered rows: title, source, year and link.
- Desktop hover/focus shows thumbnail and emphasises active row.
- Mobile initially expands first row; one expanded row at a time with image/details. Expansion control is separate from destination link.
- Use real CMS entries, never repeated Beautiful Minds placeholders.

## Our Way sections (in order)

1. Full-height image hero, white header, centred uppercase positioning statement and Scroll down anchor.
2. Large serif sector/client introduction.
3. Partnership section: desktop left heading/founder note, four ruled principles to right. Mobile stacks principles then founder note.
4. Dark process section: four ordered stages/service lists; desktop columns, mobile horizontal track with following stage visible.
5. Taupe consultation section: Become incomparable., supporting text, booking button and artwork; desktop split, mobile text then image.
6. Credentials: founder biography, Services / Notable Clients / Notable Recognition; three desktop columns, stacked mobile lists.
7. Recognition logo strip: gentle loop, pause on interaction, static reduced-motion equivalent.
8. Shared footer.

Screenshot copy is an editable draft. Review the duplicated principle paragraph, mismatched Nike/Medable testimonial attribution, repeated recognition entries and truncated “...WOR” heading. Do not silently invent approved replacement copy.

## Assets and metadata

- All new photography/artwork originals are to be supplied by Tayte; do not substitute existing CMS photography or crop page screenshots into production artwork.
- Neue Montreal files are pending. Do not add broken font URLs or treat the fallback as approved typography.
- Supplied logos, favicon pack and `og.jpg` are staged under `frontend/public/redesign/`.
- Phase 3 wires the icons/manifest into the document. Manifest must use Otherness name, brand colours and correct icon paths.
- Default OG image: supplied 1200 × 630 JPEG, absolute public URL. Preserve project/article overrides and remove conflicting default tags.
- Missing imagery can use clearly labelled development placeholders, never pass final visual acceptance.

## Phases: separate conversations

| Phase | Work | Exit checkpoint |
| --- | --- | --- |
| 1 Foundation/baseline | Branch, noindex preview foundation, spec/assets checklist, legacy Work baselines, scoped tokens, stage brand files | Isolated local preview, recorded baseline and dependencies |
| 2 Sanity/data | Singleton schemas/group, typed queries, new settings path, seed available copy/project refs, preview rebuild setup | New content editable without changing legacy documents/staging rendering |
| 3 Shared chrome/branding | Header/footer/menu, responsive states, icons, OG defaults | Navigation works; Work body matches baseline |
| 4 Home sections | Introduction/services/results/Noticed with CMS | Responsive content and input behaviour verified |
| 5 Landing/motion | Supplied artwork, loader, session handling, scroll header | Timing/replay/skip/reduced motion/media failure verified |
| 6 Our Way | All sections and responsive tracks, CMS imagery/copy | Desktop/mobile page matches references and is editable |
| 7 Contact (deferred) | Review new design, specify content/functionality, implement and switch nav | Separately agreed Contact acceptance criteria pass |
| 8 QA/launch | Final fonts/artwork/copy, responsive/accessibility/performance/Work checks, release | Approved preview and documented rollout/rollback |

At each phase end update HANDOFF.md, ASSETS.md and VALIDATION.md. Record exact commands/results, known inherited failures, remaining dependencies and the next phase prompt. Finish the current phase only.

## Acceptance and release

- Visual widths: 1512 and 402 reference sizes, plus 375, 768, 1024 and wide desktop. Test crops, wrapping, spacing, intentional tracks and no page-level horizontal overflow.
- Loader: first visit, repeat navigation, refresh, reduced motion, skip and failed media.
- Menu focus/scroll restoration; accordions; results; Noticed links; process/project tracks.
- Work filters, both hero layouts, project/subproject links, videos, archives. Existing bugs are recorded separately, not automatically widened into redesign scope.
- CMS build/rebuild, optional empty fields, missing assets, unresolved references.
- Run frontend/Studio builds and explicit type/lint checks. Current frontend suppresses build-time lint/type errors; a green build is not sufficient.
- Browser testing uses only Codex in-app browser (`iab`).
- Launch only after final approval/dependencies: promote redesign deployment, activate redirect and canonical/indexing policy; keep previous deployment and legacy documents for rollback.
