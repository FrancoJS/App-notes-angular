const fs = require('fs');
const path = require('path');

const authUrl = process.env.AUTH_URL;
const notesUrl = process.env.NOTES_URL;

const environmentPath = path.join(__dirname, '../environments/environment.ts');

console.log(environmentPath);
console.log(path.resolve(environmentPath));
console.log(process.cwd());

const environmentContent = `
export const environment = {
  AUTH_URL: '${authUrl}',
  NOTES_URL: '${notesUrl}',
};`;

// fs.writeFileSync(environmentPath, environmentContent);
