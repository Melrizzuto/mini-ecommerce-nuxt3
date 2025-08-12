import bcrypt from "bcryptjs";

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

  const hashedPassword = await bcrypt.hash(body.password, 10);
  users.push({
    username: body.username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });
  await storage.setItem(key, users);

  // login immediato (demo)
  setCookie(event, "auth", JSON.stringify({ username: body.username }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return { ok: true };
});
