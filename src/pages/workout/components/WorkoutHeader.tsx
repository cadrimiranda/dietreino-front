import classNames from "classnames";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import * as dayjs from "dayjs";
import DatePicker from "antd/lib/date-picker";
import { Workout } from "../activeWorkout/workoutTypes";
import { DateUtils } from "../../../utils/dateUtils";
import { Form, FormInstance, Input } from "antd/lib";
import { useDoFetch } from "../../../utils/useDoFetch";
import { WorkoutFieldType } from "./NewWorkoutModal";
import { useContext } from "react";
import { LoadingContext } from "../../../components/loading/LoadingContext";

export type WorkoutPutFieldType = Omit<WorkoutFieldType, "startDate"> & {
  startDate?: WorkoutFieldType["startDate"];
};

const WorkoutHeader = ({
  activeWorkout,
  form,
  isEditing,
  onSubmitFinishes,
}: {
  activeWorkout: Workout;
  isEditing: boolean;
  form: FormInstance;
  onSubmitFinishes: (data: WorkoutPutFieldType) => void;
}) => {
  const endDate = activeWorkout?.endDate as string;
  const daysLeft = DateUtils.getDaysLeft(endDate);
  const isGreen = daysLeft >= 21;
  const isRed = daysLeft <= 7;
  const isYellow = !isGreen && !isRed;

  const datesCx = classNames({
    border: true,
    "rounded-md": true,
    "text-white": true,
    "p-1.5": true,
  });

  const endDateCx = classNames([
    {
      "bg-green-500": isGreen,
      "bg-yellow-500": isYellow,
      "bg-red-500": isRed,
      "border-green-600": isGreen,
      "border-yellow-600": isYellow,
      "border-red-600": isRed,
      "ml-2": true,
    },
    datesCx,
  ]);

  const { put, loading } = useDoFetch({ showMessages: true });

  const { setLoading, loading: globalLoading } = useContext(LoadingContext);

  if (globalLoading !== loading) {
    setLoading(loading);
  }

  const handleSubmit = (values: WorkoutPutFieldType) => {
    const data = { ...values };
    delete data.startDate;
    put(`/workout/${activeWorkout.id}`, data).then(() =>
      onSubmitFinishes(data)
    );
  };

  return (
    <Form<WorkoutPutFieldType>
      onFinish={handleSubmit}
      form={form}
      layout="horizontal"
      initialValues={{
        name: activeWorkout?.name,
        description: activeWorkout?.description,
        startDate: dayjs(activeWorkout?.startDate),
        endDate: dayjs(activeWorkout?.endDate),
      }}
    >
      {isEditing ? (
        <>
          <Row>
            <Col md={4}>
              <Form.Item className="mx-2 my-1" name="name">
                <Input placeholder="Nome" aria-label="name" />
              </Form.Item>
            </Col>
            <Col md={20}>
              <Form.Item className="mx-2 my-1" name="description">
                <Input placeholder="Descrição" aria-label="description" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item className="mx-2 my-1" name="startDate">
                <DatePicker
                  disabled
                  format="DD/MM/YYYY"
                  aria-label="Inicio"
                  placeholder="Inicio"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                className="mx-2 my-1"
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
                  disabledDate={(current) => current < dayjs()}
                  format="DD/MM/YYYY"
                  aria-label="Fim"
                  placeholder="Fim"
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-extrabold uppercase">
            {activeWorkout.name}
            <span className="text-lg font-light ml-3">
              {activeWorkout.description}
            </span>
          </h1>
          <h2 title={`${daysLeft} dias restantes`} className="font-mediun my-3">
            <span
              className={classNames(["bg-cyan-500 border-cyan-600", datesCx])}
            >
              {DateUtils.formatDate(activeWorkout?.startDate)}
            </span>
            <span className={endDateCx}>
              {DateUtils.formatDate(activeWorkout?.endDate)}
            </span>
          </h2>
        </>
      )}
    </Form>
  );
};

export { WorkoutHeader };
