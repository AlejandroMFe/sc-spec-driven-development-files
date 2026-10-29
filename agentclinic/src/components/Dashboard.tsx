import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";

export type Stats = {
  agentCount: number;
  openAppointmentCount: number;
  activeAilmentCount: number;
};

export type AgentRow = {
  id: number;
  name: string;
  model_type: string;
  status: string;
};

export type AppointmentRow = {
  id: number;
  agent_name: string;
  therapist_name: string;
  scheduled_at: string;
  status: string;
};

export type AilmentRow = {
  id: number;
  name: string;
  agent_count: number;
};

export type DashboardProps = {
  stats: Stats;
  agents: AgentRow[];
  appointments: AppointmentRow[];
  ailments: AilmentRow[];
};

export const Dashboard: FC<DashboardProps> = ({
  stats,
  agents,
  appointments,
  ailments,
}) => (
  <Layout title="Staff Dashboard — AgentClinic">
    <h1>Staff Dashboard</h1>

    <div class="grid" style="margin-bottom: 2rem;">
      <article>
        <h2>{stats.agentCount}</h2>
        <p>Total Agents</p>
      </article>
      <article>
        <h2>{stats.openAppointmentCount}</h2>
        <p>Open Appointments</p>
      </article>
      <article>
        <h2>{stats.activeAilmentCount}</h2>
        <p>Active Ailments In-Flight</p>
      </article>
    </div>

    <h2>Agents</h2>
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

    <h2>Upcoming Appointments</h2>
    {appointments.length === 0 ? (
      <p>No open appointments.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th scope="col">Agent</th>
            <th scope="col">Therapist</th>
            <th scope="col">Scheduled</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((ap) => (
            <tr key={ap.id}>
              <td>{ap.agent_name}</td>
              <td>{ap.therapist_name}</td>
              <td>{ap.scheduled_at}</td>
              <td>
                <span class="status-badge">{ap.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    <h2>Ailments</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Agents Affected</th>
        </tr>
      </thead>
      <tbody>
        {ailments.map((al) => (
          <tr key={al.id}>
            <td>{al.name}</td>
            <td>{al.agent_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>
);
