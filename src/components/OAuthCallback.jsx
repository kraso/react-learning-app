import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function OAuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      // Supabase automatically processes the hash fragment
      // We just need to get the session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Session established, redirect to course
        window.location.href = '/curso';
      } else {
        // No session, try to exchange the code
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.hash);
        if (!error) {
          window.location.href = '/curso';
        } else {
          console.error('OAuth callback error:', error);
          window.location.href = '/';
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--lp-bg-base)' }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
        <p style={{ color: 'var(--lp-text-muted)' }}>Iniciando sesión...</p>
      </div>
    </div>
  );
}
