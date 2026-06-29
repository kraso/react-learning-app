## Contexto con tema

**Enunciado:**
Crea un sistema de temas usando React Context. Debes crear un contexto `ThemeContext`, un proveedor que gestione el tema actual, y un componente consumidor que aplique los estilos según el tema seleccionado (claro u oscuro).

**Requisitos:**
1. Crear un `ThemeContext` usando `React.createContext`
2. Crear un componente `ThemeProvider` que gestione el estado del tema y lo provea a los hijos
3. Crear un componente `TemaDisplay` que consuma el contexto y muestre el tema actual
4. El proveedor debe permitir alternar entre tema claro y oscuro
5. El consumidor debe aplicar estilos de fondo y color de texto según el tema
6. Debe exportarse el provider y el contexto

**Pistas:**
- `React.createContext()` crea el contexto; su `.Provider` envuelve los componentes hijos
- Usa `useState` dentro del provider para manejar el tema actual y pasar la función para cambiarlo
- Los componentes consumidores usan `useContext(ThemeContext)` para acceder al valor del contexto

**Solución:**
```jsx
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [tema, setTema] = useState('claro');

  const toggleTema = () => {
    setTema(tema === 'claro' ? 'oscuro' : 'claro');
  };

  const estilos = {
    claro: { backgroundColor: '#ffffff', color: '#000000' },
    oscuro: { backgroundColor: '#1a1a2e', color: '#ffffff' },
  };

  return (
    <ThemeContext.Provider value={{ tema, toggleTema, estilos: estilos[tema] }}>
      {children}
    </ThemeContext.Provider>
  );
}

function TemaDisplay() {
  const { tema, toggleTema, estilos } = useContext(ThemeContext);

  return (
    <div style={{ ...estilos, padding: '20px', minHeight: '100vh' }}>
      <h1>Tema actual: {tema}</h1>
      <button onClick={toggleTema}>
        Cambiar a tema {tema === 'claro' ? 'oscuro' : 'claro'}
      </button>
    </div>
  );
}

export { ThemeContext, ThemeProvider, TemaDisplay };
```
