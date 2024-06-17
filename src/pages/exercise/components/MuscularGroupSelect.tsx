import Form, { FormInstance } from "antd/lib/form";
import Select from "antd/lib/select";
import { useMuscularGroupEnum } from "../../../utils/useMuscularGroupEnum";

type Props = {
  noLabel?: boolean;
  required?: boolean;
  form: FormInstance;
};

const MuscularGroupSelect = ({ noLabel, required = true, form }: Props) => {
  const { options } = useMuscularGroupEnum();

  return (
    <Form.Item
      className={noLabel ? "m-0" : ""}
      name="muscularGroup"
      label={noLabel ? undefined : "Muscular Group"}
      rules={[
        {
          required,
          message: "Inisira qual grupo musuclar o exercício pertence",
        },
      ]}
    >
      <Select
        aria-label="muscular-group"
        onChange={(value) => form.setFieldValue("muscularGroup", value)}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.displayText}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export { MuscularGroupSelect };
