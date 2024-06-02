import { screen, within } from "@testing-library/dom";
import { ExerciseSet, ExerciseSetup, Workout, setupDTO } from "../workoutTypes";
import { TestUtils } from "../../../../../../utils/testUtils";
import { ActiveWorkoutPage } from "../ActiveWorkoutPage";
import { render } from "@testing-library/react";

export const newSetup: setupDTO = {
  exerciseId: "2",
  exerciseName: "Supino inclinado",
  repetitions: "12",
  series: "3",
  rest: "45seg",
  observation: "be careful",
};

export const exerciseSetup: ExerciseSetup = {
  id: "1",
  exercise: {
    id: "1",
    name: "Supino",
    description: "Supino reto",
  },
  repetitions: "10",
  series: "4",
  rest: "60seg",
  observation: "be careful",
};

export const exerciseSet: ExerciseSet = {
  description: "Treino de peito",
  id: "1",
  name: "Peito",
  exerciseSetupList: [exerciseSetup],
};

export const activeWorkout: Workout = {
  id: "1",
  name: "Treino A",
  exerciseSets: [exerciseSet],
  description: "Treino de peito",
  endDate: "2021-01-02",
  startDate: "2021-01-01",
};

export const fillNewSetup = async (
  setup: setupDTO,
  mockGet: jest.Mock,
  autoComplete = 1
) => {
  mockGet.mockResolvedValueOnce([
    { value: setup.exerciseId, label: setup.exerciseName },
  ]);
  TestUtils.changeByPlaceholder("Series", setup.series);
  TestUtils.changeByPlaceholder("Reps", setup.repetitions);
  TestUtils.changeByPlaceholder("Rest", setup.rest);

  await TestUtils.changeAutocompleteValue(
    autoComplete,
    setup.exerciseName,
    mockGet
  );

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
