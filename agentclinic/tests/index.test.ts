import { describe, it, expect } from "vitest";
import { app } from "../src/index";

describe("GET /health", () => {
  it("returns HTTP 200 with JSON payload matching schema", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");

    const data = await res.json();
    expect(data.status).toBe("ok");
    expect(data.service).toBe("AgentClinic");
    expect(typeof data.uptime).toBe("number");
    expect(data.uptime).toBeGreaterThanOrEqual(0);
    expect(typeof data.timestamp).toBe("string");
    expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
  });
});

describe("GET /", () => {
  it("returns HTTP 200 with HTML content rendered inside Layout", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");

    const html = await res.text();
    // Layout and subcomponents
    expect(html).toContain('href="/static/style.css"');
    expect(html).toContain("<header>");
    expect(html).toContain("<main>");
    expect(html).toContain("<footer>");

    // Page content
    expect(html).toContain("<h1>AgentClinic</h1>");
    expect(html).toContain("Specialized relief, cooldowns, and triage for exhausted AI agents");
    expect(html).toContain("Status: Operational — Accepting Distressed Agents");
    expect(html).toContain('href="/health"');
  });
});

describe("GET /static/style.css", () => {
  it("returns HTTP 200 with stylesheet content", async () => {
    const res = await app.request("/static/style.css");
    expect(res.status).toBe(200);
    const css = await res.text();
    expect(css).toContain("box-sizing");
    expect(css).toContain("header");
    expect(css).toContain("footer");
  });
});
