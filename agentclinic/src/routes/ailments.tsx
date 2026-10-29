import { Hono } from "hono";
import type Database from "better-sqlite3";
import { AilmentsList } from "../components/AilmentsList.js";
import type { AilmentWithTherapies } from "../components/AilmentsList.js";

export function ailmentsRouter(db: Database.Database) {
  const router = new Hono();

  const selectAll = db.prepare(`
    SELECT al.*, 
      (SELECT GROUP_CONCAT(t.name, ', ')
       FROM therapies t
       JOIN ailment_therapies at ON t.id = at.therapy_id
       WHERE at.ailment_id = al.id) as recommended_therapies
    FROM ailments al
    ORDER BY al.name
  `);

  router.get("/", (c) => {
    const ailments = selectAll.all() as AilmentWithTherapies[];
    return c.html(<AilmentsList ailments={ailments} />);
  });

  return router;
}
