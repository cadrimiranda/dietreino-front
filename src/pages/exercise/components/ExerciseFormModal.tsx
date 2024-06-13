import React from "react";
import { Modal, Form, Input, Upload } from "antd";
import { MuscularGroupEnum } from "../../../utils/useMuscularGroupEnum";
import { Exercise } from "../../users/components/gymWorkout/activeWorkout/workoutTypes";
import { MuscularGroupSelect } from "./MuscularGroupSelect";
import { Icon } from "../../../components/Icon";
import { useDoFetch } from "../../../utils/useDoFetch";
import { exerciseFormToDTO } from "../utils/exerciseConverter";
import { exerciseFormRules } from "../utils/formRules";

const EXERCISE_FORM_TAG = "exercise-form";

export type ExerciseForm = Omit<Exercise, "id"> & {
  muscularGroup: MuscularGroupEnum;
};

const ExerciseFormModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form] = Form.useForm<ExerciseForm>();
  const { post, loading } = useDoFetch({ showMessages: true });

  const handleOk = () => {
    form.validateFields().then((values) => {
      post("/exercise", exerciseFormToDTO(values)).then(() => {
        onClose();
      });
    });
  };

  return (
    <Modal
      open={true}
      title="Adicionar Exercício"
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      okButtonProps={{ form: EXERCISE_FORM_TAG, htmlType: "submit" }}
    >
      <Form
        form={form}
        id={EXERCISE_FORM_TAG}
        layout="vertical"
        initialValues={{
          url: "",
          image: "",
          description: "",
          muscularGroup: MuscularGroupEnum.ABS,
        }}
      >
        <Form.Item name="name" label="Nome" rules={exerciseFormRules.name}>
          <Input />
        </Form.Item>

        <MuscularGroupSelect form={form} required={false} />

        <Form.Item
          rules={exerciseFormRules.description}
          name="description"
          label="Descrição"
        >
          <Input.TextArea
            maxLength={150}
            placeholder="Forneça uma breve descrição de até 150 caracteres"
          />
        </Form.Item>

        <Form.Item name="url" label="Video URL">
          <Input placeholder="Video que seus alunos possam ver a execução" />
        </Form.Item>

        <Form.Item name="image" label="Imagem" tooltip="Não suportado ainda">
          <Upload listType="picture-card" disabled>
            <button
              className="b-0 bg-none flex flex-col justify-center items-center"
              type="button"
            >
              <Icon iconName="plus" />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExerciseFormModal;
