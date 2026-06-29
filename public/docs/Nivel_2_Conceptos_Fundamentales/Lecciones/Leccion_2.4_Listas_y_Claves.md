## Lección 2.4: Listas y Claves

Contenido básico de la lección:

Para renderizar listas, necesitas proporcionar una clave única.

Ejemplo:
function Lista() {
  const items = ['Elemento 1', 'Elemento 2'];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
