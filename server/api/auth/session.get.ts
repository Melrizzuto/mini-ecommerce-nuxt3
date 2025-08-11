export type Session = { authenticated: boolean };

export default defineEventHandler<Session>((event) => {
  const token = getCookie(event, "auth_token");
  return { authenticated: Boolean(token) };
});
