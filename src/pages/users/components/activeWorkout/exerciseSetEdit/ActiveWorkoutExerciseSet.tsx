import { useState } from "react";
import { Flex } from "antd/lib";
import Button from "antd/lib/button";
import { ExerciseSet } from "../workoutTypes";
import { CustomIcon, Pen, Save } from "../../../../../components/icons";
import { ActiveWorkoutExerciseSetup } from "./ActiveWorkoutExerciseSetup";
import { ActiveWorkoutSetContext } from "../ActiveWorkoutContext";
import { useUpdateExerciseSet } from "../../../hooks/useUpdateExerciseSet";
import {
  updateExerciseSetExercise,
  updateExerciseSetObject,
} from "../ativeWorkout.logic";
import { ExerciseSetTable } from "../utils/ExerciseSetTable";
import { ExerciseSetWrapper } from "../utils/ExerciseSetWrapper";

const ActiveWorkoutExerciseSet = ({
  exerciseSet: originalExerciseSet,
  handleUpdateActiveWorkout,
}: {
  handleUpdateActiveWorkout: () => void;
  exerciseSet: ExerciseSet;
}) => {
  const [exerciseSet, setExerciseSet] =
    useState<ExerciseSet>(originalExerciseSet);
  const [isEditing, setIsEditing] = useState(false);
  const { description, name } = exerciseSet;
  const { updateExerciseSet } = useUpdateExerciseSet(exerciseSet);

  const handleEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    updateExerciseSet(exerciseSet)
      .then(() => handleUpdateActiveWorkout())
      .finally(() => setIsEditing(false));
  };

  const handleUpdateSet = (name: string, value: string, setupId?: string) => {
    setExerciseSet(
      updateExerciseSetObject({ exerciseSet, name, value, setupId })
    );
  };

  const handleUpdateExercise = (
    option: { value: string; label: string },
    setupId: string
  ) => {
    setExerciseSet(updateExerciseSetExercise({ exerciseSet, option, setupId }));
  };

  return (
    <ActiveWorkoutSetContext.Provider
      value={{
        isEditing,
        setIsEditing,
        handleUpdateSet,
        handleUpdateExercise,
      }}
    >
      <ExerciseSetWrapper>
        <Flex className="user-gym-plan-header" justify="space-between">
          {isEditing ? (
            <input
              name="name"
              value={name}
              onChange={(e) => handleUpdateSet(e.target.name, e.target.value)}
            />
          ) : (
            <p className="user-gym-plan-card-title">{name}</p>
          )}
          <Button onClick={handleEditing}>
            <CustomIcon
              width="20px"
              icon={isEditing ? Save : Pen}
              color="colorWhite"
            />
          </Button>
        </Flex>
        <ExerciseSetTable>
          {exerciseSet.exerciseSetupList.map((setup) => (
            <ActiveWorkoutExerciseSetup
              key={`${setup.id}-${setup.exercise.id}`}
              setup={setup}
            />
          ))}
        </ExerciseSetTable>

        <textarea
          name="description"
          disabled={!isEditing}
          className="user-gym-plan-obs"
          placeholder="Observações"
          value={description}
          onChange={(e) => handleUpdateSet(e.target.name, e.target.value)}
        />
      </ExerciseSetWrapper>
    </ActiveWorkoutSetContext.Provider>
  );
};

export { ActiveWorkoutExerciseSet };
