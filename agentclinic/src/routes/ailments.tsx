import { Hono } from "hono";
import type Database from "better-sqlite3";
import { AilmentsList } from "../components/AilmentsList.js";
import type { Ailment } from "../db/types.js";

export function ailmentsRouter(db: Database.Database) {
  const router = new Hono();

  const selectAll = db.prepare("SELECT * FROM ailments ORDER BY name");

  router.get("/", (c) => {
    const ailments = selectAll.all() as Ailment[];
    return c.html(<AilmentsList ailments={ailments} />);
  });

  return router;
}
