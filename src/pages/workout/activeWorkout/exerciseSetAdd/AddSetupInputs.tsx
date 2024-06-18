import Button from "antd/lib/button";
import { setupDTO } from "../workoutTypes";
import { ExerciseAutocomplete } from "../../../exercise/exerciseAutocomplete/ExerciseAutocomplete";
import { Icon } from "../../../../components/Icon";

export type handleChangeProps = {
  name?: string;
  value?: string;
  option?: { label: string; value: string };
};

export const AddSetupInputs = ({
  values,
  handleChange,
  handleAddSetup,
}: {
  values: setupDTO;
  handleChange: (props: handleChangeProps) => void;
  handleAddSetup: () => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <tr>
      <td>
        <ExerciseAutocomplete
          value={values.exerciseName}
          onSelect={(_, option) => handleChange({ option })}
        />
      </td>
      <td>
        <input
          name="series"
          value={values.series}
          onChange={handleInputChange}
          placeholder="Series"
        />
      </td>
      <td>
        <input
          name="repetitions"
          value={values.repetitions}
          onChange={handleInputChange}
          placeholder="Reps"
        />
      </td>
      <td>
        <input
          name="rest"
          value={values.rest}
          onChange={handleInputChange}
          placeholder="Rest"
        />
      </td>
      <td>
        <Button
          data-testid="save-setup-button"
          size="small"
          onClick={handleAddSetup}
        >
          <Icon width="10px" iconName="check" color="colorWhite" />
        </Button>
      </td>
    </tr>
  );
};