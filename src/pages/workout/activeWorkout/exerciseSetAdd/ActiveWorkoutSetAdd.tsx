import { Flex } from "antd";
import { useState } from "react";
import { ExerciseSetTable } from "../utils/ExerciseSetTable";
import { ExerciseSetWrapper } from "../utils/ExerciseSetWrapper";
import Button from "antd/lib/button";
import { ExerciseSetDTO, Workout } from "../workoutTypes";
import { SetupsAdded } from "./SetupsAdded";
import { AddSetupInputs } from "./AddSetupInputs";
import { useAddSetupToSet } from "../../hooks/useAddSetupToSet";
import { useSetupState } from "../../hooks/useSetupState";
import { Icon } from "../../../../components/Icon";

const DEFAULT_SET = {
  description: "",
  name: "",
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
  const [exerciseSet, setExerciseSet] = useState({ ...DEFAULT_SET });

  const {
    exerciseSetup,
    clearSetup,
    clearSetups,
    handleUpdateSetup,
    handleAddSetup,
    setups,
    handleRemoveSetupFromSetups,
  } = useSetupState();
  const { description, name } = exerciseSet;

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

  return (
    <ExerciseSetWrapper>
      <Flex className="user-gym-plan-header" justify="space-between">
        <input
          name="name"
          value={name}
          onChange={handleUpdateSet}
          style={{ width: "60%" }}
          placeholder="Nome do set"
        />
        <div>
          <Button onClick={onCancel} style={{ marginRight: "12px" }}>
            <Icon
              width="20px"
              overflow="visible"
              iconName="ban"
              color="colorWhite"
            />
          </Button>
          <Button data-testid="btn-save-set" onClick={handleSave}>
            <Icon width="20px" iconName="save" color="colorWhite" />
          </Button>
        </div>
      </Flex>
      <ExerciseSetTable actionButtons>
        <AddSetupInputs
          handleAddSetup={handleAddSetup}
          values={exerciseSetup}
          handleChange={handleUpdateSetup}
        />
        <SetupsAdded
          setups={setups}
          handleRemoveSetup={handleRemoveSetupFromSetups}
        />
      </ExerciseSetTable>

      <textarea
        name="description"
        className="user-gym-plan-obs"
        placeholder="Observações"
        value={description}
        onChange={handleUpdateSet}
      />
    </ExerciseSetWrapper>
  );
};

export { ActiveWorkoutSetAdd };
