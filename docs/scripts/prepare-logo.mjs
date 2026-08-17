import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const source = path.join(root, 'public', 'images', 'newpaxlogo.png');
const pngOut = path.join(root, 'public', 'images', 'pax-logo.png');
const webpOut = path.join(root, 'public', 'images', 'pax-logo.webp');

if (!fs.existsSync(source)) {
  console.error('Source logo not found:', source);
  process.exit(1);
}

function removeCreamBackground(buffer, width, height) {
  const pixels = Buffer.from(buffer);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const avg = (r + g + b) / 3;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    if (avg > 228 && spread < 28) {
      pixels[i + 3] = 0;
    }
  }
  return pixels;
}

const base = sharp(source).rotate().ensureAlpha();
const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
const transparent = removeCreamBackground(data, info.width, info.height);

const trimmed = await sharp(transparent, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 12 })
  .resize({ height: 280, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toBuffer();

fs.writeFileSync(pngOut, trimmed);

await sharp(trimmed)
  .webp({ quality: 92, effort: 6, alphaQuality: 100 })
  .toFile(webpOut);

const meta = await sharp(pngOut).metadata();
console.log(`Logo prepared: ${meta.width}x${meta.height}`);
console.log(`PNG: ${Math.round(fs.statSync(pngOut).size / 1024)}KB`);
console.log(`WebP: ${Math.round(fs.statSync(webpOut).size / 1024)}KB`);
