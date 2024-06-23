import AntdForm, { FormInstance, FormProps } from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import DatePicker from "antd/lib/date-picker";
import locale from "antd/es/date-picker/locale/pt_BR";
import dayjs from "dayjs";
import { DateUtils } from "../../../utils/dateUtils";
import { User } from "../hooks/useUserList";

export type FieldType = {
  name: string;
  lastName: string;
  email: string;
  birthDate: dayjs.Dayjs;
  phone?: string;
  planStart: dayjs.Dayjs;
  planExpiration: dayjs.Dayjs;
};

const EndDateInput = ({ form }: { form: FormInstance }) => {
  const startDate = AntdForm.useWatch<FieldType["planStart"]>(
    "planStart",
    form
  );

  const isDateDisabled = (current: dayjs.Dayjs) =>
    DateUtils.disableDate({
      current,
      compareDate: startDate,
      greaterThan: true,
    });

  return (
    <AntdForm.Item<FieldType> label="Fim" name="planExpiration">
      <DatePicker
        locale={locale}
        format="DD/MM/YYYY"
        disabled={startDate === undefined}
        disabledDate={isDateDisabled}
      />
    </AntdForm.Item>
  );
};

const UserFormInputs = (
  props: Pick<FormProps, "onFinish" | "form" | "disabled"> & { user?: User }
) => (
  <AntdForm
    autoComplete="off"
    id="userform"
    layout="vertical"
    form={props.form}
    onFinish={props.onFinish}
    disabled={props.disabled}
  >
    <Row gutter={[12, 0]}>
      <Col md={10}>
        <AntdForm.Item<FieldType>
          label="Nome"
          name="name"
          rules={[{ required: true, message: "Insira um nome!" }]}
        >
          <Input />
        </AntdForm.Item>
      </Col>
      <Col md={8}>
        <AntdForm.Item<FieldType>
          label="Sobrenome"
          name="lastName"
          rules={[{ required: true, message: "Insira um nome!" }]}
        >
          <Input />
        </AntdForm.Item>
      </Col>
      <Col md={6}>
        <AntdForm.Item<FieldType>
          label="Nascimento"
          name="birthDate"
          rules={[
            {
              type: "date",
              required: true,
              message: "Insira data nascimento",
            },
          ]}
        >
          <DatePicker
            locale={locale}
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              DateUtils.disableDate({ current, lessOrEqual: true })
            }
          />
        </AntdForm.Item>
      </Col>
      <Col md={24}>
        <AntdForm.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { type: "email", required: true, message: "Insira um email!" },
          ]}
        >
          <Input />
        </AntdForm.Item>
      </Col>
      <Col md={8}>
        <AntdForm.Item<FieldType> label="Celular" name="phone">
          <Input />
        </AntdForm.Item>
      </Col>
      <Col md={8}>
        <AntdForm.Item<FieldType> label="Inicio" name="planStart">
          <DatePicker
            disabled={props.user !== undefined}
            locale={locale}
            format="DD/MM/YYYY"
          />
        </AntdForm.Item>
      </Col>
      <Col md={8}>
        <EndDateInput form={props.form as FormInstance} />
      </Col>
    </Row>
  </AntdForm>
);

export { UserFormInputs };
