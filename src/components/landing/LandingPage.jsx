import { useState, useEffect, useRef } from 'react';
import {
  Atom,
  BookOpen,
  Code2,
  GraduationCap,
  Moon,
  Sun,
  Monitor,
  ExternalLink,
  GitBranch,
  TrendingUp,
  Users,
  Download,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Layers,
  Rocket,
  Menu,
  X,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from './AuthModal';
import './LandingPage.css';

const STATS_DATA = [
  {
    name: 'React',
    version: '19.x',
    downloads: '28M+/mes',
    stars: '234k+',
    share: 42.1,
    color: '#61DAFB',
    bgGlow: 'rgba(97, 218, 251, 0.15)',
    icon: '⚛',
    features: ['Virtual DOM', 'Hooks', 'Concurrent Mode', 'Server Components'],
  },
  {
    name: 'Vue.js',
    version: '3.5.x',
    downloads: '5.2M/mes',
    stars: '209k+',
    share: 18.2,
    color: '#42B883',
    bgGlow: 'rgba(66, 184, 131, 0.15)',
    icon: '🟢',
    features: ['Composition API', 'Reactivity', 'SFC', 'Vite'],
  },
  {
    name: 'Angular',
    version: '19.x',
    downloads: '3.8M/mes',
    stars: '97k+',
    share: 13.5,
    color: '#DD0031',
    bgGlow: 'rgba(221, 0, 49, 0.15)',
    icon: '🅰',
    features: ['Signals', 'Standalone', 'DI', 'TypeScript'],
  },
  {
    name: 'Svelte',
    version: '5.x',
    downloads: '1.1M/mes',
    stars: '82k+',
    share: 6.8,
    color: '#FF3E00',
    bgGlow: 'rgba(255, 62, 0, 0.15)',
    icon: '🔥',
    features: ['No Virtual DOM', 'Runes', 'Compiler', 'Minimal'],
  },
  {
    name: 'Next.js',
    version: '15.x',
    downloads: '7.5M/mes',
    stars: '132k+',
    share: 11.3,
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.1)',
    icon: '▲',
    features: ['SSR', 'App Router', 'RSC', 'Edge Runtime'],
  },
  {
    name: 'Preact',
    version: '10.x',
    downloads: '480k/mes',
    stars: '37k+',
    share: 2.1,
    color: '#673AB8',
    bgGlow: 'rgba(103, 58, 184, 0.15)',
    icon: '⚡',
    features: ['3KB', 'Compat API', 'Signals', 'Fast'],
  },
];

