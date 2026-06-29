## Lección 2.5: Formularios en React

Contenido básico de la lección:

Los formularios manejan el estado de sus datos.

Ejemplo:
function Formulario() {
  const [nombre, setNombre] = useState('');
  
  function manejarCambio(e) {
    setNombre(e.target.value);
  }
  
  return (
    <input
      value={nombre}
      onChange={manejarCambio}
    />
  );
}
