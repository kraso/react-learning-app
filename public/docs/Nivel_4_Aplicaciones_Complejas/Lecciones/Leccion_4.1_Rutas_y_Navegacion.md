## Lección 4.1: Rutas y Navegación

**Contenido de la lección:**

Para aplicaciones complejas, necesitamos rutas. Usamos React Router.

**Instalación:**
npm install react-router-dom

**Uso básico:**
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to=\
/\>Inicio</Link>
        <Link to=\/acerca\>Acerca de</Link>
      </nav>
      
      <Routes>
        <Route path=\/\ element={<Inicio />} />
        <Route path=\/acerca\ element={<Acerca />} />
      </Routes>
    </Router>
  );
}
