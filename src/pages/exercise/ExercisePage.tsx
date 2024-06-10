import Table, { TableProps } from "antd/lib/table";
import { ExerciseWithMuscularGroup } from "../users/components/gymWorkout/activeWorkout/workoutTypes";
import { Button } from "antd/lib";
import { Icon } from "../../components/Icon";
import { useGetExercises } from "./hooks/useGetExercises";
import { useEffect, useState } from "react";
import ExerciseFormModal from "./ExerciseFormModal";

const columns: TableProps<ExerciseWithMuscularGroup>["columns"] = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    width: "40%",
  },
  {
    title: "Grupo Muscular",
    dataIndex: ["muscularGroup", "name"],
    key: "muscularGroupName",
    width: "15%",
  },
  {
    title: "URL",
    key: "url",
    dataIndex: "url",
  },
  {
    title: "Imagem",
    key: "image",
    dataIndex: "image",
    width: "10%",
  },
  {
    title: "",
    key: "",
    width: "8%",
    render: () => {
      return (
        <div className="flex flex-row items-center justify-around">
          <Button
            data-testid="btn-edit-exercise"
            icon={<Icon iconName="pen" color="colorWhite" />}
          />
          <Button
            data-testid="btn-remove-exercise"
            danger
            type="primary"
            icon={<Icon iconName="trash" color="colorWhite" />}
          />
        </div>
      );
    },
  },
];

const ExercisePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { loading, fetchExercises, exercises } = useGetExercises();

  useEffect(() => {
    fetchExercises();
  }, []);

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
        {modalOpen && <ExerciseFormModal onCancel={handleModal} />}
      </div>
      <Table
        size="small"
        loading={loading}
        columns={columns}
        dataSource={exercises}
      />
    </div>
  );
};

export { ExercisePage };
