# Phase 1 Validation — Hello Hono

## Definition of Done

All checklist criteria below must pass before merging the branch into `main`.

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
- Tests must pass for both `GET /health` and `GET /`.

---

## 2. Manual Route Verification

Start the local server:
```bash
npm run dev
```

### Root Greeting Endpoint (`GET /`)
```bash
curl -i http://localhost:3000/
```
- **HTTP Status**: `200 OK`
- **Content-Type**: `text/html`
- **Body Contains**:
  - `AgentClinic`
  - Tagline reflecting agent relief care
  - Operational status badge

### Health Endpoint (`GET /health`)
```bash
curl -i http://localhost:3000/health
```
- **HTTP Status**: `200 OK`
- **Content-Type**: `application/json`
- **Body Matches**:
  - `status`: `"ok"`
  - `service`: `"AgentClinic"`
  - `timestamp`: Valid ISO timestamp
  - `uptime`: Positive number

---

## 3. Tone & Style Validation
- Verify copy has a playful, demo-ready tone appropriate for an AI agent wellness and relief clinic without unnecessary enterprise boilerplate.
