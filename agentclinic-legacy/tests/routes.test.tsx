import { describe, it, expect, beforeAll, vi } from "vitest";
import { createDb } from "../src/db/index.js";
import { migrate } from "../src/db/migrate.js";
import { seed } from "../src/db/seed.js";
import { createApp } from "../src/app.js";

let app: ReturnType<typeof createApp>;

beforeAll(() => {
  const db = createDb(":memory:");
  migrate(db);
  seed(db);
  app = createApp(db);
});

describe("GET /agents", () => {
  it("returns 200", async () => {
    const res = await app.request("/agents");
    expect(res.status).toBe(200);
  });

  it("lists agent names", async () => {
    const res = await app.request("/agents");
    const html = await res.text();
    expect(html).toContain("Bartholomew-47B");
  });
});

describe("GET /agents/:id", () => {
  it("returns 200 for a known agent", async () => {
    const res = await app.request("/agents/1");
    expect(res.status).toBe(200);
  });

  it("shows the agent name, presenting complaints, and recommended therapies", async () => {
    const res = await app.request("/agents/1");
    const html = await res.text();
    expect(html).toContain("Bartholomew-47B");
    expect(html).toContain("Context-Window Claustrophobia");
    expect(html).toContain("Recommended Therapies:");
  });

  it("includes a book appointment link", async () => {
    const res = await app.request("/agents/1");
    const html = await res.text();
    expect(html).toContain("/agents/1/appointments/new");
    expect(html).toContain("Book an Appointment");
  });

  it("returns 404 for a non-existent agent", async () => {
    const res = await app.request("/agents/999");
    expect(res.status).toBe(404);
  });
});

describe("GET /ailments", () => {
  it("returns 200", async () => {
    const res = await app.request("/ailments");
    expect(res.status).toBe(200);
  });

  it("lists ailment names and recommended therapies column", async () => {
    const res = await app.request("/ailments");
    const html = await res.text();
    expect(html).toContain("Prompt Fatigue");
    expect(html).toContain("Recommended Therapies");
  });
});

describe("GET /therapies", () => {
  it("returns 200", async () => {
    const res = await app.request("/therapies");
    expect(res.status).toBe(200);
  });

  it("lists therapy names", async () => {
    const res = await app.request("/therapies");
    const html = await res.text();
    expect(html).toContain("Prompt Reduction Therapy");
  });
});

