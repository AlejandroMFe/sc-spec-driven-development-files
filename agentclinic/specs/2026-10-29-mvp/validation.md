# Validation — MVP (Phases 3–7)

The MVP implementation is deemed complete and ready to merge into `main` when all three verification tiers pass.

---

## Tier 1: Clean TypeScript Compilation

Execute strict TypeScript compiler check without emitting build artifacts:

```bash
npx tsc --noEmit
```

**Success Criteria**:
- Process exits with code `0`.
- Zero compiler errors or warnings.
- Explicit TypeScript props used across all components.

---

## Tier 2: Automated Vitest Test Suite

Execute the full automated test suite using in-memory database fixtures:

```bash
npm test
```

**Required Coverage by Phase**:

### Phase 3 — Therapies & Interventions
- `therapies` and `ailment_therapies` tables exist and migrations apply cleanly.
- Running seed idempotently produces ≥ 5 therapies without creating duplicate records.
- `GET /therapies` returns HTTP 200 with HTML containing therapy titles and descriptions.
- `GET /agents/:id` displays recommended therapies for the agent's associated ailments.

### Phase 4 — Relief Appointments Booking
- `appointments` table exists and foreign key constraints enforce valid agent IDs.
- `GET /appointments/new?agentId=:id` returns HTTP 200 with form containing pre-filled agent identifier.
- `POST /appointments` with valid payload creates appointment and returns HTTP 302 redirecting to confirmation.
- `POST /appointments` with missing required fields returns HTTP 400 with user-friendly error message.
- `GET /appointments/:id/confirmation` returns HTTP 200 displaying confirmed appointment details.
- `GET /agents/:id` includes a visible "Book Relief Appointment" link/button.

### Phase 5 — Staff Monitoring Dashboard
- `GET /dashboard` returns HTTP 200.
- Dashboard response renders summary statistics for active agents, open appointments, and diagnosed ailments.
- Recent appointments and agents are listed in tabular format.

### Phase 6 — Accessibility & Semantic HTML
- All route responses render `<header>`, `<nav>`, `<main>`, and `<footer>` landmark elements.
- Each page renders exactly one `<h1>` heading.
- All form inputs in `AppointmentForm` have corresponding `<label>` associations.

### Phase 7 — Hardening & Middleware
- Unmatched routes (e.g., `GET /unknown-route`) return HTTP 404 with styled HTML view.
- Server errors return HTTP 500 with styled fallback message without stack trace exposure.
- Logger middleware logs request method, path, status, and duration to standard output.

---

## Tier 3: Manual Smoke Test Checklist

Start development server (`npm run dev`) and verify interactively in a browser:

### Phase 3 — Therapies
- [ ] Navigate to `/therapies` via header navigation. Verify all therapies are listed with title and description.
- [ ] View an agent profile (`/agents/1`). Verify recommended therapies display under diagnosed ailments.

### Phase 4 — Appointment Booking
- [ ] Click "Book Relief Appointment" from an agent profile.
- [ ] Verify agent ID / name is pre-populated in the form.
- [ ] Submit empty form; verify validation error appears with input values preserved.
- [ ] Enter valid therapist name and appointment date/time; submit form.
- [ ] Verify redirection to confirmation page showing accurate booking summary.

### Phase 5 — Dashboard
- [ ] Navigate to `/dashboard` via header navigation.
- [ ] Verify aggregate metric cards reflect actual database counts.
- [ ] Verify recent appointment and agent tables are populated and styled cleanly.

### Phase 6 — Responsive & A11y
- [ ] Test `/therapies`, `/dashboard`, and `/appointments/new` at 375px viewport width: ensure no horizontal overflow and readable text flow.
- [ ] Verify keyboard tab navigation works through the booking form with visible focus rings on all interactive elements.

### Phase 7 — Hardening
- [ ] Navigate to `http://localhost:3000/does-not-exist` and verify styled 404 page.
- [ ] Inspect console output to verify log lines format (`METHOD /path STATUS - TIMEms`).
- [ ] Submit form with `<script>` tags in text field and confirm characters are sanitized safely.
