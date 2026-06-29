import { useState, useRef, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './AuthModal.css';

const MODES = { LOGIN: 'login', REGISTER: 'register' };

export default function AuthModal({ isOpen, onClose, initialMode = MODES.LOGIN }) {
  const { login, register } = useAuth();
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

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status.type) setStatus({ type: null, message: '' });
  };

  const validate = () => {
    if (isRegister && !form.name.trim()) {
      return 'El nombre es obligatorio';
    }
    if (!form.email.trim()) {
      return 'El email es obligatorio';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Ingresa un email válido';
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
    const result = isRegister ? await register(form) : await login(form);

    if (result.ok) {
      setStatus({ type: 'success', message: isRegister ? 'Cuenta creada exitosamente' : 'Inicio de sesión exitoso' });
      setTimeout(onClose, 800);
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

  return (
    <div className="auth-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-header-icon">
            {isRegister ? <User size={22} /> : <Lock size={22} />}
          </div>
          <h2 className="auth-title">{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
          <p className="auth-subtitle">
            {isRegister
              ? 'Regístrate para guardar tu progreso del curso'
              : 'Bienvenido de vuelta, continúa aprendiendo'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-name">Nombre</label>
              <div className="auth-input-wrap">
                <User size={16} className="auth-input-icon" />
                <input
                  id="auth-name"
                  ref={inputRef}
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

          {!isRegister && (
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
              <label className="auth-label" htmlFor="auth-email-reg">Email</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="auth-email-reg"
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
                tabIndex={-1}
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
            {isRegister && (
              <span className="auth-hint">Mínimo 6 caracteres</span>
            )}
          </div>

          {status.type && (
            <div className={`auth-status auth-status--${status.type}`}>
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
                {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <button className="auth-switch" onClick={toggleMode}>
              {isRegister ? 'Iniciar sesión' : 'Regístrate gratis'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
