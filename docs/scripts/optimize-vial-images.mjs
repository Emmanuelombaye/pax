/**
 * Compress clean vial assets: PNG → WebP at display-appropriate sizes.
 * Usage: node docs/scripts/optimize-vial-images.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** @type {Record<string, { maxWidth: number; quality: number }>} */
const JOBS = {
  // Single vials — shown ~150–200px wide on screen
  'public/images/pax-media/personalized-semaglutide-injection-vial.png': { maxWidth: 640, quality: 82 },
  'public/images/pax-media/personalized-tirzepatide-injection-vial.png': { maxWidth: 640, quality: 82 },
  'public/images/vials/tirz.png': { maxWidth: 640, quality: 82 },

  // Pairs — shown ~300–500px wide
  'public/images/vials/together.png': { maxWidth: 1024, quality: 82 },
  'public/images/vials/protocol-cover.png': { maxWidth: 1024, quality: 82 },
  'public/images/pax-media/semaglutide-tirzepatide-injection-vials.png': { maxWidth: 1024, quality: 82 },
  'public/images/pax-media/hiw/treatment-plan.png': { maxWidth: 1024, quality: 80 },

  // Hero / card photos — largest display ~480px
  'public/images/vials/together-hero.png': { maxWidth: 960, quality: 80 },

  // UI composites — full-width sections, max ~1200px
  'public/images/pax-media/hiw/patient-portal-dashboard-semaglutide-mobile.png': { maxWidth: 900, quality: 78 },
  'public/images/pax-media/hiw/checkout-verify-identity.png': { maxWidth: 1200, quality: 78 },
  'public/images/pax-media/hiw/receive-your-medication.png': { maxWidth: 1200, quality: 78 },
  'public/images/pax-media/hiw/receive-your-medication-3.png': { maxWidth: 1200, quality: 78 },
};

let saved = 0;

for (const [rel, opts] of Object.entries(JOBS)) {
  const input = path.join(root, rel);
  if (!fs.existsSync(input)) {
    console.warn(`skip missing: ${rel}`);
    continue;
  }

  const out = input.replace(/\.png$/i, '.webp');
  const before = fs.statSync(input).size;
  const meta = await sharp(input).metadata();

  await sharp(input)
    .rotate()
    .resize(opts.maxWidth, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: opts.quality, effort: 4 })
    .toFile(out);

  const after = fs.statSync(out).size;
  saved += before - after;
  console.log(
    `${path.basename(rel)}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB webp (${meta.width}×${meta.height})`,
  );
}

console.log(`\nTotal saved: ${Math.round(saved / 1024)}KB`);
