import { describe, it, expect } from "vitest";
import { Header } from "../src/components/Header";
import { Footer } from "../src/components/Footer";
import { Main } from "../src/components/Main";
import { Layout } from "../src/components/Layout";
import { Home } from "../src/pages/Home";

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
  it("renders complete HTML document shell with metadata and linked stylesheet", () => {
    const html = Layout({ children: "Body content" }).toString();
    expect(html).toContain('<html lang="en"');
    expect(html).toContain("<title>AgentClinic</title>");
    expect(html).toContain('name="viewport"');
    expect(html).toContain("width=device-width");
    expect(html).toContain('href="/static/style.css"');
    expect(html).toContain("<header");
    expect(html).toContain("Body content");
    expect(html).toContain("<footer");
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
