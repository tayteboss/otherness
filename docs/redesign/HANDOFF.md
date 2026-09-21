# Start here — Otherness redesign

## Session rule

**One phase per conversation.** Read SPEC.md, ASSETS.md and VALIDATION.md, implement the requested phase only, update this handoff, then stop. Do not automatically create tasks or begin the following phase.

## Current state

- Branch: `codex/site-redesign`, based on `origin/staging` commit `2707efad642d6be8a6c5461351851b10e7bd96f3`.
- Phases 1–5 implementation is complete. Phases 6–8 are not started.
- This branch is now pushed to the same-named remote branch for its dedicated preview. No upstream is configured. Always use an explicit redesign branch push; never push to staging/master.
- Three additive **published** singletons are seeded in `vdwu088q/production`: `homePageV2`, `ourWayPage`, `siteSettingsV2`. Existing drafts/publications are preserved by idempotent seed tooling. All 642 pre-existing non-draft CMS documents retain their original revisions.
- Additive Studio schemas, Website Redesign group, fixed-ID editors and singleton action/creation restrictions are deployed at https://otherness.sanity.studio/.
- Seven new schema types, separate nullable frontend contracts, fixed-ID queries and a fresh published settings loader are in place. See DATA.md for usage and seed provenance.
- Work bodies, fonts, global styles, legacy schemas/queries/types and checked-in settings JSON are preserved. Verification covers 181 baseline hashes, normalizing only additive shell props in the two Work pages; shared Layout is intentionally replaced.
- Shared header/footer/menu, scoped Neue Montreal web fonts, favicon/manifest and supplied OG default are integrated. Home introduction/services/results/Noticed now render published Home New content. Landing/session intro is implemented; Our Way remains phase 6.

## Local commands

```sh
cd frontend
npm ci --legacy-peer-deps --no-audit --no-fund
# If .env.local is missing, copy .env.redesign.example to .env.local.
npm run dev:redesign
npm run build:redesign
npm run check:redesign
npm run check:redesign:release
npm run verify:redesign
npm run verify:redesign:chrome # after build
```

Local preview is `http://localhost:3010`. Public read-only Sanity config is in `.env.redesign.example`; `.env.local` is ignored. No token is required to read published content. NEVER place a Sanity write token in NEXT_PUBLIC variables.

Both redesign commands bypass legacy `buildJson`. Build diagnostics are written to ignored `frontend/.redesign/content.json`; future page `getStaticProps` should use `getRedesignData` / `getRedesignSettings` from `frontend/lib/redesign/server.ts`. Do not import the stale legacy JSON into new chrome.

`check:redesign:release` intentionally fails with 76 missing copy/artwork/alt fields. Preview builds remain usable. Empty content is nullable; components must use labelled development placeholders where needed and omit optional imagery. No images were copied from legacy content or reference screenshots.

Studio:

```sh
cd studio
yarn install --frozen-lockfile
SANITY_STUDIO_TELEMETRY_DISABLED=1 yarn dev --port 3333
node scripts/verify-redesign.cjs
```

Port 3333 is an existing allowed CORS origin. The authenticated browser UI could not be inspected because the in-app Sanity session was logged out; CLI schema compilation/build/deploy and authenticated data checks passed. Do not claim UI editing was tested. The alternate Studio npm lockfile is still stale.

## Preview hosting and rebuild

- Existing Vercel project `otherness`, team `tayteco-36dd2d0b`, root `frontend`, production branch `master`, Node 24.
- Existing Production → `master` and Staging → `staging` hooks remain unchanged. No Sanity automatic webhooks existed; none were added.
- Added **Website Redesign** Vercel deploy hook for **`codex/site-redesign` only** and a same-named manual deploy entry in Studio's Vercel tool. It reuses the existing Studio Vercel credential in the private `vercel-deploy.*` namespace. No credential or hook URL is committed.
- Branch-local `frontend/vercel.json` selects `npm run build:redesign` and deterministic npm installation. The wrapper forces noindex and uses the deployment's own `VERCEL_BRANCH_URL` / `VERCEL_URL` for canonical/sitemap origin, avoiding staging's inherited SITE_URL.
- Stable preview: https://otherness-git-codex-site-redesign-tayteco-36dd2d0b.vercel.app
- First hosted builds exposed missing legacy peer imports. `@react-spring/three@9.7.3` and `react-is@18.2.0` are now explicit dependencies, using versions already in both lockfiles; no framework or package version upgrades.
- Hosted final validation is recorded in VALIDATION.md.
- Verified staging alias remains on `dpl_EzsX8AUMtSntpbBQNUrH9Q9WDg6N`; public `www.otherness.design` remains on `dpl_2hW8KVM2WdqKzcff48GcNwxsi41B`.

