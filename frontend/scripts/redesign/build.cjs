const { spawnSync } = require('node:child_process');
const path = require('node:path');
const production = process.env.VERCEL_ENV === 'production';
const env = { ...process.env, REDESIGN_PREVIEW: production ? '0' : '1' };
if (production) {
	env.NEXT_PUBLIC_ENVIRONMENT = 'production';
	env.SITE_URL = env.SITE_URL || 'https://www.otherness.design';
}
// A branch preview must never inherit staging's canonical or sitemap origin.
if (!production && (env.VERCEL_BRANCH_URL || env.VERCEL_URL))
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
