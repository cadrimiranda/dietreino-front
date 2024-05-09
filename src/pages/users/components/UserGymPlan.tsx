import { Flex } from "antd/lib";
import { CustomIcon, Pen, Plus } from "../../../components/icons";
import { UserEntryLayout } from "./UserEntryLayoutt";
import { PropsWithChildren, useEffect, useState } from "react";
import Button from "antd/lib/button";
import { AddGymPlan } from "./AddGymPlan";
import { CachePolicies, useFetch } from "use-http";

export const UserGymTable = ({ children }: PropsWithChildren) => {
  return (
    <div className="user-gym-plan-card-table-wrapp">
      <table className="user-gym-plan-card-table">
        <colgroup>
          <col className="user-gym-colname" />
        </colgroup>
        <thead>
          <tr>
            {["Nome", "Series", "Reps", "Pausa"].map((x) => (
              <th>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

type Exercise = {
  id: string;
  name: string;
  description: string;
};

type ExerciseSetup = {
  id: string;
  observation: string;
  repetitions: string;
  rest: string;
  series: string;
  exercise: Exercise;
};

type ExerciseSet = {
  id: string;
  name: string;
  description: string;
  exerciseSetupList: ExerciseSetup[];
};

type Workout = {
  id: string;
  name: string;
  description: string;
  exerciseSets: ExerciseSet[];
};

const GymCard = ({ exerciseSet }: { exerciseSet: ExerciseSet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { description, name, exerciseSetupList } = exerciseSet;

  return (
    <div className="user-gym-card-wrapper">
      <div className="user-gym-plan-card">
        <Flex className="user-gym-plan-header" justify="space-between">
          <p className="user-gym-plan-card-title">{name}</p>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <CustomIcon width="20px" icon={Pen} color="colorWhite" />
          </Button>
        </Flex>
        <UserGymTable>
          {exerciseSetupList.map((setup, index) => {
            const {
              exercise: { name },
              series,
              repetitions,
              rest,
            } = setup;
            return (
              <tr>
                <td>
                  {isEditing ? (
                    <input
                      style={{ width: index === 0 ? "100%" : "90px" }}
                      value={name}
                    />
                  ) : (
                    name
                  )}
                </td>
                <td>{series}</td>
                <td>{repetitions}</td>
                <td>{rest}</td>
              </tr>
            );
          })}
        </UserGymTable>

        <textarea
          disabled={!isEditing}
          className="user-gym-plan-obs"
          placeholder="Observações"
          value={description}
        />
      </div>
    </div>
  );
};

const UserGymPlan = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const { get } = useFetch(
    "/user/11111111-1111-1111-1111-111111111111/active-workout",
    { cachePolicy: CachePolicies.NO_CACHE }
  );

  useEffect(() => {
    get().then(res => setActiveWorkout(res));
  }, [get]);

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
        {activeWorkout &&
          activeWorkout.exerciseSets.map((exerciseSet) => (
            <GymCard exerciseSet={exerciseSet} />
          ))}
      </Flex>
    </UserEntryLayout>
  );
};

export { UserGymPlan };
