import { Button } from "antd/lib";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { Icon } from "../../../components/Icon";
import { PopconfirmWrapper } from "../../../components/popconfirm/Popconfirm";
import { useContext } from "react";
import { ExerciseTableContext } from "./ExerciseTableContext";
import { exerciseToEditDTO, exerciseToForm } from "../utils/exerciseConverter";

type Props = {
  isEditing: boolean;
  exercise: ExerciseWithMuscularGroup;
};

const ExerciseTableActionButtons = ({ exercise, isEditing }: Props) => {
  const {
    fetchExercises,
    onDelete,
    form,
    onEdit,
    handleDataEditing,
    handleUpdateList,
  } = useContext(ExerciseTableContext);

  const handleSave = async (data: ExerciseWithMuscularGroup) => {
    form
      .validateFields()
      .then(() =>
        onEdit(exerciseToEditDTO({ ...data, ...form.getFieldsValue() })).then(
          (res) => {
            if (res) {
              handleUpdateList(data);
              handleDataEditing(null);
            }
          }
        )
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (data: ExerciseWithMuscularGroup) => {
    onDelete(data.id).then((res) => {
      if (res) {
        fetchExercises();
      }
    });
  };

  const handleEdit = (data: ExerciseWithMuscularGroup) => {
    form.setFieldsValue(exerciseToForm(data));
    handleDataEditing(data);
  };

  const editFn = isEditing ? handleSave : handleEdit;
  const editIcon = isEditing ? "save" : "pen";
  const removeIcon = isEditing ? "xmark" : "trash";
  const editTestId = isEditing ? "btn-save-exercise" : "btn-edit-exercise";
  const removeTestId = isEditing
    ? "btn-cancel-edit-exercise"
    : "btn-remove-exercise";

  const removeBtn = (
    <Button
      onClick={() => isEditing && handleDataEditing(null)}
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
        onClick={() => editFn(exercise)}
        icon={<Icon iconName={editIcon} color="colorWhite" />}
      />
      {isEditing ? (
        removeBtn
      ) : (
        <PopconfirmWrapper
          title={`Tem certeza que deseja remover o exercício ${exercise.name}?`}
          onConfirm={() => handleDelete(exercise)}
        >
          {removeBtn}
        </PopconfirmWrapper>
      )}
    </div>
  );
};

export { ExerciseTableActionButtons };
