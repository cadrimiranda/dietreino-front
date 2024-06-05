import { ActiveWorkoutExerciseSet } from "./exerciseSetEdit/ActiveWorkoutExerciseSet";
import { Workout } from "./workoutTypes";

import WorkoutWithoutExerciseSets from "../../../../../assets/empty_exercises-2.png";

export type ObjKeyString = { [key: string]: string };

const ActiveWorkoutPage = ({
  activeWorkout,
  isAddingSets,
}: {
  activeWorkout?: Workout;
  isAddingSets?: boolean;
}) => {
  const handleUpdateActiveWorkout = () => {};

  if (!activeWorkout) return null;

  if (!activeWorkout.exerciseSets?.length && !isAddingSets) {
    return (
      <div className="no-active-workout-wrapper">
        <h1>Nenhum exercicio adicionado</h1>
        <img
          src={WorkoutWithoutExerciseSets}
          alt="workout_wihtout_exercise_set"
          className="no-workout-sets-image"
        />
        <p>
          Parece que o treino {activeWorkout.name} não tem nenhum exercício
          adicionado, vocè pode adicionar alguns exercicios clicando no botão
          adicionar à cima.
        </p>
      </div>
    );
  }

  return activeWorkout.exerciseSets.map((exerciseSet) => (
    <ActiveWorkoutExerciseSet
      key={exerciseSet.id}
      exerciseSet={exerciseSet}
      handleUpdateActiveWorkout={handleUpdateActiveWorkout}
    />
  ));
};

export { ActiveWorkoutPage };
