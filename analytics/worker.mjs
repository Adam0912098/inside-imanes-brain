const siteOrigin = "https://hajjiadam.me";
const pages = new Set(["home", "modules"]);
const devices = new Set(["iPhone", "iPad", "Android phone", "Android tablet", "Mac", "Windows PC", "Linux PC", "Chromebook", "Other"]);
const browsers = new Set(["Safari", "Chrome", "Firefox", "Edge", "Samsung Internet", "Opera", "Other"]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const cors = {
  "Access-Control-Allow-Origin": siteOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
  Vary: "Origin"
};

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== "/visit") return new Response(null, { status: 404 });
    if (request.headers.get("Origin") !== siteOrigin) return new Response(null, { status: 403 });
    const reply = (status) => new Response(null, { status, headers: cors });
    if (request.method === "OPTIONS") return reply(204);
    if (request.method !== "POST") return reply(405);
    if (request.headers.get("Content-Type")?.split(";")[0].trim() !== "application/json") return reply(415);

    // Bound the request before parsing it, including bodies without Content-Length.
    const body = request.body?.getReader();
    if (!body) return reply(400);
    let bytes = 0;
    let json = "";
    const decoder = new TextDecoder();
    try {
      for (;;) {
        const { value, done } = await body.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 512) {
          await body.cancel();
          return reply(413);
        }
        json += decoder.decode(value, { stream: true });
      }
      json += decoder.decode();
    } catch {
      return reply(400);
    }

    let event;
    try {
      event = JSON.parse(json);
    } catch {
      return reply(400);
    }
    if (!event || typeof event.visitId !== "string" || !uuid.test(event.visitId) ||
        !pages.has(event.page) || typeof event.consent !== "boolean") {
      return reply(400);
    }
    if (event.consent && (typeof event.visitorId !== "string" ||
        !uuid.test(event.visitorId) || !devices.has(event.device) || !browsers.has(event.browser))) {
      return reply(400);
    }

    const now = new Date();
    const visitWindow = Math.floor(now.getTime() / 300_000);
    const visitId = event.visitId.toLowerCase();
    await env.DB.prepare(`
      INSERT INTO site_visits (visited_at, visit_id, page, visitor_id, device, browser, visit_window)
      SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7
      WHERE (SELECT count(*) FROM site_visits WHERE visit_window = ?7) < 200
         OR EXISTS (SELECT 1 FROM site_visits WHERE visit_id = ?2)
      ON CONFLICT(visit_id) DO UPDATE SET
        visitor_id = excluded.visitor_id,
        device = excluded.device,
        browser = excluded.browser
      WHERE site_visits.page = excluded.page AND site_visits.visitor_id IS NULL
        AND excluded.visitor_id IS NOT NULL
    `).bind(
      now.toISOString(),
      visitId,
      event.page,
      event.consent ? event.visitorId.toLowerCase() : null,
      event.consent ? event.device : null,
      event.consent ? event.browser : null,
      visitWindow
    ).run();
    return reply(204);
  }
};
