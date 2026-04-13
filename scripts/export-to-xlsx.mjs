import fs from 'fs/promises';
import path from 'path';
import * as XLSX from 'xlsx';

const CONTENT_DIR = 'src/content';
const OUTPUT_FILE = 'scripts/sheets-import/dilia-content.xlsx';

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

async function main() {
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

  const workbook = XLSX.utils.book_new();

  for (const [tabName, relPath] of Object.entries(TAB_MAP)) {
    const json = JSON.parse(await fs.readFile(path.join(CONTENT_DIR, relPath), 'utf-8'));
    const rows = flattenObject(json);

    const sheetData = [['key', 'value'], ...rows];
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Style the header row and key column width
    sheet['!cols'] = [{ wch: 45 }, { wch: 120 }];

    XLSX.utils.book_append_sheet(workbook, sheet, tabName);
    console.log(`  ${tabName} (${rows.length} rows)`);
  }

  XLSX.writeFile(workbook, OUTPUT_FILE);
  console.log(`\n✅ Written to ${OUTPUT_FILE}`);
}

main().catch(err => { console.error(err); process.exit(1); });
