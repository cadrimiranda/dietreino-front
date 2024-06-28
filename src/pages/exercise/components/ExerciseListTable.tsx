import { useEffect, useState } from "react";
import { useGetExercises } from "../hooks/useGetExercises";
import { useGetExerciseTableColumns } from "../hooks/useGetExerciseTableColumns";
import Table from "antd/lib/table";
import { useExerciseTableActions } from "../hooks/useExerciseTableActions";
import { exerciseToEditDTO, exerciseToForm } from "../utils/exerciseConverter";
import Form from "antd/lib/form";
import { EditableCell } from "./TableCell";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";

const ExerciseListTable = ({ shouldUpdate }: { shouldUpdate: boolean }) => {
  const [form] = Form.useForm();
  const [dataEditing, setDataEditing] =
    useState<ExerciseWithMuscularGroup | null>(null);
  const {
    loading: getLoading,
    fetchExercises,
    exercises,
    handleUpdateList,
    page,
  } = useGetExercises();

  const {
    loading: actionLoading,
    onEdit,
    onDelete,
  } = useExerciseTableActions();

  const loading = getLoading || actionLoading;

  const handleEdit = (data: ExerciseWithMuscularGroup) => {
    form.setFieldsValue(exerciseToForm(data));
    setDataEditing(data);
  };

  const handleSave = async (data: ExerciseWithMuscularGroup) => {
    form
      .validateFields()
      .then(() =>
        onEdit(exerciseToEditDTO({ ...data, ...form.getFieldsValue() })).then(
          (res) => {
            handleUpdateList(res);
            setDataEditing(null);
          }
        )
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (data: ExerciseWithMuscularGroup) => {
    onDelete(data.id).then(() => {
      fetchExercises();
    });
  };

  const columns = useGetExerciseTableColumns({
    onEdit: handleEdit,
    onRemove: handleDelete,
    dataEditing,
    onSaved: handleSave,
    onCancel: () => setDataEditing(null),
    form: form,
    fetchExercises,
  });

  useEffect(() => {
    if (shouldUpdate) {
      fetchExercises();
    }
  }, [shouldUpdate]);

  return (
    <Form form={form} component={false}>
      <Table
        size="small"
        loading={loading}
        columns={columns}
        dataSource={exercises}
        pagination={{
          hideOnSinglePage: true,
          total: page.totalItems,
          pageSize: page.pageSize,
          current: page.pageNumber + 1,
          onChange: (page, pageSize) => {
            fetchExercises({ pageNumber: page - 1, pageSize });
          },
        }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  );
};

export { ExerciseListTable };
