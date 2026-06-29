## Lección 3.3: Manejo de Efectos

**Contenido de la lección:**

Los efectos permiten realizar tareas de lado en componentes funcionales.

**Efecto básico:**
useEffect(() => {
  // Código que se ejecuta después de renderizado
  fetch('/api/datos')
    .then(response => response.json())
    .then(datos => setDatos(datos));
}, []);

**Efecto con dependencias:**
useEffect(() => {
  document.title = Contador: ;
}, [contador]);

**Efecto con limpieza:**
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Intervalo');
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
