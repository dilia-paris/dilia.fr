import { google } from 'googleapis';
import fs from 'fs/promises';

const PDF_OUTPUT = 'public/menu-dilia.pdf';
const STATE_FILE = '.github/menu-sync-state.json';

// Reuse the same literal-\n fix from sync-content.mjs
function fixLiteralNewlines(raw) {
  let result = '';
  let inString = false;
  let escaped = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (escaped) { result += ch; escaped = false; }
    else if (ch === '\\') {
      if (inString) { result += ch; escaped = true; }
      else { i++; result += ' '; }
    } else if (ch === '"') { inString = !inString; result += ch; }
    else { result += ch; }
  }
  return result;
}

async function main() {
  const docId = process.env.MENU_DOC_ID;
  if (!docId) throw new Error('Missing MENU_DOC_ID environment variable');

  const serviceAccountKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKeyRaw) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_KEY environment variable');

  let credentials;
  try {
    credentials = JSON.parse(serviceAccountKeyRaw);
  } catch {
    credentials = JSON.parse(fixLiteralNewlines(serviceAccountKeyRaw));
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  // Check last modified time on the Google Doc
  const fileInfo = await drive.files.get({
    fileId: docId,
    fields: 'modifiedTime,name',
  });
  const modifiedTime = fileInfo.data.modifiedTime;

  // Compare against stored state to avoid unnecessary exports
  let storedState = { modifiedTime: null };
  try {
    storedState = JSON.parse(await fs.readFile(STATE_FILE, 'utf-8'));
  } catch {
    // No state file yet — first run
  }

  if (storedState.modifiedTime === modifiedTime) {
    console.log(`Menu doc unchanged (${modifiedTime}) — skipping PDF export.`);
    return;
  }

  console.log(`Exporting menu PDF from "${fileInfo.data.name}"...`);

  const response = await drive.files.export(
    { fileId: docId, mimeType: 'application/pdf' },
    { responseType: 'arraybuffer' }
  );

  await fs.writeFile(PDF_OUTPUT, Buffer.from(response.data));
  await fs.writeFile(STATE_FILE, JSON.stringify({ modifiedTime }, null, 2) + '\n', 'utf-8');

  console.log(`✅ Menu PDF saved to ${PDF_OUTPUT}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
