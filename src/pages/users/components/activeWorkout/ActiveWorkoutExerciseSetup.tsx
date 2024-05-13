import { useContext, useState } from "react";
import AutoComplete from "antd/lib/auto-complete";
import { ExerciseSetup } from "./workoutTypes";
import { ActiveWorkoutSetContext } from "./ActiveWorkoutContext";
import useExerciseAutocomplete from "../../hooks/useExerciseAutocomplete";

const SetupItem = ({
  value,
  autocomplete,
  name,
  setupIndex,
}: {
  name: string;
  value: string;
  setupIndex: number;
  autocomplete?: boolean;
}) => {
  const { isEditing, handleUpdateExercise, handleUpdateSet } = useContext(
    ActiveWorkoutSetContext
  );
  const [exerciseName, setExerciseName] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateSet(e.target.name, e.target.value, setupIndex);
  };

  const { fetchAutocomplete, results } = useExerciseAutocomplete();

  const getEditCell = () => {
    const id = `exercise-setup-${name}`;
    if (!autocomplete) {
      return (
        <input value={value} name={name} id={id} onChange={handleOnChange} />
      );
    }

    return (
      <AutoComplete
        size="small"
        style={{ width: "200px" }}
        backfill
        allowClear
        options={results}
        value={exerciseName}
        onSelect={(_, option: { label: string; value: string }) => {
          setExerciseName(option.label);
          handleUpdateExercise(option, setupIndex);
        }}
        onChange={(value: string, option) => {
          fetchAutocomplete(value);
          if (!Array.isArray(option)) {
            setExerciseName(option.label);
          }
        }}
      />
    );
  };

  return <td>{isEditing ? getEditCell() : <span>{value}</span>}</td>;
};

const ActiveWorkoutExerciseSetup = ({
  setup,
  setupIndex,
}: {
  setup: ExerciseSetup;
  setupIndex: number;
}) => {
  const {
    exercise: { name },
    series,
    repetitions,
    rest,
  } = setup;

  return (
    <tr>
      <SetupItem
        value={name}
        name="exercise"
        autocomplete
        setupIndex={setupIndex}
      />
      <SetupItem name="series" value={series} setupIndex={setupIndex} />
      <SetupItem
        name="repetitions"
        value={repetitions}
        setupIndex={setupIndex}
      />
      <SetupItem name="rest" value={rest} setupIndex={setupIndex} />
    </tr>
  );
};

export { ActiveWorkoutExerciseSetup };
