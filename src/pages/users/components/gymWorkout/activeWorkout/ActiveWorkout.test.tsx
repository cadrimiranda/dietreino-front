import "@testing-library/jest-dom";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

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
import { ExerciseSet, ExerciseSetup, Workout, setupDTO } from "./workoutTypes";
import { TestUtils } from "../../../../../utils/testUtils";
import { fillNewSetup, verifySetupInputs } from "./utils/tests";

const newSetup: setupDTO = {
  exerciseId: "2",
  exerciseName: "Supino inclinado",
  repetitions: "12",
  series: "3",
  rest: "45seg",
  observation: "be careful",
};

const exerciseSetup: ExerciseSetup = {
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
const existingSetupDTO: setupDTO = {
  exerciseId: exerciseSetup.exercise.id,
  exerciseName: exerciseSetup.exercise.name,
  repetitions: exerciseSetup.repetitions,
  rest: exerciseSetup.rest,
  series: exerciseSetup.series,
  observation: exerciseSetup.observation,
};
const exerciseSet: ExerciseSet = {
  description: "Treino de peito",
  id: "1",
  name: "Peito",
  exerciseSetupList: [exerciseSetup],
};
const activeWorkout: Workout = {
  id: "1",
  name: "Treino A",
  exerciseSets: [exerciseSet],
  description: "Treino de peito",
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

      fireEvent.click(button);

      icon = screen.getByTestId("save-icon");
      expect(icon).toBeInTheDocument();

      deleteIcon = screen.queryByTestId("remove-row-delete-icon");
      expect(deleteIcon).not.toBeNull();
    });

    it("should be able to edit and table row has inputs", () => {
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
      const button = screen.getByTestId(`edit-set-${exerciseSet.name}`);

      fireEvent.click(button);
      verifySetupInputs(existingSetupDTO, 1);
    });

    it("should edit and show inputs for new setup", () => {
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
      const button = screen.getByTestId(`edit-set-${exerciseSet.name}`);
      fireEvent.click(button);

      let input = screen.getByPlaceholderText("Series");
      expect(input).toHaveValue("");

      input = screen.getByPlaceholderText("Reps");
      expect(input).toHaveValue("");

      input = screen.getByPlaceholderText("Rest");
      expect(input).toHaveValue("");

      const autocomplete = screen.getAllByRole("combobox");
      expect(autocomplete[1]).toHaveValue("");

      const saveButton = screen.getByTestId("save-setup-button");
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).not.toBeDisabled();
    });

    it("should add new setup", async () => {
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
      const button = screen.getByTestId(`edit-set-${exerciseSet.name}`);
      fireEvent.click(button);

      await fillNewSetup(newSetup, mockGet);
      await verifySetupInputs(newSetup);
    });

    it("should save new setup", async () => {
      mockPut.mockResolvedValue({});
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
      const button = screen.getByTestId(`edit-set-${exerciseSet.name}`);
      fireEvent.click(button);

      await fillNewSetup(newSetup, mockGet);

      fireEvent.click(button);

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
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
      const button = screen.getByTestId(`edit-set-${exerciseSet.name}`);
      fireEvent.click(button);

      await fillNewSetup(newSetup, mockGet);
      let rows = await screen.findAllByRole("row");
      expect(rows).toHaveLength(4); // 0 - header, 1 - existing setup, 2 - new setup, 3 - inputs row

      const removeButton = screen.getAllByTestId("remove-row-delete-icon")[1];
      fireEvent.click(removeButton);
      await screen.findByText(
        "Ao remover o exercicio, ele será excluído desse treino. Deseja continuar?"
      );
      fireEvent.click(screen.getByText("Sim"));

      rows = await screen.findAllByRole("row");
      expect(rows).toHaveLength(3);
    });

    it("should remove saved setup", async () => {
      mockDel.mockResolvedValue({});
      render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
      const button = screen.getByTestId(`edit-set-${exerciseSet.name}`);
      fireEvent.click(button);

      const removeButton = screen.getAllByTestId("remove-row-delete-icon")[0];
      fireEvent.click(removeButton);
      fireEvent.click(screen.getByText("Sim"));

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
});
