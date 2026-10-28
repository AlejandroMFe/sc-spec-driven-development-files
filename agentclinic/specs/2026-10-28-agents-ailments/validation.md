# Validation — Phase 2: Agents & Ailments

Phase 2 is complete and ready to merge when all three criteria below pass.

---

## 1. TypeScript Compiles Clean

```bash
npx tsc --noEmit
```

Must exit with code 0 with zero errors or warnings.

---

## 2. Vitest Unit & Integration Tests

Run test suite via:

```bash
npm test
```

All tests must pass. Required test coverage:

### Database & Migrations
- `migrate()` executes cleanly on fresh SQLite database.
- Running `migrate()` multiple times is idempotent without throwing errors.
- Tables `agents`, `ailments`, and `agent_ailments` exist with correct column schemas.

### Seed Data
- Running seeds inserts expected baseline entities (`COUNT >= 5` for agents and ailments).
- Seed execution is idempotent (`INSERT OR IGNORE`).
- Linked agent ailments exist in `agent_ailments`.

### Route & Layout Integration
- `GET /` returns HTTP 200 with HTML semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- `GET /agents` returns HTTP 200 with list of seeded agents.
- `GET /agents/:id` for valid ID returns HTTP 200 with agent profile and associated ailments.
- `GET /agents/:id` for invalid ID returns HTTP 404.
- `GET /ailments` returns HTTP 200 with catalog of ailments.

---

## 3. Manual Smoke Test Checklist

Start the local server (`npm run dev`) and visually verify in browser:

### Layout & Responsiveness
- [ ] Header, navigation bar, main container, and footer are visible across all pages.
- [ ] Navigation links between `/`, `/agents`, and `/ailments` function properly.
- [ ] At mobile viewport (375px), elements stack cleanly with no horizontal overflow.
- [ ] At desktop viewport (1280px), layout utilizes space with appropriate margins and centering.

### Entity Pages
- [ ] `/agents` displays agent cards/table with name, model type, and status badge.
- [ ] Clicking an agent opens `/agents/:id` showing details and ailments.
- [ ] `/ailments` displays descriptions and condition names cleanly.
