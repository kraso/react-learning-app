## Optimización y Manejo de Errores

**Enunciado:**
Responde las siguientes preguntas sobre optimización y manejo de errores en React. Escribe tus respuestas en el editor de código.

1. ¿Qué es React.memo y cuándo se usa?
2. ¿Cómo funciona el hook useState en combinación con useEffect?
3. ¿Qué significa que un efecto tenga dependencias?
4. ¿Cuándo es necesario implementar un Error Boundary?
5. ¿Qué es el patrón de manejo de errores en React?

**Pistas:**
- `React.memo` es un HOC que evita re-renders innecesarios comparando props
- `useEffect` se ejecuta después del render; `useState` actualiza el estado y provoca re-render
- El array de dependencias define cuándo se re-ejecuta el efecto
- Los Error Boundaries se usan cuando componentes pueden lanzar errores inesperados
- React no tiene un sistema integrado de try/catch para componentes funcionales

**Solución:**
```markdown
1. React.memo es un Higher Order Component que envuelve un componente y evita re-renders si las props no han cambiado (comparación superficial). Se usa para optimizar componentes que se renderizan frecuentemente con las mismas props, como listas o componentes puros.

2. useState y useEffect trabajan juntos así: el estado控製 el render; cuando se actualiza el estado con setter, el componente se re-renderiza; useEffect se ejecuta después de cada render y puede reaccionar a cambios en el estado o props usando el array de dependencias.

3. Que un efecto tenga dependencias significa que el array de dependencias del useEffect define qué valores monitorea. El efecto solo se re-ejecuta cuando uno de esos valores cambia. Si el array está vacío, solo se ejecuta al montar. Si tiene valores, se ejecuta al montar y cuando cualquiera de ellos cambie.

4. Es necesario implementar un Error Boundary cuando se sabe que un componente hijo podría lanzar errores inesperados (llamadas a API, parsing de datos, etc.), cuando se quiere mostrar un UI de fallback en lugar de que toda la app crashee, y para mejorar la experiencia del usuario ante errores.

5. El patrón consiste en usar class components con componentDidCatch para capturar errores, mostrar un UI de fallback amigable, registrar el error para monitoreo, y proveer una opción de recuperación (reintentar, volver al inicio). No hay equivalente funcional directo, por lo que se usan class components específicamente para esto.
```
