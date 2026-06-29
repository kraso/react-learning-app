## Lista con claves

**Enunciado:**
Crea un componente funcional llamado `ListaUsuarios` que reciba un array de objetos con `nombre` y `edad`, y renderice cada elemento como un `<li>` dentro de una `<ul>`. Cada elemento debe tener una `key` única.

**Requisitos:**
1. El componente debe llamarse `ListaUsuarios`
2. Debe recibir un prop llamado `usuarios` que sea un array de objetos
3. Cada objeto debe tener propiedades `nombre` y `edad`
4. Debe usar `map` para iterar el array y renderizar `<li>` elementos
5. Cada `<li>` debe tener una `key` única (puede ser el índice o un id)
6. Debe exportarse como exportación por defecto

**Pistas:**
- El método `map` transforma un array en otro: `array.map((item, index) => <li key={index}>{item.nombre}</li>)`
- En React, cada elemento renderizado en una lista necesita una `key` única como prop
- Si los objetos tienen un campo `id`, úsalo como key; si no, puedes usar el índice del array

**Solución:**
```jsx
import React from 'react';

function ListaUsuarios({ usuarios }) {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>
            {usuario.nombre} - {usuario.edad} años
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
```
