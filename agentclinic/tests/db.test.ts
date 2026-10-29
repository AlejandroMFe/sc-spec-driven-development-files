import { describe, it, expect } from "vitest";
import { createDb } from "../src/db/index.js";
import { migrate } from "../src/db/migrate.js";
import { seed } from "../src/db/seed.js";

function freshDb() {
  const db = createDb(":memory:");
  migrate(db);
  return db;
}

describe("migrate", () => {
  it("runs without error on a fresh database", () => {
    expect(() => freshDb()).not.toThrow();
  });

  it("is idempotent — running twice does not error", () => {
    const db = freshDb();
    expect(() => migrate(db)).not.toThrow();
  });

  it("creates the agents table", () => {
    const db = freshDb();
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='agents'"
      )
      .get();
    expect(row).toBeDefined();
  });

  it("creates the ailments table", () => {
    const db = freshDb();
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ailments'"
      )
      .get();
    expect(row).toBeDefined();
  });

  it("creates the agent_ailments join table with cascade and reverse index", () => {
    const db = freshDb();
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='agent_ailments'"
      )
      .get();
    expect(row).toBeDefined();

    const idx = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_agent_ailments_ailment_id'"
      )
      .get();
    expect(idx).toBeDefined();
  });
});

describe("seed", () => {
  it("inserts at least 5 agents", () => {
    const db = freshDb();
    seed(db);
    const { count } = db
      .prepare("SELECT COUNT(*) as count FROM agents")
      .get() as { count: number };
    expect(count).toBeGreaterThanOrEqual(5);
  });

  it("inserts at least 5 ailments", () => {
    const db = freshDb();
    seed(db);
    const { count } = db
      .prepare("SELECT COUNT(*) as count FROM ailments")
      .get() as { count: number };
    expect(count).toBeGreaterThanOrEqual(5);
  });

  it("creates at least one agent-ailment link", () => {
    const db = freshDb();
    seed(db);
    const { count } = db
      .prepare("SELECT COUNT(*) as count FROM agent_ailments")
      .get() as { count: number };
    expect(count).toBeGreaterThan(0);
  });

  it("is idempotent — seeding twice does not duplicate rows", () => {
    const db = freshDb();
    seed(db);
    const first = (
      db.prepare("SELECT COUNT(*) as count FROM agents").get() as {
        count: number;
      }
    ).count;
    seed(db);
    const second = (
      db.prepare("SELECT COUNT(*) as count FROM agents").get() as {
        count: number;
      }
    ).count;
    expect(second).toBe(first);
  });

  it("cascades deletion of an agent to agent_ailments", () => {
    const db = freshDb();
    seed(db);
    // Find an agent that has linked ailments
    const link = db.prepare("SELECT agent_id FROM agent_ailments LIMIT 1").get() as { agent_id: number };
    expect(link).toBeDefined();

    db.prepare("DELETE FROM agents WHERE id = ?").run(link.agent_id);
    const remaining = db.prepare("SELECT COUNT(*) as count FROM agent_ailments WHERE agent_id = ?").get(link.agent_id) as { count: number };
    expect(remaining.count).toBe(0);
  });
});
