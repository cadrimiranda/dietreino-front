import Modal, { ModalProps } from "antd/lib/modal";
import AntdForm from "antd/lib/form";
import Input from "antd/lib/input";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import DatePicker from "antd/lib/date-picker";
import { RangePickerProps } from "antd/es/date-picker";
import * as dayjs from "dayjs";
import { Workout } from "../activeWorkout/workoutTypes";
import useCreateNewWorkout from "../hooks/useCreateNewWorkout";

export type WorkoutFieldType = {
  name: string;
  description: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf("day");
};

export const NewWorkoutModal = (
  props: Pick<ModalProps, "onCancel"> & {
    onOk: (workout: Workout) => void;
    userId: string;
  }
) => {
  const { onOk, ...rest } = props;
  const [form] = AntdForm.useForm<WorkoutFieldType>();
  const { createWorkout, loading } = useCreateNewWorkout();

  const handleCreateNewWorkout = (values: WorkoutFieldType) => {
    const newWorkout = {
      ...values,
      userToAssign: props.userId,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
    };
    createWorkout(newWorkout).then(onOk);
  };

  return (
    <Modal
      open
      confirmLoading={loading}
      okButtonProps={{ htmlType: "submit", form: "userform" }}
      {...rest}
    >
      <AntdForm
        onFinish={handleCreateNewWorkout}
        autoComplete="off"
        id="userform"
        layout="vertical"
        form={form}
      >
        <Row gutter={8}>
          <Col md={12}>
            <AntdForm.Item<WorkoutFieldType>
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Insira um nome!" }]}
            >
              <Input
                aria-label="Nome do treino"
                placeholder="Nome do treino"
                disabled={loading}
              />
            </AntdForm.Item>
          </Col>
          <Col md={6}>
            <AntdForm.Item<WorkoutFieldType>
              label="Inicio"
              name="startDate"
              rules={[
                {
                  type: "date",
                  required: true,
                  message: "Insira uma data de inicio",
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                disabledDate={disabledDate}
                disabled={loading}
                aria-label="Data inicial do treino"
                placeholder="Inicio"
              />
            </AntdForm.Item>
          </Col>
          <Col md={6}>
            <AntdForm.Item<WorkoutFieldType>
              label="Fim"
              name="endDate"
              rules={[
                {
                  type: "date",
                  required: true,
                  message: "Insira uma data de fim",
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                disabledDate={disabledDate}
                disabled={loading}
                aria-label="Data final do treino"
                placeholder="Fim"
              />
            </AntdForm.Item>
          </Col>
        </Row>
        <AntdForm.Item<WorkoutFieldType>
          label="Descrição"
          name="description"
          rules={[{ required: true, message: "Insira uma descrição!" }]}
        >
          <Input
            disabled={loading}
            aria-label="descrição do treino"
            placeholder="Descrição"
          />
        </AntdForm.Item>
      </AntdForm>
    </Modal>
  );
};
