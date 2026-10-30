import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";
import type { Agent, Ailment } from "../db/types.js";

export type AgentAilmentItem = Ailment & {
  recommended_therapies?: string | null;
};

export type AgentDetailProps = {
  agent: Agent;
  ailments: AgentAilmentItem[];
};

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
              {a.recommended_therapies && (
                <div style="margin-top: 0.25rem;">
                  <small>
                    <strong>Recommended Therapies:</strong> {a.recommended_therapies}
                  </small>
                </div>
              )}
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
      <a href={`/agents/${agent.id}/appointments/new`} role="button">
        Book an Appointment
      </a>
    </p>
    <p>
      <a href="/agents">← Back to agents</a>
    </p>
  </Layout>
);
