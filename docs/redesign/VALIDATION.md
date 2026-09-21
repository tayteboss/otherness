# Phase 1 validation — 21 September 2026

## Passing checks

- Fresh remote fetch completed; redesign branch was created from `origin/staging` at `2707efa`. Staging/master were identical at that point. Branch upstream was removed to avoid accidental pushes to staging.
- Frontend dependency install: `npm ci --legacy-peer-deps --no-audit --no-fund` completed. The installer rewrote yarn.lock incidentally; that generated-only change was restored. Both original lockfiles are unchanged.
- Studio dependency install: `yarn install --frozen-lockfile --ignore-scripts` completed using the existing Yarn lockfile. No package/lock updates were made. See `validation/studio-install.txt` for peer warnings. Studio build verified the resulting installation.
- Frontend: `next build` completed successfully. This intentionally skipped the buildJson pre-step to preserve the baseline tracked settings JSON. See `validation/frontend-build-baseline.txt`. Existing Next config suppresses type/lint failures; this is a compilation/render check, not a clean type/lint result.
- Studio: `SANITY_STUDIO_TELEMETRY_DISABLED=1 yarn build` completed successfully. See `validation/studio-build-baseline.txt`.
- Local development `/work`: HTTP 200 with `X-Robots-Tag: noindex, nofollow, noarchive`.
- Preview classifier: seven environment cases passed (explicit redesign, Vercel preview, staging, development enabled; empty/default, production and explicit zero without another preview signal disabled).
- Manifest: Otherness naming and both icon paths resolve to the staged public assets.
- `git diff --check` passed.
- Legacy page/component/global-style/schema/query/types/settings source files were unchanged. `baselines/legacy-source-sha256.json` records source hashes for comparison in subsequent phases.

## Existing failures, not introduced by the redesign

- Frontend `tsc --noEmit --incremental false`: **13 errors** across legacy files. Exact baseline in `validation/frontend-typecheck-baseline.txt`. Includes media metadata types, Mux props, ES5 iteration, project collaborator type and empty context module. Re-running after phase 1 produced identical output (no added errors).
- Frontend ESLint does not start: `.eslintrc` contains `"arrow-body-style": "always"` rather than a severity/options tuple. Exact output in `validation/frontend-eslint-baseline.txt`. Do not call the lint baseline green.
- Studio `npm ci` fails because package-lock.json does not match package.json (missing existing Sanity plugin entries). Use existing Yarn lockfile; do not silently upgrade dependencies to repair npm's alternate lockfile.
- Studio `tsc --noEmit --incremental false`: **5 errors**, including implicit Rule type, orderable-document-list/Sanity type mismatch and JSX namespace. See `validation/studio-typecheck-baseline.txt`.
- Project pages Medable and Artem show development hydration errors. Medable browser output is saved in `validation/medable-browser-errors.json`; the rendered tree contains nested paragraphs, among other reported mismatches. Error overlay was dismissed for visual baseline capture; the bug was not fixed.
- Legacy layout reads stale checked-in settings: old booking URL and email differ from current published Sanity values. This was intentionally retained in the legacy baseline. New settings must be seeded from fresh CMS data in phase 2.

## Browser baseline

Only Codex in-app browser was used, with viewport overrides reset afterward.

| Route | Capture | Purpose |
| --- | --- | --- |
| `/work` | `baselines/work-desktop.png`, `work-mobile.png` | Listing typography, header, filter controls, first cards |
| `/work/medable` | `baselines/medable-desktop.png`, `medable-mobile.png` | Full-width hero project, intro/services/subprojects |
| `/work/artem` | `baselines/artem-desktop.png`, `artem-mobile.png` | Two-column hero project, intro/services |

Desktop: 1512 × 982. Mobile: 402 × 874. `/work` desktop DOM viewport/document widths were both 1512 (no page overflow observed). Captures are viewport baselines, not full-page approval screenshots. Media frames are dynamic; compare layout/type rather than exact video pixels. Browser panel visibility was disabled for final desktop captures to avoid native-panel clipping.

`baselines/project-inventory.json` records published project hero types and archive flags. Filter interaction, all subproject navigation, video controls, archive redirects and the complete responsive matrix still need dedicated regression tests during shared-chrome/final QA phases. Baseline capture is not a claim that those scenarios all passed.

## Hosting boundary

Local preview isolation/noindex is verified. No hosted preview has been created; no Git push, Vercel link, remote deployment or Sanity hook inspection/mutation has occurred. No Vercel/Sanity connector was available in this session. Phase 2 must inspect actual hosting access/configuration before establishing its dedicated rebuild target. Do not describe deployed hooks as verified based on the local files alone.

## Staged files and next session

New tokens are opt-in exports in `frontend/styles/redesign.ts`, not imported into legacy global styles. Brand files are under `/redesign/` and are not wired into document metadata until phase 3. All 22 design screenshots are in `references/`.

Neue Montreal, new clean artwork and Contact designs remain pending. See ASSETS.md.

# Phase 2 validation — 21 September 2026

- `node studio/scripts/verify-redesign.cjs`: PASS; seven schema types compile, groups resolve, image alt/hotspot configured, Contact excluded.
- `npm run verify:redesign`: PASS; fixed IDs, fresh settings/normalized email, service order, resolved project cards and stable keys, real Noticed links, null assets/documents and unresolved-reference diagnostic; all 182 legacy source hashes match.
- Seed dry-run read fresh published settings revision `9sbb9mCKcoDYNnVJUsvUcN`. First `--apply --cli-auth` created 3 documents; second created 0. All 642 pre-existing non-draft documents retained identical IDs/revisions after both runs.
- Studio build and deployment: PASS; additive schema/config deployed to https://otherness.sanity.studio/.
- `npm run build:redesign`: PASS; 33 routes generated; legacy buildJson skipped; fresh redesign snapshot isolated under ignored `.redesign/`.
- Frontend full typecheck: same 13 inherited errors; no redesign errors. Studio full typecheck: 5 inherited errors (Rule and orderable-list type mismatches); prior JSX-namespace error is no longer reproduced in this installed environment. No added errors.
- Targeted ESLint on new frontend modules/scripts and Studio schema/verification script: PASS using `--no-eslintrc --config frontend/.eslintrc.redesign.cjs`. The legacy ESLint configuration remains invalid.
- Release content check: intentionally FAIL, exit 1, 76 actionable missing copy/artwork/alt fields. Preview builds remain usable. This is not visual acceptance; supplied artwork/font dependencies remain.
- Installed Studio CLI does not support `sanity schema extract`; explicit nullable frontend types plus query/schema checks are used without upgrading dependencies.
- Local Studio origin 3334 was rejected by existing CORS; switched to the already allowed 3333. Browser then reached Sanity sign-in. No CORS or access policy changes were made; authenticated UI editing remains unverified.
- Exact build/type/data outputs are under `validation/phase2-*`. Hosting completion is recorded below after deployment verification.
