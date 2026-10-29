import { serve } from "@hono/node-server";
import { createDb } from "./db/index.js";
import { migrate } from "./db/migrate.js";
import { seed } from "./db/seed.js";
import { createApp } from "./app.js";

const dbPath = process.env.NODE_ENV === "test" ? ":memory:" : "agentclinic.db";
export const db = createDb(dbPath);
migrate(db);
seed(db);

export const app = createApp(db);

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT) || 3000;
  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`AgentClinic server running at http://localhost:${info.port}`);
  });
}

export default app;
