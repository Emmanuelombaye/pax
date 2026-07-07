import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import os from 'os';

const imagesDir = path.join(process.cwd(), 'public', 'images');
const heroNames = new Set([
  'hero-longevity.webp',
  'miami-active.webp',
  'hero-miami-cycle.webp',
  'hero-miami-yoga.webp',
  'hero-miami-water.webp',
  'home-scroll-banner.webp',
]);

const files = fs.readdirSync(imagesDir).filter((f) => /\.webp$/i.test(f));

for (const file of files) {
  const input = path.join(imagesDir, file);
  try {
    const before = fs.statSync(input).size;
    const isHero = heroNames.has(file);

    let pipeline = sharp(input).rotate();
    pipeline = isHero
      ? pipeline.resize(1600, 900, { fit: 'cover', withoutEnlargement: true })
      : pipeline.resize(1400, 1050, { fit: 'inside', withoutEnlargement: true });

    const buffer = await pipeline.webp({ quality: isHero ? 78 : 80, effort: 6 }).toBuffer();
    const tmp = path.join(os.tmpdir(), `pax-opt-${file}`);
    fs.writeFileSync(tmp, buffer);
    fs.copyFileSync(tmp, input);
    fs.unlinkSync(tmp);

    const after = fs.statSync(input).size;
    console.log(`${file}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`);
  } catch (err) {
    console.warn(`Skip ${file}: ${err.message}`);
  }
}
