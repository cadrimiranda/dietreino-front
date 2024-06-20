import { useContext } from "react";
import Input from "antd/lib/input";
import { ExerciseSetup } from "../workoutTypes";
import { ActiveWorkoutSetContext } from "../ActiveWorkoutContext";
import { RemoveRowDeleteIcon } from "../utils/RemoveRowDeleteIcon";
import { ExerciseAutocomplete } from "../../../exercise/exerciseAutocomplete/ExerciseAutocomplete";

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
        <Input
          value={value}
          name={name}
          id={id}
          aria-label={`input of ${name}`}
          onChange={handleOnChange}
        />
      );
    }

    return (
      <ExerciseAutocomplete
        value={value}
        onSelect={(_, option) => {
          handleUpdateExercise(option, setupId);
        }}
      />
    );
  };

  return (
    <td className="px-2 py-1">
      {isEditing ? getEditCell() : <span>{value}</span>}
    </td>
  );
};

const ActiveWorkoutExerciseSetup = ({
  setup,
  handleRemove,
}: {
  setup: ExerciseSetup;
  handleRemove: (setuptId?: string) => void;
}) => {
  const {
    exercise: { name },
    series,
    repetitions,
    rest,
    id: setupId,
  } = setup;
  const { isEditing } = useContext(ActiveWorkoutSetContext);

  return (
    <tr>
      <SetupItem value={name} name="exercise" autocomplete setupId={setupId} />
      <SetupItem name="series" value={series} setupId={setupId} />
      <SetupItem name="repetitions" value={repetitions} setupId={setupId} />
      <SetupItem name="rest" value={rest} setupId={setupId} />
      {isEditing && (
        <td className="px-2 py-1">
          <RemoveRowDeleteIcon
            hasConfirmDialog
            onConfirm={() => handleRemove(setupId)}
          />
        </td>
      )}
    </tr>
  );
};

export { ActiveWorkoutExerciseSetup };
