import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = 'src/content';

// Maps sheet tab name → output file path (relative to CONTENT_DIR)
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

// Coerce "true"/"false" strings to booleans; leave everything else as string
function coerceValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

// Set a value on a nested object using a dot-path key (e.g. "sections.dilia.title")
function setNested(obj, dotPath, value) {
  const keys = dotPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = coerceValue(value);
}

// Convert [[key, value], ...] rows to a nested JSON object
function rowsToJson(rows) {
  const result = {};
  for (const row of rows) {
    const key = row[0]?.trim();
    const value = row[1] ?? '';
    if (!key || key.startsWith('#')) continue; // skip empty rows and comments
    setNested(result, key, value);
  }
  return result;
}

async function main() {
  const sheetId = process.env.SHEET_ID;
  if (!sheetId) throw new Error('Missing SHEET_ID environment variable');

  const serviceAccountKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKeyRaw) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_KEY environment variable');

  const credentials = JSON.parse(serviceAccountKeyRaw);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  console.log('Fetching content from Google Sheets...\n');

  let updated = 0;
  let errors = 0;

  for (const [tabName, relPath] of Object.entries(TAB_MAP)) {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${tabName}!A2:B`, // Row 1 is the header (key | value)
      });

      const rows = response.data.values ?? [];
      const json = rowsToJson(rows);
      const outputPath = path.join(CONTENT_DIR, relPath);
      const newContent = JSON.stringify(json, null, 2) + '\n';

      let existingContent = '';
      try {
        existingContent = await fs.readFile(outputPath, 'utf-8');
      } catch {
        // File doesn't exist yet — will be created
      }

      if (newContent !== existingContent) {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, newContent, 'utf-8');
        console.log(`  Updated:   ${outputPath}`);
        updated++;
      } else {
        console.log(`  Unchanged: ${outputPath}`);
      }
    } catch (err) {
      console.error(`  Error syncing tab "${tabName}": ${err.message}`);
      errors++;
    }
  }

  console.log(`\n✅ Sync complete. ${updated} file(s) updated, ${errors} error(s).`);
  if (errors > 0) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
