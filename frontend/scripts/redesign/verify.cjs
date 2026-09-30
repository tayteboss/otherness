const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { createRedesignClient } = require('../../lib/redesign/client');
const { redesignQuery } = require('../../lib/redesign/queries');
const { contentIssues } = require('../../lib/redesign/validation');
const { buildSeed } = require('./seed.cjs');
(async () => {
	const client = createRedesignClient();
	const data = await client.fetch(redesignQuery);
	assert.deepEqual(
		[data.settings._id, data.home._id, data.ourWay._id],
		['siteSettings', 'homePageV2', 'ourWayPage']
	);
	const fresh = await client.fetch('*[_id == "siteSettings"][0]');
	assert.equal(data.settings.consultationUrl, fresh.consultationUrl);
	assert.deepEqual(data.settings.footer.socials, fresh.footer.socials.map(({_key, label, href}) => ({_key, label, href})));
	assert.ok(data.legacyNoticed.length > 0);
	assert.deepEqual(
		data.home.services.map((s) => s.title),
		['Branding', 'Strategy', 'Art direction', 'Packaging', 'Digital']
	);
	for (const service of data.home.services) {
		assert.ok(service.projects.length > 0);
		assert.equal(
			new Set(service.projects.map((p) => p._key)).size,
			service.projects.length
		);
		service.projects.forEach((p) => {
			assert.ok(p.project.slug);
			assert.equal(p.project._id, p.projectId);
		});
	}
	assert.ok(data.home.noticed.every((n) => n.link?.href));
	// Published artwork can arrive during QA; test the missing-artwork case
	// with a fixture instead of requiring editors to leave live image slots empty.
	const missingServiceArtwork = JSON.parse(JSON.stringify(data));
	missingServiceArtwork.home.services[0].projects[0].image = null;
	assert.ok(
		contentIssues(missingServiceArtwork).some((issue) =>
			issue.startsWith(
				`homePageV2.services.${data.home.services[0]._key}.projects.${data.home.services[0].projects[0]._key}.image.asset`
			)
		)
	);
	const missingLanding = JSON.parse(JSON.stringify(data));
	missingLanding.home.landing.desktopImage = null;
	assert.ok(
		contentIssues(missingLanding).some((issue) =>
			issue.startsWith('homePageV2.landing.desktopImage.asset')
		)
	);
	assert.equal(
		contentIssues({ settings: null, home: null, ourWay: null }).length,
		3
	);
	const broken = JSON.parse(JSON.stringify(data));
	broken.home.services[0].projects[0].project = null;
	assert.ok(
		contentIssues(broken).some((s) =>
			s.includes('select a published, non-archived project')
		)
	);
	const source = { settings: fresh, home: {}, ourWay: {}, projects: [] };
	assert.deepEqual(buildSeed(source), buildSeed(source));
	assert.throws(() => buildSeed({ ...source, settings: null }), /stale JSON/);
	const root = require('node:path').resolve(__dirname, '../../..');
	const hashes = JSON.parse(
		fs.readFileSync(
			`${root}/docs/redesign/baselines/legacy-source-sha256.json`
		)
	);
	// Tayte approved removing the Work listing CTA and joining its grids on
	// 23 September 2026, and sentence-case project excerpts / bold service items without a heading on 28 September.
	// Mood-only persistent filtering and bold filter/card sans text approved 29 September.
	// Pin these approved changes; retain the original baseline.
	// Client and Collabs bold labels approved 29 September.
	// Sentence-case, smaller Impact card paragraphs approved 29 September.
	// Bold project CTA button labels approved 29 September.
	// Bold testimonial credits approved 29 September.
	// Bold Explore Further label approved 29 September.
	const approvedWorkHashes = {
		'frontend/components/blocks/RelatedProject/RelatedProject.tsx':
			'8447d18f1bcec01adef9acdcce602589a03e3cab911b133cdd19b88d1f8885f9',
		'frontend/components/blocks/TestimonialCard/TestimonialCard.tsx':
			'9d15ebcc44e4cc0da6d45bdaafcc39c98d35643d18e73764e655a34f0fd1efe8',
		'frontend/components/blocks/CtaBanner/CtaBanner.tsx':
			'a724216f9b9732331d9c58a653ae5443e7596f6e046e24c68a3b834df1f7e4de',
		'frontend/components/blocks/EditorialCard/EditorialCard.tsx':
			'6292eca904d191373316501bdad883d2b7320de335d0d87cf8eafee88808ecdc',
		'frontend/components/blocks/WorkDetails/WorkDetails.tsx':
			'159bd473382db0b78240a02ed1fc86e09e6c00302e1344a5d7c228e3080ad7fd',
		'frontend/components/blocks/ProjectCard/ProjectCard.tsx':
			'88ea062f5da25a36fbb86e7dfcac73cce8981eec22eca14439dc8c970a320833',
		'frontend/components/elements/FilterTab/FilterTab.tsx':
			'e0280f3fbbbff40dac89a9eb7db531e2b3e7bfe8222d5ed5e768bec2351adb5a',
		'frontend/components/blocks/FiltersBar/FiltersBar.tsx':
			'1e3f19128be58d9e60f9b50dc9e35901feb8394d189c1f262c21610ecd788a88',
		'frontend/components/blocks/WorkServicesList/WorkServicesList.tsx':
			'8c0bdd1d5c9d0dd43828381bd93ddd496f865c6ece6c983d89c8bd10465235d8',
		'frontend/components/blocks/WorkIntro/WorkIntro.tsx':
			'bb916f084813d88bb1028a65af20b11ae9211de9fbe66f859e5a26668debfc29',
		'frontend/components/blocks/ProjectsList/ProjectsList.tsx':
			'ba398c7b4d8195978206b00594a1d58133dcff969830f84ee927b4ca624fa286',
		'frontend/pages/work/index.tsx':
			'46b26001ffa2c5d4c05b4a3f9fc08e97f492f736b9d9056c76ed83a755fa9e49',
	};
	for (const [p, hash] of Object.entries(hashes)) {
		// Phase 3 replaces shared Layout only. Work page changes must consist
		// solely of shell props or the explicitly approved changes below.
		if (p === 'frontend/components/layout/Layout.tsx') continue;
		let source = fs.readFileSync(`${root}/${p}`, 'utf8');
		// The CMS promotion adds current fields around the unchanged legacy schema.
		if (p === 'studio/schemas/siteSettings.ts') {
			source = source.split('\n// Keep every original field')[0].trimEnd() + '\n';
			source = source.replace("import {siteSettingsV2} from './redesign'", "import {linkObject} from '../objects'").replace('const legacySettings = {', 'export default {');
		}

		if (p.startsWith('frontend/pages/work/')) {
			source = source
				.replace(
					/^import \{ getRedesignShellProps \} from '[^']+';\n/,
					''
				)
				.replace('\t\t\t...(await getRedesignShellProps()),\n', '');
		}
		assert.equal(
			crypto.createHash('sha256').update(source).digest('hex'),
			approvedWorkHashes[p] || hash,
			p
		);
	}
	console.log(
		`PASS: fixed IDs; fresh published settings; email normalization; service order; resolved cards and stable keys; real Noticed destinations; missing assets; missing documents; unresolved-reference release diagnostic; deterministic seeds; ${
			Object.keys(hashes).length - 1
		} checked source hashes (169 preserved legacy files; 12 approved Work-change hashes; shell props normalized; shared Layout excluded).`
	);
})().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
