import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/* Brand kit first — locked Pax tokens (forest / sand / dune / terracotta) */
import './brand/kit.css'
import './index.css'
import './styles/glp-picker.css'
import './styles/yucca-shell.css'
import './styles/yucca-retro.css'
import './styles/yucca-clone-sections.css'
import './styles/yucca-treatments-page.css'
import './styles/yucca-clone-treatments.css'
/* Live Yucca explore base geometry, then local mirror/utils overrides */
import './styles/yucca-explore-tabs.css'
import './styles/yucca-explore-index.css'
import './styles/yucca-treatments-mirror.css'
import './styles/yucca-treatments-utils.css'
import './styles/yucca-treatments-fidelity.css'
import './styles/yucca-home-mirror.css'
import './styles/yucca-home-fidelity.css'
import './styles/yucca-goal-treatments.css'
import './styles/yucca-goal-hiw.css'
import './styles/how-it-works-page.css'
import './styles/pax-advisors.css'
import './styles/pax-protocol.css'
import './styles/pax-knowall.css'
import './styles/pax-reviews.css'
import './styles/pax-why.css'
import './styles/pax-brand-enforce.css'
import './styles/pax-home-brand.css'
import './styles/pax-home-hero.css'
import './styles/pax-mobile-nav.css'
import './styles/pax-buttons.css'

import App from './App.jsx'
import { PAX_PASSPORT } from './brand/index.js'

document.documentElement.dataset.brand = 'pax-longevity'
document.documentElement.style.colorScheme = 'light'
document.title = `${PAX_PASSPORT.product.name} · Weight Loss`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker for caching (stale-while-revalidate)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
