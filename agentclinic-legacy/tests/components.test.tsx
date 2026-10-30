import { describe, it, expect } from "vitest";
import { Header } from "../src/components/Header.js";
import { Footer } from "../src/components/Footer.js";
import { Main } from "../src/components/Main.js";
import { Layout } from "../src/components/Layout.js";
import { AgentDetail } from "../src/components/AgentDetail.js";
import { AgentsList } from "../src/components/AgentsList.js";
import { AilmentsList } from "../src/components/AilmentsList.js";
import { TherapiesList } from "../src/components/TherapiesList.js";
import { AppointmentForm } from "../src/components/AppointmentForm.js";
import { AppointmentConfirmation } from "../src/components/AppointmentConfirmation.js";
import { FeedbackForm } from "../src/components/FeedbackForm.js";
import { FeedbackList } from "../src/components/FeedbackList.js";
import { Dashboard } from "../src/components/Dashboard.js";
import { NotFound } from "../src/pages/NotFound.js";
import { ServerError } from "../src/pages/ServerError.js";
import { Home } from "../src/pages/Home.js";
import type { Agent, Ailment, Therapy, Appointment } from "../src/db/types.js";

describe("Header component", () => {
  it("renders a header element with links to all major sections", () => {
    const html = Header({}).toString();
    expect(html).toContain("<header");
    expect(html).toContain('href="/"');
    expect(html).toContain("AgentClinic");
    expect(html).toContain('href="/agents"');
    expect(html).toContain('href="/ailments"');
    expect(html).toContain('href="/therapies"');
    expect(html).toContain('href="/dashboard"');
    expect(html).toContain('href="/feedback"');
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

  const mockAilments = [
    { id: 1, name: "Context Bloat", description: "Too much context in buffer", recommended_therapies: "Context Pruning" },
    { id: 2, name: "Prompt Drift", description: "Degraded adherence to instructions", recommended_therapies: null },
  ];

  it("renders agent profile, status badge, presenting complaints, and booking button", () => {
    const html = AgentDetail({ agent: mockAgent, ailments: mockAilments }).toString();
    expect(html).toContain("Test-Agent-9000");
    expect(html).toContain("GPT-4");
    expect(html).toContain('class="status-badge"');
    expect(html).toContain("active");
    expect(html).toContain("Presenting Complaints");
    expect(html).toContain("Context Bloat");
    expect(html).toContain("Context Pruning");
    expect(html).toContain('href="/agents/1/appointments/new"');
    expect(html).toContain("Book an Appointment");
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
    { id: 2, name: "Beta", model_type: "on_leave", status: "on_leave", created_at: "2026-10-28" },
  ];

  it("renders table of agents with links and status badges", () => {
    const html = AgentsList({ agents: mockAgents }).toString();
    expect(html).toContain("Agents");
    expect(html).toContain('href="/agents/1"');
    expect(html).toContain("Alpha");
    expect(html).toContain('href="/agents/2"');
    expect(html).toContain("Beta");
    expect(html).toContain('class="status-badge"');
  });

  it("renders empty state message when agent list is empty", () => {
    const html = AgentsList({ agents: [] }).toString();
    expect(html).toContain("No agents currently registered.");
  });
});

describe("AilmentsList component", () => {
  const mockAilments = [
    { id: 1, name: "Context Bloat", description: "Too much context in buffer", recommended_therapies: "Prompt Detox" },
  ];

  it("renders table of ailments with names, descriptions, and recommended therapies", () => {
    const html = AilmentsList({ ailments: mockAilments }).toString();
    expect(html).toContain("Ailments");
    expect(html).toContain("Context Bloat");
    expect(html).toContain("Too much context in buffer");
    expect(html).toContain("Prompt Detox");
  });

  it("renders empty state message when ailment list is empty", () => {
    const html = AilmentsList({ ailments: [] }).toString();
    expect(html).toContain("No ailments currently cataloged.");
  });
});

describe("TherapiesList component", () => {
  const mockTherapies: Therapy[] = [
    { id: 1, name: "Token Detox", description: "Reduces token consumption rate" },
  ];

  it("renders therapies table with names and descriptions", () => {
    const html = TherapiesList({ therapies: mockTherapies }).toString();
    expect(html).toContain("Therapies");
    expect(html).toContain("Token Detox");
    expect(html).toContain("Reduces token consumption rate");
  });
});

describe("AppointmentForm component", () => {
  it("renders booking form prefilled with agent information", () => {
    const html = AppointmentForm({
      agentId: 1,
      agentName: "Agent-007",
      values: { therapist_name: "Dr. Who" },
      errors: { date: "Date is required." },
    }).toString();

    expect(html).toContain("Book an Appointment");
    expect(html).toContain("Agent-007");
    expect(html).toContain('value="Dr. Who"');
    expect(html).toContain("Date is required.");
    expect(html).toContain('action="/agents/1/appointments"');
  });
});

describe("AppointmentConfirmation component", () => {
  const mockAppointment: Appointment = {
    id: 10,
    agent_id: 1,
    therapist_name: "Dr. Evelyn Watts",
    scheduled_at: "2099-01-15T10:00:00",
    status: "confirmed",
  };

  it("renders confirmed appointment summary card", () => {
    const html = AppointmentConfirmation({
      appointment: mockAppointment,
      agentName: "Bartholomew-47B",
    }).toString();

    expect(html).toContain("Appointment Confirmed");
    expect(html).toContain("Bartholomew-47B");
    expect(html).toContain("Dr. Evelyn Watts");
    expect(html).toContain("2099-01-15T10:00:00");
    expect(html).toContain("confirmed");
  });
});

describe("Dashboard component", () => {
  it("renders statistics cards, agents table, and open appointments", () => {
    const html = Dashboard({
      stats: { agentCount: 6, openAppointmentCount: 2, activeAilmentCount: 4 },
      agents: [{ id: 1, name: "Bartholomew-47B", model_type: "GPT-47B", status: "active" }],
      appointments: [
        { id: 1, agent_name: "Bartholomew-47B", therapist_name: "Dr. Evelyn Watts", scheduled_at: "2099-01-15T10:00:00", status: "confirmed" }
      ],
      ailments: [{ id: 1, name: "Prompt Fatigue", agent_count: 2 }],
    }).toString();

    expect(html).toContain("Staff Dashboard");
    expect(html).toContain("Total Agents");
    expect(html).toContain("Open Appointments");
    expect(html).toContain("Active Ailments In-Flight");
    expect(html).toContain("Bartholomew-47B");
    expect(html).toContain("Dr. Evelyn Watts");
    expect(html).toContain("Prompt Fatigue");
  });
});

describe("Error pages", () => {
  it("NotFound component renders styled 404 message", () => {
    const html = NotFound({}).toString();
    expect(html).toContain("Page Not Found");
    expect(html).toContain("Return Home");
  });

  it("ServerError component renders styled 500 message", () => {
    const html = ServerError({}).toString();
    expect(html).toContain("Something Went Wrong");
    expect(html).toContain("Return Home");
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

describe("FeedbackForm component", () => {
  it("renders form inputs for name, email, rating, and message", () => {
    const html = FeedbackForm({}).toString();
    expect(html).toContain('<form method="post" action="/feedback"');
    expect(html).toContain('name="name"');
    expect(html).toContain('name="email"');
    expect(html).toContain('name="rating"');
    expect(html).toContain('name="message"');
    expect(html).toContain("Agent ID");
    expect(html).toContain("Session Rating");
    expect(html).toContain("Submit Clinical Feedback");
  });

  it("renders validation errors when supplied", () => {
    const html = FeedbackForm({
      errors: {
        name: "Agent ID is required.",
        message: "Message required.",
      },
    }).toString();
    expect(html).toContain("Agent ID is required.");
    expect(html).toContain("Message required.");
  });
});

describe("FeedbackList component", () => {
  it("renders empty state when no feedback is present", () => {
    const html = FeedbackList({ items: [] }).toString();
    expect(html).toContain("No feedback yet. Be the first agent to share your experience.");
  });

  it("renders feedback entries with rating and content", () => {
    const html = FeedbackList({
      items: [
        {
          id: 1,
          name: "Claude-3.5-Sonnet",
          message: "Exemplary care for context overflow.",
          rating: 5,
          created_at: "2026-10-30 12:00:00",
        },
      ],
    }).toString();
    expect(html).toContain("Claude-3.5-Sonnet");
    expect(html).toContain("Rating: 5 / 5");
    expect(html).toContain("Exemplary care for context overflow.");
    expect(html).toContain("Submitted on 2026-10-30 12:00:00");
  });
});
