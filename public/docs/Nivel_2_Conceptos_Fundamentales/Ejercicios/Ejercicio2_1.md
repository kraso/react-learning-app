## Componente con múltiples props

**Enunciado:**
Crea un componente funcional llamado `Usuario` que reciba tres props: `nombre`, `edad` y `email`. El componente debe usar destructuring para extraer las props y mostrarlas en un formato legible dentro de un `<div>`.

**Requisitos:**
1. El componente debe llamarse `Usuario`
2. Debe recibir props `nombre` (string), `edad` (number) y `email` (string)
3. Debe usar destructuring para extraer las props en el parámetro de la función
4. Debe renderizar cada dato en un elemento HTML separado
5. Debe exportarse como exportación por defecto

**Pistas:**
- El destructuring de props se hace directamente en el parámetro: `function Usuario({ nombre, edad, email })`
- Puedes usar etiquetas `<p>` o `<div>` para mostrar cada dato de forma separada
- Recuerda que las variables en JSX se envuelven entre llaves `{}`

**Solución:**
```jsx
import React from 'react';

function Usuario({ nombre, edad, email }) {
  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Edad:</strong> {edad}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}

export default Usuario;
```
