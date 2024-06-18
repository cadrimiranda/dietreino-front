import { useState } from "react";
import { Flex } from "antd/lib";
import message from "antd/lib/message";
import { Exercise, ExerciseSet, ExerciseSetup } from "../workoutTypes";
import { ActiveWorkoutExerciseSetup } from "./ActiveWorkoutExerciseSetup";
import { ActiveWorkoutSetContext } from "../ActiveWorkoutContext";
import {
  updateExerciseSetExercise,
  updateExerciseSetObject,
} from "../ativeWorkout.logic";
import { ExerciseSetTable } from "../utils/ExerciseSetTable";
import { ExerciseSetWrapper } from "../utils/ExerciseSetWrapper";
import { AddSetupInputs } from "../exerciseSetAdd/AddSetupInputs";
import { ExerciseSetActionButtons } from "./ExerciseSetActionButtons";
import { useUpdateExerciseSet } from "../../hooks/useUpdateExerciseSet";
import { useRemoveSetupFromSet } from "../../hooks/useRemoveSetupFromSet";
import { useSetupState } from "../../hooks/useSetupState";

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
  const { updateExerciseSet } = useUpdateExerciseSet();
  const { removeSetupFromSet } = useRemoveSetupFromSet();
  const { exerciseSetup, handleUpdateSetup, clearSetup } = useSetupState();

  const handleEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    updateExerciseSet(exerciseSet).then(() => {
      handleUpdateActiveWorkout();
      setIsEditing(false);
    });
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

  const handleRemoveSetup = (setupIndex: number, setupId?: string) => {
    if (!setupId) {
      const newSetups = exerciseSet.exerciseSetupList.filter(
        (_, idx) => idx !== setupIndex
      );
      setExerciseSet({
        ...exerciseSet,
        exerciseSetupList: newSetups,
      });
      return;
    }

    removeSetupFromSet(exerciseSet.id, setupId)
      .then(() => {
        setExerciseSet({
          ...exerciseSet,
          exerciseSetupList: exerciseSet.exerciseSetupList.filter(
            (setup) => setup.id !== setupId
          ),
        });
        message.success("Setup removido com sucesso");
      })
      .catch(() => message.error("Erro ao remover setup"));
  };

  const handleAddNewSetup = () => {
    const exercise = {
      id: exerciseSetup.exerciseId,
      name: exerciseSetup.exerciseName,
    } as Exercise;
    const newSetup = {
      id: "",
      observation: "",
      rest: exerciseSetup.rest || "0",
      repetitions: exerciseSetup.repetitions || "0",
      series: exerciseSetup.series || "0",
      exercise,
    } as ExerciseSetup;

    setExerciseSet({
      ...exerciseSet,
      exerciseSetupList: [...exerciseSet.exerciseSetupList, newSetup],
    });
    clearSetup();
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
              placeholder="Nome do set"
              value={name}
              aria-label="Nome do set"
              onChange={(e) => handleUpdateSet(e.target.name, e.target.value)}
            />
          ) : (
            <p className="user-gym-plan-card-title text-xl font-semibold">
              {name}
            </p>
          )}
          <ExerciseSetActionButtons
            exerciseSet={exerciseSet}
            isEditing={isEditing}
            onEdit={handleEditing}
          />
        </Flex>
        <ExerciseSetTable actionButtons={isEditing}>
          {exerciseSet.exerciseSetupList.map((setup, setupIndex) => (
            <ActiveWorkoutExerciseSetup
              key={`${setup.id}-${setup.exercise.id}`}
              setup={setup}
              handleRemove={(setupId) => handleRemoveSetup(setupIndex, setupId)}
            />
          ))}
          {isEditing && (
            <AddSetupInputs
              handleAddSetup={handleAddNewSetup}
              values={exerciseSetup}
              handleChange={handleUpdateSetup}
            />
          )}
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
