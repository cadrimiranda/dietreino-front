import { PropsWithChildren, useContext, useState } from "react";
import { Flex } from "antd/lib";
import Button from "antd/lib/button";
import { ExerciseSet } from "./workoutTypes";
import { CustomIcon, Pen } from "../../../../components/icons";
import { ActiveWorkoutExerciseSetup } from "./ActiveWorkoutExerciseSetup";
import {
  ActiveWorkoutContext,
  ActiveWorkoutSetContext,
} from "./ActiveWorkoutContext";
import { useUpdateExerciseSet } from "../../hooks/useUpdateExerciseSet";

export const ExerciseSetTable = ({ children }: PropsWithChildren) => {
  return (
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
};

const ActiveWorkoutExerciseSet = ({
  exerciseSet,
  setIndex,
}: {
  exerciseSet: ExerciseSet;
  setIndex: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handleChange } = useContext(ActiveWorkoutContext);
  const { description, name } = exerciseSet;
  const { updateExerciseSet } = useUpdateExerciseSet(exerciseSet);

  const handleEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    updateExerciseSet(exerciseSet).finally(() => setIsEditing(false));
  };

  return (
    <ActiveWorkoutSetContext.Provider value={{ isEditing, setIsEditing }}>
      <div className="user-gym-card-wrapper">
        <div className="user-gym-plan-card">
          <Flex className="user-gym-plan-header" justify="space-between">
            <p className="user-gym-plan-card-title">{name}</p>
            <Button onClick={handleEditing}>
              <CustomIcon width="20px" icon={Pen} color="colorWhite" />
            </Button>
          </Flex>
          <ExerciseSetTable>
            {exerciseSet.exerciseSetupList.map((setup, index) => (
              <ActiveWorkoutExerciseSetup
                key={setup.id}
                setup={setup}
                index={index}
                setIndex={setIndex}
              />
            ))}
          </ExerciseSetTable>

          <textarea
            disabled={!isEditing}
            className="user-gym-plan-obs"
            placeholder="Observações"
            value={description}
            onChange={(e) =>
              handleChange(
                `exerciseSets.${setIndex}.description`,
                e.target.value
              )
            }
          />
        </div>
      </div>
    </ActiveWorkoutSetContext.Provider>
  );
};

export { ActiveWorkoutExerciseSet };
