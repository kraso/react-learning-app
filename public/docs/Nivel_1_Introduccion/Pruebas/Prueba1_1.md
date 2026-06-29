## Conceptos básicos

**Enunciado:**
Responde las siguientes preguntas. Escribe tus respuestas en el editor de código.

1. ¿Qué es React?
2. ¿Cuál es la principal ventaja del uso de componentes en React?
3. ¿Qué es JSX?
4. ¿Cómo se crea un componente funcional en React?
5. ¿Cuál es la diferencia principal entre componentes funcionales y de clase?

**Pistas:**
- React es una librería (no un framework) desarrollada por Meta para construir interfaces de usuario
- Los componentes permiten reutilizar código y separar la UI en piezas independientes
- JSX es una extensión de sintaxis que combina HTML con JavaScript
- Un componente funcional es una función que retorna JSX
- Los componentes de clase usan `this.state` y métodos de ciclo de vida; los funcionales usan hooks

**Solución:**
```markdown
1. React es una librería JavaScript de código abierto desarrollada por Meta (Facebook) para construir interfaces de usuario, especialmente aplicaciones web de una sola página (SPA). Se basa en un DOM virtual para actualizar de forma eficiente la interfaz.

2. La principal ventaja es la reutilización: los componentes permiten dividir la UI en piezas independientes y reutilizables, facilitando el mantenimiento, las pruebas y la colaboración en equipo.

3. JSX (JavaScript XML) es una extensión de sintaxis que permite escribir código HTML dentro de JavaScript. Se compila a llamadas a `React.createElement()` y facilita la visualización de la estructura de la interfaz.

4. Se crea escribiendo una función que retorne JSX:
   function MiComponente() {
     return <div>Hola</div>;
   }

5. Los componentes de clase extienden `React.Component`, usan `this.state` y métodos como `componentDidMount`. Los componentes funcionales son simples funciones que usan hooks como `useState` y `useEffect` para manejar estado y efectos.
```
