import Button from "antd/lib/button";
import { CustomIcon, Xmark } from "../../../../../components/icons";
import { setupDTO } from "../workoutTypes";

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
        <Button
          type="primary"
          danger
          onClick={() => handleRemoveSetup(setup.exerciseId)}
        >
          <CustomIcon width="10px" icon={Xmark} color="colorWhite" />
        </Button>
      </td>
    </tr>
  ));
