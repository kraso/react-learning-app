## Efecto con limpieza

**Enunciado:**
Crea un componente llamado `Temporizador` que use `useEffect` para crear un temporizador que se actualice cada segundo. El componente debe limpiar el intervalo cuando se desmonte para evitar fugas de memoria.

**Requisitos:**
1. El componente debe llamarse `Temporizador`
2. Debe usar `useState` para manejar un contador de segundos
3. Debe usar `useEffect` para crear un `setInterval` que incremente el contador cada segundo
4. Debe retornar una función de limpieza en `useEffect` que llame a `clearInterval`
5. Debe mostrar el tiempo transcurrido en pantalla
6. Debe exportarse como exportación por defecto

**Pistas:**
- `useEffect` puede retornar una función de limpieza: `useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [])`
- El array de dependencias vacío `[]` indica que el efecto solo se ejecuta al montar el componente
- Sin la limpieza, el intervalo seguiría ejecutándose incluso después de que el componente se desmonte

**Solución:**
```jsx
import React, { useState, useEffect } from 'react';

function Temporizador() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <div>
      <h2>Temporizador</h2>
      <p>Segundos transcurridos: {segundos}</p>
    </div>
  );
}

export default Temporizador;
```
