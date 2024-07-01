import { TableProps } from "antd/lib/table";
import { FormInstance } from "antd/lib";
import { MuscularGroupSelect } from "../components/MuscularGroupSelect";
import { MuscularGroupEnum } from "../../../utils/useMuscularGroupEnum";
import { exerciseFormRules } from "../utils/formRules";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { useTableColumnSearcn } from "../../../hooks/useTableColumnSearcn";
import { useGetExercises } from "./useGetExercises";
import { ExerciseTableActionButtons } from "../components/ExerciseTableActionButtons";

type ColumnsProps = {
  dataEditing: ExerciseWithMuscularGroup | null;
  form: FormInstance;
  fetchExercises: ReturnType<typeof useGetExercises>["fetchExercises"];
};

export const useGetExerciseTableColumns = ({
  dataEditing,
  fetchExercises,
  form,
}: ColumnsProps): TableProps<ExerciseWithMuscularGroup>["columns"] => {
  const isEditing = (record: ExerciseWithMuscularGroup) =>
    record.id === dataEditing?.id;
  const onCell =
    (title: string, dataIndex: string | string[]) =>
    (record: ExerciseWithMuscularGroup) => ({
      record,
      dataIndex,
      title,
      editing: isEditing(record),
      rules: exerciseFormRules[dataIndex as keyof typeof exerciseFormRules],
    });

  const tableColumnSearch = useTableColumnSearcn(
    (props) => fetchExercises({ name: props.searchText }),
    dataEditing !== null
  );

  return [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "20%",
      onCell: onCell("Nome", "name"),
      filterMode: "menu",
      filterSearch: true,
      ...tableColumnSearch("name"),
    },
    {
      title: "Descrição",
      key: "description",
      dataIndex: "description",
      width: "30%",
      onCell: onCell("Descrição", "description"),
    },
    {
      title: "Grupo Muscular",
      dataIndex: "muscularGroup",
      key: "muscularGroupName",
      width: "10%",
      render: (_, record) =>
        isEditing(record) ? (
          <MuscularGroupSelect noLabel form={form} />
        ) : (
          MuscularGroupEnum[
            record.muscularGroup as unknown as keyof typeof MuscularGroupEnum
          ]
        ),
    },
    {
      title: "URL",
      key: "url",
      dataIndex: "url",
      width: "10%",
      onCell: onCell("URL", "url"),
    },
    {
      title: "",
      key: "",
      width: "8%",
      render: (_, record) => (
        <ExerciseTableActionButtons
          exercise={record}
          isEditing={isEditing(record)}
        />
      ),
    },
  ];
};
