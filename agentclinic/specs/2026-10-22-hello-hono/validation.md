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

### Automated Tests
```bash
npm run test
```
- Vitest must execute successfully.
- Tests must pass for both `GET /health` and `GET /`:
  - `GET /health` asserts status 200, JSON header, and valid `{ status: "ok", service: "AgentClinic" }` payload.
  - `GET /` asserts status 200, `text/html` header, and presence of `AgentClinic`, tagline, and operational status badge.

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

## 3. Architecture & Tone Validation
- Verify the home page is implemented in a dedicated component file (`src/pages/Home.tsx`) rather than an inline string in `src/index.tsx`.
- Verify copy has a playful, demo-ready tone appropriate for an AI agent wellness and relief clinic without unnecessary enterprise ceremony.
