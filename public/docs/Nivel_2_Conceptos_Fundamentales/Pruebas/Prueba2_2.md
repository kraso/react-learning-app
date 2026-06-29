## Estados y Hooks

**Enunciado:**
Responde las siguientes preguntas sobre estado y hooks en React. Escribe tus respuestas en el editor de código.

1. ¿Qué es el hook useState?
2. ¿Cuál es la diferencia entre estado y props?
3. ¿Cómo se declara un estado con useState?
4. ¿Qué es useEffect y cuándo se usa?

**Pistas:**
- `useState` es un hook que permite agregar estado a componentes funcionales
- Las props son inmutables y vienen del padre; el estado es mutable y pertenece al componente
- `useState` retorna un array con el valor actual y una función para actualizarlo
- `useEffect` ejecuta efectos secundarios después del renderizado

**Solución:**
```markdown
1. useState es un hook de React que permite añadir estado a un componente funcional. Retorna un array con dos elementos: el valor actual del estado y una función para actualizarlo. Ejemplo: const [contador, setContador] = useState(0);

2. Las props son datos que el componente recibe de su padre y son de solo lectura (inmutables). El estado es un objeto interno del componente que puede cambiar con el tiempo (mutable) y controla el comportamiento y renderizado del componente.

3. Se declara así: const [valorEstado, funcionParaActualizar] = useState(valorInicial); donde valorInicial puede ser un literal, un objeto o una función que retorna el valor inicial (lazy initialization).

4. useEffect es un hook que permite ejecutar efectos secundarios en componentes funcionales: llamadas a API, suscripciones, timers, etc. Se ejecuta después del renderizado del componente. Se usa para sincronizar el componente con sistemas externos o realizar operaciones que no deben bloquear el renderizado.
```
