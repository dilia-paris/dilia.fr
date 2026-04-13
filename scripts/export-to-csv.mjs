import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = 'src/content';
const OUTPUT_DIR = 'scripts/sheets-import';

const TAB_MAP = {
  'banner':          'banner.json',
  'fr.common':       'fr/common.json',
  'en.common':       'en/common.json',
  'fr.home':         'fr/home.json',
  'en.home':         'en/home.json',
  'fr.dilia':        'fr/dilia.json',
  'en.dilia':        'en/dilia.json',
  'fr.dilietta':     'fr/dilietta.json',
  'en.dilietta':     'en/dilietta.json',
  'fr.lacave':       'fr/lacave.json',
  'en.lacave':       'en/lacave.json',
  'fr.distribution': 'fr/distribution.json',
  'en.distribution': 'en/distribution.json',
};

function flattenObject(obj, prefix = '') {
  const rows = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      rows.push(...flattenObject(value, fullKey));
    } else {
      rows.push([fullKey, String(value)]);
    }
  }
  return rows;
}

function escapeCsv(value) {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  for (const [tabName, relPath] of Object.entries(TAB_MAP)) {
    const inputPath = path.join(CONTENT_DIR, relPath);
    const json = JSON.parse(await fs.readFile(inputPath, 'utf-8'));
    const rows = flattenObject(json);

    const csvLines = ['key,value'];
    for (const [key, value] of rows) {
      csvLines.push(`${escapeCsv(key)},${escapeCsv(value)}`);
    }

    const outputPath = path.join(OUTPUT_DIR, `${tabName}.csv`);
    await fs.writeFile(outputPath, csvLines.join('\n') + '\n', 'utf-8');
    console.log(`  ${outputPath} (${rows.length} rows)`);
  }

  console.log('\nDone. Import each CSV into its matching Google Sheets tab.');
}

main().catch(err => { console.error(err); process.exit(1); });
