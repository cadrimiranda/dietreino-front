import { Button } from "antd/lib";
import { Icon } from "../../components/Icon";
import { useState } from "react";
import ExerciseFormModal from "./components/ExerciseFormModal";
import { ExerciseListTable } from "./components/ExerciseListTable";

const ExercisePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="pt-2 px-6">
      <div className="flex flex-row items-center mb-6">
        <h1 className="text-2xl mr-6 font-bold">Exercicios</h1>
        <Button
          icon={<Icon iconName="plus" color="colorWhite" />}
          onClick={handleModal}
        >
          Exercício
        </Button>
        {modalOpen && <ExerciseFormModal onClose={handleModal} />}
      </div>
      <ExerciseListTable />
    </div>
  );
};

export { ExercisePage };
