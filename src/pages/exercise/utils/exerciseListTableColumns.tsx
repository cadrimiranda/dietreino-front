import { TableProps } from "antd/lib/table";
import { Button, FormInstance } from "antd/lib";
import { Icon } from "../../../components/Icon";
import { MuscularGroupSelect } from "../components/MuscularGroupSelect";
import { PopconfirmWrapper } from "../../../components/popconfirm/Popconfirm";
import { MuscularGroupEnum } from "../../../utils/useMuscularGroupEnum";
import { exerciseFormRules } from "./formRules";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { useTableColumnSearcn } from "../../../hooks/useTableColumnSearcn";

type ColumnsProps = {
  onEdit: (exercise: ExerciseWithMuscularGroup) => void;
  onRemove: (exercise: ExerciseWithMuscularGroup) => void;
  onSaved: (exercise: ExerciseWithMuscularGroup) => void;
  dataEditing: ExerciseWithMuscularGroup | null;
  onCancel: () => void;
  form: FormInstance;
};

export const useGetExerciseTableColumns = ({
  onEdit,
  onRemove,
  dataEditing,
  onSaved,
  onCancel,
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
    (props) => console.log(props),
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
      render: (_, record) => {
        const editing = isEditing(record);
        const editFn = editing ? onSaved : onEdit;
        const editIcon = editing ? "save" : "pen";
        const removeIcon = editing ? "xmark" : "trash";
        const editTestId = editing ? "btn-save-exercise" : "btn-edit-exercise";
        const removeTestId = editing
          ? "btn-cancel-edit-exercise"
          : "btn-remove-exercise";

        const removeBtn = (
          <Button
            onClick={() => editing && onCancel()}
            data-testid={removeTestId}
            danger
            type="primary"
            icon={<Icon iconName={removeIcon} color="colorWhite" />}
          />
        );

        return (
          <div className="flex flex-row items-center justify-around">
            <Button
              data-testid={editTestId}
              onClick={() => editFn(record)}
              icon={<Icon iconName={editIcon} color="colorWhite" />}
            />
            {editing ? (
              removeBtn
            ) : (
              <PopconfirmWrapper
                title={`Tem certeza que deseja remover o exercício ${record.name}?`}
                onConfirm={() => onRemove(record)}
              >
                {removeBtn}
              </PopconfirmWrapper>
            )}
          </div>
        );
      },
    },
  ];
};
