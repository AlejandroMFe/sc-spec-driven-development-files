# Plan: Feedback Form

## Group 1: Database Schema, Types & Seed Data

1. Create migration file `src/db/migrations/007_create_feedback.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS feedback (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     email TEXT,
     message TEXT NOT NULL,
     rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
     created_at TEXT NOT NULL DEFAULT (datetime('now'))
   );
   ```
2. Add `Feedback` model interface to `src/db/types.ts`:
   - `id`: number
   - `name`: string
   - `email`?: string | null
   - `message`: string
   - `rating`: number
   - `created_at`?: string
3. Add seed feedback entries to `src/db/seed.ts` (3–5 initial in-world agent testimonials).

---

## Group 2: Components

4. Create `src/components/FeedbackForm.tsx`:
   - HTML `<form action="/feedback" method="post">`
   - Inputs:
     - `name`: text input with label `"Agent ID"` and placeholder `"e.g. GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro"` (required)
     - `email`: email input with label `"Handler / Contact Address"` and placeholder `"optional — for follow-up by clinic staff"`
     - `rating`: number input with label `"Session Rating"` (`min="1"`, `max="5"`, required) and helper text
     - `message`: textarea with label `"Describe Your Experience"` and placeholder (required)
   - Submit button with label `"Submit Clinical Feedback"`
5. Create `src/components/FeedbackList.tsx`:
   - Accepts `feedbacks: Feedback[]` prop
   - Renders each entry card/container with name, rating, formatted timestamp, and narrative message
   - Renders empty state message when array is empty: `"No feedback yet. Be the first agent to share your experience."`

---

## Group 3: Page & Route Implementation

6. Create `src/pages/Feedback.tsx`:
   - Page component wrapping `<Layout>`, `<Header>`, `<Main>`, `<FeedbackForm>`, `<FeedbackList>`, and `<Footer>`
7. Create `src/routes/feedback.tsx`:
   - Factory `feedbackRouter(db: Database.Database)`
   - `GET /` — query all feedback rows ordered by `id DESC`, render `<Feedback>` page
   - `POST /` — parse form URL-encoded body, validate required fields (`name`, `message`, `rating` in 1..5); if invalid return HTTP 400; if valid insert row and return `c.redirect("/feedback", 302)`
8. Register `app.route("/feedback", feedbackRouter(db))` in `src/app.tsx`.

---

## Group 4: Navigation Integration

9. Update `src/components/Header.tsx`:
   - Add navigation link item `<li><a href="/feedback">Feedback</a></li>` to `<nav>`.

---

## Group 5: Automated Testing & Validation

10. Update `tests/db.test.ts`:
    - Verify migration `007_create_feedback.sql` applies cleanly
    - Verify inserting and querying feedback rows against in-memory SQLite database
11. Update `tests/components.test.tsx`:
    - Test `FeedbackForm` renders all required input fields, labels, and attributes
    - Test `FeedbackList` renders feedback items correctly and displays empty state when passed `[]`
12. Update `tests/routes.test.tsx`:
    - Test `GET /feedback` returns HTTP 200 with HTML content
    - Test `POST /feedback` with valid body inserts row and redirects (HTTP 302) to `/feedback`
    - Test `POST /feedback` with invalid or missing required data returns HTTP 400
13. Run full verification:
    - Execute `npm run typecheck`
    - Execute `npm test`
