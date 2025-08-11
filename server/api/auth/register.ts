type Body = { username: string; password: string };
type User = { username: string; password: string; createdAt: string };

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event);
  if (!body?.username || !body?.password) {
    throw createError({ statusCode: 400, statusMessage: "Missing fields" });
  }

  const storage = useStorage();
  const key = "auth:users";
  const users = (await storage.getItem<User[]>(key)) ?? [];

  if (users.some((u) => u.username === body.username)) {
    throw createError({
      statusCode: 409,
      statusMessage: "Username already exists",
    });
  }

  users.push({
    username: body.username,
    password: body.password,
    createdAt: new Date().toISOString(),
  });
  await storage.setItem(key, users);

  // login immediato (demo)
  setCookie(event, "auth", JSON.stringify({ username: body.username }), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  return { ok: true };
});
