```markdown
## Ejercicio 3: Componente con props

**Instrucciones:**
Crea un componente llamado `Saludo` que acepte una prop `nombre` y muestre un saludo personalizado.

**Requisitos:**
1. El componente debe aceptar una prop
2. Debe mostrar el nombre recibido en una frase de saludo
3. Debe usar la prop dentro del JSX

**Ejemplo de solución:**
```jsx
import React from 'react';

function Saludo(props) {
return (
    <div>
    <h1>Hola, ${props.nombre}!</h1>
    </div>
);
}

export default Saludo;