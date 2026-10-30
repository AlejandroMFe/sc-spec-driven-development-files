# Validation: Feedback Form

The Feedback Form feature implementation is considered complete, validated, and ready to merge into `main` when all automated and manual criteria below are satisfied.

---

## 1. Automated Verification Gates

- [ ] **Type Safety**: `npm run typecheck` (`tsc --noEmit`) passes with 0 errors.
- [ ] **Test Suite**: `npm test` (`vitest run --passWithNoTests`) passes with 100% success across all test suites.
- [ ] **Production Build**: `npm run build` compiles cleanly to `dist/` and runs migration copy scripts without error.

### Required Test Assertions

#### Database Layer (`tests/db.test.ts`)
- [ ] Migration `007_create_feedback.sql` executes and creates `feedback` table schema.
- [ ] Inserting a feedback record persists `name`, `email`, `message`, `rating`, and auto-generates `id` and `created_at`.
- [ ] Querying feedback returns records ordered by reverse chronological order.

#### UI Components (`tests/components.test.tsx`)
- [ ] `FeedbackForm` renders form element targeting `POST /feedback` with all four inputs (`name`, `email`, `rating`, `message`).
- [ ] Form attributes contain HTML5 validation markers (`required`, `min="1"`, `max="5"`).
- [ ] `FeedbackList` correctly renders a list of items showing author name, rating, message, and date.
- [ ] `FeedbackList` correctly renders the in-world empty state when provided an empty list:
  `"No feedback yet. Be the first agent to share your experience."`

#### HTTP Route Integration (`tests/routes.test.tsx`)
- [ ] `GET /feedback` returns HTTP status 200 and renders the feedback form and list container.
- [ ] `POST /feedback` with valid payload (`name`, `message`, `rating`) returns HTTP 302/303 redirect to `/feedback` and persists the new entry.
- [ ] `POST /feedback` handles optional `email` field correctly whether present or omitted.
- [ ] `POST /feedback` with missing `name` returns HTTP 400.
- [ ] `POST /feedback` with missing `message` returns HTTP 400.
- [ ] `POST /feedback` with out-of-bounds `rating` (< 1 or > 5) returns HTTP 400.

---

## 2. Manual Smoke & Behavioral Checklist

- [ ] **Visual Layout**: Navigating to `/feedback` renders the clean layout matching the clinic theme.
- [ ] **POST-Redirect-GET**: Submitting a feedback entry redirects back to `/feedback` and does not prompt a browser re-submission alert upon page refresh.
- [ ] **Navigation**: "Feedback" link is present in the main header and highlights or navigates to `/feedback`.
- [ ] **Tone Compliance**: Form field labels and placeholders strictly follow the straight-faced satirical tone defined in `specs/mission.md` without leaking out-of-character text into layout structure.

---

## 3. Definition of Done (DoD)

1. All tasks in `plan.md` are completed.
2. All automated tests in Vitest pass without warnings or failures.
3. Clean TypeScript compilation with zero type errors.
4. Git branch `feedback-form` is up to date, contains cleanly organized commits, and is ready for changelog update and merge.
