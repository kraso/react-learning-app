export async function getAuthRedirectUrl(supabase, baseUrl) {
  if (!supabase) return baseUrl;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return baseUrl;

  const url = new URL(baseUrl);
  url.hash = `access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
  return url.toString();
}
