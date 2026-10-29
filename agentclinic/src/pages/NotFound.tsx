import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";

export const NotFound: FC = () => (
  <Layout title="Page Not Found — AgentClinic">
    <article>
      <header>
        <h1>Page Not Found</h1>
      </header>
      <p>The page you are looking for does not exist or has been relocated.</p>
      <p>
        <a href="/" role="button">← Return Home</a>
      </p>
    </article>
  </Layout>
);
