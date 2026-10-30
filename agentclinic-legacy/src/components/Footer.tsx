import type { FC } from "hono/jsx";

export type FooterProps = Record<string, never>;

export const Footer: FC<FooterProps> = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} AgentClinic</p>
  </footer>
);
