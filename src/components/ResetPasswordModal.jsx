import { useState } from 'react';
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './ResetPasswordModal.css';

export default function ResetPasswordModal() {
  const { updatePassword, setIsRecoveringPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setStatus({ type: 'error', message: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }
    if (password !== confirm) {
      setStatus({ type: 'error', message: 'Las contraseñas no coinciden' });
      return;
    }

    setLoading(true);
    const result = await updatePassword(password);
    setLoading(false);

    if (result.ok) {
      setStatus({ type: 'success', message: 'Contraseña actualizada correctamente' });
      setTimeout(() => setIsRecoveringPassword(false), 2000);
    } else {
      setStatus({ type: 'error', message: result.error });
    }
  };

  return (
    <div className="rpr-overlay">
      <div className="rpr-modal">
        <div className="rpr-header">
          <div className="rpr-icon">
            <Lock size={22} />
          </div>
          <h2 className="rpr-title">Nueva Contraseña</h2>
          <p className="rpr-subtitle">Introduce tu nueva contraseña para restablecer el acceso a tu cuenta.</p>
        </div>

        <form className="rpr-form" onSubmit={handleSubmit}>
          <div className="rpr-field">
            <label className="rpr-label" htmlFor="rpr-password">Nueva contraseña</label>
            <div className="rpr-input-wrap">
              <Lock size={16} className="rpr-input-icon" />
              <input
                id="rpr-password"
                type={showPassword ? 'text' : 'password'}
                className="rpr-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (status.type) setStatus({ type: null, message: '' }); }}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="rpr-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <span className="rpr-hint">Mínimo 6 caracteres</span>
          </div>

          <div className="rpr-field">
            <label className="rpr-label" htmlFor="rpr-confirm">Confirmar contraseña</label>
            <div className="rpr-input-wrap">
              <Lock size={16} className="rpr-input-icon" />
              <input
                id="rpr-confirm"
                type={showPassword ? 'text' : 'password'}
                className="rpr-input"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); if (status.type) setStatus({ type: null, message: '' }); }}
                autoComplete="new-password"
              />
            </div>
          </div>

          {status.type && (
            <div className={`rpr-status rpr-status--${status.type}`} role="status" aria-live="polite">
              {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              {status.message}
            </div>
          )}

          <button type="submit" className="rpr-submit" disabled={loading}>
            {loading ? (
              <Loader2 size={18} className="rpr-spinner" />
            ) : (
              'Guardar Contraseña'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
