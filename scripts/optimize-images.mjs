import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import os from 'os';

const imagesDir = path.join(process.cwd(), 'public', 'images');
const heroMobileNames = new Set([
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
    const isHeroDesktop = /-desktop\.webp$/i.test(file);
    const isHeroMobile = heroMobileNames.has(file);

    let pipeline = sharp(input).rotate();
    if (isHeroDesktop) {
      pipeline = pipeline.resize(1600, 667, { fit: 'cover', position: 'attention', withoutEnlargement: true });
    } else if (isHeroMobile) {
      pipeline = pipeline.resize(1600, 900, { fit: 'cover', withoutEnlargement: true });
    } else {
      pipeline = pipeline.resize(1400, 1050, { fit: 'inside', withoutEnlargement: true });
    }

    const quality = isHeroDesktop ? 72 : isHeroMobile ? 78 : 80;
    const buffer = await pipeline.webp({ quality, effort: 6 }).toBuffer();
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
