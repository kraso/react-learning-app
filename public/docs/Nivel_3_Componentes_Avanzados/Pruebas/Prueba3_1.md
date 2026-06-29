## Hooks Avanzados

**Enunciado:**
Responde las siguientes preguntas sobre hooks avanzados en React. Escribe tus respuestas en el editor de código.

1. ¿Qué son los hooks personalizados y cuál es su propósito?
2. ¿Cómo se usa el hook useContext?
3. ¿Cuándo se debe usar useMemo?
4. ¿Cuál es la diferencia entre useMemo y useCallback?
5. ¿Qué hace un Error Boundary?

**Pistas:**
- Los hooks personalizados son funciones que encapsulan lógica reutilizable con hooks
- `useContext` consume un contexto React y retorna su valor
- `useMemo` memoiza el resultado de un cálculo costoso
- `useMemo` memoiza un valor; `useCallback` memoiza una función
- Los Error Boundaries son componentes que capturan errores en sus hijos

**Solución:**
```markdown
1. Los hooks personalizados son funciones que comienzan con "use" y encapsulan lógica reutilizable que usa otros hooks. Su propósito es extraer lógica de componentes para reutilizarla sin duplicar código, mejorando la mantenibilidad.

2. useContext(ThemeContext) consume un contexto y retorna su valor actual. Se usa dentro de un componente que está dentro del Provider del contexto. Permite acceder a datos compartidos sin pasar props manualmente por cada nivel del árbol de componentes.

3. Se debe usar useMemo cuando se realiza un cálculo costoso (filtrado de arrays grandes, operaciones matemáticas complejas) y se quiere evitar recalcularlo en cada render. Memoiza el resultado y solo recalcula cuando cambian sus dependencias.

4. useMemo memoiza el resultado de un cálculo (retorna un valor). useCallback memoiza una función (retorna la misma referencia entre renders). Ambos usan dependencias para decidir cuándo recalcular/recresar.

5. Un Error Boundary es un class component que captura errores de JavaScript en su árbol de componentes hijos durante el renderizado, en lifecycle methods y en constructores, mostrando un fallback UI en lugar de que la aplicación completa se rompa.
```
