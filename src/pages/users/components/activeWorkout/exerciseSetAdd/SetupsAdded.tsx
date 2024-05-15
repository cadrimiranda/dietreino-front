import { setupDTO } from "../workoutTypes";
import { RemoveRowDeleteIcon } from "../utils/RemoveRowDeleteIcon";

export const SetupsAdded = ({
  setups,
  handleRemoveSetup,
}: {
  setups: setupDTO[];
  handleRemoveSetup: (id: string) => void;
}) =>
  setups.map((setup) => (
    <tr>
      <td>{setup.exerciseName}</td>
      <td>{setup.series}</td>
      <td>{setup.repetitions}</td>
      <td>{setup.rest}</td>
      <td>
        <RemoveRowDeleteIcon
          handleClick={() => handleRemoveSetup(setup.exerciseId)}
        />
      </td>
    </tr>
  ));
