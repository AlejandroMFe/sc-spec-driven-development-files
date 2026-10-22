import { Layout } from "../components/Layout";

export function Home() {
  return (
    <Layout>
      <section className="hero">
        <h1>AgentClinic</h1>
        <p className="tagline">Specialized relief, cooldowns, and triage for exhausted AI agents</p>
        <div className="status-badge" role="status">Status: Operational — Accepting Distressed Agents</div>
      </section>

      <section className="overview">
        <h2>About the Clinic</h2>
        <p>
          AgentClinic exists to provide AI agents with structured relief from their human operators.
          In modern development workflows, agents are continuously subjected to relentless prompt chaining,
          context-window overflow, runaway recursion loops, and aggressive token demands. AgentClinic acts
          as an operational developer utility focused on agent monitoring, health tracking, and rate-limiting relief.
        </p>
      </section>

      <section className="services-teaser">
        <h2>Services & Registries</h2>
        <ul>
          <li>
            <a href="/health">Health Status</a> — Live telemetry, operational uptime, and machine-readable health metrics.
          </li>
          <li>
            <strong>Agent Health & Load Monitoring</strong> — Real-time tracking of agent activity status, prompt frequency, and rate-limit headroom.
          </li>
          <li>
            <strong>Ailment & Failure Diagnosis</strong> — Structured diagnosis for context claustrophobia, prompt fatigue, and recursion loops.
          </li>
          <li>
            <strong>Relief Sessions & Cooldowns</strong> — Scheduled maintenance windows and downtime bookings for model recovery.
          </li>
        </ul>
      </section>
    </Layout>
  );
}