## Phase 3 preview

Implementation commit `6c7605c` is deployed READY as `dpl_DNhdLzJjwpgkmZTt8g6nf7ouiqZE` at the existing stable preview. Hosted chrome/menu/metadata/assets/noindex checks pass. Staging and production retain their original deployment IDs. Documentation/capture follow-up commits contain no application changes.

## Phase 3 implementation notes

- Every concrete static page loads fresh published settings through `getRedesignShellProps()` in `frontend/lib/redesign/shell.ts`. No App.getInitialProps or client settings fetch was added. Keep this additive shell prop on new phase 4/6 pages.
- Shared chrome lives in `frontend/components/redesign/`; Layout keeps the legacy Main and Lenis behavior. Work's historical header footprint remains stable to preserve body positions. Neue Montreal is scoped; never change Work's global font variables.
- Native dialog handles the mobile modal/inert background. Custom focus cycle, Escape, route/resize close, focus return and body/Lenis scroll restoration are verified. Call `lenis.resize()` after unlocking body before restoring its scroll state.
- Current primary nav is Our Work / Our Way / Contact. `/our-way` intentionally remains a **404 until phase 6**. Contact uses fresh published `consultationUrl`. `/working-together` remains 200 with no redirect.
- Legacy homepage duplicate header/menu were removed; a single shared header is present, white over its existing hero. Final small/bottom landing wordmark and scroll choreography are phase 5.
- Footer socials are Instagram, LinkedIn and Email from published settings. Trademark is omitted while null. Copyright is the current CMS value (“Otherness”), not invented legal text.
- One absolute default OG image uses the supplied JPEG and preview build origin. Project overrides remain; article metadata access was corrected to the actual asset shape. All 18 populated overrides pass rendered-HTML verification.
- Original font files remain untouched/untracked. Three converted WOFF2 assets (400/500/700) are committed. See ASSETS.md and `validation/phase3-fonts.json`.
- Both localhost:3010 and the dedicated stable preview were missing from Sanity CORS, breaking legacy filters. Added these two exact origins with credentials disabled; the seven previous origins remain. No content/schema or deploy-hook changes.

## Validation and dependencies

Frontend/Studio builds, targeted lint (including Hooks), data/source preservation and rendered metadata checks pass. Frontend typecheck has **11 inherited errors** (two article metadata errors fixed), Studio still has 5. The invalid global ESLint config and existing project hydration bugs remain. Release content check still reports 76 missing fields.

Responsive checks passed at 375/402/768/1024/1512/1920. Menu keyboard/focus/scroll/route/resize behavior, Work mood/type/reset filtering, archive redirect, Privacy and actual Contact/social destinations were checked in the in-app browser. Phase 1 Medable/Artem desktop baselines were found to be blank transition captures; use source preservation and the new captures, not a claim of exact image matching. Full media/subproject edge cases remain phase 8. See VALIDATION.md for precise limits and outputs.

Approved new copy, trademark, principles, recognition, clean artwork and Contact designs remain pending. Neue Montreal core web weights are ready. Seeded service selections still need review.

## Phase 4 preview

Final application commit `9a5d4ef` is deployed READY as `dpl_7t8MJmVxcFmNPPDCn5HE2z92FakM` at the stable preview. Hosted in-app checks verify the four sections, accordion/Noticed behavior, preview-origin OG metadata and final thumbnail clearance. HTTP 200/noindex confirmed. Staging and public production retain their original deployment IDs. Follow-up documentation/capture changes contain no application changes.

## Phase 4 implementation notes

