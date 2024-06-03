import "@testing-library/jest-dom";

import { cleanup, render, screen, waitFor } from "@testing-library/react";

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockDel = jest.fn();
const mockPut = jest.fn();
const mockUseFetch = jest.fn().mockReturnValue({
  get: mockGet,
  post: mockPost,
  del: mockDel,
  put: mockPut,
});
jest.mock("use-http", () => ({
  __esModule: true,
  ...jest.requireActual("use-http"),
  useFetch: mockUseFetch,
}));

import { ActiveWorkoutPage } from "./ActiveWorkoutPage";
import { setupDTO } from "./workoutTypes";
import { TestUtils } from "../../../../../utils/testUtils";
import {
  clickToRemoveSetup,
  editExerciseSet,
  fillNewSetup,
  verifyEmptyInputs,
  verifySetupInputs,
  activeWorkout,
  exerciseSetup,
  exerciseSet,
  newSetup,
} from "./utils/tests";

const existingSetupDTO: setupDTO = {
  exerciseId: exerciseSetup.exercise.id,
  exerciseName: exerciseSetup.exercise.name,
  repetitions: exerciseSetup.repetitions,
  rest: exerciseSetup.rest,
  series: exerciseSetup.series,
  observation: exerciseSetup.observation,
};

describe("Active Workout", () => {
  describe("ActiveWorkoutPage component", () => {
    it("should render null when no workout", () => {
      render(<ActiveWorkoutPage />);
      expect(screen.queryByText("Nenhum exercicio adicionado")).toBeNull();
      expect(screen.queryByTestId("exercise-set-wrapper")).toBeNull();
    });

    it("should render no workout sets image when no exercise sets", () => {
      render(
        <ActiveWorkoutPage
          activeWorkout={{ ...activeWorkout, exerciseSets: [] }}
        />
      );
      expect(
        screen.getByAltText("workout_wihtout_exercise_set")
      ).toBeInTheDocument();
    });
  });

  describe("ActiveWorkoutExerciseSet component", () => {
    beforeEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    it("should render exercise sets", () => {
      const { description, name } = exerciseSet;
      const { exercise, repetitions, rest, series } = exerciseSetup;
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
      TestUtils.textToBeInTheDocument(description);
      TestUtils.textToBeInTheDocument(name);
      TestUtils.textToBeInTheDocument(exercise.name);
      TestUtils.textToBeInTheDocument(repetitions);
      TestUtils.textToBeInTheDocument(rest);
      TestUtils.textToBeInTheDocument(series);
    });

    it("should be able to edit", () => {
      const { name } = exerciseSet;
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);

      const button = screen.getByTestId(`edit-set-${name}`);
      let icon = screen.getByTestId("edit-icon");
      let deleteIcon = screen.queryByTestId("remove-row-delete-icon");

      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(deleteIcon).toBeNull();

      TestUtils.clickEvent(button);

      icon = screen.getByTestId("save-icon");
      expect(icon).toBeInTheDocument();

      deleteIcon = screen.queryByTestId("remove-row-delete-icon");
      expect(deleteIcon).not.toBeNull();
    });

    it("should be able to edit and table row has inputs", () => {
      editExerciseSet(activeWorkout);
      verifySetupInputs(existingSetupDTO, 1);
    });

    it("should edit and show inputs for new setup", () => {
      editExerciseSet(activeWorkout);
      verifyEmptyInputs();

      const saveButton = screen.getByTestId("save-setup-button");
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).not.toBeDisabled();
    });

    it("should add new setup", async () => {
      editExerciseSet(activeWorkout);

      await fillNewSetup(newSetup, mockGet);
      await verifySetupInputs(newSetup);
      verifyEmptyInputs();
    });

    it("should save new setup", async () => {
      mockPut.mockResolvedValue({});
      const editButton = editExerciseSet(activeWorkout);

      await fillNewSetup(newSetup, mockGet);

      TestUtils.clickEvent(editButton);

      await waitFor(() => {
        expect(mockPut).toHaveBeenCalled();
      });

      expect(mockPut).toHaveBeenCalledWith({
        ...exerciseSet,
        exerciseSetupList: [
          {
            id: exerciseSetup.id,
            observation: exerciseSetup.observation,
            exerciseId: exerciseSetup.exercise.id,
            rest: exerciseSetup.rest,
            repetitions: exerciseSetup.repetitions,
            series: exerciseSetup.series,
          },
          {
            id: "",
            observation: "",
            exerciseId: newSetup.exerciseId,
            rest: newSetup.rest,
            repetitions: newSetup.repetitions,
            series: newSetup.series,
          },
        ],
      });
    });

    it("should remove unsaved setup", async () => {
      mockDel.mockResolvedValue({});
      editExerciseSet(activeWorkout);

      await fillNewSetup(newSetup, mockGet);
      let rows = await screen.findAllByRole("row");
      expect(rows).toHaveLength(4); // 0 - header, 1 - existing setup, 2 - new setup, 3 - inputs row

      clickToRemoveSetup(1);

      rows = await screen.findAllByRole("row");
      expect(rows).toHaveLength(3);
      expect(mockDel).not.toHaveBeenCalled();
    });

    it("should remove saved setup", async () => {
      mockDel.mockResolvedValue({});
      editExerciseSet(activeWorkout);

      clickToRemoveSetup(0);

      await waitFor(() => {
        expect(mockDel).toHaveBeenCalled();
      });
      expect(mockDel).toHaveBeenCalledWith(
        `/exercise-set/${exerciseSet.id}/exercise-setup/${exerciseSetup.id}`
      );

      const rows = await screen.findAllByRole("row");
      expect(rows).toHaveLength(2);
    });
  });

  it("should edit exercise set", async () => {
    mockPut.mockResolvedValue({});
    const editButton = editExerciseSet(activeWorkout);
    TestUtils.changeByRole("textbox", "Treino de costas", "Nome do set");
    TestUtils.changeByPlaceholder("Observações", "Cuidado com a postura");

    TestUtils.clickEvent(editButton);

    await waitFor(() => {
      expect(mockPut).toHaveBeenCalled();
    });

    expect(mockPut).toHaveBeenCalledWith({
      ...exerciseSet,
      name: "Treino de costas",
      description: "Cuidado com a postura",
      exerciseSetupList: [
        {
          id: exerciseSetup.id,
          observation: exerciseSetup.observation,
          exerciseId: exerciseSetup.exercise.id,
          rest: exerciseSetup.rest,
          repetitions: exerciseSetup.repetitions,
          series: exerciseSetup.series,
        },
      ],
    });
  });

  const deleteTestId = `delete-set-${exerciseSet.name}`;
  it("should not render delete set button when no editing", () => {
    render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
    const deleteButton = screen.queryByTestId(deleteTestId);
    expect(deleteButton).toBeNull();
  });

  it("should render delete set button when editing", () => {
    editExerciseSet(activeWorkout);

    const deleteButton = screen.queryByTestId(deleteTestId);
    expect(deleteButton).not.toBeNull();
  });

  it("should delete set", async () => {
    mockDel.mockResolvedValue("");
    editExerciseSet(activeWorkout);

    const deleteButton = screen.getByTestId(deleteTestId);
    TestUtils.clickEvent(deleteButton);

    await waitFor(() => {
      expect(mockDel).toHaveBeenCalled();
    });

    expect(mockDel).toHaveBeenCalledWith(
      `/exercise-set/${exerciseSet.id}`,
      undefined
    );
  });
});
