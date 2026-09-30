const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const isPreview = require('../../config/isPreview');

// Exercise build environment selection without running a second Next build.
for (const production of [true, false]) {
	const initial = {
		VERCEL_ENV: production ? 'production' : 'preview',
		VERCEL_BRANCH_URL: 'branch.vercel.app',
		SITE_URL: 'https://www.otherness.design',
		REDESIGN_PREVIEW: '1',
		NEXT_PUBLIC_ENVIRONMENT: 'staging'
	};
	let buildEnv;
	const stubRequire = (id) => id === 'node:child_process'
		? { spawnSync: (_file, _args, options) => {
			buildEnv = options.env;
			return { status: 0 };
		} }
		: require(id);
	stubRequire.resolve = require.resolve;
	vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'build.cjs'), 'utf8'), {
		require: stubRequire, __dirname, process: { env: initial, execPath: process.execPath }
	});
	assert.equal(isPreview(buildEnv), !production);
	assert.equal(buildEnv.SITE_URL, production ? initial.SITE_URL : 'https://branch.vercel.app');
	const sandbox = {
		require: (id) => id === '@next/bundle-analyzer' ? () => (config) => config : (env = buildEnv) => isPreview(env),
		module: { exports: {} }, process: { env: buildEnv }
	};
	vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../next.config.js'), 'utf8'), sandbox);
	const config = sandbox.module.exports;
	assert.equal(config.env.NEXT_PUBLIC_REDESIGN_ORIGIN, buildEnv.SITE_URL);
	Promise.all([config.headers(), config.redirects()]).then(([headers, redirects]) => {
		assert.equal(headers.length, production ? 0 : 1);
		assert.equal(redirects.length, production ? 1 : 0);
		if (production) assert.equal(redirects[0].destination, '/our-way');
		console.log(`PASS: ${production ? 'production' : 'preview'} indexing, origin and redirects`);
	});
}
