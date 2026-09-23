const fs = require('node:fs');
const path = require('node:path');
const { createRedesignClient } = require('../../lib/redesign/client');
const ids = ['siteSettingsV2', 'homePageV2', 'ourWayPage'];
const keyed = (_key, _type, value) => ({ _key, _type, ...value });
const link = (label, href) => ({ _type: 'redesignLink', label, href });
const entry = (title, i) => keyed(`entry-${i}`, 'redesignListEntry', { title });
const plain = (blocks = []) =>
	blocks
		.map((b) => (b.children || []).map((s) => s.text || '').join(''))
		.filter(Boolean)
		.join('\n\n');

function buildSeed({ settings, home, ourWay, projects }) {
	if (!settings?.footerConsultationButtonUrl)
		throw new Error(
			'Published siteSettings has no consultation URL. Refusing to seed from stale JSON.'
		);
	const url = settings.footerConsultationButtonUrl;
	const socialLinks = [
		settings.socialLink1,
		settings.socialLink2,
		settings.socialLink3
	]
		.filter((s) => s?.url)
		.map((s, i) => ({
			...link(
				s.title,
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.url)
					? `mailto:${s.url}`
					: s.url
			),
			_key: `social-${i}`
		}));
	const available = projects.filter(
		(p) => !p.archiveProject && p.slug?.current
	);
	const process = ourWay?.pageBuilder?.find(
		(b) => b._type === 'pbProcessList'
	);
	const founder = ourWay?.pageBuilder?.find(
		(b) => b._type === 'pbImageOneColumnContent'
	);
	const testimonial = home?.homeBlocks?.find(
		(b) => b.component === 'homeComponentOneTestimonialOneStatistic'
	)?.homeComponentOneTestimonialOneStatistic?.testimonialBlock;
	return [
		{
			_id: 'siteSettingsV2',
			_type: 'siteSettingsV2',
			consultationUrl: url,
			consultationLabel: settings.footerConsultationButtonTitle,
			navigation: [
				{ ...link('Our Work', '/work'), _key: 'work' },
				{ ...link('Our Way', '/our-way'), _key: 'our-way' },
				{ ...link('Contact', url), _key: 'contact' }
			],
			footer: {
				heading: settings.footerConsultationCta,
				tagline: settings.tagline,
				copyright: 'Otherness',
				privacyLink: link('Privacy', '/privacy'),
				socials: socialLinks
			},
			seo: { title: home?.seoTitle, description: home?.seoDescription },
			editorialNotes: `Seeded from fresh published siteSettings revision ${settings._rev}. Confirm trademark copy; supplied OG default is wired in phase 3.`
		},
		{
			_id: 'homePageV2',
			_type: 'homePageV2',
			loadingPairs: [
				['Poetry', 'Power'],
				['Strategy', 'Design'],
				['Endurance', 'Distinction']
			].map(([first, second], i) =>
				keyed(`pair-${i}`, 'wordPair', { first, second })
			),
			landing: { statement: 'Everything in between is otherness.' },
			introduction: {
				heading: 'Own your intersections',
				link: link('What to expect', '/our-way')
			},
			services: [
				['Branding', 'branding'],
				['Strategy', 'strategy'],
				['Art direction', 'art-direction'],
				['Packaging', 'packaging'],
				['Digital', 'digital']
			].map(([title, category]) =>
				keyed(category, 'service', {
					title,
					contactLabel: 'Get in touch',
					projects: available
						.filter((p) => p.type?.includes(category))
						.slice(0, 3)
						.map((p) =>
							keyed(`project-${p._id}`, 'projectCard', {
								project: { _type: 'reference', _ref: p._id }
							})
						)
				})
			),
			results: testimonial
				? [
						keyed('medable', 'result', {
							client: 'Medable',
							quote: testimonial.testimonial
						})
				  ]
				: [],
			noticed: (home?.noticedList || []).map((n) => {
				const p = available.find(
					(p) => p._id === n.pageReference?._ref
				);
				const href =
					n.url || (p ? `/work/${p.slug.current}` : undefined);
				return keyed(n._key, 'noticedEntry', {
					title: n.title,
					source: n.source,
					year: n.year,
					...(href ? { link: link(n.title, href) } : {})
				});
			}),
			seo: { title: home?.seoTitle, description: home?.seoDescription },
			editorialNotes:
				'Project selections are editorial starting points from current project service tags and orderRank; review per service. Medable quote and client name copied from published Home, no Nike logo. Introduction statement and service descriptions need approved copy. All image fields deliberately empty pending new originals. Noticed text/destinations are real published entries; thumbnails await supply.'
		},
		{
			_id: 'ourWayPage',
			_type: 'ourWayPage',
			hero: { scrollLabel: 'Scroll down' },
			process: {
				heading: process?.title,
				description: process?.description,
				stages: (process?.columns || []).map((s) =>
					keyed(s._key, 'processStage', {
						title: s.title,
						services: plain(s.listContent)
							.split(/\n+/)
							.filter(Boolean)
							.map(entry)
					})
				)
			},
			consultation: {
				heading: 'Become incomparable.',
				buttonLabel: settings.footerConsultationButtonTitle
			},
			credentials: {
				founderHeading: founder?.title,
				biography: plain(
					founder?.content?.filter((b) => b.style === 'normal')
				),
				services: (home?.servicesList || []).map(entry)
			},
			seo: {
				title: 'Otherness — Our Way',
				description: ourWay?.seoDescription
			},
			editorialNotes:
				'Process and founder biography copied from published Working Together. Hero, introduction, four principles, founder note, consultation supporting text, clients and recognition await approved copy. Do not reuse the duplicated/truncated screenshot principles. All images and logos await new supplied originals.'
		}
	];
}

