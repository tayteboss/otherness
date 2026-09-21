const { createRedesignClient } = require('../../lib/redesign/client');
const { redesignQuery } = require('../../lib/redesign/queries');
const { contentIssues } = require('../../lib/redesign/validation');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
	const data = await createRedesignClient().fetch(redesignQuery);
	const issues = contentIssues(data);
	if (process.argv.includes('--snapshot')) {
		// Separate ignored build artifact, never overwrite legacy json/siteSettings.json.
		const dir = path.resolve(__dirname, '../../.redesign');
		fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(
			path.join(dir, 'content.json'),
			JSON.stringify(
				{ fetchedAt: new Date().toISOString(), data, issues },
				null,
				2
			)
		);
	}
	console.log(
		`Published redesign documents: ${
			Object.values(data).filter(Boolean).length
		}/3. Content issues: ${issues.length}.`
	);
	if (issues.length) console.log(issues.join('\n'));
	if (process.argv.includes('--release') && issues.length)
		process.exitCode = 1;
})().catch((e) => {
	console.error(e.message);
	process.exitCode = 1;
});
