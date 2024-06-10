import React from "react";
import { Modal, Form, Input, Upload, Select, ModalProps } from "antd";
import { useMuscularGroupEnum } from "../../utils/useMuscularGroupEnum";

const { Option } = Select;

const EXERCISE_FORM_TAG = "exercise-form";

const ExerciseFormModal: React.FC<Pick<ModalProps, "onCancel">> = ({
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { options } = useMuscularGroupEnum();

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Handle form submission here
      console.log(values);
    });
  };

  return (
    <Modal
      open={true}
      title="Adicionar Exercício"
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ form: EXERCISE_FORM_TAG, htmlType: "submit" }}
    >
      <Form form={form} id={EXERCISE_FORM_TAG} layout="vertical">
        <Form.Item
          name="exerciseName"
          label="Exercise Name"
          rules={[
            { required: true, message: "Insira o nome do exercício" },
            {
              max: 50,
              message: "O nome do exercício deve ter no máximo 50 caracteres",
            },
            {
              min: 3,
              message: "O nome do exercício deve ter no mínimo 3 caracteres",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="exerciseUrl" label="Exercise URL">
          <Input />
        </Form.Item>

        <Form.Item name="exerciseImage" label="Exercise Image">
          <Upload>{/* Add your image uploader component here */}</Upload>
        </Form.Item>

        <Form.Item
          name="muscularGroup"
          label="Muscular Group"
          rules={[
            {
              required: true,
              message: "Inisira qual grupo musuclar o exercício pertence",
            },
          ]}
        >
          <Select mode="multiple">
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.displayText}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExerciseFormModal;
