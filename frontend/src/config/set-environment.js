const fs = require('fs');
const path = require('path');

const authUrl = process.env.AUTH_URL;
const notesUrl = process.env.NOTES_URL;

const environmentDirPath = path.join(__dirname, '../environments');
const environmentPathDevelopment = path.join(__dirname, '../environments/environment.development.ts');
const environmentPath = path.join(__dirname, '../environments/environment.ts');

if (!fs.existsSync(environmentDirPath)) {
  // Si no existe la carpeta, la creamos ya que railway elimina carpetas vacias
  fs.mkdirSync(environmentDirPath, { recursive: true });
}

console.log(environmentPath);
console.log(environmentPathDevelopment);

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

// fs.writeFileSync(environmentPath, environmentContent);
// fs.writeFileSync(environmentPathDevelopment, environmentDevelopmentContent);
