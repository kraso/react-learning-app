## Rutas, Estado y Testing

**Enunciado:**
Responde las siguientes preguntas sobre rutas, estado y testing en React. Escribe tus respuestas en el editor de código.

1. ¿Cómo se implementa navegación entre páginas en React?
2. ¿Qué beneficios tiene usar Zustand para manejar estado?
3. ¿Qué es una prueba unitaria y por qué es importante en React?
4. ¿Qué hace el comando npm run build?
5. ¿Cómo se configura GitHub Pages para un proyecto React?

**Pistas:**
- La navegación se implementa con React Router usando BrowserRouter, Routes y Route
- Zustand es más ligero y simple que Redux, con menos boilerplate
- Una prueba unitaria verifica una pieza aislada de código
- `npm run build` ejecuta el script de build definido en package.json
- GitHub Pages sirve archivos estáticos desde una rama específica del repositorio

**Solución:**
```markdown
1. Se implementa usando React Router: se envuelve la app en BrowserRouter, se definen las rutas con Routes y Route, se usa Link para navegación declarativa, y useNavigate para navegación programática. Cada ruta asocia un path con un componente.

2. Beneficios de Zustand: es muy ligero (menos de 1KB), no tiene boilerplate como Redux, no requiere providers, permite múltiples stores, es fácil de aprender, funciona bien con TypeScript, y tiene buena documentación. Es ideal para apps de tamaño pequeño-mediano.

3. Una prueba unitaria verifica que una pieza aislada de código (un componente, función o hook) funcione correctamente por separado. Es importante porque: detecta errores temprano, facilita refactoring, documenta el comportamiento esperado, y mejora la confianza al hacer cambios.

4. El comando `npm run build` ejecuta el script "build" definido en package.json, que típicamente usa Vite o Webpack para: compilar JSX a JavaScript estándar, minificar el código, optimizar assets, generar hashes en los nombres de archivo, y crear la carpeta dist/ con archivos listos para producción.

5. Se configura así: 1) Instalar gh-pages, 2) Agregar script de deploy en package.json, 3) Configurar la propiedad "homepage" en package.json con la URL de GitHub Pages, 4) Ejecutar npm run deploy que sube el contenido de dist/ a la rama gh-pages, 5) Activar GitHub Pages en la configuración del repositorio seleccionando la rama gh-pages.
```
