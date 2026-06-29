## Administración de estado

**Enunciado:**
Crea un store global usando Zustand para gestionar una lista de usuarios. El store debe permitir agregar y eliminar usuarios, y los componentes deben consumir el estado de forma reactiva.

**Requisitos:**
1. Instalar y configurar Zustand (`npm install zustand`)
2. Crear un store con un array de usuarios y acciones `agregarUsuario` y `eliminarUsuario`
3. Crear un componente `ListaUsuarios` que muestre todos los usuarios
4. Crear un componente `FormularioUsuario` para agregar nuevos usuarios
5. Cada usuario debe tener un `id`, `nombre` y `email`
6. Los componentes deben reflejar los cambios en tiempo real

**Pistas:**
- Un store de Zustand se crea con `create()` y retorna el estado junto con las acciones
- `agregarUsuario` agrega al array; `eliminarUsuario` filtra por id
- Los componentes acceden al store con `useStore(selector)`, por ejemplo: `useStore(state => state.usuarios)`

**Solución:**
```jsx
// store.js
import { create } from 'zustand';

const useUsuarioStore = create((set) => ({
  usuarios: [],
  agregarUsuario: (usuario) =>
    set((state) => ({
      usuarios: [...state.usuarios, { ...usuario, id: Date.now() }],
    })),
  eliminarUsuario: (id) =>
    set((state) => ({
      usuarios: state.usuarios.filter((u) => u.id !== id),
    })),
}));

export default useUsuarioStore;

// ListaUsuarios.jsx
import React from 'react';
import useUsuarioStore from './store';

function ListaUsuarios() {
  const usuarios = useUsuarioStore((state) => state.usuarios);
  const eliminarUsuario = useUsuarioStore((state) => state.eliminarUsuario);

  return (
    <div>
      <h2>Usuarios ({usuarios.length})</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nombre} - {u.email}
            <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// FormularioUsuario.jsx
import React, { useState } from 'react';
import useUsuarioStore from './store';

function FormularioUsuario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const agregarUsuario = useUsuarioStore((state) => state.agregarUsuario);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && email) {
      agregarUsuario({ nombre, email });
      setNombre('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export { ListaUsuarios, FormularioUsuario };
```
