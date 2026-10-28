import { serve } from "@hono/node-server";
import { createDb } from "./db/index";
import { migrate } from "./db/migrate";
import { seed } from "./db/seed";
import { createApp } from "./app";

export const db = createDb();
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
