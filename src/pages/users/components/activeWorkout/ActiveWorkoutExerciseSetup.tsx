import { useContext } from "react";
import { ExerciseSetup } from "./workoutTypes";
import { ActiveWorkoutContext } from "./ActiveWorkoutContext";

const SetupItem = ({ value, name }: { value: string; name: string }) => {
  const { isEditing, handleChange } = useContext(ActiveWorkoutContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value);
  };

  return (
    <td>
      {isEditing ? (
        <input value={value} onChange={handleOnChange} />
      ) : (
        <span>{value}</span>
      )}
    </td>
  );
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
      <SetupItem name={`${basePath}.exercise.name`} value={name} />
      <SetupItem name={`${basePath}.series`} value={series} />
      <SetupItem name={`${basePath}.repetitions`} value={repetitions} />
      <SetupItem name={`${basePath}.rest`} value={rest} />
    </tr>
  );
};

export { ActiveWorkoutExerciseSetup };
