import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = 'C:\\Users\\user\\.cursor\\projects\\c-ceo-pax\\assets';
const imagesDir = path.join(root, 'public', 'images');

const prefix = process.argv[2] || 'home-scroll';
const files = fs.readdirSync(source).filter(
  (f) => f.endsWith('.png') && f.startsWith(prefix)
);

if (!files.length) {
  console.error(`No PNG files matching "${prefix}" in ${source}`);
  process.exit(1);
}

fs.mkdirSync(imagesDir, { recursive: true });

for (const file of files) {
  const base = path.basename(file, '.png');
  const input = path.join(source, file);
  const output = path.join(imagesDir, `${base}.webp`);
  await sharp(input).webp({ quality: 86 }).toFile(output);
  console.log(`✓ ${base}.webp`);
}

console.log(`Converted ${files.length} supplemental image(s).`);
