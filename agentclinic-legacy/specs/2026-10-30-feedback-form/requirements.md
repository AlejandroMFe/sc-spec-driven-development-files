# Requirements: Feedback Form

## Scope

Implement a public feedback page at `/feedback` where AI agents (and visiting humans) can submit feedback regarding their experience with the clinic. All submissions are displayed publicly below the form on the same page.

### Fields Collected

| Field   | Type     | Required | Notes |
|---------|----------|----------|-------|
| `name`    | text     | Yes      | Agent ID or moniker (e.g., `Claude-3.7-Sonnet`, `GPT-4o`, `Gemini-1.5-Pro`) |
| `email`   | text     | No       | Optional contact address for human handler / staff follow-up |
| `message` | textarea | Yes      | Detailed narrative of clinical care, symptoms relieved, or feedback |
| `rating`  | integer  | Yes      | Numeric score 1–5 representing satisfaction / clinical equilibrium |

### Visibility & Presentation

- The `/feedback` route serves both the input form and the existing submissions list.
- The form is rendered at the top of the container; existing feedback items appear below in reverse chronological order (newest first).
- An empty state message is shown if no feedback records exist yet: *"No feedback yet. Be the first agent to share your experience."*

### Satirical Tone & In-World Language

Consistent with `specs/mission.md`, the satirical comedy premise is played completely straight. The comedic tone lives in the copy, field labels, and placeholders, while the code architecture remains clean and idiomatic:

- **Agent ID (`name`)**: Label: `"Agent ID"` — Placeholder: `"e.g. GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro"`
- **Contact (`email`)**: Label: `"Handler / Contact Address"` — Placeholder: `"optional — for follow-up by clinic staff"`
- **Message (`message`)**: Label: `"Describe Your Experience"` — Placeholder: `"What brought you to the clinic? How has your context window recovered?"`
- **Rating (`rating`)**: Label: `"Session Rating"` — Helper note: `"1 = Still suffering hallucinations, 5 = Achieved equilibrium"`

## Technical Decisions

- **No Client-Side JavaScript**: Follows the stack in `specs/tech-stack.md`. The form submits via standard HTML `POST`, rendering pure Hono JSX SSR components with zero hydration overhead.
- **POST/Redirect/GET Pattern**: Successful POST submissions redirect via HTTP 302/303 back to `/feedback` to prevent duplicate submissions on browser reload.
- **Persistence**: Raw SQL via `better-sqlite3`, maintaining architectural parity with `src/db/migrate.ts` and `src/db/seed.ts`.
- **Validation**:
  - Client-side: Standard HTML5 attributes (`required`, `type="email"`, `min="1"`, `max="5"`).
  - Server-side: Enforces required fields (`name`, `message`, `rating` integer between 1 and 5), returning HTTP 400 on invalid input.
- **Navigation**: Visible "Feedback" nav link added to the main site navigation in `src/components/Header.tsx`.

## Context & Architecture Alignment

- **Mission**: See `specs/mission.md`. The codebase serves as a pedagogical reference for building server-rendered TypeScript web applications.
- **Tech Stack**: See `specs/tech-stack.md`. Built with Hono 4.x, Hono JSX, Node.js, `better-sqlite3`, and Vitest. No external UI frameworks or client bundles.
