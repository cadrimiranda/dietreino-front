import { useState } from "react";
import { setupDTO } from "../components/gymWorkout/activeWorkout/workoutTypes";
import { handleChangeProps } from "../components/gymWorkout/activeWorkout/exerciseSetAdd/AddSetupInputs";

const DEFAULT_SETUP: setupDTO = {
  exerciseId: "",
  exerciseName: "",
  series: "",
  repetitions: "",
  observation: "",
  rest: "",
};

export const useSetupState = () => {
  const [exerciseSetup, setExerciseSetup] = useState({
    ...DEFAULT_SETUP,
  });
  const [setups, setSetups] = useState<setupDTO[]>([]);

  const handleUpdateSetup = (props: handleChangeProps) => {
    if (props.option) {
      setExerciseSetup({
        ...exerciseSetup,
        exerciseId: props.option.value,
        exerciseName: props.option.label,
      });
    } else if (props.name && props.value) {
      setExerciseSetup({
        ...exerciseSetup,
        [props.name]: props.value,
      });
    }
  };

  const clearSetup = () => {
    setExerciseSetup({ ...DEFAULT_SETUP });
  };

  const clearSetups = () => {
    setSetups([]);
  };

  const handleAddSetup = () => {
    if (!exerciseSetup.exerciseId) return;
    if (!exerciseSetup.series) return;
    if (!exerciseSetup.repetitions) return;
    if (!exerciseSetup.rest) return;

    setSetups([...setups, exerciseSetup]);
    clearSetup();
  };

  const handleRemoveSetupFromSetups = (exerciseId: string) => {
    setSetups(setups.filter((setup) => setup.exerciseId !== exerciseId));
  };

  return {
    exerciseSetup,
    handleUpdateSetup,
    clearSetup,
    handleAddSetup,
    clearSetups,
    setups,
    handleRemoveSetupFromSetups,
  };
};
