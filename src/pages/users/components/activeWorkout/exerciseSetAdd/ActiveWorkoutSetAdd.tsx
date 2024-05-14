import { Flex } from "antd";
import { useState } from "react";
import { ExerciseSetTable } from "../utils/ExerciseSetTable";
import { ExerciseSet, ExerciseSetup } from "../workoutTypes";
import { ExerciseSetWrapper } from "../utils/ExerciseSetWrapper";
import Button from "antd/lib/button";
import AutoComplete from "antd/lib/auto-complete";
import {
  Ban,
  Check,
  CustomIcon,
  Save,
  Xmark,
} from "../../../../../components/icons";
import useExerciseAutocomplete from "../../../hooks/useExerciseAutocomplete";
import { useFetch } from "use-http";

type setupDTO = Omit<ExerciseSetup, "id" | "exercise"> & {
  exerciseId: string;
  exerciseName: string;
};

type ExerciseSetDTO = Omit<ExerciseSet, "id" | "exerciseSetupList"> & {
  exerciseSetupList: setupDTO[];
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
  const { post } = useFetch(`/workout/${workoutId}/exercise-set`, {
    method: "POST",
  });
  const [exerciseSet, setExerciseSet] = useState<{
    name: string;
    description: string;
  }>({
    description: "",
    name: "",
  });

  const [setups, setSetups] = useState<setupDTO[]>([]);
  const [exerciseSetup, setExerciseSetup] = useState<setupDTO>({
    exerciseId: "",
    exerciseName: "",
    series: "",
    repetitions: "",
    observation: "",
    rest: "",
  });
  const { description, name } = exerciseSet;

  const { fetchAutocomplete, results } = useExerciseAutocomplete();

  const handleUpdateSetup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseSetup({
      ...exerciseSetup,
      [e.target.name]: e.target.value,
    });
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
    post(newExerciseSet).then(refetchWorkout).finally(onCancel);
  };

  const handleAddSetup = () => {
    setSetups([...setups, exerciseSetup]);
    setExerciseSetup({
      exerciseId: "",
      exerciseName: "",
      series: "",
      repetitions: "",
      observation: "",
      rest: "",
    });
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
        <tr>
          <td>
            <AutoComplete
              size="small"
              style={{ width: "200px" }}
              backfill
              allowClear
              options={results}
              value={exerciseSetup.exerciseName}
              onSelect={(_, option: { label: string; value: string }) => {
                setExerciseSetup({
                  ...exerciseSetup,
                  exerciseId: option.value,
                  exerciseName: option.label,
                });
              }}
              onChange={(value: string, option) => {
                fetchAutocomplete(value);
                if (!Array.isArray(option)) {
                  setExerciseSetup({
                    ...exerciseSetup,
                    exerciseId: option.value,
                    exerciseName: option.label,
                  });
                }
              }}
            />
          </td>
          <td>
            <input
              name="series"
              value={exerciseSetup.series}
              onChange={handleUpdateSetup}
              style={{ width: "60%" }}
              placeholder="Series"
            />
          </td>
          <td>
            <input
              name="repetitions"
              value={exerciseSetup.repetitions}
              onChange={handleUpdateSetup}
              style={{ width: "60%" }}
              placeholder="Reps"
            />
          </td>
          <td>
            <input
              name="rest"
              value={exerciseSetup.rest}
              onChange={handleUpdateSetup}
              style={{ width: "60%" }}
              placeholder="Rest"
            />
          </td>
          <td>
            <Button onClick={handleAddSetup}>
              <CustomIcon width="10px" icon={Check} color="colorWhite" />
            </Button>
          </td>
        </tr>
        {setups.map((setup) => (
          <tr>
            <td>{setup.exerciseName}</td>
            <td>{setup.series}</td>
            <td>{setup.repetitions}</td>
            <td>{setup.rest}</td>
            <td>
              <Button
                type="primary"
                danger
                onClick={() => handleRemoveSetup(setup.exerciseId)}
              >
                <CustomIcon width="10px" icon={Xmark} color="colorWhite" />
              </Button>
            </td>
          </tr>
        ))}
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
