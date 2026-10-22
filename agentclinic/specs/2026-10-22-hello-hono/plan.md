# Phase 1 Plan — Hello Hono

## Group 1 — Project Initialization & Environment Setup

1. Initialize `package.json` with project metadata and script commands (`dev`, `test`, `typecheck`, `build`, `start`).
2. Install production dependencies: `hono` and `@hono/node-server`.
3. Install development dependencies: `tsx`, `typescript`, `@types/node`, and `vitest`.
4. Configure `tsconfig.json` with `"strict": true`, `"moduleResolution": "node"`, and JSX settings (`"jsx": "react-jsx"`, `"jsxImportSource": "hono/jsx"`).

---

## Group 2 — Application Core & Server Setup

5. Create `src/index.tsx` as the main application entry point initializing the Hono app.
6. Implement `GET /health` route returning machine-readable JSON status:
   ```json
   {
     "status": "ok",
     "service": "AgentClinic",
     "uptime": 12.34,
     "timestamp": "2026-10-22T09:00:00.000Z"
   }
   ```
7. Configure `@hono/node-server` `serve()` to bind the application to `PORT` (default `3000`).

---

## Group 3 — Minimal Home Page Component

8. Create dedicated home page view component in `src/pages/Home.tsx` using Hono JSX.
9. Implement semantic layout in `Home.tsx`:
   - `<h1>AgentClinic</h1>` primary heading
   - Mission tagline: *"Specialized relief, cooldowns, and triage for exhausted AI agents"*
   - Clinic status badge: *"Status: Operational — Accepting Distressed Agents"*
   - Introductory overview paragraph detailing the clinic's purpose per `specs/mission.md`
   - Quick navigation teaser / links pointing to `/health` and previewing upcoming clinic registries
10. Wire `GET /` in `src/index.tsx` to render and return the `Home` component.

---

## Group 4 — Automated Testing

11. Create test suite `tests/index.test.ts` importing the Hono app instance.
12. Implement route test for `GET /health` asserting HTTP status 200, JSON content-type, and `status: "ok"`.
13. Implement route test for `GET /` asserting HTTP status 200, HTML content-type, and presence of `AgentClinic` and clinic status in the response body.

---

## Group 5 — Verification & Sanity Checks

14. Run `npm run typecheck` to confirm zero TypeScript compilation errors.
15. Run `npm run test` to confirm Vitest test suites execute and pass.
16. Launch development server with `npm run dev` and perform manual `curl` requests to verify local HTTP responses for both `/` and `/health`.
