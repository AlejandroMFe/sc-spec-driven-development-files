import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";
import type { Ailment } from "../db/types.js";

export type AilmentsListProps = { ailments: Ailment[] };

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
          </tr>
        </thead>
        <tbody>
          {ailments.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Layout>
);
