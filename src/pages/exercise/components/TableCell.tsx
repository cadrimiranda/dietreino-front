import Form, { Rule } from "antd/lib/form";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";

type EditableCellProps<T> = {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType?: "text" | "number";
  record: T;
  children: React.ReactNode;
  required?: boolean;
  rules?: Rule[];
};

const EditableCell = <T,>({
  editing,
  dataIndex,
  title,
  inputType = "text",
  children,
  required,
  rules = [
    {
      required,
      message: `Please Input ${title}!`,
    },
  ],
  ...restProps
}: EditableCellProps<T>) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber aria-label={dataIndex} />
    ) : (
      <Input aria-label={dataIndex} />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          className="m-0"
          label={undefined}
          rules={rules}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export { EditableCell };
