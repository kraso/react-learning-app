import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function OAuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      // Check for cross-domain session transfer (access_token + refresh_token in hash)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get('access_token');
      const refresh_token = hashParams.get('refresh_token');

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (!error && data.session) {
          window.dispatchEvent(new CustomEvent('supabase:session-set', { detail: data.session }));
          window.history.replaceState({}, '', window.location.pathname);
          window.location.href = '/';
          return;
        }
      }

      // Regular OAuth callback
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Session established, redirect to course
        window.location.href = '/';
      } else {
        // No session, try to exchange the code
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.hash);
        if (!error) {
          window.location.href = '/';
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
