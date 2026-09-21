# Start here — Otherness redesign

## Session rule

**One phase per conversation.** Read SPEC.md, ASSETS.md and VALIDATION.md, implement the requested phase only, update this handoff, then stop. Do not automatically create tasks or begin the following phase.

## Current state

- Branch: `codex/site-redesign`, based on `origin/staging` commit `2707efad642d6be8a6c5461351851b10e7bd96f3`.
- Phases 1–3 implementation is complete. Phases 4–8 are not started.
- This branch is now pushed to the same-named remote branch for its dedicated preview. No upstream is configured. Always use an explicit redesign branch push; never push to staging/master.
- Three additive **published** singletons are seeded in `vdwu088q/production`: `homePageV2`, `ourWayPage`, `siteSettingsV2`. Existing drafts/publications are preserved by idempotent seed tooling. All 642 pre-existing non-draft CMS documents retain their original revisions.
- Additive Studio schemas, Website Redesign group, fixed-ID editors and singleton action/creation restrictions are deployed at https://otherness.sanity.studio/.
- Seven new schema types, separate nullable frontend contracts, fixed-ID queries and a fresh published settings loader are in place. See DATA.md for usage and seed provenance.
- Work bodies, fonts, global styles, legacy schemas/queries/types and checked-in settings JSON are preserved. Verification covers 181 baseline hashes, normalizing only additive shell props in the two Work pages; shared Layout is intentionally replaced.
- Shared header/footer/menu, scoped Neue Montreal web fonts, favicon/manifest and supplied OG default are integrated. Home body sections/landing and Our Way implementation remain future phases.

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

## Next conversation: phase 4 only

Suggested prompt:

> Continue Otherness redesign Phase 4 only on codex/site-redesign. Read docs/redesign/HANDOFF.md, SPEC.md, ASSETS.md, VALIDATION.md and DATA.md. Build the Home introduction, services accordion/project tracks, results switcher and Noticed rows using published homePageV2 data and the existing shared chrome. Preserve Work bodies/fonts/interactions and the isolated noindex preview. Use Neue Montreal only in scoped redesign styles. Use supplied clean assets where available; otherwise clearly labelled development placeholders, never legacy photography or cropped reference screenshots. Implement responsive keyboard/touch behavior, verify nullable content and responsive widths in the in-app browser, update the phase 5 handoff, and stop. Do not implement the phase 5 loader/landing animation or phase 6 Our Way page.

## Future phase boundaries

3 shared chrome/branding → 4 Home sections → 5 landing/intro → 6 Our Way → 7 Contact when designed → 8 final QA/launch. See SPEC.md for approved details. Redirect `/working-together` only at launch.
