## Conceptos de Componentes y Props

**Enunciado:**
Responde las siguientes preguntas sobre componentes y props en React. Escribe tus respuestas en el editor de código.

1. ¿Qué son las props en React?
2. ¿Cómo se pasan datos entre componentes padre e hijo?
3. ¿Qué hace el operador de propagación (spread) en props?
4. ¿Cuándo se usan defaultProps?

**Pistas:**
- Las props son propiedades que un componente recibe de su componente padre
- Los datos fluyen de padre a hijo de forma unidireccional
- El spread operator `...` copia todas las propiedades de un objeto
- `defaultProps` se usa cuando un prop debe tener un valor por defecto

**Solución:**
```markdown
1. Las props (propiedades) son objetos de solo lectura que se pasan de un componente padre a un componente hijo. Permiten la comunicación entre componentes y la configuración del comportamiento del hijo desde el padre.

2. Se pasan datos de padre a hijo usando props directamente en el JSX del padre: <Hijo nombre="valor" />. El hijo las recibe como parámetro de la función o en su objeto props. La comunicación es unidireccional: de padre a hijo.

3. El operador spread (`...objeto`) copia todas las propiedades de un objeto como props individuales. Por ejemplo: <Componente {...propsObjeto} /> es equivalente a pasar cada propiedad como prop por separado. Es útil para reenviar todas las props sin listarlas una por una.

4. Se usan defaultProps cuando un componente necesita un valor por defecto para una prop que puede no ser proporcionada. En componentes funcionales se usa el valor por defecto en destructuring: function C({ texto = "default" }) {}. También se puede asignar: Componente.defaultProps = { texto: "default" }.
```
