## Hook personalizado

**Enunciado:**
Crea un hook personalizado llamado `useLocalStorage` que permita guardar y recuperar un valor del `localStorage` del navegador. El hook debe sincronizar el estado con el almacenamiento local.

**Requisitos:**
1. El hook debe llamarse `useLocalStorage`
2. Debe aceptar dos parámetros: `clave` (string) y `valorInicial` (cualquier tipo)
3. Debe devolver un array con el valor actual y una función para actualizarlo
4. Al inicializar, debe cargar el valor desde `localStorage` si existe
5. Al actualizar, debe guardar el nuevo valor en `localStorage`
6. Debe manejar errores de parsing de JSON

**Pistas:**
- Usa `useState` con una función inicializadora para leer de `localStorage` solo al montar
- `localStorage.getItem(clave)` retorna null si no existe; `localStorage.setItem(clave, valor)` guarda
- Usa `try/catch` al parsear JSON porque `JSON.parse` puede fallar si el valor no es JSON válido

**Solución:**
```jsx
import { useState } from 'react';

function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const item = localStorage.getItem(clave);
      return item ? JSON.parse(item) : valorInicial;
    } catch (error) {
      return valorInicial;
    }
  });

  const setValorConPersistencia = (nuevoValor) => {
    setValor(nuevoValor);
    try {
      localStorage.setItem(clave, JSON.stringify(nuevoValor));
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  };

  return [valor, setValorConPersistencia];
}

export default useLocalStorage;
```
