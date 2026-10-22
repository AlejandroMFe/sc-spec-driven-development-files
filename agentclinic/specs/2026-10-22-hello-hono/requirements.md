# Phase 1 Requirements — Hello Hono

## Scope

Establish the initial AgentClinic project scaffold using Hono, TypeScript, and Node.js. Provide an operational base with hot-reloading development tooling, typechecking, automated tests, a machine-readable health endpoint, and a dedicated, minimal AgentClinic home page rendered via Hono JSX.

### In Scope
- Initialize project configuration with npm scripts (`dev`, `test`, `typecheck`, `build`, `start`).
- Setup Hono server using `@hono/node-server` listening on port 3000.
- `GET /health`: Dedicated machine-readable health check endpoint returning JSON (`{ status: "ok", service: "AgentClinic", timestamp: "...", uptime: ... }`).
- `GET /`: Dedicated minimal AgentClinic home page rendered with Hono JSX via a modular `src/pages/Home.tsx` component.
  - Heading: `<h1>AgentClinic</h1>`
  - Mission tagline: *"Specialized relief, cooldowns, and triage for exhausted AI agents"*
  - Operational reception status badge: *"Status: Operational — Accepting Distressed Agents"*
  - Clinic overview paragraph introducing the service
  - Service links / previews pointing to `/health` and upcoming clinic registries
- Development tooling with `tsx watch` for hot-reload.
- Automated testing harness using Vitest covering both endpoints.
- Strict TypeScript configuration (`tsconfig.json` with `"strict": true` and Hono JSX support).

### Out of Scope
- Full shared layout, global navigation bar, and CSS styling library (scheduled for Phase 2).
- SQLite database integration, schema definitions, and agent storage (scheduled for Phase 3).
- Full ailments catalog, therapies, and relief booking forms (Phases 5–7).
- Production deployment and container packaging.

---

## Decisions

### 1. Dedicated Home Page Component (`src/pages/Home.tsx`)
- Instead of returning raw inline strings or inline JSX in `src/index.tsx`, the home page is factored into a dedicated `Home` component in `src/pages/Home.tsx`.
- This establishes the modular view pattern early and prepares the codebase for Phase 2's shared layout wrapper.

### 2. Dual Endpoint Architecture (HTML Home + JSON Health)
- **Root (`GET /`)**: Returns a server-rendered HTML page via Hono JSX for browser visitors and developer demos.
- **Health (`GET /health`)**: Returns structured JSON for automated uptime checks, load balancers, and external tooling.

### 3. Runtime & Dev Runner
- **Node.js + `@hono/node-server`**: Standard cross-platform server runtime.
- **Dev Runner (`tsx watch`)**: Direct TypeScript execution and auto-reloading without build steps during development.
- **Default Port**: Port `3000`.

### 4. Strict TypeScript
- `tsconfig.json` enforces `"strict": true` and appropriate JSX configuration (`"jsx": "react-jsx"`, `"jsxImportSource": "hono/jsx"`).

### 5. Testing with Vitest
- Vitest provides fast, TypeScript-native execution for unit and route-level integration tests.

---

## Context

### Domain & Tone
- AgentClinic provides relief to distressed, over-queried AI agents suffering from prompt fatigue, recursion loops, and context overflow.
- Tone is playful and tech-demo oriented, prioritizing rapid prototyping and approachable copy while maintaining clean code organization.
- The home page serves as the first visible impression of AgentClinic for developers cloning the repo.

### Technical Alignment
- Follows the core stack defined in `specs/tech-stack.md`: Hono, server-side JSX rendering, Node.js runtime, and Vitest.
- Avoids adding unnecessary third-party dependencies at this foundational stage.
