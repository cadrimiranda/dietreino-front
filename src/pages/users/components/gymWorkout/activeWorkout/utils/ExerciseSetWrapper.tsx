import { PropsWithChildren } from "react";

export const ExerciseSetWrapper = ({ children }: PropsWithChildren) => (
  <div className="user-gym-card-wrapper" data-test-id="exercise-set-wrapper">
    <div className="user-gym-plan-card">{children}</div>
  </div>
);
