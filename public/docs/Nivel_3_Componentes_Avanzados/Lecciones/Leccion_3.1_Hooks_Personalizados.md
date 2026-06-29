## Lección 3.1: Hooks Personalizados

**Contenido de la lección:**

Los hooks personalizados permiten reutilizar la lógica de estado entre componentes.

**Ejemplo básico:**
function usarContador(inicio = 0) {
  const [contador, setContador] = useState(inicio);
  
  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);
  
  return { contador, incrementar, decrementar };
}

**Uso del hook personalizado:**
function Componente() {
  const { contador, incrementar, decrementar } = usarContador(10);
  
  return (
    <div>
      <p>{contador}</p>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
    </div>
  );
}
