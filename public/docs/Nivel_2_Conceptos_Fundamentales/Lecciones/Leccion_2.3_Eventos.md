## Lección 2.3: Eventos en React

Contenido básico de la lección:

Los eventos en React se manejan de manera similar a los eventos del DOM.

Ejemplo:
function Boton() {
  function handleClick() {
    console.log('Boton clickeado');
  }
  
  return <button onClick={handleClick}>Haga clic</button>;
}
