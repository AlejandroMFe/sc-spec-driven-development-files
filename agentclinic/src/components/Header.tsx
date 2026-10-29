import type { FC } from "hono/jsx";

export type HeaderProps = Record<string, never>;

export const Header: FC<HeaderProps> = () => (
  <header aria-label="Site header">
    <nav aria-label="Main navigation">
      <a href="/">AgentClinic</a>
      <ul>
        <li>
          <a href="/agents">Agents</a>
        </li>
        <li>
          <a href="/ailments">Ailments</a>
        </li>
        <li>
          <a href="/therapies">Therapies</a>
        </li>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
      </ul>
    </nav>
  </header>
);
