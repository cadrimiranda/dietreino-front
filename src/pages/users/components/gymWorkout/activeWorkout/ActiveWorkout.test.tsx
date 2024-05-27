import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { ActiveWorkoutPage } from "./ActiveWorkoutPage";
import { Workout } from "./workoutTypes";

describe("Active Workout", () => {
  const activeWorkout: Workout = {
    id: "1",
    name: "Treino A",
    exerciseSets: [
      {
        description: "Treino de peito",
        id: "1",
        name: "Peito",
        exerciseSetupList: [
          {
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
          },
        ],
      },
    ],
    description: "Treino de peito",
  };

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

  it("should render exercise sets", () => {
    const { exerciseSets } = activeWorkout;
    const [{ description, name, exerciseSetupList }] = exerciseSets;
    const [{ exercise, repetitions, rest, series }] = exerciseSetupList;
    render(<ActiveWorkoutPage activeWorkout={activeWorkout} />);
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(exercise.name)).toBeInTheDocument();
    expect(screen.getByText(repetitions)).toBeInTheDocument();
    expect(screen.getByText(rest)).toBeInTheDocument();
    expect(screen.getByText(series)).toBeInTheDocument();
  });
});
