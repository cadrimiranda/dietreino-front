import { Button } from "antd/lib";
import { Icon } from "../../components/Icon";
import { useState } from "react";
import ExerciseFormModal from "./components/ExerciseFormModal";
import { ExerciseListTable } from "./components/ExerciseListTable";
import { UserLayout } from "../users/components/UserEntryLayoutt";
import { useNavigate } from "react-router-dom";

const ExercisePage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="pt-2 px-6">
      <h1 className="text-2xl mr-6 font-bold">Exercicios</h1>
      <UserLayout
        onGoBack={() => navigate(-1)}
        actionsButtons={
          <Button
            icon={<Icon iconName="plus" color="colorWhite" />}
            onClick={handleModal}
          >
            Exercício
          </Button>
        }
      >
        <div className="flex flex-row items-center mb-6">
          {modalOpen && <ExerciseFormModal onClose={handleModal} />}
        </div>
        <ExerciseListTable />
      </UserLayout>
    </div>
  );
};

export { ExercisePage };
