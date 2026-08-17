import fs from 'node:fs';

const files = [
  'src/styles/marketing.css',
  'src/styles/portal.css',
  'src/styles/start.css',
  'src/portal/charts.jsx',
];

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  const before = s;
  s = s.replace(/font-weight:\s*(500|600|700|800)\b/g, 'font-weight: 400');
  s = s.replace(/rgba\(\s*31\s*,\s*26\s*,\s*22\s*,/g, 'rgba(59, 82, 102,');
  s = s.replace(/#7a4a44/gi, 'var(--warn)');
  s = s.replace(
    /rgba\(\s*237\s*,\s*213\s*,\s*204\s*,\s*[^)]+\)/g,
    'color-mix(in oklch, var(--dune) 55%, var(--sand))',
  );
  if (s !== before) {
    fs.writeFileSync(file, s);
    console.log('updated', file);
  } else {
    console.log('unchanged', file);
  }
}
