/** @param {import('./types').RedesignData} data */
function contentIssues(data) {
	const issues = [];
	const need = (value, path) => {
		if (
			value == null ||
			value === '' ||
			(Array.isArray(value) && !value.length)
		)
			issues.push(
				`${path}: add and publish content in Website Redesign.`
			);
	};
	const image = (value, path) => {
		need(value?.asset?.url, `${path}.asset (supplied artwork required)`);
		need(value?.alt, `${path}.alt`);
	};
	const link = (value, path) => {
		need(value?.label, `${path}.label`);
		if (!/^(https?:\/\/|mailto:|tel:|\/(?!\/))/.test(value?.href || ''))
			issues.push(`${path}.href: provide a valid site path or URL.`);
	};
	for (const [key, id] of Object.entries({
		settings: 'siteSettingsV2',
		home: 'homePageV2',
		ourWay: 'ourWayPage'
	})) {
		if (!data[key])
			issues.push(
				`${id}: missing published singleton. Run npm run seed:redesign -- --apply, then edit in Website Redesign.`
			);
	}
	const { settings: s, home: h, ourWay: w } = data;
	if (s) {
		need(s.consultationUrl, 'siteSettingsV2.consultationUrl');
		need(s.consultationLabel, 'siteSettingsV2.consultationLabel');
		need(s.navigation, 'siteSettingsV2.navigation');
		s.navigation?.forEach((v) =>
			link(v, `siteSettingsV2.navigation.${v._key}`)
		);
		need(s.footer?.heading, 'siteSettingsV2.footer.heading');
		need(s.footer?.copyright, 'siteSettingsV2.footer.copyright');
		need(s.footer?.trademark, 'siteSettingsV2.footer.trademark');
		link(s.footer?.privacyLink, 'siteSettingsV2.footer.privacyLink');
		s.footer?.socials?.forEach((v) =>
			link(v, `siteSettingsV2.footer.socials.${v._key}`)
		);
		need(s.seo?.title, 'siteSettingsV2.seo.title');
		need(s.seo?.description, 'siteSettingsV2.seo.description');
	}
	if (h) {
		if (h.loadingPairs?.length !== 3)
			issues.push('homePageV2.loadingPairs: provide three word pairs.');
		h.loadingPairs?.forEach((p) => {
			need(p.first, `homePageV2.loadingPairs.${p._key}.first`);
			need(p.second, `homePageV2.loadingPairs.${p._key}.second`);
		});
		need(h.landing?.statement, 'homePageV2.landing.statement');
		image(h.landing?.desktopImage, 'homePageV2.landing.desktopImage');
		image(h.landing?.mobileImage, 'homePageV2.landing.mobileImage');
		need(h.introduction?.heading, 'homePageV2.introduction.heading');
		need(h.introduction?.statement, 'homePageV2.introduction.statement');
		link(h.introduction?.link, 'homePageV2.introduction.link');
		need(h.services, 'homePageV2.services');
		h.services?.forEach((s) => {
			const p = `homePageV2.services.${s._key}`;
			need(s.title, `${p}.title`);
			need(s.description, `${p}.description`);
			need(s.projects, `${p}.projects`);
			s.projects?.forEach((c) => {
				if (!c.project?.slug || c.project?.archiveProject)
					issues.push(
						`${p}.projects.${c._key}: select a published, non-archived project with a slug.`
					);
				image(c.image, `${p}.projects.${c._key}.image`);
			});
		});
		need(h.results, 'homePageV2.results');
		h.results?.forEach((r) => {
			const p = `homePageV2.results.${r._key}`;
			['client', 'quote', 'attribution'].forEach((k) =>
				need(r[k], `${p}.${k}`)
			);
			image(r.background, `${p}.background`);
			image(r.logo, `${p}.logo`);
		});
		need(h.noticed, 'homePageV2.noticed');
		h.noticed?.forEach((n) => {
			const p = `homePageV2.noticed.${n._key}`;
			['title', 'source', 'year'].forEach((k) => need(n[k], `${p}.${k}`));
			link(n.link, `${p}.link`);
			image(n.image, `${p}.image`);
		});
	}
	if (w) {
		need(w.hero?.statement, 'ourWayPage.hero.statement');
		image(w.hero?.image, 'ourWayPage.hero.image');
		need(w.introduction?.text, 'ourWayPage.introduction.text');
		need(w.partnership?.heading, 'ourWayPage.partnership.heading');
		need(w.partnership?.founderNote, 'ourWayPage.partnership.founderNote');
		if (w.partnership?.principles?.length !== 4)
			issues.push(
				'ourWayPage.partnership.principles: review and supply four principles.'
			);
		w.partnership?.principles?.forEach((p) => {
			need(p.title, `ourWayPage.partnership.principles.${p._key}.title`);
			need(
				p.description,
				`ourWayPage.partnership.principles.${p._key}.description`
			);
		});
		need(w.process?.heading, 'ourWayPage.process.heading');
		if (w.process?.stages?.length !== 4)
			issues.push(
				'ourWayPage.process.stages: supply four ordered stages.'
			);
		w.process?.stages?.forEach((s) => {
			need(s.title, `ourWayPage.process.stages.${s._key}.title`);
			need(s.services, `ourWayPage.process.stages.${s._key}.services`);
		});
		need(w.consultation?.heading, 'ourWayPage.consultation.heading');
		need(w.consultation?.text, 'ourWayPage.consultation.text');
		need(
			w.consultation?.buttonLabel,
			'ourWayPage.consultation.buttonLabel'
		);
		image(w.consultation?.artwork, 'ourWayPage.consultation.artwork');
		need(
			w.credentials?.founderHeading,
			'ourWayPage.credentials.founderHeading'
		);
		need(w.credentials?.biography, 'ourWayPage.credentials.biography');
		['services', 'clients', 'recognition', 'logos'].forEach((k) =>
			need(w.credentials?.[k], `ourWayPage.credentials.${k}`)
		);
		w.credentials?.logos?.forEach((l) =>
			image(l.image, `ourWayPage.credentials.logos.${l._key}.image`)
		);
	}
	return issues;
}
module.exports = { contentIssues };
