```markdown
## Lección 1.4: Primer componente en React

**Contenido de la lección:**

Los componentes son las unidades básicas de React. Existen dos tipos principales:

1. **Componentes funcionales (es lo más común)**:
    ```jsx
    import React from 'react';

    function MiPrimerComponente() {
    return (
        <div>
        <h1>Hola, mundo!</h1>
        </div>
    );
    }

    export default MiPrimerComponente;

2. Componentes de clase (en desuso, pero aún se usa):

    import React, { Component } from 'react';

    class MiPrimerComponente extends Component {
    render() {
        return (
        <div>
            <h1>Hola, mundo!</h1>
        </div>
        );
    }
    }

    export default MiPrimerComponente;

Conceptos importantes:

- Todo componente debe retornar un único elemento raíz
- El nombre del componente debe comenzar con mayúscula
- Los componentes se pueden anidar
- Los componentes pueden ser reutilizados