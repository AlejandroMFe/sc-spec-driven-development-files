import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";

export const ServerError: FC = () => (
  <Layout title="Internal Server Error — AgentClinic">
    <article>
      <header>
        <h1>Something Went Wrong</h1>
      </header>
      <p>An unexpected error occurred while processing your request. Please try again later.</p>
      <p>
        <a href="/" role="button">← Return Home</a>
      </p>
    </article>
  </Layout>
);
