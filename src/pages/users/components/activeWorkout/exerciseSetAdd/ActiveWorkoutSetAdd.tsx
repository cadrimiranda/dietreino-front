import { Flex } from "antd";
import { useState } from "react";
import { ExerciseSetTable } from "../utils/ExerciseSetTable";
import { ExerciseSetWrapper } from "../utils/ExerciseSetWrapper";
import Button from "antd/lib/button";
import { Ban, CustomIcon, Save } from "../../../../../components/icons";
import { ExerciseSetDTO, setupDTO } from "../workoutTypes";
import { SetupsAdded } from "./SetupsAdded";
import { AddSetupInputs, handleChangeProps } from "./AddSetupInputs";
import { useAddSetupToSet } from "../../../hooks/useAddSetupToSet";

const DEFAULT_SETUP: setupDTO = {
  exerciseId: "",
  exerciseName: "",
  series: "",
  repetitions: "",
  observation: "",
  rest: "",
};

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
  refetchWorkout: () => void;
}) => {
  const { addSetupsToSet } = useAddSetupToSet(workoutId);
  const [exerciseSet, setExerciseSet] = useState({ ...DEFAULT_SET });

  const [setups, setSetups] = useState<setupDTO[]>([]);
  const [exerciseSetup, setExerciseSetup] = useState({
    ...DEFAULT_SETUP,
  });
  const { description, name } = exerciseSet;

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

  const handleUpdateSet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExerciseSet({
      ...exerciseSet,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const newExerciseSet: ExerciseSetDTO = {
      ...exerciseSet,
      exerciseSetupList: setups,
    };
    addSetupsToSet(newExerciseSet).then(refetchWorkout).finally(onCancel);
  };

  const handleAddSetup = () => {
    setSetups([...setups, exerciseSetup]);
    setExerciseSetup({ ...DEFAULT_SETUP });
  };

  const handleRemoveSetup = (exerciseId: string) => {
    setSetups(setups.filter((setup) => setup.exerciseId !== exerciseId));
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
            <CustomIcon
              width="20px"
              overflow="visible"
              icon={Ban}
              color="colorWhite"
            />
          </Button>
          <Button onClick={handleSave}>
            <CustomIcon width="20px" icon={Save} color="colorWhite" />
          </Button>
        </div>
      </Flex>
      <ExerciseSetTable actionButtons>
        <AddSetupInputs
          handleAddSetup={handleAddSetup}
          values={exerciseSetup}
          handleChange={handleUpdateSetup}
        />
        <SetupsAdded setups={setups} handleRemoveSetup={handleRemoveSetup} />
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
