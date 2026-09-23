// Run in the in-app tab's playwright.evaluate on Contact, Home or Our Way.
// Check once with the modal open, then again after Escape/Close.
() => {
  const assert = (ok, label) => { if (!ok) throw new Error(label); };
  const links = Array.from(document.querySelectorAll('[data-cal-link]'));
  assert(links.length > 0, 'Booking triggers exist');
  assert(links.every(link => link.dataset.calLink === 'otherness/discovery' && link.dataset.calNamespace === 'discovery'), 'Shared hardcoded Cal event');
  assert(document.documentElement.scrollWidth <= innerWidth, 'No page overflow');
  const modals = Array.from(document.querySelectorAll('cal-modal-box'));
  const modal = modals.find(el => getComputedStyle(el).visibility === 'visible');
  const root = document.getElementById('__next');
  if (modal) {
    assert(root.hasAttribute('inert'), 'Background is inert');
    assert(modal.getAttribute('role') === 'dialog', 'Modal semantics');
    assert(document.body.style.overflow === 'hidden', 'Background scroll locked');
    assert(modal.contains(document.activeElement), 'Focus is in modal');
    assert(modal.shadowRoot.querySelector('a[aria-label="Open booking page"]'), 'Direct booking fallback exists');
    assert(modal.querySelector('iframe').src.includes('/otherness/discovery/embed'), 'Correct embed URL');
  } else {
    assert(!root.hasAttribute('inert'), 'Background restored');
    assert(document.body.style.overflow !== 'hidden', 'Scroll restored');
  }
  return {width: innerWidth, triggers: links.length, modalOpen: !!modal, calState: modal?.getAttribute('state') || null};
};
