## Lección 3.4: Optimización de Rendimiento

**Contenido de la lección:**

React proporciona varias herramientas para optimizar el rendimiento.

**React.memo:**
const ComponenteMemoizado = memo(({ nombre }) => {
  return <div>Hola, {nombre}</div>;
});

**useMemo:**
const valorMemoizado = useMemo(() => {
  return calcularCostoso(valor);
}, [valor]);

**useCallback:**
const funcionCallback = useCallback(() => {
  console.log('Función callback');
}, []);
