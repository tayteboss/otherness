# Phase 2 data workflow

The deployed Studio is https://otherness.sanity.studio/. As of 30 September 2026, open **Home Page** (`homePageV2`), **Working Together Page** (`ourWayPage`) or **Site Settings** (`siteSettings`) directly. The Website Redesign folder is removed. Below the orderable project/article lists are **Archive Home Page**, **Archive Working Together Page**, and **Conversations Page**, pointing to their unchanged original documents.

Site Settings now contains the six current settings fields plus every original field in a **Legacy** tab. No previous values were removed or overwritten. The original `siteSettingsV2` remains intact for rollback but is no longer in the main navigation. Frontend queries prefer `siteSettings`, with the old settings document as a pre-migration fallback. Home Page's **Noticed** field is `noticedList`, copied verbatim (including keys, thumbnails and references) from the archived Home. The earlier unused `noticed` draft is retained and hidden. The frontend prefers the active list and respects an intentionally empty list.

The additive migration is `node frontend/scripts/redesign/promote-cms.cjs --cli-auth` (dry run), with `--apply` to execute. It refuses affected unpublished drafts, uses revision guards and set-if-missing patches, and backs up affected documents plus the dataset revision inventory under ignored `frontend/.redesign/`. A second run produces no patches. This migration was applied and Studio deployed; the frontend query changes must be included in the pending website promotion. Older website deployments continue reading the retained original sources.

All content arrays are editorially ordered and carry `_key`. Service project cards reference existing projects; homepage-only image fields belong to Home. Service-card captions now resolve the linked project’s `tagline` (30 September bug fix); legacy Home caption values are retained but hidden and no longer rendered. Image fields accept alt text, crop and hotspot. New artwork is intentionally absent; do not upload design screenshots or substitute old CMS images.

## Frontend consumption

Use `getRedesignData()` or `getRedesignSettings()` from `frontend/lib/redesign/server.ts` in `getStaticProps`. These use uncached published reads, fixed IDs and separate nullable TypeScript contracts. Queries never return draft content, legacy image fallbacks or internal editorial notes. Missing documents return `null`; missing fields/assets remain `null`. Consumers should render labelled development placeholders for absent required imagery, use empty arrays for absent tracks, and omit optional images. An unresolved project is returned as `project: null` with its original `projectId` for diagnosis; do not construct a link from it.

`getRedesignData({release: true})` throws actionable missing-content errors. The release CLI performs the same check. This is a content gate, not final visual/copy approval.

```sh
cd frontend
npm run seed:redesign                  # fresh CMS reads; dry-run only
npm run seed:redesign -- --apply --cli-auth  # existing local Sanity CLI login
# CI alternative: SANITY_WRITE_TOKEN supplied only in the server environment
npm run check:redesign                 # reports incompleteness, exits successfully for preview
npm run check:redesign:release         # nonzero while required content is missing
npm run verify:redesign                # current seed/data and legacy preservation checks
npm run build:redesign
```

Seed tooling only creates missing fixed IDs. Existing published documents and unpublished drafts are skipped, and create-if-missing transactions protect against overwriting concurrent publication. Seed inputs are always freshly fetched published CMS values, never checked-in JSON. `--cli-auth` is explicit and reads the existing local credential without writing it anywhere. No write token is used by the frontend loader.

The separate build writes `.redesign/content.json` (ignored) as a content/diagnostics snapshot. Future page `getStaticProps` should fetch through the loader rather than import this generated file. The redesign build never invokes legacy `buildJson` or changes `json/siteSettings.json`. Ordinary legacy build scripts are unchanged. Vercel's branch-local `frontend/vercel.json` selects the redesign build. Preview canonical/sitemap origin comes from `VERCEL_BRANCH_URL` / `VERCEL_URL`, and `REDESIGN_PREVIEW=1` enforces noindex. Revisit this configuration at launch.

## Seed provenance and editorial limits

- Settings, booking URL, socials and default SEO: current published settings/Home. Bare email normalized to `mailto:`.
- Loading pairs, landing statement, introduction heading, service order and Our Way destination: approved redesign specification.
- Up to three cards per service: existing published non-archived projects, current service tags and CMS order. These are editable starting selections, not approved final curation. No project documents or images are changed.
- Result: published Medable quote and client name, without the mismatched Nike logo. Attribution is not part of the contract.
- Noticed: ten existing real titles/sources/years/destinations, with no old thumbnails.
- Our Way: published four-stage process and founder biography. Principles, new introductory/service copy, recognition, trademark and supplied artwork remain editorial dependencies.

## Verification notes

The installed Studio CLI predates `sanity schema extract`; no dependency upgrade was introduced. Query contracts are explicit separate TypeScript interfaces, verified against published results and nullable fixtures. `studio/scripts/verify-redesign.cjs` compiles all seven new schema types with the installed Sanity schema compiler.

The legacy ESLint config cannot load. `.eslintrc.redesign.cjs` provides isolated recommended JavaScript/TypeScript lint checks for the new modules; it does not repair or silence the legacy baseline.

Singleton restrictions follow [Sanity's singleton guide](https://www.sanity.io/guides/singleton-document). Deploy hooks are branch-specific as described in [Vercel's deploy-hook documentation](https://vercel.com/docs/deploy-hooks); hook URLs are credentials and are never committed.

## Hosted rebuild operation

In the Studio Vercel tool choose **Website Redesign** to rebuild only `codex/site-redesign`. The existing **Staging** and **Production** entries are retained. Publishing CMS changes alone does not trigger a deployment; this keeps the existing manual publication workflow. The redesign hook was tested through a successful READY build. Stable preview: https://otherness-git-codex-site-redesign-tayteco-36dd2d0b.vercel.app.

The clean hosted install required explicit `@react-spring/three@9.7.3` and `react-is@18.2.0` dependencies already present in the locks. Their versions were not changed. The original global type/lint failures still require separate work; use the recorded baseline when assessing regressions.

## Contact booking override — 23 September 2026

The frontend hardcodes Cal.com `otherness/discovery` via `ConsultationLink.tsx` at Tayte’s request. Shared booking CTAs and Home service links no longer use `siteSettingsV2.consultationUrl`; the existing field/documents remain intact for rollback. Primary Contact navigation now targets `/contact`. Contact copy is local; footer socials still use fresh published settings. No `contactPage` schema/document was created.
