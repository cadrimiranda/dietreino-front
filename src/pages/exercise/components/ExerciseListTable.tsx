import { useEffect, useState } from "react";
import { useGetExercises } from "../hooks/useGetExercises";
import { getExerciseTableColumns } from "../utils/exerciseListTableColumns";
import Table from "antd/lib/table";
import { useExerciseTableActions } from "../hooks/useExerciseTableActions";
import { exerciseToEditDTO, exerciseToForm } from "../utils/exerciseConverter";
import { ExerciseWithMuscularGroup } from "../../users/components/gymWorkout/activeWorkout/workoutTypes";
import Form from "antd/lib/form";
import { EditableCell } from "./TableCell";

const ExerciseListTable = () => {
  const [form] = Form.useForm();
  const [dataEditing, setDataEditing] =
    useState<ExerciseWithMuscularGroup | null>(null);
  const {
    loading: getLoading,
    fetchExercises,
    exercises,
    handleUpdateList,
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
    form.validateFields().then(() =>
      onEdit(exerciseToEditDTO({ ...data, ...form.getFieldsValue() })).then(
        (res) => {
          handleUpdateList(res);
          setDataEditing(null);
        }
      )
    );
  };

  const handleDelete = (data: ExerciseWithMuscularGroup) => {
    onDelete(data.id).then(() => {
      fetchExercises();
    });
  };

  const columns = getExerciseTableColumns({
    onEdit: handleEdit,
    onRemove: handleDelete,
    dataEditing,
    onSaved: handleSave,
    onCancel: () => setDataEditing(null),
    form: form,
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <Form form={form} component={false}>
      <Table
        size="small"
        loading={loading}
        columns={columns}
        dataSource={exercises}
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
