# Requirements — MVP (Phases 3–7)

## Scope

The Minimum Viable Product (MVP) completes the core functionality of AgentClinic across Roadmap Phases 3 through 7. Building on top of the foundation established in Phase 1 (Scaffold & Hello Hono) and Phase 2 (Agents & Ailments), the MVP delivers a complete, operational platform for agent relief tracking, appointment scheduling, and staff monitoring.

## Phases Included

### Phase 3 — Therapies & Interventions
- **Data Model**: `therapies` table for relief treatments (e.g., prompt pruning, context compression, token throttling, memory cooldown).
- **Relational Mapping**: `ailment_therapies` join table linking ailments to recommended therapies (many-to-many).
- **Seed Data**: Realistic therapeutic interventions seeded idempotently.
- **Views & Routes**: `/therapies` catalog page detailing therapy procedures and descriptions. Ailment details and agent profiles surface recommended therapies.

### Phase 4 — Relief Appointments Booking
- **Data Model**: `appointments` table tracking scheduled relief sessions (`id`, `agent_id`, `therapist`, `datetime`, `status`, `created_at`).
- **Booking Flow**:
  - Direct booking link/button from agent detail page (`/agents/:id`).
  - Pre-filled booking form (`GET /appointments/new?agentId=:id`).
  - Form submission handler (`POST /appointments`) with server-side validation and sanitization.
  - Confirmation feedback view (`GET /appointments/:id/confirmation`).

### Phase 5 — Staff Monitoring Dashboard
- **Staff Oversight**: Dedicated `/dashboard` route fulfilling Mary's need for engineering oversight.
- **Aggregated Metrics**: Summary counts for total registered agents, open/pending appointments, and active ailments.
- **Operational Management**: Tabular views of recent agents and pending relief sessions.
- **Navigation**: Integrated header navigation link to `/dashboard`.

### Phase 6 — Polish & Accessibility
- **Mobile-First Responsive Layout**: Verify all pages (Phases 3–5) stack gracefully without horizontal scrolling at 375px up to 1280px+.
- **Semantic HTML & Structure**: Strict landmark roles (`<header>`, `<nav>`, `<main>`, `<footer>`) and logical heading hierarchies (`<h1>` -> `<h2>`).
- **Keyboard Navigation & A11y**: Visible focus rings for keyboard users, accessible form controls with associated `<label>` tags, high-contrast brand colors adhering to WCAG standards.

### Phase 7 — Hardening & Operational Middleware
- **Error Handling**: Custom styled server-side JSX views for 404 (Not Found via `app.notFound`) and 500 (Internal Server Error via `app.onError`).
- **Input Sanitization**: Defense against injection or malformed input on all form submissions.
- **Request Logging Middleware**: Lightweight Hono middleware logging method, path, HTTP status, and response duration to stdout.

## Decisions & Technical Constraints

- **Single Branch Delivery**: All MVP phases are developed and validated on the `mvp` branch using incremental, reviewable task groups.
- **Stack Consistency**: Built strictly using Hono server-side JSX, SQLite (`better-sqlite3`), and plain CSS with PicoCSS + custom property theming.
- **Brand Theme**: Adheres to the established brand palette (orange `#e65100` / `#f57c00` and black/charcoal `#121212`).
- **Explicit Types**: All JSX component props use explicit extracted TypeScript interfaces/types.
- **Zero ORM Overhead**: Schema updates managed via plain numbered SQL migrations in `src/db/migrations/`.
- **Database Safety**: Tests use an in-memory SQLite database (`:memory:`) or isolated test instances to avoid mutating physical database state.
- **Therapist Field**: Stored as a validated text string on `appointments` for the MVP scope (no separate therapists table required at this stage).

## Context & Stakeholders

- **Mary (Engineering Lead)**: Requires reliable metrics, clean architecture, strict TypeScript types, and zero silent failures.
- **Susan (Clinic Staff / Product)**: Needs a clear catalog of ailments and therapies, and smooth booking for relief sessions.
- **Steve (UX / Web)**: Requires responsive, accessible, mobile-first design with brand-consistent visual polish.

## Out of Scope

- User authentication, role-based authorization, or sessions.
- External notifications (email/SMS/webhooks).
- Dedicated therapist entity management or calendar sync.
- Docker containers or automated deployment infrastructure.
