## Lección 4.2: Administración de Estado

**Contenido de la lección:**

Para aplicaciones grandes, podemos usar soluciones como Redux o Zustand.

**Ejemplo con Zustand:**
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Contador() {
  const { count, increment, decrement } = useStore();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
