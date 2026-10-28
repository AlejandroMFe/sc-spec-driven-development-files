# Requirements — Phase 2: Agents & Ailments

## Scope

Phase 2 delivers the first real content of AgentClinic: a shared layout system, a SQLite database with seed data, and the first two core domain entities — agents and ailments.

## Decisions

### Layout & Styling
- A server-side JSX layout component wraps every route: header, nav, main container, footer.
- CSS uses **PicoCSS** (classless variant) for base styling — loaded via CDN or npm package, with no build step required.
- A minimal `styles.css` supplements Pico with project-specific overrides and CSS custom properties (including brand tokens).
- Mobile-first responsive layout is provided by Pico out of the box and verified down to 375px.

### Database
- SQLite via `better-sqlite3`.
- Migrations are plain `.sql` files (e.g., `001_create_agents.sql`, `002_create_ailments.sql`, `003_create_agent_ailments.sql`) in a `migrations/` directory.
- A TypeScript bootstrap function reads and executes migration files in filename order at server startup, tracking applied migrations in a `_migrations` table to remain idempotent.
- No ORM; queries are written directly in TypeScript using `better-sqlite3`.

### Seed Data
- Seed scripts populate `agents` and `ailments` tables with fictional but coherent entries.
- Seeds run after migrations, are idempotent (`INSERT OR IGNORE`), and live in a `seeds/` directory.

### Routes & Views
- `GET /` — wrapped in shared `Layout`.
- `GET /agents` — list all registered agents (name, model type, status).
- `GET /agents/:id` — single agent profile displaying name, model type, current status, and presenting complaints (linked ailments).
- `GET /ailments` — list all cataloged ailments and descriptions.
- Agents and ailments are linked via a join table (`agent_ailments`).

## Context

This phase establishes foundational patterns that subsequent phases build upon:
- The `Layout` component serves as the template for all future views.
- The migration + seed pattern is reused in Phases 3, 4, and 5.
- The agent detail page will host the appointment booking form in Phase 4.

Refer to `specs/mission.md` for stakeholder context and `specs/tech-stack.md` for technology guidelines.

## Out of Scope
- Therapies, appointments booking, and staff monitoring dashboard (Phases 3–5).
- Authentication, authorization, or third-party email/SMS integrations.
- Custom 404/500 error pages and rate-limiting middleware (Phase 7).