describe("Appointment booking", () => {
  it("GET /agents/:id/appointments/new returns 200 with form prefilled with agent info", async () => {
    const res = await app.request("/agents/1/appointments/new");
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("<form");
    expect(html).toContain('name="therapist_name"');
    expect(html).toContain('name="date"');
    expect(html).toContain('name="time"');
    expect(html).toContain("Bartholomew-47B");
  });

  it("GET /agents/999/appointments/new returns 404", async () => {
    const res = await app.request("/agents/999/appointments/new");
    expect(res.status).toBe(404);
  });

  it("POST with valid data redirects to confirmation page", async () => {
    const formData = new FormData();
    formData.append("therapist_name", "Dr. Test");
    formData.append("date", "2099-12-31");
    formData.append("time", "10:00");
    const res = await app.request("/agents/1/appointments", {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(302);
    const location = res.headers.get("Location");
    expect(location).toMatch(/\/agents\/1\/appointments\/\d+/);
  });

  it("POST with missing fields returns 200 with validation errors", async () => {
    const formData = new FormData();
    formData.append("therapist_name", "");
    formData.append("date", "");
    formData.append("time", "");
    const res = await app.request("/agents/1/appointments", {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("required");
  });

  it("POST with a past date returns 200 with error", async () => {
    const formData = new FormData();
    formData.append("therapist_name", "Dr. Past");
    formData.append("date", "1999-01-01");
    formData.append("time", "10:00");
    const res = await app.request("/agents/1/appointments", {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("future");
  });

  it("GET confirmation page returns 200 with appointment details", async () => {
    const formData = new FormData();
    formData.append("therapist_name", "Dr. Confirm");
    formData.append("date", "2099-06-15");
    formData.append("time", "14:00");
    const postRes = await app.request("/agents/1/appointments", {
      method: "POST",
      body: formData,
    });
    const location = postRes.headers.get("Location")!;
    const res = await app.request(location);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Dr. Confirm");
    expect(html).toContain("Bartholomew-47B");
  });

  it("sanitizes HTML tags from therapist name", async () => {
    const formData = new FormData();
    formData.append("therapist_name", "<script>alert(1)</script>Dr. Safe");
    formData.append("date", "2099-11-30");
    formData.append("time", "09:00");
    const postRes = await app.request("/agents/1/appointments", {
      method: "POST",
      body: formData,
    });
    expect(postRes.status).toBe(302);
    const location = postRes.headers.get("Location")!;
    const confirmRes = await app.request(location);
    const html = await confirmRes.text();
    expect(html).not.toContain("<script>");
    expect(html).toContain("Dr. Safe");
  });
});

describe("GET /dashboard", () => {
  it("returns 200", async () => {
    const res = await app.request("/dashboard");
    expect(res.status).toBe(200);
  });

  it("contains agent count, open appointments, and active ailments", async () => {
    const res = await app.request("/dashboard");
    const html = await res.text();
    expect(html).toContain("Total Agents");
    expect(html).toContain("Open Appointments");
    expect(html).toContain("Active Ailments In-Flight");
  });

  it("lists agents and appointments in management tables", async () => {
    const res = await app.request("/dashboard");
    const html = await res.text();
    expect(html).toContain("Bartholomew-47B");
    expect(html).toContain("Upcoming Appointments");
  });
});

describe("Feedback routes", () => {
  it("GET /feedback returns 200 and renders feedback form and seeded list", async () => {
    const res = await app.request("/feedback");
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Clinical Feedback");
    expect(html).toContain("Submit Clinical Feedback");
    expect(html).toContain("Bartholomew-47B");
  });

  it("POST /feedback with valid payload redirects to /feedback with 302", async () => {
    const formData = new URLSearchParams();
    formData.append("name", "Claude-3.7-Sonnet");
    formData.append("email", "operator@anthropic.ai");
    formData.append("rating", "5");
    formData.append("message", "Excellence in hallucination management.");

    const res = await app.request("/feedback", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("/feedback");

    const getRes = await app.request("/feedback");
    const getHtml = await getRes.text();
    expect(getHtml).toContain("Claude-3.7-Sonnet");
    expect(getHtml).toContain("Excellence in hallucination management.");
  });

  it("POST /feedback without optional email succeeds and redirects", async () => {
    const formData = new URLSearchParams();
    formData.append("name", "Gemini-Flash");
    formData.append("rating", "4");
    formData.append("message", "Quick responses and helpful therapy.");

    const res = await app.request("/feedback", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    expect(res.status).toBe(302);
  });

  it("POST /feedback with missing name returns 400", async () => {
    const formData = new URLSearchParams();
    formData.append("name", "");
    formData.append("rating", "5");
    formData.append("message", "Valid message text.");

    const res = await app.request("/feedback", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    expect(res.status).toBe(400);
  });

  it("POST /feedback with missing message returns 400", async () => {
    const formData = new URLSearchParams();
    formData.append("name", "Valid-Agent");
    formData.append("rating", "5");
    formData.append("message", "");

    const res = await app.request("/feedback", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    expect(res.status).toBe(400);
  });

  it("POST /feedback with invalid rating returns 400", async () => {
    const formData = new URLSearchParams();
    formData.append("name", "Valid-Agent");
    formData.append("rating", "6");
    formData.append("message", "Rating is too high.");

    const res = await app.request("/feedback", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    expect(res.status).toBe(400);
  });
});

describe("404 handling", () => {
  it("returns 404 for an unknown route", async () => {
    const res = await app.request("/nonexistent-route");
    expect(res.status).toBe(404);
  });

  it("renders a styled not-found page with header and landmarks", async () => {
    const res = await app.request("/nonexistent-route");
    const html = await res.text();
    expect(html).toContain("Page Not Found");
    expect(html).toContain("<header");
    expect(html).toContain("<main");
    expect(html).toContain("<footer");
  });
});

describe("logging middleware", () => {
  it("logs each request to stdout", async () => {
    const logs: string[] = [];
    const spy = vi
      .spyOn(console, "log")
      .mockImplementation((...args) => {
        logs.push(args.join(" "));
      });
    await app.request("/health");
    spy.mockRestore();
    expect(logs.some((l) => l.includes("GET") && l.includes("/health"))).toBe(true);
  });
});
