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
- Automated testing harness using Vitest covering endpoints and components.
- Strict TypeScript configuration (`tsconfig.json` with `"strict": true` and Hono JSX support).
- Mobile-first responsive styling in `/static/style.css` using CSS custom properties, responsive container sizing, and viewport meta tag in the HTML layout shell.

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

### 5. Testing & Validation with Vitest
- Vitest provides fast, TypeScript-native execution for unit, component, and route-level integration tests.
- Wired directly to `npm test` (`"test": "vitest run"`) in `package.json` for automated specification validation.
- All tests must pass with exit code 0 as a required gate before branch completion.

### 6. Mobile-First Responsive Design
- Satisfies Steve's requirement for a modern, responsive web experience across desktop, tablet, and mobile browsers.
- All CSS is authored mobile-first: base rules target small screens, and `min-width` media queries progressively enhance typography and spacing for wider viewports.
- Spacing, colors, and layout widths are managed centrally with CSS custom properties.
- The document layout includes `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Responsive design is foundational from this initial phase onward and is never deferred.

---

## Context

### Domain & Tone
- AgentClinic provides relief to distressed, over-queried AI agents suffering from prompt fatigue, recursion loops, and context overflow.
- Tone is playful and tech-demo oriented, prioritizing rapid prototyping and approachable copy while maintaining clean code organization.
- The home page serves as the first visible impression of AgentClinic for developers cloning the repo.

### Technical Alignment
- Follows the core stack defined in `specs/tech-stack.md`: Hono, server-side JSX rendering, Node.js runtime, and Vitest.
- Avoids adding unnecessary third-party dependencies at this foundational stage.
