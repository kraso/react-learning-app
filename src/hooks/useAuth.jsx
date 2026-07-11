import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);

  const loadProfile = useCallback(async (userId) => {
    if (!userId) return null;
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    return data || null;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get('token_hash');
    const type = params.get('type');

    if (tokenHash && (type === 'confirmation' || type === 'signup')) {
      supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'signup' }).then(({ error }) => {
        if (error) {
          console.error('Email verification error:', error.message);
        }
        window.history.replaceState({}, '', window.location.pathname);
      });
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveringPassword(true);
        return;
      }
      if (event === 'USER_UPDATED' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata.full_name || session.user.user_metadata.name,
            email: session.user.email,
            profile: null,
          });
          const profile = await loadProfile(session.user.id);
          setUser((prev) => prev ? { ...prev, profile } : prev);
        }
        return;
      }
      if (session?.user) {
        const profile = await loadProfile(session.user.id);
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.user_metadata.name,
          email: session.user.email,
          profile,
        });
      } else {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await loadProfile(session.user.id);
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.user_metadata.name,
          email: session.user.email,
          profile,
        });
      }
      setLoading(false);
    });

    const handleSessionSet = (e) => {
      const sessionUser = e.detail?.user;
      if (sessionUser) {
        loadProfile(sessionUser.id).then((profile) => {
          setUser({
            id: sessionUser.id,
            name: sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name,
            email: sessionUser.email,
            profile,
          });
        });
      }
      setLoading(false);
    };
    window.addEventListener('supabase:session-set', handleSessionSet);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('supabase:session-set', handleSessionSet);
    };
  }, [loadProfile]);

  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) return { ok: false, error: 'No autenticado' };
    const { error } = await supabase
      .from('user_profiles')
      .upsert(
        { user_id: user.id, ...updates, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
    if (error) return { ok: false, error: error.message };

    await supabase.auth.updateUser({
      data: { full_name: updates.display_name || user.name, alias: updates.alias || '', phone: updates.phone || '' },
    });

    const profile = await loadProfile(user.id);
    setUser((prev) => prev ? { ...prev, profile } : prev);
    return { ok: true };
  }, [user?.id, user?.name, loadProfile]);

  const register = useCallback(async ({ name, email, password }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name }, redirectTo: window.location.origin + '/' },
    });
    if (error) {
      const msg = error.message === 'User already registered'
        ? 'Ya existe una cuenta con este email'
        : error.message;
      return { ok: false, error: msg };
    }
    return { ok: true };
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const msg = error.message === 'Invalid login credentials'
        ? 'Email o contraseña incorrectos'
        : error.message;
      return { ok: false, error: msg };
    }
    return { ok: true };
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });
      if (error) {
        console.error('resetPassword error:', error);
        const msg = error.message || error.error_description || JSON.stringify(error) || 'Error al enviar el enlace de restablecimiento';
        return { ok: false, error: msg };
      }
      return { ok: true };
    } catch (err) {
      console.error('resetPassword exception:', err);
      return { ok: false, error: err.message || 'Error de conexión al enviar el enlace' };
    }
  }, []);

  const updatePassword = useCallback(async (newPassword) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return { ok: false, error: 'Sesión no disponible. Intenta abrir el enlace de nuevo.' };
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { ok: false, error: error.message };
      setIsRecoveringPassword(false);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || 'Error al actualizar la contraseña' };
    }
  }, []);

  const updateEmail = useCallback(async (newEmail) => {
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || 'Error al actualizar el email' };
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await supabase.auth.refreshSession();
    if (data?.user) {
      const profile = await loadProfile(data.user.id);
      const updatedUser = {
        id: data.user.id,
        name: data.user.user_metadata.full_name || data.user.user_metadata.name,
        email: data.user.email,
        profile,
      };
      setUser(updatedUser);
      return updatedUser;
    }
    return null;
  }, [loadProfile]);

  const signInWithOAuth = useCallback(async (provider) => {
    try {
      const redirectTo = "https://react-learning-app.dev/auth/callback";
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || 'Error al iniciar sesión con ' + provider };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading, updateProfile, resetPassword, updatePassword, updateEmail, isRecoveringPassword, setIsRecoveringPassword, refreshUser, signInWithOAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export async function loadUserProgress(userId) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('progreso_usuario')
    .select('leccion_id')
    .eq('user_id', userId)
    .eq('app_id', 'react');
  if (error || !data) return [];
  return data.map((r) => r.leccion_id);
}

export async function saveUserProgress(userId, completedItems) {
  if (!userId) return;

  // First, get existing items
  const { data: existing } = await supabase
    .from('progreso_usuario')
    .select('leccion_id')
    .eq('user_id', userId)
    .eq('app_id', 'react');

  const existingIds = new Set((existing || []).map((r) => r.leccion_id));

  // Insert new items only
  const newItems = completedItems.filter((id) => !existingIds.has(id));
  if (newItems.length > 0) {
    const rows = newItems.map((leccionId) => ({
      user_id: userId,
      app_id: 'react',
      leccion_id: leccionId,
      insignias: [],
      puntos: 5,
    }));
    const { error } = await supabase
      .from('progreso_usuario')
      .upsert(rows, { onConflict: 'user_id,app_id,leccion_id' });
    if (error) console.error('Error saving progress:', error);
  }

  // Delete items that are no longer completed
  const toDelete = (existing || []).filter((r) => !completedItems.includes(r.leccion_id));
  if (toDelete.length > 0) {
    const { error } = await supabase
      .from('progreso_usuario')
      .delete()
      .eq('user_id', userId)
      .eq('app_id', 'react')
      .in('leccion_id', toDelete.map((r) => r.leccion_id));
    if (error) console.error('Error deleting progress:', error);
  }
}
