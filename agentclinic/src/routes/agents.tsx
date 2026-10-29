import { Hono } from "hono";
import type Database from "better-sqlite3";
import { AgentsList } from "../components/AgentsList.js";
import { AgentDetail } from "../components/AgentDetail.js";
import type { Agent } from "../db/types.js";
import type { AgentAilmentItem } from "../components/AgentDetail.js";

export function agentsRouter(db: Database.Database) {
  const router = new Hono();

  const selectAll = db.prepare("SELECT * FROM agents ORDER BY name");
  const selectById = db.prepare("SELECT * FROM agents WHERE id = ?");
  const selectAilments = db.prepare(
    `SELECT al.*,
       (SELECT GROUP_CONCAT(t.name, ', ')
        FROM therapies t
        JOIN ailment_therapies at ON t.id = at.therapy_id
        WHERE at.ailment_id = al.id) as recommended_therapies
     FROM ailments al
     JOIN agent_ailments aa ON al.id = aa.ailment_id
     WHERE aa.agent_id = ?
     ORDER BY al.name`
  );

  router.get("/", (c) => {
    const agents = selectAll.all() as Agent[];
    return c.html(<AgentsList agents={agents} />);
  });

  router.get("/:id", (c) => {
    const id = Number(c.req.param("id"));
    const agent = selectById.get(id) as Agent | undefined;
    if (!agent) return c.notFound();
    const ailments = selectAilments.all(id) as AgentAilmentItem[];
    return c.html(<AgentDetail agent={agent} ailments={ailments} />);
  });

  return router;
}