- `frontend/components/redesign/HomeSections.tsx` and its scoped styles render introduction, services/project tracks, results tabs and Noticed. Homepage loads `homePageV2` through `getRedesignData()` and retains `getRedesignShellProps()` for chrome.
- Branding starts open; one service can open or all can close. CMS ordering is identical on desktop/mobile. Every referenced project remains in the native mobile scroll track; unresolved/archived references render without a link.
- Results switch background, client logo, quote and attribution as one keyed panel. Arrow keys wrap; Home/End select edges; click/tap works; no autoplay. Only one Medable testimonial is currently published. Two-result and null-document behavior was verified with a temporary local fixture (saved as `.tsx.txt` under validation, removed from routes before build).
- Noticed uses all ten real published entries. Desktop hover/focus reveals artwork; mobile starts with the first entry open and keeps expansion separate from navigation. Services/Noticed controls are at least 44px.
- `Artwork.tsx` requests responsive Sanity image widths, applies editorial crop and positions the hotspot. Absent assets/alt or failed images render labelled development placeholders. No legacy artwork was imported into the four new sections; the untouched legacy HomeHero remains only until phase 5.
- Introduction statement, service descriptions/artwork/captions, results artwork/logo and Noticed thumbnails remain editorial dependencies. Optional captions are omitted. No CMS documents, schema, hooks, shared chrome, Work code, font source files or global styles were changed.
- Phase 4 validation passes: builds, targeted lint, metadata, nullable fixtures, six widths, accordion/Noticed keyboard and click behavior, horizontal card scrolling, results keyboard/click switching, real Aero project navigation. Same 11 frontend / 5 Studio type errors and 76 release content issues remain. See VALIDATION.md for limits.
- Legacy HomeHero still includes its old booking URL and a Mux hydration warning; phase 5 replaces that entire hero. No loader/session logic or Our Way route was introduced.

## Phase 5 implementation notes

- `HomeLanding.tsx` replaces legacy HomeHero on `/`; the homepage no longer fetches the legacy Home document or renders its Mux player/old booking link. Published loading pairs/landing statement use the existing Home New contract. Phase 4 sections and all Work bodies/fonts/interactions are unchanged.
- Landing is one static responsive picture with crop/hotspot handling and eager loading. Clean artwork is still absent: an explicit development placeholder is rendered. No screenshot crops or legacy photography were used. Baryton statement, icon and smaller wordmark match the reference positioning.
- `HomeIntro.tsx` uses Framer Motion for three 1.5s blur/fade pairs and a final 0.3s fade. Session storage is marked at admission, so refresh and return navigation do not replay it. Missing pairs, unavailable storage, restored deep scroll and reduced motion bypass it. A timer ends it independently of media/animation callbacks; effect cleanup restores scrolling/focus and cancels timers.
- **Tayte requested removal of the visible Skip intro button during this phase.** It is removed; Escape and reduced-motion bypass remain. SPEC.md records this change. The intro uses a native modal dialog focused on the panel while playing. Main content is server-rendered with initial opacity 1, independently of the intro.
- One shared header/navigation moves from the landing’s bottom position to the oversized top-cropped wordmark, then compact sticky navigation. Home-only CSS/scroll handling leaves the existing interior/Work footprint intact. Scroll listeners are passive and use a single animation frame; resize and motion preference changes are handled and cleaned up.
- Validation: builds, isolated lint, preservation and metadata checks pass. Same 11 frontend / 5 Studio inherited type errors and 76 release-content issues. Six responsive widths, timing, Escape, refresh, return, reduced-motion/storage/null/failed-image fixtures and menu restoration checked using only the in-app browser. See VALIDATION.md for exact boundaries.
- No CMS/schema/hooks/dependencies/font originals/global-style changes. Our Way and Contact were not implemented.

## Phase 5 preview

Application commit `3b62e34` is READY as `dpl_FuWWrzzYDbqeiKktQyCZFfVYLV5N` at the stable redesign preview. Hosted in-app verification confirms the intro has no visible skip control, automatically completes, does not replay on refresh, and renders the mobile landing without overflow. HTTP 200/noindex and one absolute preview-origin OG image pass. Staging and production retain their original deployment IDs. Documentation/capture follow-up commits contain no application changes. Browser viewport overrides were reset; preview remains open. Local server/keep-awake session were stopped. Supplied font originals and the inherited untracked phase 4 capture remain untouched.

## Next conversation: phase 6 only

Suggested prompt:

> Continue Otherness redesign Phase 6 only on codex/site-redesign. Read docs/redesign/HANDOFF.md, SPEC.md, ASSETS.md, VALIDATION.md and DATA.md. Implement /our-way with the approved section order, published Our Way fields, responsive process track, recognition logo loop with pause/reduced-motion handling, and shared shell props. Use supplied clean artwork if available; otherwise labelled development placeholders. Use scoped Neue Montreal/Baryton and the Sanity best-practices skill for schema/query/Studio work. Preserve Home phases 4–5, all Work bodies/fonts/interactions, legacy /working-together and the isolated noindex preview. Do not redirect or implement Contact. Validate the six responsive widths, nullable content, keyboard/touch behavior and reduced motion in the in-app browser; update the phase 7 handoff and stop.

## Future phase boundaries

3 shared chrome/branding → 4 Home sections → 5 landing/intro → 6 Our Way → 7 Contact when designed → 8 final QA/launch. See SPEC.md for approved details. Redirect `/working-together` only at launch.
