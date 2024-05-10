import { Flex } from "antd";
import { useState } from "react";
import { Button, Form } from "antd/lib";
import Input from "antd/lib/input/Input";
import { ExerciseSetTable } from "./activeWorkout/ActiveWorkoutExerciseSet";

type DataType = {
  name: string;
  series: string;
  reps: string;
  rest: string;
};

const AddGymPlan = ({ onCancel }: { onCancel: () => void }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [form] = Form.useForm();

  const handleSubmit = (values: DataType) => {
    setData([...data, values]);
    form.resetFields();
  };

  return (
    <div className="add-gym-plan-card">
      <Form form={form} name="exercise" onFinish={handleSubmit}>
        <Form.Item<DataType>
          label="Exercicio"
          name="name"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<DataType>
          label="Series"
          name="series"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<DataType>
          label="Repetições"
          name="reps"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<DataType>
          label="Pausa"
          name="rest"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">Salvar</Button>
      </Form>
      <ExerciseSetTable>
        {data.map((x) => (
          <tr>
            <td>{x.name}</td>
            <td>{x.series}</td>
            <td>{x.reps}</td>
            <td>{x.rest}</td>
          </tr>
        ))}
        <tr>
          {[1, 2, 3, 4].map(() => (
            <td></td>
          ))}
        </tr>
      </ExerciseSetTable>
      <Flex>
        <button onClick={onCancel}>Cancel</button>
      </Flex>
    </div>
  );
};

export { AddGymPlan };
