import { screen, within } from "@testing-library/dom";
import { Workout, setupDTO } from "../workoutTypes";
import { TestUtils } from "../../../../../../utils/testUtils";
import { ActiveWorkoutPage } from "../ActiveWorkoutPage";
import { render } from "@testing-library/react";

export const fillNewSetup = async (setup: setupDTO, mockGet: jest.Mock) => {
  mockGet.mockResolvedValue([
    { value: setup.exerciseId, label: setup.exerciseName },
  ]);
  TestUtils.changeByPlaceholder("Series", setup.series);
  TestUtils.changeByPlaceholder("Reps", setup.repetitions);
  TestUtils.changeByPlaceholder("Rest", setup.rest);

  await TestUtils.changeAutocompleteValue(1, setup.exerciseName, mockGet);

  const saveButton = screen.getByTestId("save-setup-button");
  TestUtils.clickEvent(saveButton);
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

export const verifyEmptyInputs = async () => {
  TestUtils.checkTextByPlaceholder("Series", "");
  TestUtils.checkTextByPlaceholder("Reps", "");
  TestUtils.checkTextByPlaceholder("Rest", "");

  const autocomplete = screen.getAllByRole("combobox");
  expect(autocomplete[autocomplete.length - 1]).toHaveValue("");
};

export const editExerciseSet = (activeWorkout: Workout) => {
  render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
  const button = screen.getByTestId(
    `edit-set-${activeWorkout.exerciseSets[0].name}`
  );
  TestUtils.clickEvent(button);
  return button;
};

export const clickToRemoveSetup = (setupIndex: number) => {
  const removeButton = screen.getAllByTestId("remove-row-delete-icon")[
    setupIndex
  ];
  TestUtils.clickEvent(removeButton);
  TestUtils.clickEvent(screen.getByText("Sim"));
};
