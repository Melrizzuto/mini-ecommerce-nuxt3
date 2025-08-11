export default defineEventHandler(async (event) => {
  deleteCookie(event, "auth", { path: "/" });
  return { ok: true };
});
