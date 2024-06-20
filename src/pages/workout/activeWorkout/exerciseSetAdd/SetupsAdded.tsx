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
      <td className="px-2 py-1">{setup.exerciseName}</td>
      <td className="px-2 py-1">{setup.series}</td>
      <td className="px-2 py-1">{setup.repetitions}</td>
      <td className="px-2 py-1">{setup.rest}</td>
      <td className="px-2 py-1">
        <RemoveRowDeleteIcon
          handleClick={() => handleRemoveSetup(setup.exerciseId)}
        />
      </td>
    </tr>
  ));
