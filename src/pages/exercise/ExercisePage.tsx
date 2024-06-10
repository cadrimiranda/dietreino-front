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
  },
  {
    title: "Grupo Muscular",
    dataIndex: ["muscularGroup", "name"],
    key: "muscularGroupName",
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
  },
  {
    title: "",
    key: "",
    render: () => {
      return (
        <>
          <Button
            data-testid="btn-edit-exercise"
            icon={<Icon iconName="pen" color="colorWhite" />}
          />
          <Button
            data-testid="btn-remove-exercise"
            icon={<Icon iconName="trash" color="colorWhite" />}
          />
        </>
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
    <div>
      <div>
        <h1>Exercicios</h1>
        <Button
          icon={<Icon iconName="plus" color="colorWhite" />}
          onClick={handleModal}
        >
          Exercício
        </Button>
        {modalOpen && <ExerciseFormModal onCancel={handleModal} />}
      </div>
      <Table loading={loading} columns={columns} dataSource={exercises} />
    </div>
  );
};

export { ExercisePage };
