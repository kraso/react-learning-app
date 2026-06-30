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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveringPassword(true);
        return;
      }
      if (event === 'USER_UPDATED' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata.name,
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
          name: session.user.user_metadata.name,
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
          name: session.user.user_metadata.name,
          email: session.user.email,
          profile,
        });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
    const profile = await loadProfile(user.id);
    setUser((prev) => prev ? { ...prev, profile } : prev);
    return { ok: true };
  }, [user?.id, loadProfile]);

  const register = useCallback(async ({ name, email, password }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
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
      const { data, error } = await supabase.auth.updateUser({ email: newEmail });
      console.log('updateEmail result:', { data, error });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (err) {
      console.error('updateEmail exception:', err);
      return { ok: false, error: err.message || 'Error al actualizar el email' };
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const refreshUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const profile = await loadProfile(session.user.id);
      setUser({
        id: session.user.id,
        name: session.user.user_metadata.name,
        email: session.user.email,
        profile,
      });
    }
  }, [loadProfile]);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading, updateProfile, resetPassword, updatePassword, updateEmail, isRecoveringPassword, setIsRecoveringPassword, refreshUser }}>
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
    .from('user_progress')
    .select('completed_items')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data) return [];
  return data.completed_items || [];
}

export async function saveUserProgress(userId, completedItems) {
  if (!userId) return;
  const { error } = await supabase
    .from('user_progress')
    .upsert(
      { user_id: userId, completed_items: completedItems, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
  if (error) console.error('Error saving progress:', error);
}
