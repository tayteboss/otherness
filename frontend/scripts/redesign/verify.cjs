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
		['siteSettingsV2', 'homePageV2', 'ourWayPage']
	);
	const fresh = await client.fetch('*[_id == "siteSettings"][0]');
	assert.equal(
		data.settings.consultationUrl,
		fresh.footerConsultationButtonUrl
	);
	assert.equal(
		data.settings.footer.socials.find((s) => s.label === 'Email').href,
		`mailto:${fresh.socialLink3.url}`
	);
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
	// 23 September 2026. Pin only these two reviewed changes; retain originals.
	const workCtaRemovalHashes = {
		'frontend/components/blocks/ProjectsList/ProjectsList.tsx':
			'ba398c7b4d8195978206b00594a1d58133dcff969830f84ee927b4ca624fa286',
		'frontend/pages/work/index.tsx':
			'5d27d4da26a856f91f98f1e96c62df5943f9405a57cdf5a4ad4b00d1cb529828',
	};
	for (const [p, hash] of Object.entries(hashes)) {
		// Phase 3 replaces shared Layout only. Work page changes must consist
		// solely of shell props or the explicitly pinned CTA removal below.
		if (p === 'frontend/components/layout/Layout.tsx') continue;
		let source = fs.readFileSync(`${root}/${p}`, 'utf8');
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
			workCtaRemovalHashes[p] || hash,
			p
		);
	}
	console.log(
		`PASS: fixed IDs; fresh published settings; email normalization; service order; resolved cards and stable keys; real Noticed destinations; missing assets; missing documents; unresolved-reference release diagnostic; deterministic seeds; ${
			Object.keys(hashes).length - 1
		} checked source hashes (179 preserved legacy files; 2 approved Work CTA-removal hashes; shell props normalized; shared Layout excluded).`
	);
})().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
