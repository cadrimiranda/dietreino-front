import { Flex } from "antd/lib";
import { CustomIcon, Plus } from "../../../components/icons";
import { UserEntryLayout } from "./UserEntryLayoutt";
import { useState } from "react";
import Button from "antd/lib/button";
import { AddGymPlan } from "./AddGymPlan";
import { ActiveWorkoutPage } from "./activeWorkout/ActiveWorkoutPage";

const UserGymPlan = () => {
  const [isAdding, setIsAdding] = useState(false);

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
      <Flex wrap="wrap" justify="space-around">
        {isAdding && <AddGymPlan onCancel={() => setIsAdding(false)} />}
        <ActiveWorkoutPage />
      </Flex>
    </UserEntryLayout>
  );
};

export { UserGymPlan };
