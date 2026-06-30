import { useState, useRef, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './AuthModal.css';

const MODES = { LOGIN: 'login', REGISTER: 'register', FORGOT: 'forgot' };

export default function AuthModal({ isOpen, onClose, initialMode = MODES.LOGIN }) {
  const { login, register, resetPassword } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setForm({ name: '', email: '', password: '' });
      setStatus({ type: null, message: '' });
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isRegister = mode === MODES.REGISTER;
  const isForgot = mode === MODES.FORGOT;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status.type) setStatus({ type: null, message: '' });
  };

  const validate = () => {
    if (!form.email.trim()) {
      return 'El email es obligatorio';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Ingresa un email válido';
    }
    if (isForgot) return null;
    if (isRegister && !form.name.trim()) {
      return 'El nombre es obligatorio';
    }
    if (form.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    setLoading(true);

    if (isForgot) {
      const result = await resetPassword(form.email);
      setLoading(false);
      if (result.ok) {
        setStatus({ type: 'success', message: 'Revisa tu email para restablecer tu contraseña.' });
      } else {
        setStatus({ type: 'error', message: result.error });
      }
      return;
    }

    const result = isRegister ? await register(form) : await login(form);

    if (result.ok) {
      if (isRegister) {
        setStatus({ type: 'success', message: 'Cuenta creada. Revisa tu email para confirmar tu cuenta antes de iniciar sesión.' });
        setTimeout(() => {
          setMode(MODES.LOGIN);
          setForm((prev) => ({ ...prev, password: '' }));
          setStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setStatus({ type: 'success', message: 'Inicio de sesión exitoso' });
        setTimeout(onClose, 800);
      }
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setLoading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const toggleMode = () => {
    setMode((prev) => (prev === MODES.LOGIN ? MODES.REGISTER : MODES.LOGIN));
    setStatus({ type: null, message: '' });
  };

  const goToForgot = () => {
    setMode(MODES.FORGOT);
    setStatus({ type: null, message: '' });
  };

  const backToLogin = () => {
    setMode(MODES.LOGIN);
    setStatus({ type: null, message: '' });
  };

  return (
    <div className="auth-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-header-icon">
            {isForgot ? <KeyRound size={22} /> : isRegister ? <User size={22} /> : <Lock size={22} />}
          </div>
          <h2 className="auth-title">
            {isForgot ? 'Restablecer Contraseña' : isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>
          <p className="auth-subtitle">
            {isForgot
              ? 'Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña'
              : isRegister
                ? 'Regístrate para guardar tu progreso del curso'
                : 'Bienvenido de vuelta, continúa aprendiendo'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {(isRegister || isForgot) && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email-reg">Email</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="auth-email-reg"
                  ref={isForgot ? inputRef : undefined}
                  type="email"
                  className="auth-input"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  autoComplete="email"
                />
              </div>
            </div>
          )}

          {!isRegister && !isForgot && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email">Email</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="auth-email"
                  ref={inputRef}
                  type="email"
                  className="auth-input"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  autoComplete="email"
                />
              </div>
            </div>
          )}

          {isRegister && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-name">Nombre</label>
              <div className="auth-input-wrap">
                <User size={16} className="auth-input-icon" />
                <input
                  id="auth-name"
                  type="text"
                  className="auth-input"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={handleChange('name')}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          {!isForgot && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-password">Contraseña</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              {isRegister && (
                <span className="auth-hint">Mínimo 6 caracteres</span>
              )}
            </div>
          )}

          {!isRegister && !isForgot && (
            <button type="button" className="auth-forgot-link" onClick={goToForgot}>
              ¿Olvidaste tu contraseña?
            </button>
          )}

          {status.type && (
            <div className={`auth-status auth-status--${status.type}`} role="status" aria-live="polite">
              {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              {status.message}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={18} className="auth-spinner" />
            ) : (
              <>
                {isForgot ? 'Enviar Enlace' : isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {isForgot ? (
            <p>
              <button className="auth-switch" onClick={backToLogin}>
                ← Volver a iniciar sesión
              </button>
            </p>
          ) : (
            <p>
              {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
              <button className="auth-switch" onClick={toggleMode}>
                {isRegister ? 'Iniciar sesión' : 'Regístrate gratis'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
