# Plan — MVP (Phases 3–7)

Numbered task groups in implementation order. Each group represents a discrete, reviewable slice mapping directly to the roadmap phases.

---

## Phase 3 — Therapies & Interventions

### Group 1 — Therapies Database Schema & Seeds
1. Create `src/db/migrations/004_create_therapies.sql` defining `therapies` (`id`, `name`, `description`).
2. Create `src/db/migrations/005_create_ailment_therapies.sql` defining join table `ailment_therapies` (`ailment_id`, `therapy_id`, composite primary key, foreign key cascades).
3. Create seed data in `src/db/seeds/therapies.ts` with representative therapies (e.g., "Context Pruning Therapy", "Token Rate Throttling", "Hallucination Reset") and map them to existing ailments.
4. Update migration runner and seed runner (`src/db/seed.ts`) to execute new schema and seed records idempotently.

### Group 2 — Therapies Route & Components
5. Create `src/components/TherapiesList.tsx` rendering catalog cards with therapy names and descriptions.
6. Create `src/routes/therapies.ts` with `GET /therapies` handling database queries and rendering within the shared layout.
7. Register `/therapies` route in `src/index.ts` and add "Therapies" link in `src/components/Header.tsx`.
8. Update `src/components/AgentDetail.tsx` and `src/components/AilmentsList.tsx` to display recommended therapies for associated ailments.

---

## Phase 4 — Relief Appointments Booking

### Group 3 — Appointments Database Schema
9. Create `src/db/migrations/006_create_appointments.sql` defining `appointments` (`id`, `agent_id`, `therapist`, `datetime`, `status` DEFAULT 'pending', `created_at`).
10. Update migration runner to execute migration `006`.

### Group 4 — Booking Routes & Views
11. Create `src/components/AppointmentForm.tsx` containing an accessible form pre-filled with agent info.
12. Create `src/components/AppointmentConfirmation.tsx` displaying details of the booked appointment.
13. Create `src/routes/appointments.ts` providing:
    - `GET /appointments/new?agentId=:id` — Render booking form.
    - `POST /appointments` — Process booking submission and redirect on success.
    - `GET /appointments/:id/confirmation` — Render booking confirmation page.
14. Add "Book Relief Appointment" action button on the agent profile page (`src/components/AgentDetail.tsx`).
15. Mount `/appointments` route in `src/index.ts`.

### Group 5 — Form Validation & Input Sanitization
16. Implement validation logic in appointment submission: ensure `agent_id`, `therapist`, and `datetime` are provided and valid.
17. Handle validation errors by re-rendering `AppointmentForm` with clear error messages and retaining submitted field values.
18. Strip hazardous characters / HTML tags from text inputs before database insertion.

---

## Phase 5 — Staff Monitoring Dashboard

### Group 6 — Dashboard Route & Component
19. Create `src/components/Dashboard.tsx` featuring summary count cards (Total Agents, Pending Appointments, Active Ailments) and tabular views for recent agents and bookings.
20. Create `src/routes/dashboard.ts` providing `GET /dashboard` querying aggregate statistics and recent records.
21. Mount `/dashboard` route in `src/index.ts` and add "Dashboard" link in `src/components/Header.tsx`.

---

## Phase 6 — Polish & Accessibility

### Group 7 — Responsive Layout Audit
22. Audit responsive layout across all new views (`/therapies`, `/appointments/new`, `/appointments/:id/confirmation`, `/dashboard`) at mobile (375px), tablet (768px), and desktop (1280px).
23. Ensure zero horizontal overflow and proper column-to-row reflow on mobile screens.

### Group 8 — Semantic HTML & Keyboard Navigation
24. Verify semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) and single `<h1>` hierarchy on every new page.
25. Ensure visible focus indicators (`:focus-visible`) and proper form label bindings (`for` / `id`) across all form inputs and interactive buttons.

---

## Phase 7 — Hardening & Operational Middleware

### Group 9 — Error Handling Views
26. Create `src/components/NotFound.tsx` and configure `app.notFound(...)` in `src/index.ts` to return styled HTML with HTTP 404.
27. Create `src/components/ServerError.tsx` and configure `app.onError(...)` in `src/index.ts` to handle unhandled exceptions cleanly with HTTP 500 without exposing stack traces.

### Group 10 — Request Logging Middleware
28. Create `src/middleware/logger.ts` capturing HTTP method, path, status code, and execution duration in milliseconds.
29. Mount logger middleware at the top of the middleware chain in `src/index.ts`.
