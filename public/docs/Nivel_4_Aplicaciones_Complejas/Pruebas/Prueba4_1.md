## Aplicaciones Complejas

**Enunciado:**
Responde las siguientes preguntas sobre aplicaciones complejas en React. Escribe tus respuestas en el editor de código.

1. ¿Qué es React Router y cómo se usa?
2. ¿Cuándo es necesario usar una librería de gestión de estado?
3. ¿Qué herramientas existen para testear componentes de React?
4. ¿Cuáles son las principales opciones de despliegue para aplicaciones React?
5. ¿Qué importancia tiene el build de producción?

**Pistas:**
- React Router es la librería estándar para navegación en SPA con React
- Las librerías de estado como Redux o Zustand se usan cuando el estado es complejo o compartido
- Las principales herramientas de testing incluyen Testing Library y Jest
- Las opciones de deploy incluyen Vercel, Netlify, GitHub Pages y servidores propios
- El build de producción optimiza y minifica el código para mejor rendimiento

**Solución:**
```markdown
1. React Router es una librería de navegación para React que permite crear aplicaciones de una página (SPA) con rutas. Se usa envolviendo la app en BrowserRouter, definiendo rutas con Route dentro de Routes, y navegando con Link o useNavigate.

2. Es necesario cuando: el estado se comparte entre muchos componentes lejanos en el árbol, se necesita persistencia, se maneja estado asíncrono complejo, o se quiere separar la lógica de estado de los componentes para mejor mantenibilidad.

3. Las principales herramientas son: React Testing Library (para tests de integración/unidad), Jest (framework de testing), Cypress/Playwright (tests E2E), y MSW (para mocks de API). Testing Library es la más recomendada para tests de componentes.

4. Las principales opciones son: Vercel (óptima para Next.js), Netlify (gratuita con CI/CD), GitHub Pages (estático gratuito), AWS Amplify, Cloudflare Pages, y servidores propios con Docker o VPS.

5. El build de producción es crucial porque: minifica y comprime el código para reducir tamaño de carga, elimina código de desarrollo (debug, warnings), optimiza assets (imágenes, CSS), genera hashes para cache busting, y habilita tree-shaking para eliminar código no utilizado.
```
