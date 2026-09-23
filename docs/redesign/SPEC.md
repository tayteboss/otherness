# Otherness redesign — approved specification

Approved 21 September 2026. Implement **one numbered phase per conversation**, then stop and update HANDOFF.md. Do not automatically start the next phase. This document and the supplied reference images are the persistent source of truth; the original conversation is not required.

## Isolation and scope

- Work on `codex/site-redesign`, created from freshly fetched `origin/staging` at `2707efad642d6be8a6c5461351851b10e7bd96f3`. Staging and master matched at branch creation.
- Initial isolation: preserve staging and use a separate, noindex branch preview. **23 September 2026 override:** Tayte explicitly requested promoting the current redesign to the `staging` branch. A normal fast-forward push to staging is authorized; master/production launch remains outside this request.
- Keep Next.js Pages Router, styled-components and Framer Motion; no framework upgrade.
- Keep `/work` and project bodies unchanged: content, layout, typography, filters, media, subprojects and archive behaviour. Apply only the new shared header/footer. **Explicit exception, 23 September 2026:** Tayte requested removing the Work listing’s “Transform your complexities into strengths.” CTA. Join both project groups into one grid with the existing 64px desktop / 32px mobile row gaps; preserve order, card rendering and filtering.
- Add `/our-way`. Redirect `/working-together` permanently **at launch**, not during baseline work. Preserve its old Sanity document for rollback.
- Preserve Conversations, Privacy and other existing routes even when removed from primary navigation.
- Contact uses `/contact` and the supplied 23 September design. Page copy and the Cal.com booking event are hardcoded per Tayte’s request; no contact form or submission backend.

## Sanity architecture

Use the existing `vdwu088q` / `production` dataset with additive redesign singletons, not a cloned dataset. Create a **Website Redesign** Studio group:

| Studio label | Fixed ID and document type | Content |
| --- | --- | --- |
| Home New | `homePageV2` | Loading pairs, landing media/statement, introduction, services, results, Noticed |
| Our Way | `ourWayPage` | Hero, introduction, principles, founder, process, consultation, credentials |
| Redesign Settings | `siteSettingsV2` | Navigation, consultation destination, footer, socials, default SEO |
| Contact (phase 7) | No new document | Hardcoded page/Cal event by explicit 23 September request; shared published settings still supply socials |

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
- Header active links use a solid white rectangle with dark text over dark sections, and dark rectangle with white text over light sections; no underline. Text and fill transition over 300ms (immediate for reduced motion). Our Way wordmark and navigation sample their own visible midpoints against each section, so the menu can switch before the logo at a boundary. Later opaque sections take precedence over the parallax hero.
- Interior/scrolled header: oversized deliberately top-cropped wordmark. Landing starts with a smaller wordmark near the bottom.
- On homepage scroll, transition to the oversized treatment and keep the lower half of the wordmark and navigation locked at the top beyond the landing (Home hero QA instruction, 22 September 2026). Interior pages keep their expanded wordmark and navigation on scroll at desktop and mobile sizes; no compact mode (23 September refinement).
- Crossfade light/dark wordmark colour changes over 300ms; disable this transition for reduced motion.
- Mobile wordmark sits above a full-width Menu bar. Menu panel supports close, Escape, focus trapping/return, route-close behaviour and restored scrolling.
- Mobile interior wordmark uses the same proportional half-height top crop as settled Home, including the 400px width cap; Menu retains the 12px gap. Mobile Our Way process scrollbars are hidden while native horizontal scrolling and snapping remain.
- Mobile menu QA, 23 September 2026: transparent overlay preserves the visible page/wordmark. Close is a black full-width bar with white type; Our Work / Our Way / Contact are centred translucent light bars, 24px side gutters and 8px gaps, with 44px minimum targets. At Home scroll 0, links appear above Close. From any intermediate Home scroll below one viewport, finish scrolling to at least one viewport before opening downward. Already-scrolled Home/interior menus open downward in place. Respect reduced motion and retain native modal focus/scroll behavior. Reference: `references/Menu Open.jpg`. Latest follow-up: mobile menu links use a plain 80% translucent light fill, with no backdrop blur or liquid-glass refraction (removed at Tayte’s request due to entrance jank); reduced transparency uses a solid fill. Close/Escape/link selection fade and slide links 8px toward the trigger over 200ms before releasing the modal; reduced motion closes immediately.
- Footer: dark area, icon, large serif “Let’s work together.”, consultation button, configured social links, copyright, trademark and Privacy.
- Desktop and mobile include a white wordmark/nav strip fixed at the viewport bottom, revealed beneath the scrolling dark footer; a measured spacer reserves its exact height. The shared top header fades as the dark footer moves from 70% to 25% of viewport height; reverse scrolling restores it, with a discrete reduced-motion equivalent.
- Footer socials: Neue Montreal 12px/120%, normal/500, 0.96px tracking, uppercase, 8px vertical/16px horizontal padding. Right-side copy: “© Studio Otherness BV”, “Otherness™ is a trademark of Otherness Holding BV”, Privacy; 40px desktop gaps, 16px mobile gaps. User-approved footer follow-up, 22 September 2026.
- Do not invent a Twitter account from the design; use actual configured social destinations.

