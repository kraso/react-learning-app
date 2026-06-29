## Lección 3.5: Manejo de Errores

**Contenido de la lección:**

React permite manejar errores en el árbol de componentes.

**Error Boundary (clase):**
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tieneError: false };
  }

  static getDerivedStateFromError(error) {
    return { tieneError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error detectado:', error, errorInfo);
  }

  render() {
    if (this.state.tieneError) {
      return <h1>Algo salió mal.</h1>;
    }
    return this.props.children;
  }
}
