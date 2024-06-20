import { render, screen } from "@testing-library/react";
import { User } from "../../users/hooks/useUserList";
import { UserPageContext } from "../../users/components/UserPageContext";
import { TestUtils } from "../../../utils/testUtils";
import { Workout } from "../activeWorkout/workoutTypes";
import { WorkoutPage } from "../WorkoutPage";

export const activeWorkout: Workout = {
  id: "1",
  name: "Treino A",
  description: "Treino de peito",
  startDate: "2021-01-01",
  endDate: "2021-01-02",
  exerciseSets: [],
};

const mockUser = { id: 1, fullName: "Foo bar" } as unknown as User;

export const WorkoutPageComponent = () => (
  <UserPageContext.Provider value={{ user: mockUser, setEntry: jest.fn() }}>
    <WorkoutPage />
  </UserPageContext.Provider>
);

export const createNewWorkout = async (props: {
  mockGet: jest.Mock;
  mockPost: jest.Mock;
}) => {
  console.error = jest.fn();
  props.mockGet.mockResolvedValueOnce("");
  props.mockPost.mockResolvedValueOnce(activeWorkout);
  const component = render(<WorkoutPageComponent />);
  TestUtils.getByTextAndClick("Adicionar treino");
  TestUtils.fillDatePicker("Inicio", "01/01/2030", 0);
  TestUtils.fillDatePicker("Fim", "02/01/2030", 1);
  TestUtils.fillInputByPlaceholder("Nome do treino", "Foo");
  TestUtils.fillInputByPlaceholder("Descrição", "Bar");
  TestUtils.getByTextAndClick("OK");
  expect(await screen.findByText(activeWorkout.name)).toBeInTheDocument();
  return component;
};
