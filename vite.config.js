// importo la funcion defineConfig de Vite
import { defineConfig } from 'vite'
// imoporto un resolvedor de rutas
import { resolve } from "node:path"

// exporto la configuracion de Vite
export default defineConfig({
  // Directorio raiz de los archivos fuente
  root: 'src',

  // Configuracion del servidor de desarrollo de front-end
  server: {
    port: 5173,
    strictPort: true,
  },

  // Configuracion del build
  build: {
    // Directorio de salida
    outDir: './dist',
    emptyOutDir: true,
    // Generar un manifiesto
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js')
      }
    }
  }
})