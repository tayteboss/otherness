// Pass this function to the in-app tab.playwright.evaluate after scrolling.
// Run with the menu closed, at section boundaries in both directions.
() => {
	const assert = (condition, message) => {
		if (!condition) throw new Error(message);
	};
	const sections = [
		['.way-hero', true],
		['.way-introduction', false],
		['.partnership', false],
		['.process', true],
		['.consultation', true],
		['.credentials', false],
		['.recognition', false],
		['footer .footer-main', true]
	].map(([selector, dark]) => ({
		selector,
		dark,
		bounds: document.querySelector(selector).getBoundingClientRect()
	}));
	const header = document.querySelector('header');
	const rows = [
		['.logo-row', 'data-light-wordmark'],
		[innerWidth <= 768 ? '.menu-trigger' : 'nav', 'data-light-navigation']
	].map(([selector, attribute]) => {
		const bounds = header.querySelector(selector).getBoundingClientRect();
		const midpoint = (Math.max(0, bounds.top) + bounds.bottom) / 2;
		const section = sections.filter(({ bounds }) =>
			bounds.top <= midpoint && bounds.bottom > midpoint
		).pop();
		assert(section, `${selector}: no underlying section`);
		assert(header.getAttribute(attribute) === String(section.dark),
			`${selector}: incorrect contrast over ${section.selector}`);
		return { selector, section: section.selector, light: section.dark };
	});
	const items = Array.from(document.querySelectorAll('.entry-list li'));
	assert(items.length > 0, 'No list items rendered');
	items.forEach((item) => {
		const style = getComputedStyle(item);
		assert(style.fontFamily.startsWith('"Neue Montreal"') &&
			style.fontSize === '18px' && style.fontStyle === 'normal' &&
			style.fontWeight === '400' && style.lineHeight === '27px' &&
			style.letterSpacing === '0.18px', `Body Large mismatch: ${style.font}`);
	});
	const track = document.querySelector('.process-track');
	assert(!track.hasAttribute('data-lenis-prevent') &&
		!track.hasAttribute('data-lenis-prevent-wheel'), 'Vertical wheel bypasses Lenis');
	assert(track.hasAttribute('data-lenis-prevent-touch'), 'Native touch track missing');
	assert(document.documentElement.scrollWidth === innerWidth, 'Page overflow');
	const active = getComputedStyle(header.querySelector('nav a[aria-current="page"]'));
	assert(active.textDecorationLine === 'none', 'Active link still underlined');
	assert(active.backdropFilter === 'none', 'Active link still refracts background');
	return { width: innerWidth, scroll: scrollY, rows, items: items.length,
		trackLeft: track.scrollLeft, headerOpacity: getComputedStyle(header).opacity };
};
