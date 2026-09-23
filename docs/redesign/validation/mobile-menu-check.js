// Paste into the local preview browser console after opening the Home menu.
// Repeat at scroll 0, halfway through the hero, and beyond one viewport.
(() => {
	const check = (condition, message) => {
		if (!condition) throw new Error(message);
	};
	const panel = document.querySelector('#site-menu');
	check(panel?.open, 'Open the mobile menu before running this check');
	const close = panel.querySelector('button').getBoundingClientRect();
	const nav = panel.querySelector('nav').getBoundingClientRect();
	const trigger = document.querySelector('.menu-trigger').getBoundingClientRect();
	const scroll = window.scrollY;
	const upward = panel.dataset.upward === 'true';
	check(Math.abs(close.top - trigger.top) < 1, 'Close must replace Menu');
	check(upward ? nav.bottom <= close.top - 7 : nav.top >= close.bottom + 7,
		'Links must open on the correct side with an 8px gap');
	check(upward ? scroll <= 1 : scroll >= innerHeight - 1,
		'Home menu must open at the start or after at least one viewport');
	check(nav.top >= 0 && nav.bottom <= innerHeight, 'Links must remain on screen');
	check(panel.contains(document.activeElement), 'Focus must be inside the menu');
	check(document.body.style.position !== 'fixed', 'Keep the page in flow to avoid the iOS close repaint');
	check(getComputedStyle(document.documentElement).overflowY === 'hidden', 'Background must be scroll locked');
	check(getComputedStyle(panel).touchAction === 'pinch-zoom', 'Block menu panning while preserving pinch zoom');
	check(document.documentElement.scrollWidth === innerWidth, 'No page overflow');
	check([...panel.querySelectorAll('nav a')].every(link => getComputedStyle(link).backdropFilter === 'none'), 'Menu links must not use liquid glass');
	return { pass: true, upward, scroll, width: innerWidth, height: innerHeight };
})();
