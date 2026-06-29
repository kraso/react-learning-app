```markdown
## Ejercicio 2: Componente con múltiples elementos

**Instrucciones:**
Crea un componente llamado `MiLista` que muestre una lista con 3 elementos usando una lista no ordenada.

**Requisitos:**
1. El componente debe usar JSX
2. Debe mostrar una lista con tres elementos
3. Debe usar la etiqueta `<ul>` y `<li>`

**Ejemplo de solución:**
```jsx
import React from 'react';

function MiLista() {
return (
    <div>
    <ul>
        <li>Elemento 1</li>
        <li>Elemento 2</li>
        <li>Elemento 3</li>
    </ul>
    </div>
);
}

export default MiLista;