## Home sections

### Loading and landing

- Intended release behavior: play intro on first homepage visit **once per browser-tab session**. **Temporary QA override requested 22 September 2026:** replay on every homepage mount and refresh, including return navigation; session storage is no longer read or written. Restore the session gate after Tayte finishes testing. Reduced-motion and missing-pair bypasses remain.
- Three word pairs: Poetry / Power → Strategy / Design → Endurance / Distinction.
- Each pair lasts ~1.5s including soft blur/fade in, readable hold and blur/fade out. Total ~4.5s then fade into landing.
- Start settling the artwork 200ms before the loader finishes fading, from 104% to 100% scale while clearing 6px blur over **1.5s**, so motion is underway at the reveal. Start the centred Baryton phrase at 5.8s (0.7s blur/fade), followed by the icon/wordmark/navigation at 6.5s (0.7s). Both start 0.5s earlier per the latest 23 September request; release intro focus/scroll at 7.2s when the header finishes. Entrance layers are separate from scroll motion. Escape cancels the whole sequence; reduced motion bypasses it. (23 September 2026 timing refinement.)
- Desktop words spread horizontally; mobile words stack in the centre (Loading Mobile.png).
- Use Framer Motion, clear timers, support Escape to bypass (no visible skip button, per Tayte’s phase 5 instruction), honour reduced motion by bypassing timed intro, and never wait indefinitely for media.
- Main content must render independently of animation; an intro error cannot trap the visitor.
- Landing is full-viewport **static supplied artwork**, with desktop/mobile crops, live serif statement “Everything in between is otherness.” and icon/wordmark/nav near bottom.
- Mobile includes the landing and loader; the later supplied Loading Mobile.png and Landing Mobile.png resolve their omission from Home Mobile.png.
- The sliced-artwork effect comes from the clean supplied asset, not animated rebuilt layers.
- Home hero QA motion (strengthened 22 September 2026): move the hero at 65% of normal scroll speed while the next section covers it; progressively scale artwork from 1 to 1.16, blur from 0 to 12px and increase the black overlay from 16% to 30% across one hero height. Fade the centred title to transparent while blurring it up to 12px, finishing just before the rising wordmark reaches it. Use measured logo/title clearance to accommodate mobile wrapping and short viewports; reverse the effect when scrolling back up. Reduced motion disables these scroll effects.

### Introduction

Off-white section with “Own your intersections”, uppercase agency statement and What to expect → linking to `/our-way`. Match mobile heading wrapping and text width.

