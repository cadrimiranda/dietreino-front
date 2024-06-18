import { Flex, Form } from "antd/lib";
import { useContext, useMemo, useState } from "react";
import { ActiveWorkoutPage } from "./activeWorkout/ActiveWorkoutPage";
import { ActiveWorkoutSetAdd } from "./activeWorkout/exerciseSetAdd/ActiveWorkoutSetAdd";
import { useGetUserActiveWorkout } from "./hooks/useGetUserActiveWorkout";
import { NewWorkoutModal } from "./NewWorkoutModal";
import { Workout } from "./activeWorkout/workoutTypes";
import { WorkoutContext } from "./WorkoutContext";
import { WorkoutActionButtons } from "./WorkoutActionButtons";
import { UserEntryLayout } from "../users/components/UserEntryLayoutt";
import { UserPageContext } from "../users/components/UserPageContext";
import { WorkoutHeader, WorkoutPutFieldType } from "./components/WorkoutHeader";

enum WorkoutStatus {
  adding = "adding",
  creating = "creating",
  editing = "editing",
  none = "none",
}

const WorkoutPage = () => {
  const [form] = Form.useForm();
  const { user } = useContext(UserPageContext);
  const [status, setStatus] = useState<WorkoutStatus>(WorkoutStatus.none);
  const { activeWorkout, setActiveWorkout, fetchActiveWorkout } =
    useGetUserActiveWorkout(user?.id);

  const resetStatus = () => setStatus(WorkoutStatus.none);

  const [isAdding, isCreating, isEditing] = useMemo(
    () => [
      status === WorkoutStatus.adding,
      status === WorkoutStatus.creating,
      status === WorkoutStatus.editing,
    ],
    [status]
  );

  const handleAdd = () => {
    if (activeWorkout) {
      setStatus(WorkoutStatus.adding);
      return;
    }

    setStatus(WorkoutStatus.creating);
  };

  const handleOkModal = (workout: Workout) => {
    setActiveWorkout(workout);
    resetStatus();
  };

  const handleIsEditing = () => {
    if (!isEditing) {
      setStatus(WorkoutStatus.editing);
      return;
    }

    form.submit();
  };

  const handleEditWorkout = (data: WorkoutPutFieldType) => {
    setActiveWorkout({
      ...activeWorkout,
      name: data.name,
      description: data.description,
      endDate: data.endDate.toISOString(),
    } as Workout);
    resetStatus();
  };

  return (
    <UserEntryLayout
      actionsButtons={
        <WorkoutActionButtons
          handleEditButton={handleIsEditing}
          isEditing={isEditing}
          handleAdd={handleAdd}
          workoutId={activeWorkout?.id}
          handleClearWorkout={() => setActiveWorkout(undefined)}
        />
      }
    >
      {isCreating && (
        <NewWorkoutModal
          onCancel={resetStatus}
          onOk={handleOkModal}
          userId={user?.id || ""}
        />
      )}
      {activeWorkout && (
        <WorkoutContext.Provider value={{ activeWorkout, setActiveWorkout }}>
          <WorkoutHeader
            onSubmitFinishes={handleEditWorkout}
            form={form}
            isEditing={isEditing}
            activeWorkout={activeWorkout}
          />
          <Flex wrap="wrap" justify="space-around">
            {isAdding && (
              <ActiveWorkoutSetAdd
                workoutId={activeWorkout.id}
                refetchWorkout={fetchActiveWorkout}
                onCancel={resetStatus}
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
