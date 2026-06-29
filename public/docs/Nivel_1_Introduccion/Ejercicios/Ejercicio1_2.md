## Componente con múltiples elementos

**Enunciado:**
Crea un componente funcional llamado `MiLista` que muestre una lista no ordenada con exactamente 3 elementos. Cada elemento de la lista debe ser un `<li>` dentro de un `<ul>`.

**Requisitos:**
1. El componente debe ser una función llamada `MiLista`
2. Debe renderizar una etiqueta `<ul>` con 3 `<li>` hijos
3. Cada `<li>` debe contener texto descriptivo
4. Debe exportarse como exportación por defecto

**Pistas:**
- En JSX, las listas se crean con las etiquetas HTML estándar `<ul>` y `<li>`
- Asegúrate de que el `<ul>` contenga exactamente 3 elementos `<li>` como hijos directos
- No olvides envolver todo en un elemento raíz `<div>` si es necesario

**Solución:**
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
```
