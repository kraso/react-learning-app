## Navegación entre rutas

**Enunciado:**
Crea una aplicación con navegación usando React Router. Debes configurar al menos 3 rutas diferentes con un menú de navegación que permita alternar entre ellas.

**Requisitos:**
1. Usar `react-router-dom` para configurar las rutas
2. Crear al menos 3 rutas: Inicio, Acerca de y Contacto
3. Crear un componente `Navbar` con `Link` para navegar entre rutas
4. Cada ruta debe renderizar un componente diferente
5. Usar `BrowserRouter`, `Routes` y `Route` para la configuración
6. Debe haber una ruta por defecto (404 o redirección)

**Pistas:**
- `BrowserRouter` envuelve toda la aplicación, `Routes` define las rutas y `Route` asigna paths a componentes
- Los `Link` reemplazan las etiquetas `<a>` para navegar sin recargar la página
- Para una ruta 404 usa `Route path="*"` que captura cualquier ruta no definida

**Solución:**
```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Inicio() {
  return <h2>Inicio</h2>;
}

function AcercaDe() {
  return <h2>Acerca de</h2>;
}

function Contacto() {
  return <h2>Contacto</h2>;
}

function NoEncontrado() {
  return <h2>404 - Página no encontrada</h2>;
}

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link> |{' '}
      <Link to="/acerca">Acerca de</Link> |{' '}
      <Link to="/contacto">Contacto</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acerca" element={<AcercaDe />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
