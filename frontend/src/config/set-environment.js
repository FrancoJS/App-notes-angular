const fs = require('fs');
const path = require('path');

const authUrl = process.env.AUTH_URL;
const notesUrl = process.env.NOTES_URL;

const environmentPathDevelopment = path.join(__dirname, '../environments/environment.development.ts');
const environmentPath = path.join(__dirname, '../environments/environment.ts');

// if (!fs.existsSync(environmentPath)) {
//   fs.mkdirSync(environmentPath, { recursive: true });
//   fs.mkdirSync(environmentPathDevelopment, { recursive: true });
// }

const environmentContent = `
export const environment = {
  production: true,
  AUTH_URL: '${authUrl}',
  NOTES_URL: '${notesUrl}',
};`;

const environmentDevelopmentContent = `
export const environment = {
  production: false,
  AUTH_URL: '${authUrl}',
  NOTES_URL: '${notesUrl}',
};`;

fs.writeFileSync(environmentPath, environmentContent);
fs.writeFileSync(environmentPathDevelopment, environmentDevelopmentContent);
