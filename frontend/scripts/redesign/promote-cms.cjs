// Add the active fields without replacing or deleting any legacy content.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRedesignClient } = require('../../lib/redesign/client');
const ids = ['siteSettings', 'siteSettingsV2', 'homePage', 'homePageV2'];
const settingsFields = [
	'navigation',
	'consultationUrl',
	'consultationLabel',
	'footer',
	'seo',
	'editorialNotes'
];
function promotionPatches(docs) {
	for (const id of ids) {
		assert.ok(
			docs.find((d) => d._id === id),
			`Missing ${id}`
		);
		assert.ok(
			!docs.find((d) => d._id === `drafts.${id}`),
			`Publish or resolve draft ${id} before promotion.`
		);
	}
	const get = (id) => docs.find((d) => d._id === id);
	const settings = Object.fromEntries(
		settingsFields
			.filter((k) => get('siteSettingsV2')[k] !== undefined)
			.map((k) => [k, get('siteSettingsV2')[k]])
	);
	assert.ok(
		settings.navigation && settings.footer && settings.seo,
		'Incomplete source settings'
	);
	assert.ok(
		Array.isArray(get('homePage').noticedList),
		'Missing published Noticed list'
	);
	return [
		{ doc: get('siteSettings'), fields: settings },
		{
			doc: get('homePageV2'),
			fields: { noticedList: get('homePage').noticedList }
		}
	]
		.map(({ doc, fields }) => ({
			id: doc._id,
			ifRevisionID: doc._rev,
			setIfMissing: Object.fromEntries(
				Object.entries(fields).filter(([key]) => doc[key] === undefined)
			)
		}))
		.filter((p) => Object.keys(p.setIfMissing).length);
}
async function run() {
	const args = process.argv.slice(2);
	const token =
		process.env.SANITY_WRITE_TOKEN ||
		(args.includes('--cli-auth') &&
			JSON.parse(
				fs.readFileSync(
					path.join(
						require('node:os').homedir(),
						'.config/sanity/config.json'
					),
					'utf8'
				)
			).authToken);
	assert.ok(
		token,
		'Use --cli-auth or SANITY_WRITE_TOKEN so drafts can be checked.'
	);
	const client = createRedesignClient().withConfig({
		token,
		perspective: 'raw'
	});
	const docs = await client.fetch('*[_id in $ids]', {
		ids: [...ids, ...ids.map((id) => `drafts.${id}`)]
	});
	const patches = promotionPatches(docs);
	console.log(
		JSON.stringify(
			{
				mode: args.includes('--apply') ? 'apply' : 'dry-run',
				patches: patches.map((p) => ({
					id: p.id,
					fields: Object.keys(p.setIfMissing)
				}))
			},
			null,
			2
		)
	);
	if (!args.includes('--apply') || !patches.length) return;
	const inventory = await client.fetch('*[]{_id,_rev}');
	const backup = path.resolve(
		__dirname,
		'../../.redesign',
		`cms-promotion-${Date.now()}.json`
	);
	fs.mkdirSync(path.dirname(backup), { recursive: true });
	fs.writeFileSync(backup, JSON.stringify({ docs, inventory }, null, 2), {
		mode: 0o600
	});
	await client.transaction(patches.map((patch) => ({ patch }))).commit();
	const after = await client.fetch('*[_id in $ids]', { ids });
	for (const before of docs) {
		const current = after.find((d) => d._id === before._id);
		for (const [key, value] of Object.entries(before).filter(
			([key]) => !['_rev', '_updatedAt'].includes(key)
		))
			assert.deepEqual(
				current[key],
				value,
				`${before._id}.${key} preserved`
			);
	}
	for (const patch of patches)
		for (const [key, value] of Object.entries(patch.setIfMissing))
			assert.deepEqual(after.find((d) => d._id === patch.id)[key], value);
	const changed = new Set(patches.map((p) => p.id));
	const finalInventory = await client.fetch('*[]{_id,_rev}');
	assert.equal(finalInventory.length, inventory.length);
	for (const doc of inventory.filter((d) => !changed.has(d._id)))
		assert.equal(
			finalInventory.find((d) => d._id === doc._id)?._rev,
			doc._rev,
			`${doc._id} unchanged`
		);
	assert.equal(promotionPatches(after).length, 0);
	console.log(
		`PASS: ${patches.length} additive patches; all existing fields and ${
			inventory.length - changed.size
		} other document revisions preserved; repeat run has no patches. Backup: ${backup}`
	);
}
if (require.main === module)
	run().catch((e) => {
		console.error(e.message);
		process.exitCode = 1;
	});
module.exports = { promotionPatches };
