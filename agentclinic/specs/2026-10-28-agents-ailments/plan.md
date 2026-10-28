# Plan — Phase 2: Agents & Ailments

Numbered task groups in implementation order. Each group is independently reviewable and verifiable.

---

## Group 1 — Base Layout & Styling

1. Integrate PicoCSS (classless variant via CDN link or package).
2. Create `src/components/Layout.tsx` — server-side JSX component accepting `title` and `children`; renders `<!DOCTYPE html>`, `<html>`, `<head>`, `<header>`, `<nav>`, `<main>`, and `<footer>`.
3. Create `src/static/styles.css` for custom brand overrides and CSS custom properties; serve via Hono static middleware.
4. Update existing root route (`/`) to render wrapped inside `Layout`.
5. Verify dev server rendering at `http://localhost:3000` with clean HTML and semantic landmarks.

## Group 2 — DB Schema & Migrations

6. Install `better-sqlite3` and `@types/better-sqlite3`.
7. Create `src/db/index.ts` to manage the SQLite connection to `agentclinic.db`.
8. Create `src/db/migrate.ts` migration runner that executes `.sql` files in sequence and tracks them in a `_migrations` table for idempotency.
9. Create migration files:
   - `src/db/migrations/001_create_agents.sql` (`id`, `name`, `model_type`, `status`, `created_at`)
   - `src/db/migrations/002_create_ailments.sql` (`id`, `name`, `description`)
   - `src/db/migrations/003_create_agent_ailments.sql` (`agent_id`, `ailment_id`)
10. Integrate migration execution into server startup in `src/index.ts`.

## Group 3 — Seeds & Data Access

11. Create `src/db/seeds/agents.ts` and `src/db/seeds/ailments.ts` with representative data using idempotent inserts.
12. Create seed runner `src/db/seeds/index.ts` and add `npm run seed` script to `package.json`.
13. Implement type-safe data access queries/functions for agents and ailments.

## Group 4 — Routes & Views (`/agents`, `/agents/:id`, `/ailments`)

14. Create `src/components/AgentsList.tsx` and route `GET /agents`.
15. Create `src/components/AgentDetail.tsx` and dynamic route `GET /agents/:id` with linked ailments.
16. Create `src/components/AilmentsList.tsx` and route `GET /ailments`.
17. Mount routes in Hono application and update `Layout` navigation links.
18. Validate mobile-first responsive design across all views (375px and 1280px).
