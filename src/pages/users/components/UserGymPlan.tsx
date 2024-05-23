import { Flex } from "antd/lib";
import { CustomIcon, Plus } from "../../../components/icons";
import { UserEntryLayout } from "./UserEntryLayoutt";
import { useContext, useState } from "react";
import Button from "antd/lib/button";
import { ActiveWorkoutPage } from "./activeWorkout/ActiveWorkoutPage";
import { ActiveWorkoutSetAdd } from "./activeWorkout/exerciseSetAdd/ActiveWorkoutSetAdd";
import { useGetUserActiveWorkout } from "../hooks/useGetUserActiveWorkout";
import { UserPageContext } from "./UserPageContext";
import { NewWorkoutModal } from "./NewWorkoutModal";
import { Workout } from "./activeWorkout/workoutTypes";

const UserGymPlan = () => {
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
    <UserEntryLayout>
      <Button
        style={{ marginLeft: "16px" }}
        onClick={handleAdd}
        icon={
          <CustomIcon
            icon={Plus}
            color="colorWhite"
            width="1rem"
            height="1rem"
          />
        }
        size="large"
      >
        Adicionar {activeWorkout ? "exercícios" : "treino"}
      </Button>
      {isCreating && (
        <NewWorkoutModal
          onCancel={() => setIsCreating(false)}
          onOk={handleOkModal}
          userId={user?.id}
        />
      )}
      {activeWorkout && (
        <>
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
        </>
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

export { UserGymPlan };
