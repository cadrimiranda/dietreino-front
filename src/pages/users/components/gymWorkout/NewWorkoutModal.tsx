import Modal, { ModalProps } from "antd/lib/modal";
import AntdForm from "antd/lib/form";
import Input from "antd/lib/input";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import DatePicker from "antd/lib/date-picker";
import locale from "antd/es/date-picker/locale/pt_BR";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import useCreateNewWorkout from "../../hooks/useCreateNewWorkout";
import { Workout } from "./activeWorkout/workoutTypes";

type FieldType = {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf("day");
};

export const NewWorkoutModal = (
  props: Pick<ModalProps, "onCancel"> & {
    onOk: (workout: Workout) => void;
    userId?: string;
  }
) => {
  const { onOk, ...rest } = props;
  const [form] = AntdForm.useForm<FieldType>();
  const { doFetch, loading } = useCreateNewWorkout();

  const handleCreateNewWorkout = async () => {
    const values = form.getFieldsValue();
    const data = await doFetch({ ...values, userToAssign: props.userId }).then(
      (res) => res
    );
    onOk(data);
  };

  return (
    <Modal
      open
      confirmLoading={loading}
      onOk={handleCreateNewWorkout}
      {...rest}
    >
      <AntdForm autoComplete="off" id="userform" layout="vertical" form={form}>
        <Row gutter={8}>
          <Col md={12}>
            <AntdForm.Item<FieldType>
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Insira um nome!" }]}
            >
              <Input disabled={loading} />
            </AntdForm.Item>
          </Col>
          <Col md={6}>
            <AntdForm.Item<FieldType>
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
                locale={locale}
                format="DD/MM/YYYY"
                disabledDate={disabledDate}
                disabled={loading}
              />
            </AntdForm.Item>
          </Col>
          <Col md={6}>
            <AntdForm.Item<FieldType>
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
                locale={locale}
                format="DD/MM/YYYY"
                disabledDate={disabledDate}
                disabled={loading}
              />
            </AntdForm.Item>
          </Col>
        </Row>
        <AntdForm.Item<FieldType>
          label="Descrição"
          name="description"
          rules={[{ required: true, message: "Insira uma descrição!" }]}
        >
          <Input disabled={loading} />
        </AntdForm.Item>
      </AntdForm>
    </Modal>
  );
};
