# Start here — Otherness redesign

## Session rule

**One phase per conversation.** Read SPEC.md, ASSETS.md and VALIDATION.md, implement the requested phase only, update this handoff, then stop. Do not automatically create tasks or begin the following phase.

## Current state

- Branch: `codex/site-redesign`, based on `origin/staging` commit `2707efad642d6be8a6c5461351851b10e7bd96f3`.
- Phases 1 and 2 implementation is complete. Phases 3–8 are not started.
- This branch is now pushed to the same-named remote branch for its dedicated preview. No upstream is configured. Always use an explicit redesign branch push; never push to staging/master.
- Three additive **published** singletons are seeded in `vdwu088q/production`: `homePageV2`, `ourWayPage`, `siteSettingsV2`. Existing drafts/publications are preserved by idempotent seed tooling. All 642 pre-existing non-draft CMS documents retain their original revisions.
- Additive Studio schemas, Website Redesign group, fixed-ID editors and singleton action/creation restrictions are deployed at https://otherness.sanity.studio/.
- Seven new schema types, separate nullable frontend contracts, fixed-ID queries and a fresh published settings loader are in place. See DATA.md for usage and seed provenance.
- Work/page bodies, global styles, legacy schemas/queries/types and checked-in settings JSON are unchanged: all 182 legacy source hashes match.
- No shared chrome or visual redesign has been integrated yet. The preview still looks like the legacy site, by design for this data phase.

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

## Validation and dependencies

Studio and local frontend builds pass. Targeted lint, schema/GROQ fixture checks, published-data checks, idempotent seeding and legacy preservation pass. Full frontend typecheck still has 13 inherited errors; Studio has the same 5. Global frontend ESLint still cannot load its invalid legacy rule. Existing Medable/Artem development hydration errors remain out of scope.

Seeded service project selections are starting points based on current CMS tags/order; review them before final acceptance. Approved new copy, trademark, principles, recognition, new clean imagery, Neue Montreal files and Contact designs remain pending. See ASSETS.md, DATA.md and exact `validation/phase2-*` outputs.

## Next conversation: phase 3 only

Suggested prompt:

> Continue Otherness redesign Phase 3 only on codex/site-redesign. Read docs/redesign/HANDOFF.md, SPEC.md, ASSETS.md, VALIDATION.md and DATA.md. Implement the shared header/footer and accessible mobile menu using the new published siteSettingsV2 loader, supplied brand SVGs, icons/manifest and OG default. Preserve every Work page body, font, content and interaction; scope redesign styles to chrome. Keep the dedicated noindex preview and existing staging/production deployments isolated. Use only the in-app browser, compare Work against the recorded baseline, record validation and the Phase 4 handoff, then stop.

Phase 3 scope:

1. Wire fresh redesign settings into the shared layout at build time. Preserve legacy page/Work data contracts and project/article metadata overrides.
2. Desktop Our Work / Our Way / Contact navigation; Contact uses current CMS consultation URL until phase 7. `/our-way` page implementation is phase 6; do not fabricate it here. Record temporary routing dependency clearly.
3. Oversized/top-cropped interior wordmark, scrolled/compact navigation treatment; homepage landing integration is phase 5.
4. Accessible mobile menu: close, Escape, focus trap/return, route close and scroll restoration.
5. Dark shared footer with actual social destinations and Privacy; desktop bottom wordmark/nav strip.
6. Wire supplied favicon/manifest/OG defaults, preserving overrides; no conflicting default tags.
7. Keep fallback sans-serif explicitly temporary until Neue Montreal arrives; do not alter Work global font variables.
8. Verify responsive chrome/menu behaviour and Work regression, update handoff, stop.

## Future phase boundaries

3 shared chrome/branding → 4 Home sections → 5 landing/intro → 6 Our Way → 7 Contact when designed → 8 final QA/launch. See SPEC.md for approved details. Redirect `/working-together` only at launch.
