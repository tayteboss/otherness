// Run this read-only function through the in-app tab's playwright.evaluate
// after the entrance settles, both at the top and after scrolling.
() => {
  const hero = document.querySelector('.way-hero');
  const intro = document.querySelector('.way-introduction');
  const height = hero.getBoundingClientRect().height;
  const scroll = Math.max(0, Math.min(scrollY, height));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const y = reduced ? 0 : scroll * 0.35;
  const assert = (ok, label) => { if (!ok) throw new Error(label); };
  assert(hero.dataset.heroPhase === 'settled', 'Entrance must finish');
  assert(Math.abs(height - (innerHeight - 32)) < 1, 'Hero must leave a 32px cue');
  assert(Math.abs(hero.getBoundingClientRect().top - (-scrollY + y)) < 1, 'Hero parallax position');
  assert(Math.abs(intro.getBoundingClientRect().top - (height - scrollY)) < 1, 'Next section remains in normal flow');
  const title = document.querySelector('#way-title');
  if (scrollY === 0) assert(Number(getComputedStyle(title).opacity) === 1, 'Sentence restored at top');
  assert(!document.querySelector('.scroll-down'), 'Scroll button removed');
  assert(document.documentElement.scrollWidth <= innerWidth, 'No page overflow');
  return {width: innerWidth, height, scrollY, parallax: y, blur: getComputedStyle(document.querySelector('.hero-media')).filter};
};
