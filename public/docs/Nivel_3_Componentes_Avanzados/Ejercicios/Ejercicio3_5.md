## Error Boundary

**Enunciado:**
Crea un componente `ErrorBoundary` como class component que capture errores en sus componentes hijos y muestre un mensaje de error amigable. También crea un componente que lance un error para probar el boundary.

**Requisitos:**
1. `ErrorBoundary` debe ser un class component que extienda `React.Component`
2. Debe implementar `componentDidCatch(error, errorInfo)` para capturar errores
3. Debe tener estado `hasError` y `error` para controlar si hubo un error
4. Si hay error, debe renderizar un mensaje de error amigable
5. Si no hay error, debe renderizar los children normalmente
6. Crear un componente `BotonError` que lance un error al hacer clic
7. Debe exportarse el `ErrorBoundary`

**Pistas:**
- Los Error Boundary son class components porque `componentDidCatch` es un método de ciclo de vida
- El patrón básico es: `static getDerivedStateFromError()` para actualizar el estado y `componentDidCatch()` para registrar el error
- Para lanzar un error deliberadamente usa `throw new Error('Mensaje de error')` dentro de un event handler

**Solución:**
```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
          <h2>Algo salió mal</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Intentar de nuevo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BotonError() {
  const dispararError = () => {
    throw new Error('Este es un error de prueba lanzado por BotonError');
  };

  return (
    <button onClick={dispararError}>
      Lanzar error
    </button>
  );
}

export { ErrorBoundary, BotonError };
```
