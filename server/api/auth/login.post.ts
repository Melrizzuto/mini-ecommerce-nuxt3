type Body = { username: string; password: string };
type User = { username: string; password: string; createdAt: string };

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event);
  if (!body?.username || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing credentials",
    });
  }

  const storage = useStorage();
  const users = (await storage.getItem<User[]>("auth:users")) ?? [];

  const found = users.find(
    (u) => u.username === body.username && u.password === body.password
  );
  if (!found)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });

  setCookie(event, "auth", JSON.stringify({ username: found.username }), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  return { ok: true };
});
