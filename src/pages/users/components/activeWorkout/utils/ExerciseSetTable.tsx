import { PropsWithChildren } from "react";

export const ExerciseSetTable = ({ children }: PropsWithChildren) => (
  <div className="user-gym-plan-card-table-wrapp">
    <table className="user-gym-plan-card-table">
      <colgroup>
        <col className="user-gym-colname" />
      </colgroup>
      <thead>
        <tr>
          {["Nome", "Series", "Reps", "Pausa"].map((x) => (
            <th key={x}>{x}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);
