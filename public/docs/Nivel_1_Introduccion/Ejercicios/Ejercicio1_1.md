```markdown
## Ejercicio 1: Crear tu primer componente

**Instrucciones:**
Crea un componente llamado `MiNombre` que muestre tu nombre en un encabezado h1.

**Requisitos:**
1. El componente debe ser funcional
2. Debe usar JSX para renderizar el nombre
3. Debe exportarse por defecto

**Ejemplo de solución:**
```jsx
import React from 'react';

function MiNombre() {
return (
    <div>
    <h1>Mi Nombre</h1>
    </div>
);
}

export default MiNombre;