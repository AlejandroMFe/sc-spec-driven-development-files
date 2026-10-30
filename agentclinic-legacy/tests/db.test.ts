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

  it("creates the therapies table", () => {
    const db = freshDb();
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='therapies'"
      )
      .get();
    expect(row).toBeDefined();
  });

  it("creates the ailment_therapies join table", () => {
    const db = freshDb();
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ailment_therapies'"
      )
      .get();
    expect(row).toBeDefined();
  });

  it("creates the appointments table", () => {
    const db = freshDb();
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='appointments'"
      )
      .get();
    expect(row).toBeDefined();
  });

  it("creates the feedback table", () => {
    const db = freshDb();
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='feedback'"
      )
      .get();
    expect(row).toBeDefined();
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

  it("inserts at least 5 therapies", () => {
    const db = freshDb();
    seed(db);
    const { count } = db
      .prepare("SELECT COUNT(*) as count FROM therapies")
      .get() as { count: number };
    expect(count).toBeGreaterThanOrEqual(5);
  });

  it("creates at least one ailment-therapy link", () => {
    const db = freshDb();
    seed(db);
    const { count } = db
      .prepare("SELECT COUNT(*) as count FROM ailment_therapies")
      .get() as { count: number };
    expect(count).toBeGreaterThan(0);
  });

  it("inserts initial appointments", () => {
    const db = freshDb();
    seed(db);
    const { count } = db
      .prepare("SELECT COUNT(*) as count FROM appointments")
      .get() as { count: number };
    expect(count).toBeGreaterThan(0);
  });

  it("is idempotent — seeding twice does not duplicate rows", () => {
    const db = freshDb();
    seed(db);
    const agentsCount1 = (
      db.prepare("SELECT COUNT(*) as count FROM agents").get() as { count: number }
    ).count;
    const therapiesCount1 = (
      db.prepare("SELECT COUNT(*) as count FROM therapies").get() as { count: number }
    ).count;
    const appointmentsCount1 = (
      db.prepare("SELECT COUNT(*) as count FROM appointments").get() as { count: number }
    ).count;

    seed(db);

    const agentsCount2 = (
      db.prepare("SELECT COUNT(*) as count FROM agents").get() as { count: number }
    ).count;
    const therapiesCount2 = (
      db.prepare("SELECT COUNT(*) as count FROM therapies").get() as { count: number }
    ).count;
    const appointmentsCount2 = (
      db.prepare("SELECT COUNT(*) as count FROM appointments").get() as { count: number }
    ).count;

    expect(agentsCount2).toBe(agentsCount1);
    expect(therapiesCount2).toBe(therapiesCount1);
    expect(appointmentsCount2).toBe(appointmentsCount1);
  });

  it("seeds feedback records", () => {
    const db = freshDb();
    seed(db);
    const count = (
      db.prepare("SELECT COUNT(*) as count FROM feedback").get() as { count: number }
    ).count;
    expect(count).toBeGreaterThan(0);
  });

  it("inserts feedback and enforces rating check constraints", () => {
    const db = freshDb();
    seed(db);
    const insert = db.prepare(
      "INSERT INTO feedback (name, email, message, rating) VALUES (?, ?, ?, ?)"
    );
    const result = insert.run("Test-Agent", "test@test.ai", "Great care", 5);
    expect(result.changes).toBe(1);

    expect(() => insert.run("Invalid-Agent", null, "Bad rating", 6)).toThrow();
    expect(() => insert.run("Invalid-Agent", null, "Bad rating", 0)).toThrow();
  });

  it("cascades deletion of an agent to agent_ailments and appointments", () => {
    const db = freshDb();
    seed(db);
    const link = db.prepare("SELECT agent_id FROM agent_ailments LIMIT 1").get() as { agent_id: number };
    expect(link).toBeDefined();

    db.prepare("DELETE FROM agents WHERE id = ?").run(link.agent_id);
    const remainingAilments = db
      .prepare("SELECT COUNT(*) as count FROM agent_ailments WHERE agent_id = ?")
      .get(link.agent_id) as { count: number };
    expect(remainingAilments.count).toBe(0);

    const remainingAppts = db
      .prepare("SELECT COUNT(*) as count FROM appointments WHERE agent_id = ?")
      .get(link.agent_id) as { count: number };
    expect(remainingAppts.count).toBe(0);
  });
});