const DOC_LINKS = [
  {
    category: 'Documentación Oficial',
    links: [
      { name: 'React Docs (react.dev)', url: 'https://react.dev', desc: 'Documentación oficial completa de React 19', icon: BookOpen },
      { name: 'React GitHub Repository', url: 'https://github.com/facebook/react', desc: 'Repositorio oficial en GitHub', icon: GitBranch },
      { name: 'React API Reference', url: 'https://react.dev/reference', desc: 'Referencia completa de la API de React', icon: Code2 },
    ],
  },
  {
    category: 'Recursos Comunitarios',
    links: [
      { name: 'Reactiflux', url: 'https://www.reactiflux.com', desc: 'Comunidad de Discord para React developers', icon: Users },
      { name: 'Awesome React', url: 'https://github.com/enaqx/awesome-react', desc: 'Curación de recursos React de la comunidad', icon: Star },
      { name: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app', desc: 'Guía rápida de React + TypeScript', icon: Code2 },
    ],
  },
  {
    category: 'Herramientas y Ecosistema',
    links: [
      { name: 'Vite', url: 'https://vitejs.dev', desc: 'Build tool moderno y rápido para React', icon: Zap },
      { name: 'Next.js Docs', url: 'https://nextjs.org/docs', desc: 'Framework fullstack para React', icon: Layers },
      { name: 'React DevTools', url: 'https://react.dev/learn/react-developer-tools', desc: 'Extensiones para debugging de React', icon: Code2 },
    ],
  },
];

const COURSES = [
  {
    category: 'JavaScript',
    color: '#F7DF1E',
    items: [
      { name: 'Aprende JavaScript', url: 'https://www.aprendejavascript.dev/', desc: 'Curso completo y moderno de JavaScript (gratis)', level: 'Básico → Avanzado' },
      { name: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net', desc: 'Libro online gratuito de Marijn Haverbeke', level: 'Básico → Intermedio' },
      { name: 'FreeCodeCamp JS', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', desc: 'Certificación completa de JavaScript', level: 'Básico → Intermedio' },
      { name: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', desc: 'Guía oficial de Mozilla Developer Network', level: 'Todos los niveles' },
    ],
  },
  {
    category: 'TypeScript',
    color: '#3178C6',
    items: [
      { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', desc: 'Manual oficial de TypeScript', level: 'Básico → Avanzado' },
      { name: 'TypeScript Tutorial (TutorialsPoint)', url: 'https://www.tutorialspoint.com/typescript/', desc: 'Tutorial completo y estructurado', level: 'Básico → Intermedio' },
      { name: 'Total TypeScript', url: 'https://www.totaltypescript.com', desc: 'Cursos gratuitos y premium por Matt Pocock', level: 'Intermedio → Avanzado' },
      { name: 'Type Challenges', url: 'https://github.com/type-challenges/type-challenges', desc: 'Desafíos para practicar tipos avanzados', level: 'Avanzado' },
    ],
  },
  {
    category: 'React',
    color: '#61DAFB',
    items: [
      { name: 'React Official Tutorial', url: 'https://react.dev/learn', desc: 'Tutorial oficial interactivo de React 19', level: 'Básico → Intermedio' },
      { name: 'Epic React', url: 'https://epicreact.dev', desc: 'Workshops avanzados por Kent C. Dodds', level: 'Intermedio → Avanzado' },
      { name: 'FreeCodeCamp React', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/', desc: 'Certificación de Front End Libraries', level: 'Básico → Intermedio' },
      { name: 'React Patterns', url: 'https://reactpatterns.com', desc: 'Patrones de diseño para React', level: 'Intermedio → Avanzado' },
    ],
  },
  {
    category: 'Redux',
    color: '#764ABC',
    items: [
      { name: 'Redux Toolkit Docs', url: 'https://redux-toolkit.js.org', desc: 'Documentación oficial de Redux Toolkit', level: 'Básico → Avanzado' },
      { name: 'Redux Fundamentals', url: 'https://redux.js.org/tutorials/fundamentals-part-1-overview', desc: 'Tutorial fundamentals de Redux', level: 'Básico → Intermedio' },
      { name: 'Learn Redux (freeCodeCamp)', url: 'https://www.freecodecamp.org/news/redux-for-beginners/', desc: 'Guía práctica para principiantes', level: 'Básico' },
      { name: 'Redux Essentials', url: 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts', desc: 'Tutorial esencial actualizado', level: 'Básico → Intermedio' },
    ],
  },
];

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function StatCard({ stat, index }) {
  return (
    <div
      className="stat-card"
      style={{ '--card-color': stat.color, '--card-glow': stat.bgGlow, '--delay': `${index * 0.1}s` }}
    >
      <div className="stat-card-glow" />
      <div className="stat-card-header">
        <span className="stat-card-icon">{stat.icon}</span>
        <div>
          <h3 className="stat-card-name">{stat.name}</h3>
          <span className="stat-card-version">v{stat.version}</span>
        </div>
      </div>

      <div className="stat-card-metrics">
        <div className="stat-metric">
          <Download size={14} />
          <span className="stat-metric-value">{stat.downloads}</span>
        </div>
        <div className="stat-metric">
          <Star size={14} />
          <span className="stat-metric-value">{stat.stars}</span>
        </div>
      </div>

      <div className="stat-bar-container">
        <div className="stat-bar-header">
          <span>Cuota de mercado</span>
          <span className="stat-bar-percent">{stat.share}%</span>
        </div>
        <div className="stat-bar-track">
          <div
            className="stat-bar-fill"
            style={{ width: `${stat.share * 2.3}%`, background: stat.color }}
          />
        </div>
      </div>

      <div className="stat-card-features">
        {stat.features.map((f) => (
          <span key={f} className="feature-tag">{f}</span>
        ))}
      </div>

      {stat.name === 'React' && (
        <div className="stat-card-badge">Lo estamos aprendiendo</div>
      )}
    </div>
  );
}

function Navbar({ theme, toggleTheme, onNavigate, currentView, onOpenAuth, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const ThemeIcon = theme === 'dark' ? Sun : theme === 'light' ? Moon : Monitor;

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => onNavigate('landing')}>
          <div className="navbar-logo">
            <Atom size={22} strokeWidth={2.5} />
          </div>
          <span className="navbar-title">React Learning App</span>
        </button>

        <div className={`navbar-links ${mobileOpen ? 'navbar-links--open' : ''}`}>
          <button
            className={`nav-link ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => { onNavigate('landing'); setMobileOpen(false); }}
          >
            Inicio
          </button>
          <button
            className={`nav-link ${currentView === 'docs' ? 'active' : ''}`}
            onClick={() => { onNavigate('docs'); setMobileOpen(false); }}
          >
            Documentación
          </button>
          <button
            className={`nav-link ${currentView === 'courses' ? 'active' : ''}`}
            onClick={() => { onNavigate('courses'); setMobileOpen(false); }}
          >
            Cursos
          </button>
          <button
            className={`nav-link nav-link--cta ${currentView === 'course' ? 'active' : ''}`}
            onClick={() => { onNavigate('course'); setMobileOpen(false); }}
          >
            <Rocket size={15} />
            Empezar Curso
          </button>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Cambiar tema">
            <ThemeIcon size={18} />
          </button>

          {user ? (
            <div className="navbar-user">
              <div className="navbar-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="navbar-username">{user.name}</span>
              <button className="nav-link nav-link--icon" onClick={onLogout} title="Cerrar sesión">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="navbar-auth-btns">
              <button className="nav-link nav-link--icon" onClick={() => onOpenAuth('login')} title="Iniciar sesión">
                <LogIn size={16} />
                <span className="nav-link-text-desktop">Entrar</span>
              </button>
              <button className="nav-link nav-link--cta nav-link--small" onClick={() => onOpenAuth('register')}>
                <UserPlus size={15} />
                <span className="nav-link-text-desktop">Registrarse</span>
              </button>
            </div>
          )}

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ onStart, onOpenAuth, user }) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
        <div className="hero-grid" />
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <Zap size={14} />
          React 19 &mdash; Ahora con Server Components
        </div>
        <h1 className="hero-title">
          Domina <span className="hero-highlight">React</span> desde cero
        </h1>
        <div className="hero-video-wrapper">
          <div className="hero-video-frame">
            <video
              className="hero-video"
              src="/promo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
        <p className="hero-subtitle">
          Curso interactivo completo con lecciones progresivas, ejercicios prácticos y evaluaciones.
          Aprende los conceptos modernos de React 19: hooks, Server Components, y más.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onStart}>
            {user ? 'Continuar Aprendiendo' : 'Comenzar Ahora'}
            <ArrowRight size={18} />
          </button>
          {!user && (
            <button className="btn-ghost" onClick={() => onOpenAuth('register')}>
              <UserPlus size={18} />
              Crear Cuenta Gratis
            </button>
          )}
          <a
            className="btn-ghost"
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen size={18} />
            Explorar Docs
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value"><AnimatedCounter target={28} /></span>
            <span className="hero-stat-label">M+ descargas/mes</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value"><AnimatedCounter target={234} /></span>
            <span className="hero-stat-label">k+ GitHub Stars</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value"><AnimatedCounter target={42} />%</span>
            <span className="hero-stat-label">Cuota de mercado</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="section comparison-section" id="comparison">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">
            <TrendingUp size={14} />
            Mercado 2025-2026
          </span>
          <h2 className="section-title">React vs. la Competencia</h2>
          <p className="section-subtitle">
            Datos basados en npm downloads, GitHub stars y encuestas de la comunidad (State of JS 2024)
          </p>
        </div>
        <div className="stats-grid">
          {STATS_DATA.map((stat, i) => (
            <StatCard key={stat.name} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentationSection() {
  return (
    <section className="section docs-section" id="docs">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">
            <BookOpen size={14} />
            Recursos
          </span>
          <h2 className="section-title">Documentación Oficial y Recursos</h2>
          <p className="section-subtitle">
            Enlaces directos a la documentación oficial y recursos esenciales del ecosistema React
          </p>
        </div>
        <div className="docs-grid">
          {DOC_LINKS.map((group) => (
            <div key={group.category} className="docs-group">
              <h3 className="docs-group-title">{group.category}</h3>
              <div className="docs-links">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-card"
                    >
                      <div className="doc-card-icon">
                        <Icon size={20} />
                      </div>
                      <div className="doc-card-content">
                        <h4 className="doc-card-name">
                          {link.name}
                          <ExternalLink size={13} className="doc-card-ext" />
                        </h4>
                        <p className="doc-card-desc">{link.desc}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="section courses-section" id="courses">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">
            <GraduationCap size={14} />
            Aprende Gratis
          </span>
          <h2 className="section-title">Cursos Gratuitos Recomendados</h2>
          <p className="section-subtitle">
            Los mejores recursos gratuitos para aprender JavaScript, TypeScript, React y Redux
          </p>
        </div>
        <div className="courses-grid">
          {COURSES.map((category) => (
            <div key={category.category} className="course-category" style={{ '--cat-color': category.color }}>
              <div className="course-category-header">
                <div className="course-category-dot" />
                <h3 className="course-category-title">{category.category}</h3>
              </div>
              <div className="course-items">
                {category.items.map((course) => (
                  <a
                    key={course.name}
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course-card"
                  >
                    <div className="course-card-top">
                      <h4 className="course-card-name">{course.name}</h4>
                      <ExternalLink size={14} className="course-card-ext" />
                    </div>
                    <p className="course-card-desc">{course.desc}</p>
                    <span className="course-card-level">{course.level}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Atom size={20} strokeWidth={2.5} />
            </div>
            <div>
              <span className="footer-brand-name">React Learning App</span>
              <p className="footer-brand-desc">Aprende React de forma interactiva y moderna</p>
            </div>
          </div>
          <div className="footer-columns">
            <div className="footer-col">
              <h4>Navegación</h4>
              <button onClick={() => onNavigate('landing')}>Inicio</button>
              <button onClick={() => onNavigate('docs')}>Documentación</button>
              <button onClick={() => onNavigate('courses')}>Cursos</button>
              <button onClick={() => onNavigate('course')}>Empezar Curso</button>
            </div>
            <div className="footer-col">
              <h4>Recursos</h4>
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a>
              <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer">Tutorial Oficial</a>
              <a href="https://react.dev/reference" target="_blank" rel="noopener noreferrer">API Reference</a>
            </div>
            <div className="footer-col">
              <h4>Comunidad</h4>
              <a href="https://www.reactiflux.com" target="_blank" rel="noopener noreferrer">Reactiflux</a>
              <a href="https://github.com/enaqx/awesome-react" target="_blank" rel="noopener noreferrer">Awesome React</a>
              <a href="https://stackoverflow.com/questions/tagged/reactjs" target="_blank" rel="noopener noreferrer">Stack Overflow</a>
              <a href="https://reddit.com/r/reactjs" target="_blank" rel="noopener noreferrer">Reddit r/reactjs</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">&copy; 2026 React Learning App. Hecho con React 19.</span>
          <div className="footer-bottom-links">
            <Heart size={14} />
            <span>Construido para aprender</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage({ onStartCourse, theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  const handleNavigate = (view) => {
    if (view === 'course') {
      onStartCourse();
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (mode = 'login') => setAuthModal({ open: true, mode });
  const closeAuth = () => setAuthModal((prev) => ({ ...prev, open: false }));

  return (
    <div className="landing">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigate={handleNavigate}
        currentView={currentView}
        onOpenAuth={openAuth}
        user={user}
        onLogout={logout}
      />

      {currentView === 'landing' && (
        <>
          <HeroSection onStart={onStartCourse} onOpenAuth={openAuth} user={user} />
          <DocumentationSection />
          <CoursesSection />
          <ComparisonSection />
        </>
      )}
      {currentView === 'docs' && <DocumentationSection />}
      {currentView === 'courses' && <CoursesSection />}

      <Footer onNavigate={handleNavigate} />

      <AuthModal isOpen={authModal.open} onClose={closeAuth} initialMode={authModal.mode} />
    </div>
  );
}