22 September introduction QA: desktop top padding 196px, heading-to-statement and statement-to-button gaps 64px, bottom padding 128px. Keep mobile outer padding 96px top/64px bottom. Statement width is 448px desktop and up to 350px mobile. Reusable `.heading-small` inside redesign scopes: Neue Montreal, 14px, normal, 700, 148% line-height (20.72px), 0.56px tracking, uppercase. Introduction CTA: 12px padding on all sides, 8px text/arrow gap, 10px normal/700/120% (12px), 0.4px tracking, uppercase. Existing serif heading sizes remain. Screenshot copy has not been published; retain the labelled fallback while the CMS statement is empty.

### Services

- Dark accordion; Branding initially open; one open at a time and open item can close.
- One CMS order across devices: Branding, Strategy, Art direction, Packaging, Digital. Desktop/mobile mockups disagree; the approved default is this order.
- Expanded service contains description, Get in touch → and ordered project cards.
- Horizontal scroll-snap carousel on desktop and mobile, extending to the viewport edge. Desktop cards each span four columns of the twelve-column section grid; 24px gaps throughout. Mobile retains the next-card preview and every card for swipe/scroll. Varied desktop image proportions remain.
- Services QA, 22 September: title starts at column 1; description/button start at column 7, with the symbol at the right edge. Shared redesign `.type-h3`: Baryton 40px/135%, normal/400, -0.4px tracking. `.type-large`: Neue Montreal 18px/150%, normal/400, 0.18px tracking. Literal text `-`/`+`: Baryton 48px/135%, normal/400, -0.96px tracking. These sizes also apply on mobile. Active bottom rule #F7F4F0; inactive #67605A. Paragraph/button gap 32px. Home introduction and Services use shared `.button-primary` sizing (12px padding, 8px gap, Neue Montreal 10px/120%, 700, 0.4px tracking). Shared classes live in the opt-in redesign scope to preserve legacy Work typography.
- Card titles use shared `.heading-small`: Neue Montreal 14px/148%, normal/700, 0.56px tracking, uppercase. Subtitles use shared `.type-h5`: Baryton 20px/130%, normal/400, normal tracking. Image→title and title→subtitle gaps are 10px. Tallest card content→bottom rule clearance is 64px on desktop and mobile.
- Accessible accordion buttons, plus/minus, `aria-expanded`, labelled content regions; project links remain real links.

### Results

- Full-bleed image and readability overlay, client logo, serif quote, client-name tabs.
- Background/logo/quote/client name change together with a 1s fade/blur crossfade. Slides stay stacked so tab and copy layout does not shift.
- Autoplay advances every 5 seconds. The selected tab’s top rule is a linear progress timeline; clicking a tab (or using the keyboard) stops autoplay and holds that slide. Reduced motion disables autoplay and the blur/fade.
- Client logo is 120px wide, height auto. 320px between the Results heading and the logo/quote.
- No attribution field: client name belongs in the tabs; the logo area shows only the logo.
- Preserve tall mobile composition and mobile “Results & social proof” label.
- Mobile Results QA, 23 September 2026: the tallest slide determines a shared responsive stage height. Logos stay top-aligned and quotes bottom-aligned, with exactly 40px from each quote’s bottom to the client tab rule; section height and tabs must not move when the selected slide changes. The selected client/rule always occupies the original centred slot at a 24px inset; following clients cycle to the right. The rail overflows visibly and clips only at the full-width section/viewport edge. Click, keyboard and horizontal swipes loop through results in both directions; user selection pauses autoplay. Keep vertical scrolling and pinch zoom. Desktop stacked height/layout remains unchanged. Reference: `references/results-mobile.jpg`.

### Noticed

