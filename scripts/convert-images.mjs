import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, '..', '..', 'Users', 'user', '.cursor', 'projects', 'c-ceo-pax', 'assets');

// Fallback: assets may live next to workspace
const altSrc = 'C:\\Users\\user\\.cursor\\projects\\c-ceo-pax\\assets';
const source = fs.existsSync(altSrc) ? altSrc : srcDir;

const imagesDir = path.join(root, 'public', 'images');
fs.mkdirSync(imagesDir, { recursive: true });

const files = fs.readdirSync(source).filter((f) => f.endsWith('.png'));

for (const file of files) {
  const base = path.basename(file, '.png');
  const input = path.join(source, file);
  const output =
    base === 'logo'
      ? path.join(root, 'public', 'logo.webp')
      : path.join(imagesDir, `${base}.webp`);

  await sharp(input).webp({ quality: 86 }).toFile(output);
  console.log(`✓ ${base}.webp`);
}

console.log(`Converted ${files.length} images.`);
