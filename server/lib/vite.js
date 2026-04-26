import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Helper para handlebars que genera las etiquetas de Vite
 * En desarrollo: Conecta al servidor de vite
 * En producción: Usa los archivos compilados del manifest
 */
export function viteAssets() {
  const isDev = process.env.NODE_ENV !== 'production';
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

  if (isDev) {
    // cargamos el codigo para el front directamente del servidor de Vite
    return `
    <script type="module" src="${viteDevServer}/@vite/client"></script>
    <script type="module" src="${viteDevServer}/main.js"></script>
    `;
  }

  // En producción, leemos el manifest generado por Vite para obtener las rutas de los archivos compilados
  const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'dist/manifest.json');
  
  // verificamos que el manifest exista
  if (!fs.existsSync(manifestPath)) {
    console.warn('El archivo manifest.json no se encuentra. Asegúrate de haber ejecutado el build de Vite "npm run build" first');
    return '';
  }

  // parseando el manifest para obtener las rutas de los archivos compilados
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  
  // obtener el punto de entrada de los scripts del frontend
  const mainEntry = manifest['main.js'];
  
  // verificando la correcta carga del mainentry
  if (!mainEntry) {
    console.warn('No se encontró la entrada "main.js" en el manifest.json. Asegúrate de que tu punto de entrada esté correctamente configurado en Vite.');
    return '';
  }

  // creando la variable que contendra etiqueta de los scripts del frontend
  let tags = '';
  
  // css files (Los CSS se cargan mejor con la etiqueta link)
  if (mainEntry.css) {
    mainEntry.css.forEach(cssFile => {
      tags += `<link rel="stylesheet" href="/${cssFile}">`;
    });
  }
  
  // js files
  tags += `<script type="module" src="${mainEntry.file}"></script>`;
  
  // ¡Faltaba esta línea para que funcione en producción!
  return tags; 
}

// Registrar Helper (¡Ahora sí está AFUERA de la otra función y Node será feliz!)
export function registerViteHelper(hbs) {
  hbs.registerHelper('viteAssets', () => 
    new hbs.SafeString(viteAssets())
  );
}