import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import * as dayjs from "dayjs";

const mockGet = jest.fn().mockResolvedValue({});
const mockPost = jest.fn().mockResolvedValue({});
const mockPut = jest.fn().mockResolvedValue({});
const mockDel = jest.fn().mockResolvedValue("");
const mockUseFetch = jest.fn().mockReturnValue({
  get: mockGet,
  post: mockPost,
  del: mockDel,
  put: mockPut,
});
jest.mock("use-http", () => ({
  __esModule: true,
  ...jest.requireActual("use-http"),
  useFetch: mockUseFetch,
}));

window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

import {
  WorkoutPageComponent,
  createNewWorkout,
  // activeWorkout,
} from "./utils/tests";
import {
  fillNewSetup,
  activeWorkout as fullWorkout,
  newSetup,
  verifyEmptyInputs,
} from "./activeWorkout/utils/tests";
import { TestUtils } from "../../utils/testUtils";

describe("Component: WorkoutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component", () => {
    mockGet.mockResolvedValue("");
    render(<WorkoutPageComponent />);
    expect(screen.getByText("Adicionar treino")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! Nenhum treino ativo encontrado")
    ).toBeInTheDocument();
    expect(screen.getByText(/\Parece que Foo bar não tem/)).toBeInTheDocument();
    expect(mockGet).toHaveBeenCalledWith("/user/1/active-workout");
    expect(screen.queryByTestId("remove-active-workout")).toBeNull();
    expect(screen.queryByTestId("edit-active-workout")).toBeNull();
  });

  it("should open the modal to create a new workout", () => {
    mockGet.mockResolvedValue("");
    render(<WorkoutPageComponent />);
    TestUtils.getByTextAndClick("Adicionar treino");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should not fill the modal and get errors", async () => {
    mockGet.mockResolvedValue("");
    render(<WorkoutPageComponent />);
    TestUtils.getByTextAndClick("Adicionar treino");
    TestUtils.getByTextAndClick("OK");
    expect(await screen.findByText("Insira um nome!")).toBeInTheDocument();
    expect(
      await screen.findByText("Insira uma data de inicio")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Insira uma data de fim")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Insira uma descrição!")
    ).toBeInTheDocument();
  });

  it("should create a new workout", async () => {
    await createNewWorkout({ mockGet, mockPost });
    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith("/workout", {
      name: "Foo",
      startDate: "2030-01-01T03:00:00.000Z",
      endDate: "2030-02-01T03:00:00.000Z",
      description: "Bar",
      userToAssign: 1,
    });
  });

  it("should display workout infos", async () => {
    mockGet.mockResolvedValueOnce(fullWorkout);
    render(<WorkoutPageComponent />);
    await waitFor(() => expect(mockGet).toHaveBeenCalled());
    expect(screen.queryByTestId("remove-active-workout")).toBeInTheDocument();
    expect(screen.queryByTestId("edit-active-workout")).toBeInTheDocument();
    expect(screen.getByText(fullWorkout.name)).toBeInTheDocument();
    expect(screen.getByText(fullWorkout.description)).toBeInTheDocument();
    expect(screen.getByText("01/01/2021")).toBeInTheDocument();
    expect(screen.getByText("02/01/2021")).toBeInTheDocument();
  });

  it("should add setup to a fresh new workout", async () => {
    const { container } = await createNewWorkout({ mockGet, mockPost });
    TestUtils.clickEvent(screen.getByText("Adicionar exercícios"));

    // fill set
    TestUtils.changeByPlaceholder("Nome do set", "Arms");
    TestUtils.changeByPlaceholder("Observações", "Triceps");

    // fill setup
    await fillNewSetup(newSetup, mockGet, 1);
    TestUtils.selectAntdSelectOption(container, "Sexta");

    // check empty inputs
    verifyEmptyInputs();

    // check values in table
    const rows = await screen.findAllByRole("row");
    TestUtils.textInsideElement(rows[2], newSetup.exerciseName);
    TestUtils.textInsideElement(rows[2], newSetup.series);
    TestUtils.textInsideElement(rows[2], newSetup.repetitions);
    TestUtils.textInsideElement(rows[2], newSetup.rest);

    mockPost.mockReset();
    mockGet.mockReset();
    mockPost.mockResolvedValueOnce("");
    mockGet.mockResolvedValueOnce(fullWorkout);
    TestUtils.clickEvent(screen.getByTestId("btn-save-set"));
    await waitFor(() => expect(mockPost).toHaveBeenCalled());
    expect(mockPost).toHaveBeenCalledWith("/workout/1/exercise-set", {
      description: "Triceps",
      name: "Arms",
      weekDay: "FRIDAY",
      exerciseSetupList: [{ ...newSetup, observation: "" }],
    });
    await waitFor(() => expect(mockGet).toHaveBeenCalled());
    expect(mockGet).toHaveBeenCalledWith("/user/1/active-workout");
  });

  it("should not show delete button when not active workout", async () => {
    mockGet.mockResolvedValue("");
    render(<WorkoutPageComponent />);
    expect(screen.queryByTestId("remove-active-workout")).toBeNull();
  });

  it("should delete active workout", async () => {
    await createNewWorkout({ mockGet, mockPost });
    const deleteButton = screen.getByTestId("remove-active-workout");
    expect(deleteButton).toBeInTheDocument();
    TestUtils.clickEvent(deleteButton);
    TestUtils.clickEvent(screen.getByText("Sim"));
    expect(mockDel).toHaveBeenCalledWith("/workout/1", undefined);
    await waitFor(() =>
      expect(
        screen.getByText("Oops! Nenhum treino ativo encontrado")
      ).toBeInTheDocument()
    );
  });

  it("should not delete active workout", async () => {
    await createNewWorkout({ mockGet, mockPost });
    const deleteButton = screen.getByTestId("remove-active-workout");
    expect(deleteButton).toBeInTheDocument();
    TestUtils.clickEvent(deleteButton);
    TestUtils.clickEvent(screen.getByText("Não"));
    expect(mockDel).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(
        screen.queryByText("Oops! Nenhum treino ativo encontrado")
      ).toBeNull()
    );
  });

  it("should edit active workout", async () => {
    mockGet.mockResolvedValueOnce(fullWorkout);
    mockPut.mockResolvedValue(fullWorkout);
    render(<WorkoutPageComponent />);
    await waitFor(() => expect(mockGet).toHaveBeenCalled());

    TestUtils.clickEvent(screen.getByTestId("edit-active-workout"));
    TestUtils.fillByLabel("name", "Treino B");
    TestUtils.fillByLabel("description", "Treino B");
    TestUtils.fillDatePicker("Fim", "02/01/2030", 0);
    expect(screen.getByPlaceholderText("Inicio")).toBeDisabled();
    expect(screen.getByPlaceholderText<HTMLInputElement>("Inicio").value).toBe(
      "01/01/2021"
    );
    TestUtils.clickEvent(screen.getByTestId("edit-active-workout"));
    await waitFor(() => {
      expect(mockPut).toHaveBeenCalledWith("/workout/" + fullWorkout.id, {
        name: "Treino B",
        description: "Treino B",
        endDate: dayjs("2030-02-01"),
      });
    });
  });
});
