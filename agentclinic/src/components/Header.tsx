import type { FC } from "hono/jsx";

export type HeaderProps = Record<string, never>;

export const Header: FC<HeaderProps> = () => (
  <header>
    <nav>
      <a href="/">AgentClinic</a>
      <ul>
        <li>
          <a href="/agents">Agents</a>
        </li>
        <li>
          <a href="/ailments">Ailments</a>
        </li>
      </ul>
    </nav>
  </header>
);
