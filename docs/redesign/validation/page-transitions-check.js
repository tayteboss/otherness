// Run with the in-app browser's read-only evaluate after a route settles.
() => {
	const pages = document.querySelectorAll('[data-page-route]');
	if (pages.length !== 1) throw new Error('Expected one visible route');
	const page = pages[0];
	const path = page.getAttribute('data-page-route');
	if (page.getAttribute('data-page-present') !== 'true' || page.hasAttribute('inert'))
		throw new Error('Route is still exiting or inert');
	if (getComputedStyle(page).opacity !== '1')
		throw new Error('Route did not finish fading in');
	if (document.querySelector('[data-home-intro]') || document.documentElement.style.overflow === 'hidden' || document.body.style.position === 'fixed')
		throw new Error('Unexpected intro or scroll lock');
	const header = document.querySelector('header');
	if (header.getAttribute('data-home') !== String(path === '/'))
		throw new Error('Header belongs to the wrong route');
	if (document.documentElement.scrollWidth > window.innerWidth)
		throw new Error('Horizontal page overflow');
	return { path, opacity: getComputedStyle(page).opacity, scroll: window.scrollY };
};
