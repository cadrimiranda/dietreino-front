import { Flex } from "antd/lib";
import { useContext, useState } from "react";
import { ActiveWorkoutPage } from "./activeWorkout/ActiveWorkoutPage";
import { ActiveWorkoutSetAdd } from "./activeWorkout/exerciseSetAdd/ActiveWorkoutSetAdd";
import { useGetUserActiveWorkout } from "./hooks/useGetUserActiveWorkout";
import { NewWorkoutModal } from "./NewWorkoutModal";
import { Workout } from "./activeWorkout/workoutTypes";
import { WorkoutContext } from "./WorkoutContext";
import { UserGymPlanActionButtons } from "./WorkoutActionButtons";
import { UserEntryLayout } from "../users/components/UserEntryLayoutt";
import { UserPageContext } from "../users/components/UserPageContext";

const WorkoutPage = () => {
  const { user } = useContext(UserPageContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { activeWorkout, setActiveWorkout, fetchActiveWorkout } =
    useGetUserActiveWorkout(user?.id);

  const handleAdd = () => {
    if (activeWorkout) {
      setIsAdding(true);
      return;
    }

    setIsCreating(true);
  };

  const handleOkModal = (workout: Workout) => {
    setActiveWorkout(workout);
    setIsCreating(false);
  };

  return (
    <UserEntryLayout
      actionsButtons={
        <UserGymPlanActionButtons
          handleAdd={handleAdd}
          workoutId={activeWorkout?.id}
          handleClearWorkout={() => setActiveWorkout(undefined)}
        />
      }
    >
      {isCreating && (
        <NewWorkoutModal
          onCancel={() => setIsCreating(false)}
          onOk={handleOkModal}
          userId={user?.id || ""}
        />
      )}
      {activeWorkout && (
        <WorkoutContext.Provider value={{ activeWorkout, setActiveWorkout }}>
          <h1>{activeWorkout?.name}</h1>
          <Flex wrap="wrap" justify="space-around">
            {isAdding && (
              <ActiveWorkoutSetAdd
                workoutId={activeWorkout.id}
                refetchWorkout={fetchActiveWorkout}
                onCancel={() => setIsAdding(false)}
              />
            )}
            <ActiveWorkoutPage
              activeWorkout={activeWorkout}
              isAddingSets={isAdding}
            />
          </Flex>
        </WorkoutContext.Provider>
      )}
      {!activeWorkout && (
        <div className="no-active-workout-wrapper">
          <h1>Oops! Nenhum treino ativo encontrado</h1>
          <div className="no-active-workout-bg" />
          <p>
            Parece que {user?.fullName} não tem nenhum treino ativo no momento,
            mas fique tranquilo você pode criar um clicando no botão adicionar
            no topo da página.
          </p>
        </div>
      )}
    </UserEntryLayout>
  );
};

export { WorkoutPage };
