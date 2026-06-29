## Formulario simple

**Enunciado:**
Crea un componente funcional llamado `FormularioSimple` que contenga un input de texto controlado con `useState`. El valor del input debe sincronizarse con el estado y mostrarse en pantalla en tiempo real.

**Requisitos:**
1. El componente debe llamarse `FormularioSimple`
2. Debe tener un estado para almacenar el valor del input
3. Debe renderizar un `<input>` cuyo valor esté controlado por el estado
4. Debe manejar el evento `onChange` para actualizar el estado
5. Debe mostrar el valor actual del input debajo del formulario
6. Debe exportarse como exportación por defecto

**Pistas:**
- Un input controlado sincroniza su valor con el estado: `<input value={estado} onChange={manejador}>`
- La función manejadora recibe el evento `e` y actualiza el estado con `e.target.value`
- Muestra el estado entre llaves `{}` en un párrafo debajo del input

**Solución:**
```jsx
import React, { useState } from 'react';

function FormularioSimple() {
  const [valor, setValor] = useState('');

  const handleChange = (e) => {
    setValor(e.target.value);
  };

  return (
    <div>
      <h2>Formulario Simple</h2>
      <input
        type="text"
        value={valor}
        onChange={handleChange}
        placeholder="Escribe algo..."
      />
      <p>Valor actual: {valor}</p>
    </div>
  );
}

export default FormularioSimple;
```
