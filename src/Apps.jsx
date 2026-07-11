import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Atom,
  BookOpen,
  CheckCircle2,
  CircleCheck,
  FileText,
  FlaskConical,
  Loader2,
  Lock,
  PenLine,
  Search,
  ArrowLeft,
  Moon,
  Sun,
  LogOut,
  Home,
  User,
} from 'lucide-react';
import courseData from './courseData.json';
import { fetchMarkdownContent } from './utils/contentLoader';
import ProgressBar from './components/ProgressBar';
import LandingPage from './components/landing/LandingPage';
import { useTheme } from './hooks/useTheme';
import { AuthProvider, useAuth, loadUserProgress, saveUserProgress } from './hooks/useAuth';
import { getAuthRedirectUrl } from './lib/auth-bridge';
import { supabase } from './lib/supabase';
import ExerciseViewer from './components/ExerciseViewer';
import ProfileModal from './components/ProfileModal';
import ResetPasswordModal from './components/ResetPasswordModal';
import LegalPage from './components/LegalPage';
import OAuthCallback from './components/OAuthCallback';

const CATEGORIES = ['lecciones', 'ejercicios', 'pruebas'];

const CATEGORY_META = {
  lecciones: { label: 'Lecciones', Icon: BookOpen, className: 'category-icon--lecciones' },
  ejercicios: { label: 'Ejercicios', Icon: PenLine, className: 'category-icon--ejercicios' },
  pruebas: { label: 'Pruebas', Icon: FlaskConical, className: 'category-icon--pruebas' },
};

const LEVEL_NUMBERS = Object.fromEntries(
  Object.keys(courseData).map((key, index) => [key, index + 1]),
);

const findFileByPath = (path) => {
  for (const level of Object.values(courseData)) {
    for (const category of CATEGORIES) {
      const file = level[category]?.find((item) => item.path === path);
      if (file) return file;
    }
  }
  return null;
};

const getLevelKeyFromPath = (path) =>
  Object.keys(courseData).find((key) => path.includes(key));

