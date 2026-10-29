# Tutorial Progress Tracker

Tracking progress for the **Spec-Driven Development with Agentic Coding Assistants** course (DeepLearning.AI).

---

## 📌 Tutorial Specifications & Guidelines

- **Working Directory**: `agentclinic/`
- **Execution Mode**: **Strict Step-by-Step**. Never jump ahead, bundle unrelated tasks, or guess future prompts without user confirmation.
- **Git Strategy**:
  - Always work in dedicated feature branches for new features/phases.
  - Follow spec-driven workflow: Constitution -> Feature Spec (requirements, plan, validation) -> Implementation -> Validation/Tests -> Review -> Changelog -> Merge to `main`.
- **Changelog Rule**: Use the changelog skill (`skills/changelog` / `agentclinic/changelog`) to update `CHANGELOG.md` before merging branches.

---

## 📊 Course Roadmap & Status

| Lesson # | Video / Topic | Prompt File | Status | Notes |
|:---:|:---|:---|:---:|:---|
| **01–03** | Why SDD, Workflow Overview & Setup | *N/A (Conceptual)* | ✅ Completed | Background theory |
| **04** | Creating the Constitution (Video 05) | `Lesson_04_prompts.md` | ✅ Completed | Created `mission.md`, `tech-stack.md`, `roadmap.md` |
| **05** | Feature Specification (Video 06) | `Lesson_05_prompts.md` | ✅ Completed | Feature spec for Phase 1 (`hello-hono`) |
| **06** | Feature Implementation (Video 07) | `Lesson_06_prompts.md` | ✅ Completed | Scaffolded & implemented initial app |
| **07** | Feature Validation (Video 08) | `Lesson_07_prompts.md` | ✅ Completed | Implemented layout & validated UI |
| **08** | Project Replanning (Video 09) | `Lesson_08_prompts.md` | ✅ Completed | Vitest testing, responsive design, changelog skill, roadmap combined |
| **09** | **The Second Feature Phase (Video 10)** | `Lesson_09_prompts.md` | ✅ Completed | Implemented brand colors, extracted props, deep review fixes, and changelog update |
| **10** | **The MVP (Video 11)** | `Lesson_10_prompts.md` | 🟡 **In Progress** | Up next |
| **11** | Legacy Support (Video 12) | `Lesson_11_prompts.md` | ⏳ Pending | |
| **12** | Build Your Own Workflow (Video 13) | `Lesson_12_prompts.md` | ⏳ Pending | |
| **13** | Agent Replaceability (Video 14) | `Lesson_13_prompts.md` | ⏳ Pending | |

---

## 🎯 Current Lesson Details: Lesson 09 — The Second Feature Phase

**Target Directory**: `agentclinic/`

| Step / Prompt | Description | Status |
|:---|:---|:---:|
| **Prompt 1** | *"Our brand colors are orange and black."* | ✅ Completed |
| **Prompt 2** | *"Use extracted props definitions with a TypeScript type instead of inline and re-run tests."* | ✅ Completed |
| **Prompt 3** | *"Do a deep review: Spawn multiple subagents to go through all the changes on this branch from three different perspectives and see if anything doesn't make sense, could be better, etc."* | ✅ Completed |
| **Prompt 4** | *"Use your changelog skill to update the changelog with work done on this branch."* | ✅ Completed |

---

## 📝 Change History / Notes

- **2026-10-29**:
  - Implemented all 10 remediations from `deep-review-agents-ailments.md` across tooling, accessibility, layout, SQLite cascades/transactions, types, and expanded tests to 32/32 passing.
  - Committed remediations in commit `afe379a`.
  - Completed Lesson 09 Prompt 4: Executed changelog skill (`python changelog/scripts/changelog.py`) to update `agentclinic/CHANGELOG.md` with 7 new entries.

- **2026-10-28**:
  - Confirmed completion of Lesson 08.
  - Initialized `TUTORIAL_PROGRESS.md` with active working directory set to `agentclinic/`.
  - Created Git branch `agents-ailments` for Phase 2: Agents & Ailments.
  - Ran requirements alignment questions covering `requirements.md`, `plan.md`, and `validation.md`.
  - Created Phase 2 specification directory and files:
    - `agentclinic/specs/2026-10-28-agents-ailments/requirements.md`
    - `agentclinic/specs/2026-10-28-agents-ailments/plan.md`
    - `agentclinic/specs/2026-10-28-agents-ailments/validation.md`
  - Implemented Phase 2: Agents & Ailments:
    - Group 1: Integrated PicoCSS, updated Layout & Header navigation
    - Group 2: Installed `better-sqlite3`, implemented migration runner and SQL migrations
    - Group 3: Created seed data and `npm run seed` script
    - Group 4: Implemented `/agents`, `/agents/:id`, `/ailments` routes and JSX components
    - Verified all 24 Vitest tests passing & clean TypeScript compilation
  - Completed Lesson 09 Prompt 2: Extracted TypeScript props types (`LayoutProps`, `MainProps`, `HeaderProps`, `FooterProps`) across components in `agentclinic/src/components` and re-ran tests.
  - Completed Lesson 09 Prompt 1: Configured orange and black brand palette in `tech-stack.md`, `requirements.md`, and CSS variables in `static/style.css`.
  - Completed Lesson 09 Prompt 3: Conducted deep review using 3 subagents (Backend/DB, Frontend/UX/A11y, TypeScript/Code Quality) and generated consolidated review report.
