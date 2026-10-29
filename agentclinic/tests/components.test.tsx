import { describe, it, expect } from "vitest";
import { Header } from "../src/components/Header.js";
import { Footer } from "../src/components/Footer.js";
import { Main } from "../src/components/Main.js";
import { Layout } from "../src/components/Layout.js";
import { AgentDetail } from "../src/components/AgentDetail.js";
import { AgentsList } from "../src/components/AgentsList.js";
import { AilmentsList } from "../src/components/AilmentsList.js";
import { Home } from "../src/pages/Home.js";
import type { Agent, Ailment } from "../src/db/types.js";

describe("Header component", () => {
  it("renders a header element with link to home", () => {
    const html = Header({}).toString();
    expect(html).toContain("<header");
    expect(html).toContain('href="/"');
    expect(html).toContain("AgentClinic");
  });
});

describe("Footer component", () => {
  it("renders a footer element with current year and brand name", () => {
    const html = Footer({}).toString();
    expect(html).toContain("<footer");
    expect(html).toContain(String(new Date().getFullYear()));
    expect(html).toContain("AgentClinic");
  });
});

describe("Main component", () => {
  it("renders main container with nested children", () => {
    const html = Main({ children: "Triage content" }).toString();
    expect(html).toContain("<main");
    expect(html).toContain("Triage content");
  });
});

describe("Layout component", () => {
  it("renders complete HTML document shell with doctype, metadata and linked stylesheet", () => {
    const html = Layout({ children: "Body content" }).toString();
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain('<html lang="en"');
    expect(html).toContain("<title>AgentClinic</title>");
    expect(html).toContain('name="viewport"');
    expect(html).toContain("width=device-width");
    expect(html).toContain('href="/static/style.css"');
    expect(html).toContain("<header");
    expect(html).toContain("Body content");
    expect(html).toContain("<footer");
  });

  it("supports dynamic title override", () => {
    const html = Layout({ title: "Custom Title", children: "Content" }).toString();
    expect(html).toContain("<title>Custom Title</title>");
  });
});

describe("AgentDetail component", () => {
  const mockAgent: Agent = {
    id: 1,
    name: "Test-Agent-9000",
    model_type: "GPT-4",
    status: "active",
    created_at: "2026-10-28 12:00:00",
  };

  const mockAilments: Ailment[] = [
    { id: 1, name: "Context Bloat", description: "Too much context in buffer" },
    { id: 2, name: "Prompt Drift", description: "Degraded adherence to instructions" },
  ];

  it("renders agent profile, status badge, and presenting complaints list", () => {
    const html = AgentDetail({ agent: mockAgent, ailments: mockAilments }).toString();
    expect(html).toContain("Test-Agent-9000");
    expect(html).toContain("GPT-4");
    expect(html).toContain('class="status-badge"');
    expect(html).toContain("active");
    expect(html).toContain("Presenting Complaints");
    expect(html).toContain("Context Bloat");
    expect(html).toContain("Prompt Drift");
    expect(html).toContain('href="/agents"');
  });

  it("renders friendly empty state when agent has no presenting complaints", () => {
    const html = AgentDetail({ agent: mockAgent, ailments: [] }).toString();
    expect(html).toContain("No presenting complaints recorded. All systems nominal.");
  });
});

describe("AgentsList component", () => {
  const mockAgents: Agent[] = [
    { id: 1, name: "Alpha", model_type: "M1", status: "active", created_at: "2026-10-28" },
    { id: 2, name: "Beta", model_type: "M2", status: "on_leave", created_at: "2026-10-28" },
  ];

  it("renders table of agents with links and status badges", () => {
    const html = AgentsList({ agents: mockAgents }).toString();
    expect(html).toContain("Agents");
    expect(html).toContain('href="/agents/1"');
    expect(html).toContain("Alpha");
    expect(html).toContain('href="/agents/2"');
    expect(html).toContain("Beta");
    expect(html).toContain('class="status-badge"');
    expect(html).toContain("on leave");
  });

  it("renders empty state message when agent list is empty", () => {
    const html = AgentsList({ agents: [] }).toString();
    expect(html).toContain("No agents currently registered.");
  });
});

describe("AilmentsList component", () => {
  const mockAilments: Ailment[] = [
    { id: 1, name: "Context Bloat", description: "Too much context in buffer" },
  ];

  it("renders table of ailments with names and descriptions", () => {
    const html = AilmentsList({ ailments: mockAilments }).toString();
    expect(html).toContain("Ailments");
    expect(html).toContain("Context Bloat");
    expect(html).toContain("Too much context in buffer");
  });

  it("renders empty state message when ailment list is empty", () => {
    const html = AilmentsList({ ailments: [] }).toString();
    expect(html).toContain("No ailments currently cataloged.");
  });
});

describe("Home page component", () => {
  it("renders hero section with title, tagline, and operational badge", () => {
    const html = Home().toString();
    expect(html).toContain("<h1>AgentClinic</h1>");
    expect(html).toContain("Specialized relief, cooldowns, and triage for exhausted AI agents");
    expect(html).toContain("Status: Operational — Accepting Distressed Agents");
    expect(html).toContain('href="/health"');
    expect(html).toContain("About the Clinic");
  });
});