const AppsInner = () => {
  // Handle OAuth callback route
  const isCallbackRoute = window.location.pathname === '/auth/callback' || 
                          window.location.hash.includes('access_token') || 
                          window.location.hash.includes('refresh_token');
  if (isCallbackRoute) {
    return <OAuthCallback />;
  }

  const { theme, toggleTheme } = useTheme();
  const { user, logout, loading: authLoading, isRecoveringPassword } = useAuth();
  
  // Check URL for /curso path
  const isCourseRoute = window.location.pathname === '/curso';
  const [currentView, setCurrentView] = useState(isCourseRoute ? 'course' : 'landing');
  const [currentFile, setCurrentFile] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedItems, setCompletedItems] = useState([]);
  const [currentLevelName, setCurrentLevelName] = useState(Object.keys(courseData)[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [legalView, setLegalView] = useState(null);

  // Load progress when user changes
  useEffect(() => {
    if (authLoading) return;
    const userId = user?.id || null;
    setProgressLoaded(false);
    loadUserProgress(userId).then((saved) => {
      setCompletedItems(saved);
      setProgressLoaded(true);
    });
  }, [user, authLoading]);

  // Load first lesson on mount
  useEffect(() => {
    const firstLesson = courseData[currentLevelName].lecciones[0];
    if (firstLesson) setCurrentFile(firstLesson.path);
  }, []);

  // Auto-enter course when user authenticates from landing (only once)
  const hasAutoEnteredRef = useRef(false);
  useEffect(() => {
    if (!authLoading && user && currentView === 'landing' && !hasAutoEnteredRef.current) {
      hasAutoEnteredRef.current = true;
      setCurrentView('course');
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (currentFile) {
      const loadContent = async () => {
        setIsLoading(true);
        const data = await fetchMarkdownContent(currentFile);
        setContent(data);
        setIsLoading(false);
      };
      loadContent();
    }
  }, [currentFile]);

  useEffect(() => {
    if (authLoading || !progressLoaded) return;
    const userId = user?.id || null;
    saveUserProgress(userId, completedItems);
  }, [completedItems, authLoading, progressLoaded]);

  const filteredCourseData = useMemo(() => {
    return Object.entries(courseData).filter(([levelName, data]) => {
      const term = searchTerm.toLowerCase();
      const matchesLevel = levelName.toLowerCase().includes(term)
        || data.title.toLowerCase().includes(term);
      const matchesLecciones = data.lecciones.some((l) => l.title.toLowerCase().includes(term));
      const matchesEjercicios = data.ejercicios?.some((e) => e.title.toLowerCase().includes(term));
      return matchesLevel || matchesLecciones || matchesEjercicios;
    });
  }, [searchTerm]);

  const isLevelLessonsComplete = (levelName) => {
    const lecciones = courseData[levelName].lecciones;
    return lecciones.every((l) => completedItems.includes(l.id));
  };

  const isCategoryUnlocked = (levelName, category) => {
    if (category === 'lecciones') return true;
    return isLevelLessonsComplete(levelName);
  };

  const handleFileClick = (path) => {
    setCurrentFile(path);
    const levelKey = getLevelKeyFromPath(path);
    if (levelKey) setCurrentLevelName(levelKey);
  };

  const markAsComplete = () => {
    const file = findFileByPath(currentFile);
    if (file && !completedItems.includes(file.id)) {
      setCompletedItems([...completedItems, file.id]);
    }
  };

  const currentFileId = findFileByPath(currentFile)?.id;
  const isCompleted = currentFileId && completedItems.includes(currentFileId);
  const currentLevelTitle = courseData[currentLevelName]?.title ?? '';

  const scrollToLevel = (levelName) => {
    setCurrentLevelName(levelName);
    requestAnimationFrame(() => {
      const el = document.getElementById(`level-${levelName}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const isLevelLocked = (levelName) => {
    const levelNum = LEVEL_NUMBERS[levelName];
    if (levelNum === 1) return false;
    const prevLevelKey = Object.keys(courseData).find((k) => LEVEL_NUMBERS[k] === levelNum - 1);
    if (!prevLevelKey) return false;
    return !isLevelLessonsComplete(prevLevelKey);
  };

  const LevelNav = () => (
    <nav className="level-nav" aria-label="Navegación de niveles">
      <div className="level-nav-title">Niveles</div>
      {Object.entries(courseData).map(([levelName, levelData]) => {
        const isActive = levelName === currentLevelName;
        const completed = levelData.lecciones.filter((l) => completedItems.includes(l.id)).length;
        const total = levelData.lecciones.length;
        const locked = isLevelLocked(levelName);
        return (
          <button
            key={levelName}
            className={`level-nav-item ${isActive ? 'level-nav-item--active' : ''} ${locked ? 'level-nav-item--locked' : ''}`}
            onClick={() => scrollToLevel(levelName)}
            aria-current={isActive ? 'true' : undefined}
            aria-disabled={locked}
            title={locked ? 'Completa el nivel anterior para desbloquear' : ''}
          >
            <span className="level-nav-badge">{LEVEL_NUMBERS[levelName]}</span>
            <div className="level-nav-info">
              <span className="level-nav-name">{levelData.title}</span>
              <span className="level-nav-progress">
                {locked ? 'Bloqueado' : `${completed}/${total} lecciones`}
              </span>
            </div>
            {locked && <Lock size={12} className="level-nav-lock" />}
          </button>
        );
      })}
    </nav>
  );

  const Sidebar = ({ onBackToLanding }) => (
    <aside className="sidebar">
      <button className="back-to-landing" onClick={onBackToLanding}>
        <ArrowLeft size={16} />
        Volver al Inicio
      </button>
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Atom size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="main-title">React Course</h1>
          <p className="brand-subtitle">Aprende paso a paso</p>
        </div>
      </div>

      <div  className="search-container">
        <Search className="search-icon" size={16} />
        <input
          id="search-box"
          type="text"
          placeholder="Buscar lección..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCourseData.map(([levelName, levelData]) => {
        const isCurrentLevel = levelName === currentLevelName;

        return (
          <div key={levelName} id={`level-${levelName}`} className={`level-section ${isCurrentLevel ? 'active' : ''}`}>
            <div className="level-header">
              <h2 className="level-title">
                <span className="level-badge">{LEVEL_NUMBERS[levelName]}</span>
                {levelData.title}
              </h2>
              <ProgressBar
                items={levelData.lecciones}
                completedItems={completedItems}
              />
            </div>

            {CATEGORIES.map((category) => {
              const files = levelData[category] ?? [];
              const unlocked = isCategoryUnlocked(levelName, category);
              const { label, Icon, className } = CATEGORY_META[category];

              return (
                <div key={category} className={`category-group ${!unlocked ? 'locked' : ''}`}>
                  <h3 className="category-title">
                    <Icon size={14} className={`category-icon ${className}`} />
                    {label}
                    {!unlocked && <Lock className="lock-icon" size={13} />}
                  </h3>
                  <ul className="file-list">
                    {files.map((file) => {
                      const done = completedItems.includes(file.id);
                      const active = currentFile === file.path;

                      return (
                        <li
                          key={file.id}
                          className={active ? 'active-file' : ''}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleFileClick(file.path)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFileClick(file.path); } }}
                        >
                          {done ? (
                            <CircleCheck size={14} className="check-icon" />
                          ) : (
                            <FileText size={14} className="file-item-icon" />
                          )}
                          <span className="file-item-title">{file.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        );
      })}
    </aside>
  );

  const ContentViewer = () => {
    if (!currentFile) {
      return (
        <div className="content-empty">
          <BookOpen className="content-empty-icon" size={48} strokeWidth={1.25} />
          <h2>Bienvenido al curso</h2>
          <p>Selecciona una lección en el panel lateral para comenzar tu aprendizaje.</p>
        </div>
      );
    }

    const pageTitle = currentFile.split('/').pop().replace('.md', '').replace(/_/g, ' ');
    const currentFileId = findFileByPath(currentFile)?.id;
    const isExerciseFile = currentFile.includes('Ejercicios') || currentFile.includes('Ejercicio');
    const isTestFile = currentFile.includes('Pruebas') || currentFile.includes('Prueba');
    const isInteractive = isExerciseFile || isTestFile;

    return (
      <article className="content-area">
        <header className="content-header">
          <div>
            <div className="content-breadcrumb">
              <Atom size={12} />
              {currentLevelTitle}
            </div>
            <h2 className="content-title">{pageTitle}</h2>
          </div>
          <button
            onClick={markAsComplete}
            className={`btn-complete ${isCompleted ? 'completed' : ''}`}
            disabled={isCompleted}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={16} />
                Completado
              </>
            ) : (
              <>
                <CircleCheck size={16} />
                Marcar como completado
              </>
            )}
          </button>
        </header>

        {isInteractive ? (
          <ExerciseViewer
            path={currentFile}
            fileId={currentFileId}
            isExercise={isExerciseFile}
          />
        ) : (
          <div className="markdown-body">
            {isLoading ? (
              <div className="loading-spinner">
                <Loader2 size={20} className="spin" />
                Cargando contenido...
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');

                    if (inline) {
                      return <code className="inline-code">{codeString}</code>;
                    }

                    return (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match ? match[1] : 'javascript'}
                        PreTag="div"
                        className="code-block"
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            )}
          </div>
        )}
      </article>
    );
  };

  const startCourse = () => {
    setCurrentView('course');
    if (!currentFile) {
      const firstLesson = courseData[currentLevelName]?.lecciones[0];
      if (firstLesson) setCurrentFile(firstLesson.path);
    }
  };

  const goToLanding = () => setCurrentView('landing');
  const goToLegal = (type) => { setLegalView(type); setCurrentView('legal'); };

  const CourseNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const ThemeIcon = theme === 'dark' ? Sun : Moon;

    useEffect(() => {
      if (!menuOpen) return;
      const handleClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [menuOpen]);

    return (
      <nav className="course-navbar" aria-label="Curso">
        <button className="course-nav-btn" onClick={goToLanding} title="Volver al Inicio">
          <Home size={16} />
          <span>Inicio</span>
        </button>
        <div className="course-nav-brand">
          <Atom size={16} strokeWidth={2.5} />
          <span>React Course</span>
        </div>
        <div className="course-nav-actions">
          <button className="course-nav-btn course-nav-btn--icon" onClick={toggleTheme} title="Cambiar tema">
            <ThemeIcon size={16} />
          </button>
          {user ? (
            <div className="course-nav-user-wrap" ref={menuRef}>
              <button
                className="course-nav-user"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <div className="course-nav-avatar">
                  {user.profile?.avatar_url ? (
                    <img src={user.profile.avatar_url} alt="" className="course-nav-avatar-img" />
                  ) : (
                    user.name?.charAt(0)?.toUpperCase() || '?'
                  )}
                </div>
                <span className="course-nav-username">{user.name || user.email || 'Usuario'}</span>
                <svg className={`course-nav-chevron ${menuOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {menuOpen && (
                <div className="course-nav-dropdown">
                  <div className="course-nav-dropdown-header">
                    <div className="course-nav-dropdown-avatar">
                      {user.profile?.avatar_url ? (
                        <img src={user.profile.avatar_url} alt="" className="course-nav-avatar-img" />
                      ) : (
                        user.name?.charAt(0)?.toUpperCase() || '?'
                      )}
                    </div>
                    <div>
                      <div className="course-nav-dropdown-name">{user.name || 'Usuario'}</div>
                      <div className="course-nav-dropdown-email">{user.email || ''}</div>
                    </div>
                  </div>
                  <div className="course-nav-dropdown-divider" />
                  <button className="course-nav-dropdown-item" onClick={() => { setMenuOpen(false); setProfileOpen(true); }}>
                    <User size={15} />
                    Mi Perfil
                  </button>
                  <div className="course-nav-dropdown-divider" />
                  <div className="course-nav-dropdown-label">Mis Cursos</div>
                  <button
                    className="course-nav-dropdown-link"
                    onClick={async () => {
                      const url = await getAuthRedirectUrl(supabase, 'https://javascript-learning-app.dev/curso');
                      window.location.href = url;
                    }}
                  >
                    JavaScript
                  </button>
                  <button
                    className="course-nav-dropdown-link"
                    onClick={async () => {
                      const url = await getAuthRedirectUrl(supabase, 'https://react-learning-app.dev');
                      window.location.href = url;
                    }}
                  >
                    React
                  </button>
                  <button
                    className="course-nav-dropdown-link"
                    onClick={async () => {
                      const url = await getAuthRedirectUrl(supabase, 'https://typescript.javascript-learning-app.dev/curso');
                      window.location.href = url;
                    }}
                  >
                    TypeScript
                  </button>
                  <div className="course-nav-dropdown-divider" />
                  <button className="course-nav-dropdown-item" onClick={() => { setMenuOpen(false); logout(); }}>
                    <LogOut size={15} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="course-nav-btn" onClick={goToLanding}>
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>
    );
  };

  if (currentView === 'legal') {
    return <LegalPage type={legalView} onBack={goToLanding} onNavigate={goToLegal} />;
  }

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onStartCourse={startCourse}
          theme={theme}
          toggleTheme={toggleTheme}
          onGoToLegal={goToLegal}
        />
        {isRecoveringPassword && <ResetPasswordModal />}
      </>
    );
  }

  return (
    <div className="app-container">
      <CourseNavbar />
      <div className="app-body">
        <Sidebar onBackToLanding={goToLanding} />
        <main className="content-panel">
          <ContentViewer />
        </main>
        <LevelNav />
      </div>
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      {isRecoveringPassword && <ResetPasswordModal />}
    </div>
  );
};

const Apps = () => (
  <AuthProvider>
    <AppsInner />
  </AuthProvider>
);

export default Apps;
