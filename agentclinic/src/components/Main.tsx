import type { Child, FC } from "hono/jsx";

export type MainProps = {
  children?: Child;
};

export const Main: FC<MainProps> = ({ children }) => (
  <main>{children}</main>
);
