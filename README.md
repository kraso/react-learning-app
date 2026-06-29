# React Learning App

Curso interactivo completo para aprender React 19 desde cero. Landing page sofisticada con temas claro/oscuro, autenticación de usuarios vía Supabase y progreso del curso sincronizado en la nube.

## Características

- **Landing page** con animaciones, estadísticas comparativas de frameworks y secciones de documentación
- **Tema adaptativo** claro/oscuro que respeta la preferencia del sistema
- **Autenticación** con email/contraseña via Supabase Auth
- **Progreso guardado** en la nube — nunca pierdes tu avance
- **4 niveles** de contenido: Introducción, Conceptos Fundamentales, Componentes Avanzados, Aplicaciones Complejas
- **Lecciones, ejercicios y pruebas** por cada nivel
- **Resaltado de código** con syntax highlighting
- **16 enlaces** a cursos gratuitos de JS, TS, React y Redux

## Tech Stack

- React 19 + Vite 8
- Supabase (Auth + PostgreSQL)
- Lucide React (iconos)
- React Markdown + Syntax Highlighter
- CSS custom properties (sin framework CSS)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/kraso/react-learning-app.git
cd react-learning-app

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
```

### Configurar Supabase

1. Crea una cuenta gratuita en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta el contenido de `supabase/migrations/001_user_progress.sql`
4. Copia tu **Project URL** y **Anon Key** (Settings → API)
5. Edita `.env.local` con tus credenciales:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### Ejecutar

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Linting con oxlint |

## Estructura del Proyecto

```
src/
├── components/
│   ├── landing/          # Landing page, auth modal
│   └── course/           # Datos del curso
├── hooks/
│   ├── useAuth.jsx       # Autenticación Supabase
│   └── useTheme.js       # Tema claro/oscuro
├── lib/
│   └── supabase.js       # Cliente Supabase
├── data/                 # Contenido del curso
├── utils/                # Helpers
├── Apps.jsx              # Componente principal
└── Apps.css              # Estilos del curso
```

## Licencia

MIT
