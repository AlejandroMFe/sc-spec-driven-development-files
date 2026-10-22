# Phase 1 Plan — Hello Hono

## Group 1 — Project Initialization & Environment Setup

1. Initialize `package.json` with project metadata and script commands (`dev`, `test`, `typecheck`, `build`, `start`).
2. Install production dependencies: `hono` and `@hono/node-server`.
3. Install development dependencies: `tsx`, `typescript`, `@types/node`, and `vitest`.
4. Configure `tsconfig.json` with `"strict": true`, `"moduleResolution": "node"`, and JSX settings (`"jsx": "react-jsx"`, `"jsxImportSource": "hono/jsx"`).

---

## Group 2 — Application Core & Endpoints

5. Create `src/index.tsx` as the main server entry point.
6. Implement `GET /health` route returning JSON:
   ```json
   {
     "status": "ok",
     "service": "AgentClinic",
     "uptime": 12.34,
     "timestamp": "2026-10-22T09:00:00.000Z"
   }
   ```
7. Implement `GET /` route using Hono JSX returning an HTML welcome greeting with:
   - `<h1>AgentClinic</h1>`
   - Playful tagline ("Specialized relief and cooldown care for exhausted AI agents")
   - Operational health badge indicating system is active and ready
8. Configure `@hono/node-server` `serve()` to listen on `PORT` (default `3000`).

---

## Group 3 — Automated Route Testing

9. Create test suite `tests/index.test.ts` importing the Hono app instance.
10. Implement route test for `GET /health` asserting HTTP status 200, JSON content-type, and `status: "ok"`.
11. Implement route test for `GET /` asserting HTTP status 200, HTML content-type, and presence of `AgentClinic` in the body.

---

## Group 4 — Verification & Sanity Checks

12. Run `npm run typecheck` to confirm zero TypeScript compilation errors.
13. Run `npm run test` to confirm Vitest test suites execute and pass.
14. Launch development server with `npm run dev` and perform manual `curl` requests to verify local HTTP responses.
