import { useEffect, useState } from "react";
import { useGetExercises } from "../hooks/useGetExercises";
import { useGetExerciseTableColumns } from "../hooks/useGetExerciseTableColumns";
import Table from "antd/lib/table";
import { useExerciseTableActions } from "../hooks/useExerciseTableActions";
import Form from "antd/lib/form";
import { EditableCell } from "./TableCell";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { ExerciseTableContext } from "./ExerciseTableContext";

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

  const columns = useGetExerciseTableColumns({
    dataEditing,
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
      <ExerciseTableContext.Provider
        value={{
          onDelete,
          onEdit,
          handleDataEditing: setDataEditing,
          form,
          fetchExercises,
          handleUpdateList,
          dataEditing,
        }}
      >
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
              console.log("page", page);
              console.log("pageSize", pageSize);
              fetchExercises({ pageNumber: page - 1, pageSize });
            },
          }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </ExerciseTableContext.Provider>
    </Form>
  );
};

export { ExerciseListTable };
