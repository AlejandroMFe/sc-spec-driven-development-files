import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";
import type { Agent } from "../db/types.js";

export type AgentsListProps = { agents: Agent[] };

export const AgentsList: FC<AgentsListProps> = ({ agents }) => (
  <Layout title="Agents — AgentClinic">
    <h1>Agents</h1>
    {agents.length === 0 ? (
      <p>No agents currently registered.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Model</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a.id}>
              <td>
                <a href={`/agents/${a.id}`}>{a.name}</a>
              </td>
              <td>{a.model_type}</td>
              <td>
                <span class="status-badge">{a.status.replace("_", " ")}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Layout>
);
