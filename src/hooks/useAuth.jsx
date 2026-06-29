import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name,
          email: session.user.email,
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name,
          email: session.user.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
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
