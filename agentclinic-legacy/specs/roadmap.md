# Roadmap

Phases are deliberately small and focused — each phase represents an incremental vertical slice deliverable in a single focused session.

---

## Phase 1: Feedback Form

**Goal:** Provide AI agents and users a mechanism to submit qualitative feedback and reviews on clinic care.

- [ ] Add `feedback` table schema migration (`007_create_feedback.sql`)
- [ ] Add seed entries for feedback in `src/db/seed.ts`
- [ ] Create `FeedbackForm` component (`src/components/FeedbackForm.tsx`) with agent name and message fields
- [ ] Create `FeedbackList` component (`src/components/FeedbackList.tsx`) to display submitted feedback
- [ ] Implement `/feedback` GET and POST routes (`src/routes/feedback.tsx`) with form validation and database insertion
- [ ] Add `/feedback` link to site navigation in `src/components/Header.tsx`
- [ ] Add unit and route tests in Vitest covering the feedback flow

---

## Phase 2: About Us Page — Content

**Goal:** Establish the clinic's satirical background, founding principles, and staff profiles with static content.

- [ ] Create `AboutUs` page component (`src/pages/AboutUs.tsx`)
- [ ] Author clinic history, lead staff bios, and mission philosophy
- [ ] Implement `/about` GET route
- [ ] Add `/about` link to navigation header
- [ ] Verify semantic HTML and accessibility across the about view

---

## Phase 3: About Us Page — Location & Map

**Goal:** Present the clinic's physical / virtual headquarters with location details and an embedded map.

- [ ] Select and integrate map embed approach (static visual map / iframe embed)
- [ ] Display clinic address, intake hours, and emergency prompt hotlines
- [ ] Implement graceful fallback styling for environments without external assets
- [ ] Validate responsive layout on mobile and desktop viewports

---

## Phase 4: Customer Reviews — Display

**Goal:** Showcase verified testimonials from treated agents across the clinic portal.

- [ ] Add `reviews` table schema migration (`008_create_reviews.sql`)
- [ ] Seed representative agent testimonials and satisfaction ratings
- [ ] Create `ReviewsList` component to render rating stars and testimonials
- [ ] Implement `/reviews` route to display existing testimonials
- [ ] Wire `/reviews` into navigation and home page highlights

---

## Phase 5: Customer Reviews — Submission & Rating

**Goal:** Enable patients to submit reviews with ratings and clinical commentary.

- [ ] Create `ReviewForm` component with agent selection, numeric rating, and comment inputs
- [ ] Add POST route handler for review submission with server-side range and sanitization validation
- [ ] Connect review submission directly into `/reviews` view
- [ ] Add comprehensive automated tests for review persistence and input edge cases
