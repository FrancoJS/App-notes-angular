const fs = require('fs');

require('dotenv').config();

const authUrl = process.env.AUTH_URL_PRODUCTION;
const notesUrl = process.env.NOTES_URL_PRODUCTION;

const envDirectory = './src/environments';
const envPath = `${envDirectory}/environment.ts`;
const envDevPath = `${envDirectory}/environment.development.ts`;

if (!fs.existsSync(envDirectory)) {
  // Si no existe la carpeta, la creamos
  fs.mkdirSync(envDirectory);
}

const envContent = `
export const environment = {
  production: true,
  AUTH_URL: '${authUrl}',
  NOTES_URL: '${notesUrl}',
};`;

const envDevContent = `
export const environment = {
  production: false,
  AUTH_URL: '${authUrl}',
  NOTES_URL: '${notesUrl}',
};`;

fs.writeFileSync(envPath, envContent);
fs.writeFileSync(envDevPath, envContent);
