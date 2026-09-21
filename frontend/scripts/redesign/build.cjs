const { spawnSync } = require('node:child_process');
const path = require('node:path');
const env = { ...process.env, REDESIGN_PREVIEW: '1' };
// A branch preview must never inherit staging's canonical or sitemap origin.
if (env.VERCEL_BRANCH_URL || env.VERCEL_URL)
	env.SITE_URL = `https://${env.VERCEL_BRANCH_URL || env.VERCEL_URL}`;
for (const [file, args] of [
	[path.join(__dirname, 'check.cjs'), ['--snapshot']],
	[require.resolve('next/dist/bin/next'), ['build']],
	[require.resolve('next-sitemap/bin/next-sitemap'), []]
]) {
	const result = spawnSync(process.execPath, [file, ...args], {
		stdio: 'inherit',
		env
	});
	if (result.status !== 0) process.exit(result.status || 1);
}
