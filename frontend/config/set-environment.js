require('dotenv').config();
const fs = require('fs');

const authUrl = process.env.AUTH_URL;
const notesUrl = process.env.NOTES_URL;

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

// Escribimos el archivo si no existe con el contenido que queremos que tenga
fs.writeFileSync(envPath, envContent);
fs.writeFileSync(envDevPath, envDevContent);