- Off-white ordered rows: title, source, year and link.
- Desktop hover/focus shows thumbnail and emphasises active row.
- Mobile initially expands first row; one expanded row at a time with image/details. Title toggles expansion; arrow follows the existing CMS destination (external URLs open a new tab). Details/thumbnail use Services’ 550ms height transition and 500ms blur/fade: expand then fade in, fade out then collapse. Closed content is inert; reduced motion skips transitions. 24px gutters and two equal columns with 18px gap; real long titles wrap naturally. References: `references/noticed.jpg`.
- Mobile footer spacing: 64px top, 96px icon→heading, 64px heading→booking, 96px booking→socials, 64px socials→legal, 16px between legal lines and 24px bottom. Reference: `references/footer-mobile-spacing.png`.
- Use real CMS entries, never repeated Beautiful Minds placeholders.

## Our Way sections (in order)

1. Image hero, white header and centred uppercase positioning statement; no Scroll down button. On entry, image scales 1.04→1 and clears 6px blur over 1.5s, then hero height smoothly changes from 100vh to calc(100vh - 32px) over 800ms. The centred sentence starts a 700ms opacity/8px-blur entrance after 1s. Its scroll fade uses actual header clearance and up to 12px blur, completing before overlap and reversing on scroll-up. After entry, use Home-like 35% slower layer movement, up to 16% image zoom/12px blur and gradual darkening as following sections cover the hero. Reduced motion skips entry/parallax and uses the final height.
2. Large serif sector/client introduction.
3. Partnership section: desktop left heading/founder note, four ruled principles to right. Mobile stacks principles then founder note.
4. Dark process section: four ordered stages/service lists; desktop columns, mobile horizontal track with following stage visible.
5. Taupe consultation section: Become incomparable., supporting text, booking button and artwork; desktop split, mobile text then image.
6. Credentials: founder biography, Services / Notable Clients / Notable Recognition; three desktop columns, stacked mobile lists.
7. Recognition logo strip: gentle loop, pause on interaction, static reduced-motion equivalent.
8. Shared footer.

Our Way QA, 23 September 2026: process services and credentials list entries use the shared Body Large style at all widths: Neue Montreal, normal/400, 18px/150% (27px), 0.18px tracking. The mobile process track retains native horizontal scrolling and touch handling; vertical wheel input uses the page's Lenis smoothing consistently.

Screenshot copy is an editable draft. Review the duplicated principle paragraph, mismatched Nike/Medable testimonial pairing, repeated recognition entries and truncated “...WOR” heading. Do not silently invent approved replacement copy.

## Contact — supplied 23 September 2026

- Reference: `references/Contact.jpg` (1512 × 982). Use the shared oversized cropped header, active Contact navigation, warm paper background, dark icon, centred two-line Baryton heading “Own your / intersections”, and dark “Book a consultation →” CTA.
- Desktop content ends above a compact white social/legal footer; omit the large shared footer CTA and revealed wordmark on this route. Keep real configured social destinations (Instagram, LinkedIn, Email), not the reference’s unconfigured Twitter link. Reuse established legal wording and Privacy.
- Mobile adapts the same content with the existing Menu, 24px gutters, smaller centred heading and stacked footer. No separate mobile Contact reference was supplied.
- Hardcode `otherness/discovery`, namespace `discovery`, `month_view`, event details visible and `useSlotsViewOnSmallScreen: "true"` from the supplied `Logistics Discussion.rtf`. Use its HTML embed with existing Next Script; no new packages or CMS schema required. Preserve supplied query forwarding.
- Contact CTA, Home service “Get in touch” links, Our Way consultation and all shared footer booking buttons open the same Cal.com modal. Contact navigation itself routes to `/contact`.
- Provide keyboard opening, Escape/Close, inert background, Lenis pause/resume, focus restoration and a direct booking-page fallback. Preserve Work bodies, all previous content and staging.
- Acceptance: responsive composition/no overflow, correct navigation, modal opens from every requested location, calendar and available slots load, dismissal restores focus/scroll. **Calendar-in-modal acceptance remains pending**: local in-app browser keeps the remote frame at about:blank; direct Cal booking page shows the event and available times. Do not call this a completed booking test.

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
| 7 Contact | Review new design, specify content/functionality, implement and switch nav | Separately agreed Contact acceptance criteria pass |
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
