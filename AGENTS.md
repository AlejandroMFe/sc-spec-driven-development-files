# Instructions for AI Coding Agents

Welcome! This repository is the companion codebase for the **DeepLearning.AI Spec-Driven Development (SDD) with Agentic Coding Assistants** course.

---

## 🎯 Repository Purpose & Structure

- **Main Goal**: Practice Spec-Driven Development (SDD)—a rigorous development methodology where specifications, architecture, and validation criteria precede code implementation, and coding agents act as disciplined implementers and reviewers.
- **Active Workspace Directory**: **`agentclinic/`**
  - All current application code, tests, database migrations, dependencies, and feature specifications live here.
  - Do NOT modify the `VideoNN_*` directories during ongoing course development—those directories are read-only reference snapshots showing the project state at the start of each video lesson.
- **Progress Tracker & Source of Truth**: See [**`TUTORIAL_PROGRESS.md`**](./TUTORIAL_PROGRESS.md).
  - Always consult `TUTORIAL_PROGRESS.md` to identify the current lesson, prompt status, active git branch, and historical session logs.

---

## 🤖 Core Operational Directives for Agents

When assisting the user in this repository, you **must** adhere to the following rules:

### 1. Strict Step-by-Step Execution
- Never jump ahead or execute multiple future tutorial prompts in a single turn without explicit user instructions.
- Validate each step before marking it done and awaiting user guidance.

### 2. Follow the Spec-Driven Development Workflow
Every feature follows a strict lifecycle:
1. **Constitution Alignment**: Check `specs/mission.md`, `specs/tech-stack.md`, and `specs/roadmap.md`.
2. **Feature Specification**: Create a dated directory under `specs/` (e.g. `specs/YYYY-MM-DD-<feature-name>/`) containing:
   - `requirements.md` (scope, user stories, constraints)
   - `plan.md` (numbered task groups with verifiable outputs)
   - `validation.md` (acceptance criteria, test scenarios)
3. **Implementation**: Build small vertical slices according to the plan.
4. **Automated Testing & Validation**: Run Vitest (`npm test` in `agentclinic/`) and ensure clean compilation (`npm run typecheck`).
5. **Code Review**: Conduct deep reviews (e.g., multi-perspective subagents covering Backend, Frontend/A11y, and TypeScript quality).
6. **Changelog Maintenance**: Run the changelog skill (`python changelog/scripts/changelog.py` inside `agentclinic/`) to update `CHANGELOG.md` before merging.
7. **Clean Version Control**: Create descriptive feature branches and commit with conventional messages (`feat:`, `fix:`, `docs:`, etc.).

### 3. Execution Environment & Tooling
- **Directory**: Always run npm commands, tests, and scripts inside `agentclinic/`.
- **Runtime**: Node.js (v18+) with native ES Modules (`"type": "module"` and `NodeNext` resolution).
- **Stack**: Hono JSX SSR, SQLite (`better-sqlite3`), PicoCSS, Vitest.
- **Database**: Use in-memory SQLite (`:memory:`) in unit and route tests to prevent mutating the physical disk database (`agentclinic.db`).
- **Production Build**: `npm run build` runs `tsc` and executes `scripts/copy-migrations.js` to ensure SQL files exist in `dist/`.

---

## 📍 Quick Navigation

- [TUTORIAL_PROGRESS.md](./TUTORIAL_PROGRESS.md) — Course roadmap, current lesson status, and execution rules
- [README.md](./README.md) — Course overview and folder layout
- [agentclinic/](./agentclinic/) — Primary application root
  - [agentclinic/specs/](./agentclinic/specs/) — System constitution and feature specifications
  - [agentclinic/CHANGELOG.md](./agentclinic/CHANGELOG.md) — Branch and release history
  - [agentclinic/changelog/](./agentclinic/changelog/) — Reusable changelog skill
