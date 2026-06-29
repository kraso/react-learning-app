## Lección 4.3: Testing en React

**Contenido de la lección:**

React Testing Library permite probar componentes fácilmente.

**Ejemplo de prueba:**
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import MiComponente from './MiComponente';

test('debería renderizar el texto', () => {
  render(<MiComponente />);
  const texto = screen.getByText(/Hola/i);
  expect(texto).toBeInTheDocument();
});

**Pruebas de eventos:**
function Boton() {
  const [contador, setContador] = useState(0);
  
  return (
    <button onClick={() => setContador(contador + 1)}>
      {contador}
    </button>
  );
}
