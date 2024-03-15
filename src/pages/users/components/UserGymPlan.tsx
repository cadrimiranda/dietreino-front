import { Flex } from "antd/lib";
import { CustomIcon, Pen, Plus } from "../../../components/icons";
import { UserEntryLayout } from "./UserEntryLayoutt";
import { useState } from "react";
import Button from "antd/lib/button";

const data = [
  ["Agachamento Livre", "4", "10-8-6-6", "180-240s"],
  ["Leg press 45", "4", "6 a 8", "120-150s"],
  ["Extensora", "4", "8 - 10", "90-120s"],
  ["Mesa flexora", "4", "6 a 8", "180s"],
  ["Cadeira flexora", "4", "8 - 10", "120s"],
  ["Panturrilha sentado", "4", "6 a 8", "90-120s"],
  ["Panturrilha em pé maquina", "4", "10 a 12", "90s"],
];

const GymCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="user-gym-card-wrapper">
      <div className="user-gym-plan-card">
        <Flex className="user-gym-plan-header" justify="space-between">
          <p className="user-gym-plan-card-title">Perna</p>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <CustomIcon width="20px" icon={Pen} color="colorWhite" />
          </Button>
        </Flex>
        <div className="user-gym-plan-card-table-wrapp">
          <table className="user-gym-plan-card-table">
            <colgroup>
              <col className="user-gym-colname" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Series</th>
                <th>Reps</th>
                <th>Pausa</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ex) => (
                <tr>
                  {ex.map((item, itemIndex) => (
                    <td>
                      {isEditing ? (
                        <input
                          style={{ width: itemIndex === 0 ? "100%" : "90px" }}
                          value={item}
                        />
                      ) : (
                        item
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <textarea
          disabled={!isEditing}
          className="user-gym-plan-obs"
          placeholder="Observações"
        />
      </div>
    </div>
  );
};

const UserGymPlan = () => {
  return (
    <UserEntryLayout>
      <Flex wrap="wrap" justify="space-around">
        <div className="user-gym-card-wrapper">
          <div className="user-gym-add-card">
            <div className="user-gym-add-inner-card">
              <div className="user-gym-add-card-icon">
                <CustomIcon icon={Plus} width="50px" color="colorWhite" />
              </div>
            </div>
          </div>
        </div>
        <GymCard />
        <GymCard />
        <GymCard />
        <GymCard />
        <GymCard />
      </Flex>
    </UserEntryLayout>
  );
};

export { UserGymPlan };
