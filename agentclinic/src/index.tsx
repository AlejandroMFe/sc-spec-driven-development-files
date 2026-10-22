import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Home } from "./pages/Home";

export const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "AgentClinic",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (c) => {
  return c.html(<Home />);
});

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT) || 3000;
  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`AgentClinic server running at http://localhost:${info.port}`);
  });
}

export default app;
