export async function POST(req: Request) {
  try {
    if (Number(req.headers.get("content-length") || 0) > 1024) return new Response(null, { status: 413 });
    const data = await req.json();
    if (!["LCP", "INP", "CLS"].includes(data?.name) ||
        typeof data?.value !== "number" || !Number.isFinite(data.value) ||
        typeof data?.path !== "string" || !/^\/[a-z0-9/-]{0,80}$/i.test(data.path)) {
      return new Response(null, { status: 400 });
    }
    console.info("WEB_VITAL", JSON.stringify({ name: data.name, value: data.value, rating: data.rating, path: data.path, mobile: data.mobile === true }));
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
