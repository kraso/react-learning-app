## Lección 3.2: Context API

**Contenido de la lección:**

La Context API permite pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.

**Creando un contexto:**
const TemaContext = createContext();

**Proveedor de contexto:**
function App() {
  const tema = { color: 'blue' };
  
  return (
    <TemaContext.Provider value={tema}>
      <ComponenteConContext />
    </TemaContext.Provider>
  );
}

**Consumiendo el contexto:**
function ComponenteConContext() {
  const tema = useContext(TemaContext);
  
  return <div style={{ color: tema.color }}>Contenido con tema</div>;
}
