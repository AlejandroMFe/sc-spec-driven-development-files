import type { Child, FC } from "hono/jsx";
import { raw } from "hono/html";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { Main } from "./Main.js";

export type LayoutProps = {
  title?: string;
  children?: Child;
};

export const Layout: FC<LayoutProps> = ({ title = "AgentClinic", children }) => (
  <>
    {raw("<!DOCTYPE html>")}
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
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
  </>
);
