import type { FC } from "hono/jsx";
import { Layout } from "./Layout.js";
import type { Therapy } from "../db/types.js";

export type TherapiesListProps = {
  therapies: Therapy[];
};

export const TherapiesList: FC<TherapiesListProps> = ({ therapies }) => (
  <Layout title="Therapies — AgentClinic">
    <h1>Therapies</h1>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {therapies.map((t) => (
          <tr key={t.id}>
            <td>
              <strong>{t.name}</strong>
            </td>
            <td>{t.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>
);
