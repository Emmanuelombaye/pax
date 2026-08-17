/**
 * Prepare brand-kit assets (logo + favicon).
 * Source of truth: docs/brand-kit.md · pax-health-brand-kit.pdf
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const logoScript = path.join(root, 'scripts', 'prepare-logo.mjs');
const faviconSvg = path.join(root, 'public', 'favicon.svg');

if (!fs.existsSync(faviconSvg)) {
  console.warn('Missing public/favicon.svg — add one from the brand kit.');
} else {
  console.log('✓ favicon.svg present');
}

if (fs.existsSync(logoScript)) {
  const result = spawnSync(process.execPath, [logoScript], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.warn('Logo prep skipped — place source at public/images/newpaxlogo.png from the brand kit PDF.');
  }
} else {
  console.warn('prepare-logo.mjs not found');
}

console.log('Brand kit prep finished. CSS tokens: src/brand/kit.css');
