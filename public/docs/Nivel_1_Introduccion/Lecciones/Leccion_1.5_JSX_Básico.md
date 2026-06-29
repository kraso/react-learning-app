```markdown
## Lección 1.5: JSX Básico

**Contenido de la lección:**

JSX (JavaScript XML) permite escribir código similar a HTML dentro de JavaScript. Es una extensión de la sintaxis de JavaScript.

**Características de JSX:**
1. **Sintaxis similar a HTML**:
    ```jsx
    const elemento = <h1>Hola mundo</h1>;

2. Expresiones JavaScript:

    const nombre = "María";
    const elemento = <h1>Hola, {nombre}!</h1>;

3. Atributos HTML:

    const elemento = <img src="imagen.jpg" alt="Una imagen" />;

4. Sintaxis de estilo:

    const estilo = {
    color: 'blue',
    fontSize: '16px'
    };

    const elemento = <h1 style={estilo}>Texto con estilo</h1>;

Reglas importantes:

- JSX no es HTML real, es transformado a JavaScript
- Solo puede haber un elemento raíz
- Las etiquetas vacías deben auto-cerrarse
- Los nombres de atributos siguen el estándar camelCase