import React from "react";
import { Modal, Form, Input, message } from "antd";
import {
  MuscularGroupEnum,
  MuscularGroupEnumNames,
} from "../../../utils/useMuscularGroupEnum";
import { MuscularGroupSelect } from "./MuscularGroupSelect";
import { exerciseFormToDTO } from "../utils/exerciseConverter";
import { exerciseFormRules } from "../utils/formRules";
import { Exercise } from "../../workout/activeWorkout/workoutTypes";
import { useLoadingAxios } from "../../../utils/useLoading";
import axios from "axios";

const EXERCISE_FORM_TAG = "exercise-form";

export type ExerciseForm = Omit<Exercise, "id"> & {
  muscularGroup: MuscularGroupEnum;
};

const ExerciseFormModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form] = Form.useForm<ExerciseForm>();
  const { load, loading } = useLoadingAxios();

  const handleOk = () => {
    form.submit();
  };

  const handleOnFinish = (values: ExerciseForm) => {
    load(axios.post("/exercise", exerciseFormToDTO(values))).then((res) => {
      if (!axios.isAxiosError(res)) {
        onClose();
      } else if (res.response?.data.message) {
        message.error(res.response?.data.message);
      }
    });
  };

  return (
    <Modal
      open={true}
      title="Adicionar Exercício"
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      okButtonProps={{ form: EXERCISE_FORM_TAG }}
    >
      <Form
        form={form}
        id={EXERCISE_FORM_TAG}
        layout="vertical"
        onFinish={handleOnFinish}
        onFinishFailed={console.log}
        initialValues={{
          url: "",
          description: "",
          muscularGroup: MuscularGroupEnumNames.ABS,
        }}
      >
        <Form.Item name="name" label="Nome" rules={exerciseFormRules.name}>
          <Input aria-label="name" />
        </Form.Item>

        <MuscularGroupSelect form={form} required={false} />

        <Form.Item
          rules={exerciseFormRules.description}
          name="description"
          label="Descrição"
        >
          <Input.TextArea
            aria-label="description"
            maxLength={150}
            placeholder="Forneça uma breve descrição de até 150 caracteres"
          />
        </Form.Item>

        <Form.Item name="url" label="Video URL">
          <Input
            aria-label="url"
            placeholder="Video que seus alunos possam ver a execução"
          />
        </Form.Item>

        {/* <Form.Item name="image" label="Imagem" tooltip="Não suportado ainda">
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
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ExerciseFormModal;
