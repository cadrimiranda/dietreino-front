import { ExerciseSetWrapper } from "../activeWorkout/utils/ExerciseSetWrapper";
import Form, { FormProps } from "antd/lib/form";
import Input, { InputProps, TextAreaProps } from "antd/lib/input";
import {
  WeekdaySelect,
  WeekdaySelectProps,
} from "../../../components/weekdaySelect/WeekdaySelect";
import { WeekDayNames, WeekDays } from "../../../utils/weekDaysEnum";
import { PropsWithChildren } from "react";
import { ExerciseSetTable } from "../activeWorkout/utils/ExerciseSetTable";

type SetFormValues = {
  description: string;
  name: string;
  weekDay: WeekDays | "";
};

type Props = {
  showInputs?: boolean;
  isAdding?: boolean;
  isEditing?: boolean;
  inputNameProps?: InputProps;
  textAreaProps?: TextAreaProps;
  weekDaySelectProps?: Omit<WeekdaySelectProps, "form">;
  Buttons?: React.JSX.Element;
  TableComponent?: React.JSX.Element;
  initialValues?: SetFormValues;
  hasActionsButtons?: boolean;
  displayValues?: SetFormValues;
};

const Wrapper = ({
  children,
  hasForm,
  initialValues,
  form,
}: PropsWithChildren<
  Pick<Props, "initialValues"> & FormProps & { hasForm: boolean }
>) => {
  if (hasForm) {
    return (
      <Form<SetFormValues>
        form={form}
        initialValues={initialValues}
        autoComplete="off"
        id="userform"
      >
        {children}
      </Form>
    );
  }

  return children;
};

const ExerciseSetForm = ({
  isAdding = false,
  isEditing = false,
  showInputs = true,
  inputNameProps = {},
  weekDaySelectProps = {},
  displayValues,
  Buttons,
  initialValues,
  hasActionsButtons,
  TableComponent,
  textAreaProps,
}: Props) => {
  const { name, weekDay, description } = displayValues || {};
  const [form] = Form.useForm();

  return (
    <ExerciseSetWrapper isAdding={isAdding}>
      <Wrapper
        hasForm={isAdding || isEditing}
        form={form}
        initialValues={initialValues}
      >
        {showInputs ? (
          <div className="grid grid-cols-5">
            <Form.Item name="name" className="m-1 w-full col-span-3">
              <Input
                name="name"
                placeholder="Nome do set"
                aria-label="Nome do set"
                {...inputNameProps}
              />
            </Form.Item>
            <WeekdaySelect cx="m-1" {...weekDaySelectProps} />
            <div className="flex m-1 justify-end">{Buttons}</div>
            <Form.Item name="description" className="m-1 col-span-5">
              <Input.TextArea
                name="description"
                className="user-gym-plan-obs"
                aria-label="Observações"
                placeholder="Observações"
                {...textAreaProps}
              />
            </Form.Item>
          </div>
        ) : (
          <div className="grid grid-cols-5">
            <p className="col-span-4 w-full text-stone-600 text-xl font-semibold">
              {name}
              <span className="text-base ml-2">
                ({WeekDayNames[weekDay as WeekDays]})
              </span>
            </p>
            <div className="flex justify-end">{Buttons}</div>
            {description && (
              <p className="w-full text-stone-400 text-base">{description}</p>
            )}
          </div>
        )}
        <ExerciseSetTable actionButtons={hasActionsButtons}>
          {TableComponent}
        </ExerciseSetTable>
      </Wrapper>
    </ExerciseSetWrapper>
  );
};

export { ExerciseSetForm };
