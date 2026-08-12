import { useEffect, useMemo, useState } from 'react';
import { YUCCA_HOME_TREATMENTS_HTML } from './yuccaHomeTreatmentsExactBlock.js';

const TAB_TREATMENT_SEED_BY_HREF = {
  '/wl': 'semaglutide',
  '/lon': 'nad',
  '/mr': 'sermorelin',
};

function seedFromPrimaryHref(href) {
  if (!href) return null;
  for (const [needle, seed] of Object.entries(TAB_TREATMENT_SEED_BY_HREF)) {
    if (href.includes(needle)) return seed;
  }
  return null;
}

export default function YuccaHomeTreatmentsExact({ openStart }) {
  // We render Yucca’s exact markup, then toggle `data-active` on tabs/panes
  // to match the selected state.
  const [active, setActive] = useState('wl');

  const html = useMemo(() => {
    // Yucca scraped markup uses root-level asset paths like `/foo.avif`.
    // In this repo we store those under `/images/yucca-clone/`.
    // We only rewrite flat filenames (no `/` inside the path), which covers
    // the treatments card images (vials, badges, tab imgs, etc).
    const prefix = '/images/yucca-clone';
    return YUCCA_HOME_TREATMENTS_HTML
      .replace(/src="\/([^\/"]+)"/g, (_m, file) => `src="${prefix}/${file}"`)
      .replace('data-revealed="false"', 'data-revealed="true"');
  }, []);

  useEffect(() => {
    const root = document.querySelector('[data-yucca-treatments-exact]');
    if (!root) return undefined;

    const tabButtons = root.querySelectorAll('.retro-home-treatments-tablist [data-retro-treatments-tab]');
    const panes = root.querySelectorAll('[data-retro-treatments-pane]');
    if (!tabButtons.length || !panes.length) return undefined;

    tabButtons.forEach((btn) => {
      const id = btn.getAttribute('data-retro-treatments-tab');
      if (!id) return;
      const isActive = id === active;
      btn.setAttribute('data-active', isActive ? 'true' : 'false');
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panes.forEach((pane) => {
      const id = pane.getAttribute('data-retro-treatments-pane');
      if (!id) return;
      const isActive = id === active;
      pane.setAttribute('data-active', isActive ? 'true' : 'false');
    });

    // Wire primary CTA to our app instead of the external quiz links.
    const primaryCtas = root.querySelectorAll('.retro-home-treatments-cta--primary');
    primaryCtas.forEach((a) => {
      // Avoid stacking multiple handlers on hot reloads.
      if (a.dataset.yuccaWired === 'true') return;
      a.dataset.yuccaWired = 'true';
      a.addEventListener('click', (ev) => {
        const href = a.getAttribute('href');
        const seed = seedFromPrimaryHref(href);
        if (seed) {
          ev.preventDefault();
          openStart(seed);
        }
      });
    });

    return undefined;
  }, [active, openStart]);

  useEffect(() => {
    const root = document.querySelector('[data-yucca-treatments-exact]');
    if (!root) return undefined;
    const tabButtons = root.querySelectorAll('.retro-home-treatments-tablist [data-retro-treatments-tab]');
    if (!tabButtons.length) return undefined;

    tabButtons.forEach((btn) => {
      if (btn.dataset.yuccaTabWired === 'true') return;
      btn.dataset.yuccaTabWired = 'true';
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-retro-treatments-tab');
        if (id) setActive(id);
      });
    });
    return undefined;
  }, []);

  return (
    <div
      data-yucca-treatments-exact
      // Exact scraped Yucca markup for 1:1 layout.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

