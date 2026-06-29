## Manejo de eventos

**Enunciado:**
Crea un componente funcional llamado `CambioTexto` que contenga un botón y un texto. Al hacer clic en el botón, el texto debe cambiar de un valor a otro. El componente debe usar un estado para controlar qué texto se muestra.

**Requisitos:**
1. El componente debe llamarse `CambioTexto`
2. Debe tener un estado booleano o string que controle el texto mostrado
3. Debe tener un botón que, al hacer clic, cambie el texto
4. Debe usar un manejador de eventos `onClick`
5. Debe exportarse como exportación por defecto

**Pistas:**
- Usa `useState` para guardar el estado del texto actual
- El evento `onClick` se asigna como prop en el botón: `<button onClick={manejador}>`
- Define una función que alterne el estado, por ejemplo usando un booleano y un operador ternario

**Solución:**
```jsx
import React, { useState } from 'react';

function CambioTexto() {
  const [cambiado, setCambiado] = useState(false);

  const handleClick = () => {
    setCambiado(!cambiado);
  };

  return (
    <div>
      <p>{cambiado ? 'Texto cambiado!' : 'Texto original'}</p>
      <button onClick={handleClick}>Cambiar texto</button>
    </div>
  );
}

export default CambioTexto;
```
