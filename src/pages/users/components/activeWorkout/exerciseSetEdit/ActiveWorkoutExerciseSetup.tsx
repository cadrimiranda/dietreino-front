import { useContext } from "react";
import { ExerciseSetup } from "../workoutTypes";
import { ActiveWorkoutSetContext } from "../ActiveWorkoutContext";
import { ExerciseAutocomplete } from "../../exerciseAutocomplete/ExerciseAutocomplete";
import { RemoveRowDeleteIcon } from "../utils/RemoveRowDeleteIcon";

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateSet(e.target.name, e.target.value, setupId);
  };

  const getEditCell = () => {
    const id = `exercise-setup-${name}`;
    if (!autocomplete) {
      return (
        <input value={value} name={name} id={id} onChange={handleOnChange} />
      );
    }

    return (
      <ExerciseAutocomplete
        onSelect={(_, option) => {
          handleUpdateExercise(option, setupId);
        }}
      />
    );
  };

  return <td>{isEditing ? getEditCell() : <span>{value}</span>}</td>;
};

const ActiveWorkoutExerciseSetup = ({
  setup,
  handleRemove,
}: {
  setup: ExerciseSetup;
  handleRemove: (setuptId: string) => void;
}) => {
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
      <td>
        <RemoveRowDeleteIcon
          hasConfirmDialog
          onConfirm={() => handleRemove(setupId)}
        />
      </td>
    </tr>
  );
};

export { ActiveWorkoutExerciseSetup };
