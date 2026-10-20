# Tech Stack

AgentClinic is architected as a lean, server-side TypeScript application. By rendering pages on the server and serving clean HTML and CSS, the system stays lightweight, reliable, and straightforward to develop and operate.

## Core Stack

| Layer | Selection | Rationale |
|---|---|---|
| Language | TypeScript | End-to-end type safety across domain logic, routes, and views (Mary's requirement). |
| Runtime | Node.js (v18+) | Proven ecosystem, broad compatibility, and standard runtime support. |
| Server Framework | **Hono** | Lightweight, high-performance, TypeScript-native HTTP framework with intuitive routing and middleware. |
| View Rendering | Hono JSX (Server-Side) | Component-based HTML generation on the server without client bundle overhead or hydration latency. |
| Styling | Modern CSS & Custom Properties | Clean, responsive design supporting modern browsers without complex CSS build steps (Steve's requirement). |
| Data Layer | SQLite (`better-sqlite3`) | Embedded, file-backed database with zero infrastructure dependencies for swift local development and predictable state. |
| Testing | Vitest | Fast, TypeScript-compatible testing framework for unit and integration checks. |
| Tooling | `tsx` & `tsc` | Direct TypeScript execution via `tsx` during development; strict type checking with `tsc`. |

## Data

- **SQLite** (via `better-sqlite3`) — chosen for local development and early production; embedded, zero-infrastructure, fast, and simple.
- Migrations and schema changes handled via plain SQL files; no ORM to keep data access direct and transparent.

## Architectural Decisions

### Framework Choice: Hono
Hono was selected over traditional frameworks (Express, Fastify) because:
- Native TypeScript support with minimal configuration.
- Built-in, zero-dependency server-side JSX renderer.
- Composable middleware architecture ideal for request logging, error handling, and rate limiting.
- Low overhead and clean developer experience.

### Server-Side Rendering
- All HTML is produced server-side using JSX components.
- Avoids bloated client-side JavaScript runtimes, ensuring rapid page loads and compatibility across any modern browser.

### Data Management
- Plain SQL schemas and migrations managed via straightforward SQL files.
- Avoids heavyweight ORM abstractions to keep queries transparent and predictable.
