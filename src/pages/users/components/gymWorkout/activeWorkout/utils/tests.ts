import { fireEvent, screen, within } from "@testing-library/dom";
import { setupDTO } from "../workoutTypes";
import { TestUtils } from "../../../../../../utils/testUtils";

export const fillNewSetup = async (setup: setupDTO, mockGet: jest.Mock) => {
  mockGet.mockResolvedValue([
    { value: setup.exerciseId, label: setup.exerciseName },
  ]);
  TestUtils.changeByPlaceholder("Series", setup.series);
  TestUtils.changeByPlaceholder("Reps", setup.repetitions);
  TestUtils.changeByPlaceholder("Rest", setup.rest);

  await TestUtils.changeAutocompleteValue(1, setup.exerciseName, mockGet);

  const saveButton = screen.getByTestId("save-setup-button");
  fireEvent.click(saveButton);
};

export const verifySetupInputs = async (
  setup: Pick<setupDTO, "series" | "rest" | "repetitions" | "exerciseName">,
  row = 2
) => {
  const rows = await screen.findAllByRole("row");
  const setupRow = within(rows[row]);
  expect(
    setupRow.getByRole("textbox", { name: "input of series" })
  ).toHaveValue(setup.series);
  expect(
    setupRow.getByRole("textbox", { name: "input of repetitions" })
  ).toHaveValue(setup.repetitions);
  expect(setupRow.getByRole("textbox", { name: "input of rest" })).toHaveValue(
    setup.rest
  );
  expect(setupRow.getByRole("combobox")).toHaveValue(setup.exerciseName);
};
