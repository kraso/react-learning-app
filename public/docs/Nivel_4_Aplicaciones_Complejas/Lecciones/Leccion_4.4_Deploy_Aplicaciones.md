# Lección 4.4: Deploy de Aplicaciones

Contenido de la lección:

Para desplegar una aplicación React:

Generar build optimizado:
npm run build

Servir localmente (opcional para pruebas):
npx serve -s build

Opciones de despliegue:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

Configuración de GitHub Pages:
1. npm install --save-dev gh-pages
2. Agregar en package.json:
   \
homepage\: \https://tu-usuario.github.io/nombre-repo\
3. Scripts:
   \predeploy\: \npm
run
build\,
   \deploy\: \gh-pages
build\
