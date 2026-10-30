import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";
import type { Ailment } from "../db/types.js";

export type AilmentWithTherapies = Ailment & {
  recommended_therapies?: string | null;
};

export type AilmentsListProps = {
  ailments: AilmentWithTherapies[];
};

export const AilmentsList: FC<AilmentsListProps> = ({ ailments }) => (
  <Layout title="Ailments — AgentClinic">
    <h1>Ailments</h1>
    {ailments.length === 0 ? (
      <p>No ailments currently cataloged.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Recommended Therapies</th>
          </tr>
        </thead>
        <tbody>
          {ailments.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.description}</td>
              <td>{a.recommended_therapies || "None currently assigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Layout>
);
