import { useContext, useState } from "react";
import AutoComplete from "antd/lib/auto-complete";
import { ExerciseSetup } from "../workoutTypes";
import { ActiveWorkoutSetContext } from "../ActiveWorkoutContext";
import useExerciseAutocomplete from "../../../hooks/useExerciseAutocomplete";

const SetupItem = ({
  value,
  autocomplete,
  name,
  setupId,
}: {
  name: string;
  value: string;
  setupId: string;
  autocomplete?: boolean;
}) => {
  const { isEditing, handleUpdateExercise, handleUpdateSet } = useContext(
    ActiveWorkoutSetContext
  );
  const [exerciseName, setExerciseName] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateSet(e.target.name, e.target.value, setupId);
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
          handleUpdateExercise(option, setupId);
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

const ActiveWorkoutExerciseSetup = ({ setup }: { setup: ExerciseSetup }) => {
  const {
    exercise: { name },
    series,
    repetitions,
    rest,
    id: setupId,
  } = setup;

  return (
    <tr>
      <SetupItem value={name} name="exercise" autocomplete setupId={setupId} />
      <SetupItem name="series" value={series} setupId={setupId} />
      <SetupItem name="repetitions" value={repetitions} setupId={setupId} />
      <SetupItem name="rest" value={rest} setupId={setupId} />
    </tr>
  );
};

export { ActiveWorkoutExerciseSetup };
