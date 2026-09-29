// Run in the Work browser console after filters have settled; repeat after
// Artsy, All, an outside click, and a mobile keyboard selection of Vivacious.
(() => {
	const check = (condition, message) => {
		if (!condition) throw new Error(message);
	};
	const bar = document.querySelector('[aria-label="Filter projects by mood"]');
	const buttons = [...bar.querySelectorAll('button')];
	check(buttons.length === 8, 'Keep all eight mood choices');
	check(!bar.textContent.includes('Type of work'), 'Remove work-type filter');
	check(buttons.filter(button => button.getAttribute('aria-pressed') === 'true').length === 1, 'Expose one selected mood');
	check(buttons.every(button => getComputedStyle(button).fontWeight === '700' && button.getBoundingClientRect().width > 0), 'Keep bold mood choices rendered');
	check([...document.querySelectorAll('.project-card h4')].every(title => getComputedStyle(title).fontWeight === '700'), 'Bold project titles');
	check(document.documentElement.scrollWidth === innerWidth, 'No page overflow');
	check(!new URL(location.href).searchParams.has('type'), 'Old work-type links must normalize to mood only');
	return { pass: true, width: innerWidth, cards: document.querySelectorAll('.project-card').length };
})();
