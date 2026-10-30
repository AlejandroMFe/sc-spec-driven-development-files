# Tech Stack

## Language & Runtime

- **TypeScript 5.5+** — strict mode enabled, compiled via `tsc`
- **Node.js (v18+)** — execution runtime via `@hono/node-server`
- **tsx** — fast TypeScript execution for development watch mode (`npm run dev`)

## Backend / Framework

- **Hono 4.x** — lightweight, high-performance web framework
  - Explicit modular routes defined in `src/routes/` (`agents`, `ailments`, `therapies`, `appointments`, `dashboard`)
  - Middleware in `src/middleware/` (`logger`)
  - Server-side request handling without unnecessary abstraction layers; Hono routing acts as the core application and API layer

## Frontend & Templating

- **Hono JSX** — pure server-side rendering (SSR) via `.tsx` components; no client-side framework overhead
  - Shared layout and reusable UI components in `src/components/`
  - Top-level page views in `src/pages/`
  - Zero hydration overhead; pure semantic HTML delivered directly to the browser
- **Vanilla CSS** — custom responsive styling located at `static/style.css`

## Persistence & Database

- **SQLite** — embedded database using `better-sqlite3` (synchronous, in-process, zero latency)
  - Primary database file: `agentclinic.db`
  - Hand-crafted migration runner in `src/db/migrate.ts` executing incremental SQL migrations in `src/db/migrations/`
  - Seed script via `src/db/seed.ts` runnable with `npm run seed`
  - TypeScript database definitions in `src/db/types.ts`

## Testing & Quality Assurance

- **Vitest 4.x** — fast native test framework
  - Component rendering tests in `tests/components.test.tsx`
  - Database schema and migration tests in `tests/db.test.ts`
  - Route and HTTP integration tests in `tests/routes.test.tsx` and `tests/index.test.ts`
  - Run tests with `npm test` (`vitest run --passWithNoTests`)

## Tooling & Build Scripts

- **TypeScript compiler** — `npm run build` (compiles to `dist/`), `npm run typecheck` (`tsc --noEmit`)
- **Static assets sync** — `scripts/copy-migrations.js` copies SQL migrations to `dist/` during build

## Gaps & Future Considerations

- **Linter & Code Formatter**: No linter (ESLint) or formatter (Prettier) is currently configured; adding these will enforce uniform code style across team contributions.
- **ORM / Query Builder**: Direct SQL queries are used across routes; while optimal for pedagogical transparency, introducing a lightweight query builder or typed layer (e.g., Kysely or Drizzle) can enhance long-term query maintainability.
- **Continuous Integration (CI)**: No automated CI workflow currently validates type checks and Vitest suites on pull requests.
- **Progressive Enhancement**: Form submissions currently rely on full page reloads. For interactive UX enhancements, consider a lightweight client layer (such as HTMX) to allow partial DOM swapping without heavy JavaScript bundles.