async function run() {
	const args = process.argv.slice(2);
	if (args.some((a) => !['--apply', '--cli-auth'].includes(a)))
		throw new Error('Usage: seed.cjs [--apply] [--cli-auth]');
	const publicClient = createRedesignClient();
	const source = await publicClient.fetch(
		`{"settings": *[_id == "siteSettings"][0], "home": *[_id == "homePage"][0], "ourWay": *[_id == "whatToExpectPage"][0], "projects": *[_type == "project"] | order(orderRank){_id,title,slug,type,archiveProject}}`
	);
	const docs = buildSeed(source);
	const existing = await publicClient.fetch('*[_id in $ids]{_id,_rev}', {
		ids
	});
	console.log(
		JSON.stringify(
			{
				mode: args.includes('--apply')
					? 'create-if-missing'
					: 'dry-run',
				sourceSettingsRevision: source.settings._rev,
				consultationUrl: source.settings.footerConsultationButtonUrl,
				existing,
				documents: docs
			},
			null,
			2
		)
	);
	if (!args.includes('--apply')) return;
	// Explicit local CLI opt-in only. Credentials never enter data files or browser bundles.
	const token =
		process.env.SANITY_WRITE_TOKEN ||
		(args.includes('--cli-auth')
			? JSON.parse(
					fs.readFileSync(
						path.join(
							require('node:os').homedir(),
							'.config/sanity/config.json'
						),
						'utf8'
					)
			  ).authToken
			: undefined);
	if (!token)
		throw new Error(
			'Set server-only SANITY_WRITE_TOKEN or use --cli-auth with an existing Sanity login.'
		);
	const client = publicClient.withConfig({ token, perspective: 'raw' });
	// Respect unpublished editorial work as well as published documents.
	const present = await client.fetch(
		'*[_id in $ids || _id in $draftIds]{_id,_type}',
		{ ids, draftIds: ids.map((id) => `drafts.${id}`) }
	);
	let transaction = client.transaction();
	let count = 0;
	for (const doc of docs) {
		if (!ids.includes(doc._id) || doc._id !== doc._type)
			throw new Error('Seed attempted a non-redesign mutation.');
		if (
			present.some(
				(p) => p._id === doc._id || p._id === `drafts.${doc._id}`
			)
		)
			continue;
		transaction = transaction.createIfNotExists(doc);
		count++;
	}
	if (count) await transaction.commit();
	console.log(
		`Created ${count} missing redesign singletons; existing published documents and drafts were preserved.`
	);
}
if (require.main === module)
	run().catch((e) => {
		console.error(e.message);
		process.exitCode = 1;
	});
module.exports = { buildSeed };
