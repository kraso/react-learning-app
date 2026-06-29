## Configuración de deploy

**Enunciado:**
Configura una aplicación React para producción usando Vite. Crea el archivo de configuración, genera el build de producción y verifica que la estructura de archivos generada sea correcta.

**Requisitos:**
1. Crear o modificar `vite.config.js` para configurar la.build de producción
2. Configurar la propiedad `base` para despliegue en subdirectorios si es necesario
3. Ejecutar `npm run build` para generar el build de producción
4. Verificar que se genera la carpeta `dist/` con los archivos optimizados
5. Verificar que los archivos incluyen hashes para cache busting
6. Documentar los comandos necesarios para el despliegue

**Pistas:**
- Vite usa `vite.config.js` o `vite.config.ts` para la configuración del proyecto
- `npm run build` genera una carpeta `dist/` con HTML, JS y CSS minificados
- Los archivos generados tienen nombres con hashes como `index-abc123.js` para control de caché

**Solución:**
```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

```bash
# Comandos para despliegue
npm install
npm run build
# Los archivos optimizados quedan en la carpeta dist/
# Subir contenido de dist/ a tu servidor o plataforma de hosting
```
