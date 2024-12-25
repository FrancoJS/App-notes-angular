import fs from 'fs';
import path from 'path';

const authUrl = process.env.AUTH_URL;
const notesUrl = process.env.NOTES_URL;

const environmentPath = path.join(__dirname, '../src/environments/environment.ts');

console.log(environmentPath);

const environmentContent = `
export const environment = {
  AUTH_URL: '${authUrl}',
  NOTES_URL: '${notesUrl}',
};`;

fs.writeFileSync(environmentPath, environmentContent);
