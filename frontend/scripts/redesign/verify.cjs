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
			assert.equal(p.image, null);
		});
	}
	assert.ok(data.home.noticed.every((n) => n.link?.href));
	assert.equal(data.home.landing.desktopImage, null);
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
	for (const [p, hash] of Object.entries(hashes))
		assert.equal(
			crypto
				.createHash('sha256')
				.update(fs.readFileSync(`${root}/${p}`))
				.digest('hex'),
			hash,
			p
		);
	console.log(
		`PASS: fixed IDs; fresh published settings; email normalization; service order; resolved cards and stable keys; real Noticed destinations; missing assets; missing documents; unresolved-reference release diagnostic; deterministic seeds; ${
			Object.keys(hashes).length
		} unchanged legacy source hashes.`
	);
})().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
