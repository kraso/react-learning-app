## Crear tu primer componente

**Enunciado:**
Crea un componente funcional llamado `MiNombre` que renderice tu nombre dentro de un encabezado h1. El componente debe exportarse como exportación por defecto.

**Requisitos:**
1. El componente debe ser una función llamada `MiNombre`
2. Debe renderizar un `<div>` que contenga un `<h1>` con tu nombre
3. Debe exportarse con `export default`
4. El componente debe ser válido y renderizarse sin errores

**Pistas:**
- Un componente funcional es simplemente una función que retorna JSX
- Recuerda que en JSX las etiquetas deben estar cerradas y el componente debe tener un único elemento raíz
- Usa `function MiNombre() { return (<div><h1>Tu Nombre</h1></div>); }` y luego `export default MiNombre;`

**Solución:**
```jsx
import React from 'react';

function MiNombre() {
  return (
    <div>
      <h1>Marcos</h1>
    </div>
  );
}

export default MiNombre;
```
