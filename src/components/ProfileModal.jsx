import { useState, useRef, useEffect } from 'react';
import { X, Camera, User, Phone, AtSign, Loader2, CheckCircle2, AlertCircle, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './ProfileModal.css';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, updateProfile, updateEmail, updatePassword, refreshUser } = useAuth();
  const [form, setForm] = useState({ display_name: '', alias: '', phone: '' });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ type: null, message: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwStatus, setPwStatus] = useState({ type: null, message: '' });
  const fileRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen && user) {
      refreshUser().then((freshUser) => {
        const u = freshUser || user;
        setForm({
          display_name: u.profile?.display_name || u.name || '',
          alias: u.profile?.alias || '',
          phone: u.profile?.phone || '',
        });
        setAvatarPreview(u.profile?.avatar_url || null);
      });
      setSaved(false);
      setError('');
      setNewEmail('');
      setEmailStatus({ type: null, message: '' });
      setNewPassword('');
      setConfirmPassword('');
      setPwStatus({ type: null, message: '' });
    }
  }, [isOpen]);

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

  const handleAvatarClick = () => fileRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no puede superar 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSaved(false);

    const result = await updateProfile({
      display_name: form.display_name.trim(),
      alias: form.alias.trim(),
      phone: form.phone.trim(),
      avatar_url: avatarPreview,
    });

    setLoading(false);
    if (result.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError(result.error || 'Error al guardar');
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    if (!newEmail.trim() || newEmail === user?.email) {
      setEmailStatus({ type: 'error', message: 'Introduce un email diferente al actual' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setEmailStatus({ type: 'error', message: 'Ingresa un email válido' });
      return;
    }
    setEmailLoading(true);
    setEmailStatus({ type: null, message: '' });
    const result = await updateEmail(newEmail);
    setEmailLoading(false);
    if (result.ok) {
      setEmailStatus({ type: 'success', message: 'Revisa tu nuevo email para confirmar el cambio.' });
      setNewEmail('');
    } else {
      setEmailStatus({ type: 'error', message: result.error });
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) {
      setPwStatus({ type: 'error', message: 'Introduce una nueva contraseña' });
      return;
    }
    if (newPassword.length < 8) {
      setPwStatus({ type: 'error', message: 'La contraseña debe tener al menos 8 caracteres' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwStatus({ type: 'error', message: 'Las contraseñas no coinciden' });
      return;
    }
    setPwLoading(true);
    setPwStatus({ type: null, message: '' });
    const result = await updatePassword(newPassword);
    setPwLoading(false);
    if (result.ok) {
      setPwStatus({ type: 'success', message: 'Contraseña actualizada correctamente' });
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwStatus({ type: 'error', message: result.error });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const initials = (form.display_name || user?.name || '?').charAt(0).toUpperCase();

  return (
    <div className="profile-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="profile-modal">
        <button className="profile-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="profile-header">
          <h2 className="profile-title">Mi Perfil</h2>
          <p className="profile-subtitle">Personaliza tu información</p>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-avatar-section">
            <button type="button" className="profile-avatar-btn" onClick={handleAvatarClick} aria-label="Cambiar avatar">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="profile-avatar-img" />
              ) : (
                <span className="profile-avatar-initials">{initials}</span>
              )}
              <div className="profile-avatar-overlay">
                <Camera size={18} />
              </div>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="profile-name">Nombre</label>
            <div className="profile-input-wrap">
              <User size={16} className="profile-input-icon" />
              <input
                id="profile-name"
                type="text"
                className="profile-input"
                placeholder="Tu nombre"
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="profile-email">Email actual</label>
            <div className="profile-input-wrap">
              <AtSign size={16} className="profile-input-icon" />
              <input
                id="profile-email"
                type="email"
                className="profile-input profile-input--readonly"
                value={user?.email || ''}
                readOnly
              />
            </div>
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="profile-new-email">Cambiar email</label>
            <div className="profile-email-row">
              <div className="profile-input-wrap profile-input-wrap--grow">
                <Mail size={16} className="profile-input-icon" />
                <input
                  id="profile-new-email"
                  type="email"
                  className="profile-input"
                  placeholder="nuevo@email.com"
                  value={newEmail}
                  onChange={(e) => { setNewEmail(e.target.value); if (emailStatus.type) setEmailStatus({ type: null, message: '' }); }}
                  autoComplete="email"
                />
              </div>
              <button type="button" className="profile-email-btn" disabled={emailLoading} onClick={handleEmailChange}>
                {emailLoading ? <Loader2 size={16} className="profile-spinner" /> : 'Cambiar'}
              </button>
            </div>
            {emailStatus.type && (
              <div className={`profile-email-status profile-email-status--${emailStatus.type}`} role="status" aria-live="polite">
                {emailStatus.type === 'error' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                {emailStatus.message}
              </div>
            )}
          </div>

          <div className="profile-section-divider" />

          <div className="profile-field">
            <label className="profile-label" htmlFor="profile-new-password">Cambiar contraseña</label>
            <div className="profile-input-wrap">
              <Lock size={16} className="profile-input-icon" />
              <input
                id="profile-new-password"
                type="password"
                className="profile-input"
                placeholder="Nueva contraseña (mín. 8 caracteres)"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); if (pwStatus.type) setPwStatus({ type: null, message: '' }); }}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="profile-confirm-password">Confirmar contraseña</label>
            <div className="profile-email-row">
              <div className="profile-input-wrap profile-input-wrap--grow">
                <Lock size={16} className="profile-input-icon" />
                <input
                  id="profile-confirm-password"
                  type="password"
                  className="profile-input"
                  placeholder="Repite la contraseña"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); if (pwStatus.type) setPwStatus({ type: null, message: '' }); }}
                  autoComplete="new-password"
                />
              </div>
              <button type="button" className="profile-email-btn" disabled={pwLoading} onClick={handlePasswordChange}>
                {pwLoading ? <Loader2 size={16} className="profile-spinner" /> : 'Cambiar'}
              </button>
            </div>
            {pwStatus.type && (
              <div className={`profile-email-status profile-email-status--${pwStatus.type}`} role="status" aria-live="polite">
                {pwStatus.type === 'error' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                {pwStatus.message}
              </div>
            )}
          </div>

          <div className="profile-section-divider" />

          <div className="profile-field">
            <label className="profile-label" htmlFor="profile-alias">Alias</label>
            <div className="profile-input-wrap">
              <AtSign size={16} className="profile-input-icon" />
              <input
                id="profile-alias"
                type="text"
                className="profile-input"
                placeholder="@tu_alias"
                value={form.alias}
                onChange={(e) => setForm({ ...form, alias: e.target.value })}
              />
            </div>
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="profile-phone">Teléfono</label>
            <div className="profile-input-wrap">
              <Phone size={16} className="profile-input-icon" />
              <input
                id="profile-phone"
                type="tel"
                className="profile-input"
                placeholder="+34 600 000 000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                autoComplete="tel"
              />
            </div>
          </div>

          {error && (
            <div className="profile-status profile-status--error" role="alert">
              {error}
            </div>
          )}

          {saved && (
            <div className="profile-status profile-status--success" role="status" aria-live="polite">
              <CheckCircle2 size={16} />
              Perfil actualizado
            </div>
          )}

          <button type="submit" className="profile-submit" disabled={loading}>
            {loading ? (
              <Loader2 size={18} className="profile-spinner" />
            ) : (
              'Guardar cambios'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
