import { PropsWithChildren } from "react";

export const ExerciseSetWrapper = ({ children }: PropsWithChildren) => (
  <div className="user-gym-card-wrapper" data-testid="exercise-set-wrapper">
    <div className="user-gym-plan-card">{children}</div>
  </div>
);
