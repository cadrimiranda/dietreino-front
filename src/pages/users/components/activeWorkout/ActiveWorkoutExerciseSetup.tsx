import { useContext, useState } from "react";
import AutoComplete from "antd/lib/auto-complete";
import { ExerciseSetup } from "./workoutTypes";
import {
  ActiveWorkoutContext,
  ActiveWorkoutSetContext,
} from "./ActiveWorkoutContext";
import useExerciseAutocomplete from "../../hooks/useExerciseAutocomplete";

const SetupItem = ({
  value,
  path,
  autocomplete,
  setIndex = 0,
  setupIndex = 0,
}: {
  value: string;
  path: string;
  autocomplete?: boolean;
  setIndex?: number;
  setupIndex?: number;
}) => {
  const { handleChange, handleUpdateExercise } =
    useContext(ActiveWorkoutContext);
  const { isEditing } = useContext(ActiveWorkoutSetContext);
  const [name, setName] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(path, e.target.value);
  };

  const { fetchAutocomplete, results } = useExerciseAutocomplete();

  const getEditCell = () => {
    if (!autocomplete) {
      return <input value={value} onChange={handleOnChange} />;
    }

    return (
      <AutoComplete
        size="small"
        style={{ width: "200px" }}
        backfill
        allowClear
        options={results}
        value={name}
        onSelect={(_, option: { label: string; value: string }) => {
          setName(option.label);
          handleUpdateExercise({
            setIndex,
            setupIndex,
            exerciseId: option.value,
            exerciseName: option.label,
          });
        }}
        onChange={(value: string, option) => {
          fetchAutocomplete(value);
          if (!Array.isArray(option)) {
            setName(option.label);
          }
        }}
      />
    );
  };

  return <td>{isEditing ? getEditCell() : <span>{value}</span>}</td>;
};

const ActiveWorkoutExerciseSetup = ({
  setup,
  index,
  setIndex,
}: {
  setup: ExerciseSetup;
  index: number;
  setIndex: number;
}) => {
  const {
    exercise: { name },
    series,
    repetitions,
    rest,
  } = setup;
  const basePath = `exerciseSets.${setIndex}.exerciseSetupList.${index}`;

  return (
    <tr>
      <SetupItem
        path={`${basePath}.exercise.name`}
        value={name}
        autocomplete
        setIndex={setIndex}
        setupIndex={index}
      />
      <SetupItem path={`${basePath}.series`} value={series} />
      <SetupItem path={`${basePath}.repetitions`} value={repetitions} />
      <SetupItem path={`${basePath}.rest`} value={rest} />
    </tr>
  );
};

export { ActiveWorkoutExerciseSetup };
