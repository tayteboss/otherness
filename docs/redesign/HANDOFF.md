# Start here — Otherness redesign

## Session rule

**One phase per conversation.** Tayte explicitly requested separate conversations to avoid losing context. Read SPEC.md, ASSETS.md and VALIDATION.md, implement the next phase only, update this handoff, then stop. Do not depend on the original chat or automatically create other tasks.

## Current state

- Branch: `codex/site-redesign`.
- Base: freshly fetched `origin/staging`, commit `2707efad642d6be8a6c5461351851b10e7bd96f3`.
- No upstream configured on this branch, so an ordinary push cannot accidentally target staging.
- Phase 1 local foundation/baseline is complete; phases 2–8 are not started. Hosted preview provisioning remains for phase 2 and requires inspection of actual hosting access/configuration.
- No CMS writes, Studio deployments, remote pushes, hosted deployments, aliases or deploy hooks have been changed.
- Existing page/header/footer implementations are unchanged. The new assets and design tokens are staged for later integration.

## Local commands

From repository root:

```sh
cd frontend
npm ci --legacy-peer-deps --no-audit --no-fund
# If .env.local is missing, copy .env.redesign.example to .env.local.
npm run dev:redesign
```

Local preview is `http://localhost:3010`. Public read-only Sanity configuration is in `.env.redesign.example`; `.env.local` is ignored. No token is required to read published content. NEVER place a Sanity write token in NEXT_PUBLIC variables.

`dev:redesign` deliberately runs Next directly without refreshing the tracked legacy `json/siteSettings.json`. This keeps the old footer as part of the baseline. Phase 2 must implement the separate fresh redesign settings path. The regular production build script still runs buildJson as before.

Studio installs using its existing Yarn lockfile:

```sh
cd studio
yarn install --frozen-lockfile
```

Its npm lockfile is stale; do not resolve that by silently upgrading the project. Full baseline install/build/check outcomes are in VALIDATION.md.

## Next conversation: phase 2 only

Suggested prompt:

> Continue Otherness redesign Phase 2 only on codex/site-redesign. Read docs/redesign/HANDOFF.md, SPEC.md, ASSETS.md and VALIDATION.md. Implement the Sanity singleton schemas, Studio grouping/restrictions, typed queries and isolated redesign settings path. Use current published Sanity settings; preserve all legacy documents and Work contracts. Review hosted preview/rebuild access before changing any hooks. Record results and the Phase 3 handoff, then stop.

Phase 2 details:

1. Read the Sanity best-practices skill and relevant schema/Studio structure references.
2. Add `homePageV2`, `ourWayPage`, `siteSettingsV2`; do not add Contact until its design phase.
3. Use fixed IDs and query by ID. Group in Website Redesign; prevent duplicate singleton creation/duplication/deletion as appropriate.
4. Define ordered editorial arrays and project references; homepage-only card overrides must not alter project documents.
5. Add separate frontend types and queries; keep legacy queries intact.
6. Freshly query current published settings for seeding. Prepare idempotent create-if-missing seed tooling; do not replace existing content. Use server-only credentials if writes become possible.
7. Establish a dedicated preview rebuild target only after inspecting the actual hosting/hook configuration. Local noindex support is implemented; hosted preview is not provisioned.
8. Make missing new documents/optional assets predictable in development and expose actionable missing-content errors for release checks.
9. Validate Studio build/types, targeted lint/types, query behaviour and legacy document preservation. Document inherited failures separately.

## Future phase boundaries

3 shared chrome/branding → 4 Home sections → 5 landing/intro → 6 Our Way → 7 Contact when designed → 8 final QA/launch. See SPEC.md for every approved detail.

## Dependencies

Neue Montreal files, all new photographic/artwork originals and Contact designs are still pending. Full desktop/mobile references are checked into `references/`. Recheck ASSETS.md before starting visual work; use labelled development placeholders only.
