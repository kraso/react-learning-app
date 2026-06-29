## Pruebas unitarias

**Enunciado:**
Escribe pruebas unitarias para un componente `Contador` usando React Testing Library. Las pruebas deben verificar el renderizado correcto, la funcionalidad de incremento y decremento, y el manejo de eventos.

**Requisitos:**
1. Usar `@testing-library/react` y `@testing-library/jest-dom`
2. Crear un componente `Contador` con estado, botones de incremento y decremento
3. Escribir prueba que verifique que el contador renderiza en 0
4. Escribir prueba que verifique que el botón de incrementar aumenta el valor
5. Escribir prueba que verifique que el botón de decrementar disminuye el valor
6. Usar `screen.getByText`, `screen.getByRole` y `fireEvent` para las pruebas

**Pistas:**
- `render(<Componente />)` monta el componente para pruebas
- `screen.getByRole('button', { name: /incrementar/i })` busca botones por su accessible name
- `fireEvent.click(boton)` simula un clic; luego usa `expect(screen.getByText(...)).toBeInTheDocument()`

**Solución:**
```jsx
// Contador.jsx
import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      <button onClick={() => setContador(contador - 1)}>Decrementar</button>
    </div>
  );
}

export default Contador;

// Contador.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contador from './Contador';

describe('Contador', () => {
  test('renderiza el contador en 0', () => {
    render(<Contador />);
    expect(screen.getByText('Contador: 0')).toBeInTheDocument();
  });

  test('incrementa el contador al hacer clic en Incrementar', () => {
    render(<Contador />);
    fireEvent.click(screen.getByText('Incrementar'));
    expect(screen.getByText('Contador: 1')).toBeInTheDocument();
  });

  test('decrementa el contador al hacer clic en Decrementar', () => {
    render(<Contador />);
    fireEvent.click(screen.getByText('Decrementar'));
    expect(screen.getByText('Contador: -1')).toBeInTheDocument();
  });

  test('incrementa y decrementa secuencialmente', () => {
    render(<Contador />);
    fireEvent.click(screen.getByText('Incrementar'));
    fireEvent.click(screen.getByText('Incrementar'));
    fireEvent.click(screen.getByText('Decrementar'));
    expect(screen.getByText('Contador: 1')).toBeInTheDocument();
  });
});
```
