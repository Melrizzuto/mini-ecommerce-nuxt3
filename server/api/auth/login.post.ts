import bcrypt from "bcryptjs";

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

  const found = users.find((u) => u.username === body.username);

  if (!found) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const isHashed = typeof found.password === "string" && found.password.startsWith("$2");
  const isValid = isHashed
    ? await bcrypt.compare(body.password, found.password)
    : found.password === body.password;

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  setCookie(event, "auth", JSON.stringify({ username: found.username }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return { ok: true };
});
