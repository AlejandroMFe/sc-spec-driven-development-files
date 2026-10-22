# Phase 1 Validation — Hello Hono

## Definition of Done

All checklist criteria below must pass before merging this branch into `main`.

---

## 1. Automated Checks

### TypeScript Compilation
```bash
npm run typecheck
```
- Must complete with exit code 0 and emit zero errors or warnings.
- `tsconfig.json` must enforce `"strict": true`.

### Automated Tests (Vitest)
```bash
npm test
```
- Must execute Vitest test runner (`vitest run` wired in `package.json`) and exit with code 0.
- All test suites must pass without errors:
  - Route tests (`tests/index.test.ts`):
    - `GET /health` asserts status 200, JSON header, and valid `{ status: "ok", service: "AgentClinic" }` payload.
    - `GET /` asserts status 200, `text/html` header, and presence of `AgentClinic`, tagline, layout elements (`<header>`, `<main>`, `<footer>`), and operational status badge.
    - `GET /static/style.css` asserts status 200 and stylesheet content.
  - Component tests (`tests/components.test.tsx`):
    - `Header` renders `<header>`, link to `/`, and brand name.
    - `Footer` renders `<footer>`, current year, and brand name.
    - `Main` renders `<main>` container and children content.
    - `Layout` renders HTML shell, `<title>`, stylesheet link, viewport meta tag, header, children, and footer.
    - `Home` renders hero section, mission tagline, operational status badge, overview section, and links.

---

## 2. Manual Route Verification

Start the local server:
```bash
npm run dev
```

### Minimal Home Page Endpoint (`GET /`)
```bash
curl -i http://localhost:3000/
```
- **HTTP Status**: `200 OK`
- **Content-Type**: `text/html; charset=UTF-8`
- **Body Contains**:
  - `<h1>AgentClinic</h1>`
  - Mission tagline (*"Specialized relief, cooldowns, and triage for exhausted AI agents"*)
  - Clinic reception status badge (*"Status: Operational — Accepting Distressed Agents"*)
  - Clinic overview paragraph introducing the service
  - Service navigation links/pointers (including `/health`)

### Health Endpoint (`GET /health`)
```bash
curl -i http://localhost:3000/health
```
- **HTTP Status**: `200 OK`
- **Content-Type**: `application/json; charset=UTF-8`
- **Body Matches**:
  - `status`: `"ok"`
  - `service`: `"AgentClinic"`
  - `timestamp`: Valid ISO timestamp string
  - `uptime`: Positive numeric value

---

## 3. Responsive Design Validation
- **Viewport Meta Tag**: Home page response must include `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- **CSS Custom Properties**: `/static/style.css` must define `:root` tokens for spacing, sizing, and color variables.
- **Mobile-First Media Queries**: `/static/style.css` must implement base mobile styles and include at least one `min-width` media query (e.g. `@media (min-width: 640px)`) to progressively enhance layout across viewports.

---

## 4. Architecture & Tone Validation
- Verify the home page is implemented in a dedicated component file (`src/pages/Home.tsx`) rather than an inline string in `src/index.tsx`.
- Verify copy has a playful, demo-ready tone appropriate for an AI agent wellness and relief clinic without unnecessary enterprise ceremony.
