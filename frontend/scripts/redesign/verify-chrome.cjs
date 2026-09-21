const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pages = path.resolve(__dirname, '../../.next/server/pages');
function files(dir) {
	return fs
		.readdirSync(dir, { withFileTypes: true })
		.flatMap((entry) =>
			entry.isDirectory()
				? files(path.join(dir, entry.name))
				: [path.join(dir, entry.name)]
		);
}
let routes = 0,
	overrides = 0;
for (const file of files(pages).filter((p) => p.endsWith('.html'))) {
	const html = fs.readFileSync(file, 'utf8');
	const payload = html.match(
		/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s
	);
	assert.ok(payload, file);
	const parsed = JSON.parse(payload[1]);
	const { pageProps } = parsed.props;
	const images = Array.from(
		html.matchAll(/<meta property="og:image" content="([^"]+)"/g),
		(m) => m[1]
	);
	assert.equal(
		images.length,
		1,
		`${file}: exactly one default/override image`
	);
	assert.match(images[0], /^https?:\/\//);
	assert.ok(html.includes('/redesign/favicon/site.webmanifest'));
	assert.ok(!html.includes('content="/ogg.jpg"'));
	if (file.endsWith('/500.html') || parsed.isFallback) continue; // Next emergency/fallback templates have no page props.
	assert.equal(pageProps.redesignSettings._id, 'siteSettingsV2', file);
	assert.ok(html.includes(pageProps.redesignSettings.consultationUrl), file);
	const override =
		pageProps.data?.openGraphImage?.asset?.url ||
		pageProps.data?.openGraphImage?.image?.asset?.url ||
		pageProps.ourWay?.seo?.image?.asset?.url;
	if (override && !pageProps.data?.archiveProject) {
		assert.equal(images[0], override, file);
		overrides++;
	} else
		assert.equal(
			images[0],
			`${pageProps.redesignOrigin}/redesign/brand/og.jpg`,
			file
		);
	routes++;
}
assert.ok(routes > 20);
console.log(
	`PASS: ${routes} built routes use published redesign shell props; ${overrides} page image overrides preserved; all HTML has one absolute OG image and the new manifest.`
);
