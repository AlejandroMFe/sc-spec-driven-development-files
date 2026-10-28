import type { Child, FC } from "hono/jsx";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";

export type LayoutProps = {
  children?: Child;
};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AgentClinic</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
      />
      <link rel="stylesheet" href="/static/style.css" />
    </head>
    <body>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </body>
  </html>
);
