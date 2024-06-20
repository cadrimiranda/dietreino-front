import Form, { FormInstance } from "antd/lib/form";
import Select from "antd/lib/select";
import { WeekDays, weekDaysOptions } from "../../utils/weekDaysEnum";
import classNames from "classnames";

export type WeekdaySelectProps = {
  noLabel?: boolean;
  required?: boolean;
  form?: FormInstance;
  value?: WeekDays;
  onChange?: (name: string, value: WeekDays) => void;
  cx?: string;
};

const FIELD_NAME = "weekDay";

const WeekdaySelect = ({
  onChange,
  noLabel = true,
  required = true,
  value,
  form,
  cx: cxProps,
}: WeekdaySelectProps) => {
  const handleChange = (value: WeekDays) => {
    if (form) {
      form.setFieldValue(FIELD_NAME, value);
    } else {
      onChange?.(FIELD_NAME, value);
    }
  };

  const cx = classNames(["mx-2"], cxProps);

  return (
    <Form.Item
      className={cx}
      name={FIELD_NAME}
      label={noLabel ? undefined : "Dia da semana"}
      rules={[
        {
          required,
          message: "Inisira qual dia da semana a rotina pertence",
        },
      ]}
    >
      <Select<WeekDays>
        aria-label="week-day"
        placeholder="Dia da semana"
        onChange={handleChange}
        value={value}
      >
        {weekDaysOptions.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export { WeekdaySelect };
