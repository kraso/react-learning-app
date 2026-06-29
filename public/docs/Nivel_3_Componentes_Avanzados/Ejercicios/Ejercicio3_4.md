## Memoización

**Enunciado:**
Crea un componente llamado `ListaOptimizada` que use `useMemo` para evitar recálculos costosos y `useCallback` para evitar recrear funciones innecesariamente. El componente debe renderizar una lista grande de elementos filtrados.

**Requisitos:**
1. El componente debe llamarse `ListaOptimizada`
2. Debe tener un estado para un número de filtro
3. Debe usar `useMemo` para calcular una lista filtrada de al menos 1000 elementos
4. Debe usar `useCallback` para la función que cambia el filtro
5. Debe mostrar la cantidad de elementos resultantes
6. Debe exportarse como exportación por defecto

**Pistas:**
- `useMemo(() => calculoCostoso(), [dependencias])` memoiza el resultado de un cálculo
- `useCallback(() => funcion, [dependencias])` memoiza una función para evitar recrearla
- Genera un array grande con `Array.from({ length: 1000 }, (_, i) => i)` y filtra según el estado

**Solución:**
```jsx
import React, { useState, useMemo, useCallback } from 'react';

function ListaOptimizada() {
  const [filtro, setFiltro] = useState(0);

  const datos = useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      valor: i * 2,
    }));
  }, []);

  const datosFiltrados = useMemo(() => {
    return datos.filter((item) => item.valor > filtro * 100);
  }, [datos, filtro]);

  const cambiarFiltro = useCallback((nuevoValor) => {
    setFiltro(nuevoValor);
  }, []);

  return (
    <div>
      <h2>Lista Optimizada</h2>
      <p>Filtro actual: {filtro}</p>
      <p>Elementos que cumplen el filtro: {datosFiltrados.length}</p>
      <button onClick={() => cambiarFiltro(filtro + 1)}>Aumentar filtro</button>
      <button onClick={() => cambiarFiltro(filtro - 1)}>Disminuir filtro</button>
      <ul>
        {datosFiltrados.slice(0, 10).map((item) => (
          <li key={item.id}>ID: {item.id} - Valor: {item.valor}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaOptimizada;
```
