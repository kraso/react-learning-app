## Componente con estado

**Enunciado:**
Crea un componente funcional llamado `Contador` que mantenga un estado numérico y permita incrementarlo y decrementarlo mediante dos botones. El valor actual del contador debe mostrarse en pantalla.

**Requisitos:**
1. El componente debe llamarse `Contador`
2. Debe usar el hook `useState` para manejar el estado del contador
3. Debe tener un botón para incrementar el contador en 1
4. Debe tener un botón para decrementar el contador en 1
5. Debe mostrar el valor actual del contador entre los botones
6. Debe exportarse como exportación por defecto

**Pistas:**
- El hook `useState` se importa de 'react' y retorna un array con el valor y una función para actualizarlo
- La función `setContador` actualiza el estado, por ejemplo: `setContador(contador + 1)`
- No modifiques el estado directamente, siempre usa la función de actualización

**Solución:**
```jsx
import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const decrementar = () => {
    setContador(contador - 1);
  };

  return (
    <div>
      <h2>Contador: {contador}</h2>
      <button onClick={decrementar}>-</button>
      <button onClick={incrementar}>+</button>
    </div>
  );
}

export default Contador;
```
