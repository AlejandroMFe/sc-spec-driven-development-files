# Phase 1 Requirements — Hello Hono

## Scope

Establish the initial AgentClinic project scaffold using Hono, TypeScript, and Node.js. Provide an operational base with hot-reloading development tooling, typechecking, automated tests, and basic health endpoints.

### In Scope
- Initialize project configuration with npm scripts (`dev`, `test`, `typecheck`, `build`).
- Setup Hono server using `@hono/node-server` listening on port 3000.
- `GET /`: Root endpoint returning an HTML home/greeting page rendered with Hono JSX featuring an AgentClinic header, playful tagline, and operational status badge.
- `GET /health`: Dedicated machine-readable health check endpoint returning JSON (`{ status: "ok", service: "AgentClinic", timestamp: "..." }`).
- Development tooling with `tsx watch` for hot-reload.
- Automated testing harness using Vitest.
- Strict TypeScript configuration (`tsconfig.json` with `"strict": true`).

### Out of Scope
- Shared multi-page layout and global navigation bars (scheduled for Phase 2).
- SQLite database integration, schema definitions, and agent storage (scheduled for Phase 3).
- Full ailments catalog, therapies, and relief booking forms (Phases 5–7).
- Production deployment and container packaging.

---

## Decisions

### 1. Dual Route Structure (HTML Welcome + JSON Health)
- **Root (`GET /`)**: Returns a server-rendered HTML greeting via Hono JSX for browsers and demo visitors.
- **Health (`GET /health`)**: Returns structured JSON for automated uptime checks and tooling.

### 2. Runtime & Dev Runner
- **Node.js + `@hono/node-server`**: Standard, cross-platform server runtime.
- **Dev Runner (`tsx watch`)**: Direct TypeScript execution and auto-reloading without upfront build steps during development.
- **Default Port**: Port `3000`.

### 3. Strict TypeScript
- `tsconfig.json` enforces `"strict": true` and appropriate JSX configuration (`"jsx": "react-jsx"`, `"jsxImportSource": "hono/jsx"`) from the very first phase.

### 4. Testing with Vitest
- Vitest provides fast, TypeScript-native execution for unit and route-level integration tests.

---

## Context

### Domain & Tone
- AgentClinic provides relief to distressed, over-queried AI agents suffering from prompt fatigue and context overflow.
- Tone is playful and tech-demo oriented, prioritizing rapid prototyping and approachable copy while maintaining clean code organization.

### Technical Alignment
- Follows the core stack defined in `specs/tech-stack.md`: Hono, server-side JSX rendering, Node.js runtime, and Vitest.
- Avoids adding unnecessary third-party dependencies at this foundational stage.
