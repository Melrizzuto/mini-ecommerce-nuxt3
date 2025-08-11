export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string; password: string }>(event);

  // chiama la Fake Store API
  const res = await $fetch<{ token: string }>(
    "https://fakestoreapi.com/auth/login",
    {
      method: "POST",
      body,
    }
  );

  if (!res?.token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Credenziali non valide",
    });
  }

  // set cookie httpOnly (non leggibile da JS)
  setCookie(event, "auth_token", res.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 giorno
  });

  return { ok: true };
});
