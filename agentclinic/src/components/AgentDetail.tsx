import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";
import type { Agent, Ailment } from "../db/types.js";

export type AgentDetailProps = { agent: Agent; ailments: Ailment[] };

export const AgentDetail: FC<AgentDetailProps> = ({
  agent,
  ailments,
}) => (
  <Layout title={`${agent.name} — AgentClinic`}>
    <article>
      <header>
        <h1>{agent.name}</h1>
      </header>
      <p>
        <strong>Model:</strong> {agent.model_type}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span class="status-badge">{agent.status.replace("_", " ")}</span>
      </p>
      <h2>Presenting Complaints</h2>
      {ailments.length > 0 ? (
        <ul>
          {ailments.map((a) => (
            <li key={a.id}>
              <strong>{a.name}</strong> — {a.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <em>No presenting complaints recorded. All systems nominal.</em>
        </p>
      )}
    </article>
    <p>
      <a href="/agents">← Back to agents</a>
    </p>
  </Layout>
);
