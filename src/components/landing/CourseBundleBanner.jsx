import { useState, useCallback } from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { getAuthRedirectUrl } from '../../lib/auth-bridge';
import { supabase } from '../../lib/supabase';

const COURSES = [
  {
    id: 'js',
    name: 'JavaScript',
    url: 'https://javascript-learning-app.dev/curso',
    image: 'https://javascript-learning-app.dev/og-image.png',
    color: 'from-amber-500 to-yellow-400',
  },
  {
    id: 'react',
    name: 'React',
    url: 'https://react-learning-app.dev',
    image: 'https://react-learning-app.dev/og-image.png',
    color: 'from-indigo-500 to-violet-400',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    url: 'https://typescript.javascript-learning-app.dev/curso',
    image: 'https://typescript.javascript-learning-app.dev/og-image.svg',
    color: 'from-sky-500 to-cyan-400',
  },
];

export default function CourseBundleBanner({ currentCourse = 'react' }) {
  const [hovered, setHovered] = useState(null);

  const handleNavigate = useCallback(async (url) => {
    const redirectUrl = await getAuthRedirectUrl(supabase, url);
    window.location.href = redirectUrl;
  }, []);

  return (
    <section style={{
      width: '100%',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-elevated)',
    }}>
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '3.5rem 1rem 2.5rem',
      }}>
        <p style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
        }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Una sola cuenta.</span>{' '}
          Tres cursos gratuitos.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {COURSES.map((course) => {
            const isActive = course.id === currentCourse;
            return (
              <button
                key={course.id}
                onClick={() => !isActive && handleNavigate(course.url)}
                onMouseEnter={() => setHovered(course.id)}
                onMouseLeave={() => setHovered(null)}
                disabled={isActive}
                style={{
                  position: 'relative',
                  width: '100%',
                  textAlign: 'left',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: isActive
                    ? 'none'
                    : '1px solid var(--border)',
                  background: isActive
                    ? 'linear-gradient(135deg, var(--accent), #a78bfa)'
                    : 'var(--bg-sidebar)',
                  padding: isActive ? '2px' : '0',
                  cursor: isActive ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  transform: hovered === course.id && !isActive ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered === course.id && !isActive
                    ? '0 8px 32px rgba(0,0,0,0.3)'
                    : 'none',
                }}
              >
                {isActive ? (
                  <div style={{
                    borderRadius: 'calc(1rem - 2px)',
                    background: 'var(--bg-sidebar)',
                    overflow: 'hidden',
                  }}>
                    <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                      <img
                        src={course.image}
                        alt={course.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.2)',
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.25rem 0.625rem',
                        borderRadius: '9999px',
                        background: 'rgba(0,0,0,0.7)',
                        border: '1px solid var(--border)',
                      }}>
                        <CheckCircle2 size={12} style={{ color: 'var(--accent)' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Estás aquí</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{course.name}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                      <img
                        src={course.image}
                        alt={course.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.1)',
                        transition: 'opacity 0.3s',
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.25rem 0.625rem',
                        borderRadius: '9999px',
                        background: 'rgba(0,0,0,0.7)',
                        border: '1px solid var(--border)',
                      }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Gratuito</span>
                      </div>
                      {hovered === course.id && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(0,0,0,0.4)',
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.75rem',
                            background: 'rgba(0,0,0,0.8)',
                            border: '1px solid var(--border)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                          }}>
                            <ExternalLink size={14} />
                            Ir al curso
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{course.name}</span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
