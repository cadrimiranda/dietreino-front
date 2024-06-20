import classNames from "classnames";
import { PropsWithChildren } from "react";

export const ExerciseSetWrapper = ({
  children,
  isAdding,
}: PropsWithChildren<{ isAdding?: boolean }>) => {
  const cx = classNames("user-gym-card-wrapper", {
    "w-2/3 shadow-2xl shadow-gray-500/60": isAdding,
  });

  return (
    <div className={cx} data-testid="exercise-set-wrapper">
      <div className="user-gym-plan-card">{children}</div>
    </div>
  );
};
