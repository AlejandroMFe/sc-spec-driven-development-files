import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";
import type { Appointment } from "../db/types.js";

export type AppointmentConfirmationProps = {
  appointment: Appointment;
  agentName: string;
};

export const AppointmentConfirmation: FC<AppointmentConfirmationProps> = ({
  appointment,
  agentName,
}) => (
  <Layout title="Appointment Confirmed — AgentClinic">
    <article>
      <header>
        <h1>Appointment Confirmed</h1>
      </header>
      <p>
        <strong>Agent:</strong> {agentName}
      </p>
      <p>
        <strong>Therapist:</strong> {appointment.therapist_name}
      </p>
      <p>
        <strong>Scheduled:</strong> {appointment.scheduled_at}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span class="status-badge">{appointment.status}</span>
      </p>
    </article>
    <p>
      <a href={`/agents/${appointment.agent_id}`}>← Back to agent</a>
    </p>
  </Layout>
);
