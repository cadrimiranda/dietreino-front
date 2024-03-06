import { Flex } from "antd/lib";
import { CustomIcon, Plus } from "../../../components/icons";
import { UserEntryLayout } from "./UserEntryLayoutt";

const pernas = [
  ["Agachamento Livre", "4", "10-8-6-6", "180-240s"],
  ["Leg press 45", "4", "6 a 8", "120-150s"],
  ["Extensora", "4", "8 - 10", "90-120s"],
  ["Mesa flexora", "4", "6 a 8", "180s"],
  ["Cadeira flexora", "4", "8 - 10", "120s"],
  ["Panturrilha sentado", "4", "6 a 8", "90-120s"],
  ["Panturrilha em pé maquina", "4", "10 a 12", "90s"],
];

const UserGymPlan = () => {
  return (
    <UserEntryLayout>
      <Flex>
        <div className="user-gym-add-card">
          <div className="user-gym-add-inner-card">
            <div className="user-gym-add-card-icon">
              <CustomIcon icon={Plus} width="50px" color="colorWhite" />
            </div>
          </div>
        </div>
        <div>
          <div className="user-gym-plan-card">
            <p className="user-gym-plan-card-title">Perna</p>
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
                {pernas.map((ex) => (
                  <tr>
                    {ex.map((item) => (
                      <td>{item}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Flex>
    </UserEntryLayout>
  );
};

export { UserGymPlan };
