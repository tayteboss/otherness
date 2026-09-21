# Phase 2 data workflow

The deployed Studio is https://otherness.sanity.studio/. Open **Website Redesign** → **Home New**, **Our Way**, or **Redesign Settings**. Fixed document IDs are `homePageV2`, `ourWayPage`, and `siteSettingsV2`. Generic creation, duplication, deletion and unpublish actions are excluded for these types. Existing document menus and schemas are retained.

All content arrays are editorially ordered and carry `_key`. Service project cards reference existing projects; new image/caption fields belong to Home New. Image fields accept alt text, crop and hotspot. New artwork is intentionally absent; do not upload design screenshots or substitute old CMS images.

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
- Result: published Medable quote and matching attribution, without the mismatched Nike logo.
- Noticed: ten existing real titles/sources/years/destinations, with no old thumbnails.
- Our Way: published four-stage process and founder biography. Principles, new introductory/service copy, recognition, trademark and supplied artwork remain editorial dependencies.

## Verification notes

The installed Studio CLI predates `sanity schema extract`; no dependency upgrade was introduced. Query contracts are explicit separate TypeScript interfaces, verified against published results and nullable fixtures. `studio/scripts/verify-redesign.cjs` compiles all seven new schema types with the installed Sanity schema compiler.

The legacy ESLint config cannot load. `.eslintrc.redesign.cjs` provides isolated recommended JavaScript/TypeScript lint checks for the new modules; it does not repair or silence the legacy baseline.

Singleton restrictions follow [Sanity's singleton guide](https://www.sanity.io/guides/singleton-document). Deploy hooks are branch-specific as described in [Vercel's deploy-hook documentation](https://vercel.com/docs/deploy-hooks); hook URLs are credentials and are never committed.
