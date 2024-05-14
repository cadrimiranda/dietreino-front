import { PropsWithChildren } from "react";

export const ExerciseSetWrapper = ({ children }: PropsWithChildren) => (
  <div className="user-gym-card-wrapper">
    <div className="user-gym-plan-card">{children}</div>
  </div>
);
