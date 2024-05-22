import { Flex } from "antd/lib";
import { CustomIcon, Plus } from "../../../components/icons";
import { UserEntryLayout } from "./UserEntryLayoutt";
import { useContext, useState } from "react";
import Button from "antd/lib/button";
import { ActiveWorkoutPage } from "./activeWorkout/ActiveWorkoutPage";
import { ActiveWorkoutSetAdd } from "./activeWorkout/exerciseSetAdd/ActiveWorkoutSetAdd";
import { useGetUserActiveWorkout } from "../hooks/useGetUserActiveWorkout";
import { UserPageContext } from "./UserPageContext";

const UserGymPlan = () => {
  const { user } = useContext(UserPageContext);
  const [isAdding, setIsAdding] = useState(false);
  const { activeWorkout, fetchActiveWorkout } = useGetUserActiveWorkout(
    user?.id
  );

  return (
    <UserEntryLayout>
      <Button
        style={{ marginLeft: "16px" }}
        onClick={() => setIsAdding(true)}
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
        Adicionar
      </Button>
      {activeWorkout && (
        <Flex wrap="wrap" justify="space-around">
          {isAdding && (
            <ActiveWorkoutSetAdd
              workoutId={activeWorkout.id}
              refetchWorkout={fetchActiveWorkout}
              onCancel={() => setIsAdding(false)}
            />
          )}
          {<ActiveWorkoutPage activeWorkout={activeWorkout} />}
        </Flex>
      )}
    </UserEntryLayout>
  );
};

export { UserGymPlan };
