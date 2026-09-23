// Run in the local preview console on mobile after changing the active result.
(() => {
	const check = (ok, message) => { if (!ok) throw new Error(message); };
	const section = document.querySelector('#results');
	const rail = section.querySelector('.result-tabs');
	const active = rail.querySelector('[aria-selected="true"]');
	const quote = section.querySelector('.result-panel[data-active="true"] .result-quote');
	const tabBounds = active.getBoundingClientRect();
	const bounds = section.getBoundingClientRect();
	check(innerWidth <= 768, 'Use a mobile viewport');
	check(Math.abs(tabBounds.top - quote.getBoundingClientRect().bottom - 40) < 1, 'Quote-to-rule gap must be 40px');
	check(Math.abs(tabBounds.left - 24) < 1 && Math.abs(tabBounds.right - (innerWidth - 24)) < 1, 'Active tab must retain its starting position and remain centred');
	check(getComputedStyle(rail).overflowX === 'visible', 'Tab rail must not mask neighbouring details');
	check(bounds.left === 0 && bounds.right === innerWidth && getComputedStyle(section).overflowX === 'clip', 'Clip only at viewport edge');
	check(document.documentElement.scrollWidth === innerWidth, 'No page overflow');
	check(!document.activeElement.closest('[aria-hidden="true"]'), 'Focus must not remain in an inactive panel');
	check([...section.querySelectorAll('.result-quote')].every(item => Math.abs(item.getBoundingClientRect().bottom - quote.getBoundingClientRect().bottom) < 1), 'All quote bottoms must share the same stable position');
	check([...section.querySelectorAll('.result-panel')].every(panel => {
		const logo = panel.querySelector('.result-logo, .result-client');
		const text = panel.querySelector('.result-quote');
		return Math.abs(text.getBoundingClientRect().top - logo.getBoundingClientRect().bottom - 40) < 1;
	}), 'Every logo must stay 40px above its quote');
	return { pass: true, active: active.textContent, width: innerWidth };
})();
