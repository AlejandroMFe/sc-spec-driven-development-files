import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import type Database from "better-sqlite3";
import { Home } from "./pages/Home.js";
import { NotFound } from "./pages/NotFound.js";
import { ServerError } from "./pages/ServerError.js";
import { agentsRouter } from "./routes/agents.js";
import { ailmentsRouter } from "./routes/ailments.js";
import { therapiesRouter } from "./routes/therapies.js";
import { appointmentsRouter } from "./routes/appointments.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { logger } from "./middleware/logger.js";

export function createApp(db: Database.Database) {
  const app = new Hono();

  app.use("*", logger);
  app.use("/static/*", serveStatic({ root: "./" }));

  app.get("/health", (c) => {
    return c.json({
      status: "ok",
      service: "AgentClinic",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/", (c) => c.html(<Home />));
  app.route("/agents", agentsRouter(db));
  app.route("/agents", appointmentsRouter(db));
  app.route("/ailments", ailmentsRouter(db));
  app.route("/therapies", therapiesRouter(db));
  app.route("/dashboard", dashboardRouter(db));

  app.notFound((c) => c.html(<NotFound />, 404));
  app.onError((_err, c) => c.html(<ServerError />, 500));

  return app;
}
