## Lección 2.2: Estados y Hooks

Contenido básico de la lección:

Los hooks permiten usar estado y otras características de React sin clases.

Ejemplo de useState:
function Contador() {
  const [contador, setContador] = useState(0);
  return <div>{contador}</div>;
}
