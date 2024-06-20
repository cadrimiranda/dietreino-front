import { useMemo, useState } from "react";
import Button from "antd/lib/button";
import { ExerciseSet, ExerciseSetDTO, Workout } from "../workoutTypes";
import { SetupsAdded } from "./SetupsAdded";
import { AddSetupInputs } from "./AddSetupInputs";
import { useAddSetupToSet } from "../../hooks/useAddSetupToSet";
import { useSetupState } from "../../hooks/useSetupState";
import { Icon } from "../../../../components/Icon";
import { WeekDays } from "../../../../utils/weekDaysEnum";
import { ExerciseSetForm } from "../../components/ExerciseSetForm";

const DEFAULT_SET = {
  description: "",
  name: "",
  weekDay: "" as WeekDays,
};

const ActiveWorkoutSetAdd = ({
  onCancel,
  workoutId,
  refetchWorkout,
}: {
  onCancel: () => void;
  workoutId: string;
  refetchWorkout: () => Promise<Workout>;
}) => {
  const { addSetupsToSet } = useAddSetupToSet(workoutId);
  const [exerciseSet, setExerciseSet] = useState<
    Omit<ExerciseSet, "exerciseSetupList" | "id">
  >({ ...DEFAULT_SET });

  const {
    exerciseSetup,
    clearSetup,
    clearSetups,
    handleUpdateSetup,
    handleAddSetup,
    setups,
    handleRemoveSetupFromSetups,
  } = useSetupState();
  const { description, name, weekDay } = exerciseSet;

  const cantSave = useMemo(
    () => !name || !setups.length || weekDay === ("" as WeekDays),
    [name, setups, weekDay]
  );

  const handleUpdateSet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExerciseSet({
      ...exerciseSet,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const newExerciseSet: ExerciseSetDTO = {
      ...exerciseSet,
      exerciseSetupList: setups,
    };
    addSetupsToSet(newExerciseSet)
      .then(() => {
        clearSetup();
        clearSetups();
        refetchWorkout();
      })
      .catch(console.log)
      .finally(onCancel);
  };

  const handleUpdateWeekDay = (name: string, value: WeekDays) => {
    setExerciseSet({ ...exerciseSet, [name]: value });
  };

  return (
    <ExerciseSetForm
      isAdding
      hasActionsButtons
      inputNameProps={{ onChange: handleUpdateSet, value: name }}
      textAreaProps={{ onChange: handleUpdateSet, value: description }}
      weekDaySelectProps={{
        onChange: handleUpdateWeekDay,
      }}
      Buttons={
        <>
          <Button onClick={onCancel} style={{ marginRight: "12px" }}>
            <Icon
              width="20px"
              overflow="visible"
              iconName="ban"
              color="colorWhite"
            />
          </Button>
          <Button
            disabled={cantSave}
            data-testid="btn-save-set"
            onClick={handleSave}
          >
            <Icon width="20px" iconName="save" color="colorWhite" />
          </Button>
        </>
      }
      TableComponent={
        <>
          <AddSetupInputs
            handleAddSetup={handleAddSetup}
            values={exerciseSetup}
            handleChange={handleUpdateSetup}
          />
          <SetupsAdded
            setups={setups}
            handleRemoveSetup={handleRemoveSetupFromSetups}
          />
        </>
      }
    />
  );
};

export { ActiveWorkoutSetAdd };
