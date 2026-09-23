// Paste into the browser console at a mobile width after transitions settle.
(() => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  assert(innerWidth <= 768, 'Use a mobile viewport');
  const rows = [...document.querySelectorAll('.noticed-row')];
  assert(rows.filter(row => row.dataset.expanded === 'true').length <= 1, 'At most one open row');
  rows.forEach(row => {
    const panel = row.querySelector('.noticed-panel');
    const open = row.dataset.expanded === 'true';
    assert(panel.hasAttribute('inert') !== open, 'Closed content must be inert');
    assert(row.querySelector('button').getAttribute('aria-expanded') === String(open), 'Expanded state');
    assert(Math.abs(panel.getBoundingClientRect().height - (open ? panel.firstElementChild.getBoundingClientRect().height : 0)) < 1, 'Panel fits content or collapses');
    const arrow = row.querySelector('.noticed-arrow');
    assert(!arrow || !arrow.closest('button'), 'Arrow independent of toggle');
  });
  assert(getComputedStyle(document.querySelector('.legal')).gap === '16px', '16px legal gaps');
  assert(document.documentElement.scrollWidth === innerWidth, 'No horizontal overflow');
  return 'PASS: mobile Noticed and footer';
})();
