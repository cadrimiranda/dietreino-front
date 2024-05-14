import Button from "antd/lib/button";
import { Check, CustomIcon } from "../../../../../components/icons";
import { ExerciseAutocomplete } from "../../exerciseAutocomplete/ExerciseAutocomplete";
import { setupDTO } from "../workoutTypes";

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
        <Button size="small" onClick={handleAddSetup}>
          <CustomIcon width="10px" icon={Check} color="colorWhite" />
        </Button>
      </td>
    </tr>
  );
};
