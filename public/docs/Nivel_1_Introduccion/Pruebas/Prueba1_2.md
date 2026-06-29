## Configuración y primeros pasos

**Enunciado:**
Responde las siguientes preguntas sobre el entorno de desarrollo de React. Escribe tus respuestas en el editor de código.

1. ¿Qué comando se usa para crear un nuevo proyecto React con Vite?
2. ¿Qué herramienta se usa para iniciar el servidor de desarrollo?
3. ¿Qué hace el comando `npm run dev` en un proyecto Vite?
4. ¿Cuál es el propósito del archivo `package.json`?
5. ¿Qué extensión de VS Code se recomienda para desarrollo con React?

**Pistas:**
- Vite es el bundler moderno recomendado para proyectos React nuevos
- El servidor de desarrollo se ejecuta con un script definido en package.json
- `npm run dev` inicia el servidor de desarrollo con hot reload
- `package.json` contiene metadatos del proyecto y lista de dependencias
- La extensión más popular para React en VS Code tiene "ES7" en su nombre

**Solución:**
```markdown
1. El comando es: npm create vite@latest mi-proyecto -- --template react

2. Se usa el servidor de desarrollo de Vite, que se inicia con el comando npm run dev.

3. El comando `npm run dev` inicia el servidor de desarrollo de Vite, que compila la aplicación en memoria, sirve los archivos y habilita el hot module replacement (HMR) para actualizaciones en tiempo real al guardar cambios.

4. El archivo `package.json` es el manifiesto del proyecto que contiene: nombre y versión, scripts disponibles, dependencias del proyecto y dependencias de desarrollo, y configuración general del proyecto.

5. La extensión recomendada es "ES7+ React/Redux/React-Native snippets" de dsznajder, que提供 snippets para componentes, hooks y patrones comunes de React.
```
