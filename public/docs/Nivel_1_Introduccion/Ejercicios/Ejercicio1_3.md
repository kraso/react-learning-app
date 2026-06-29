## Componente con props

**Enunciado:**
Crea un componente funcional llamado `Saludo` que acepte una prop llamada `nombre` y muestre un saludo personalizado en un encabezado. El componente debe recibir la prop y usarla dentro del JSX.

**Requisitos:**
1. El componente debe llamarse `Saludo`
2. Debe aceptar una prop llamada `nombre`
3. Debe renderizar un saludo que incluya el nombre recibido (ej: "Hola, Juan!")
4. Debe exportarse como exportación por defecto

**Pistas:**
- Las props se reciben como parámetro en la función del componente
- Puedes acceder a las props como `props.nombre` o usando destructuring `{ nombre }`
- Para insertar una variable en JSX se usan llaves `{}` dentro de las etiquetas

**Solución:**
```jsx
import React from 'react';

function Saludo({ nombre }) {
  return (
    <div>
      <h1>Hola, {nombre}!</h1>
    </div>
  );
}

export default Saludo;
```
