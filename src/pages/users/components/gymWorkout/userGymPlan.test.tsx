import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockGet = jest.fn().mockResolvedValue({});
const mockPost = jest.fn().mockResolvedValue({});
const mockUseFetch = jest.fn().mockReturnValue({
  get: mockGet,
  post: mockPost,
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

import { TestUtils } from "../../../../utils/testUtils";
import {
  UserGymComponent,
  createNewWorkout,
  // activeWorkout,
} from "./utils/tests";
import {
  fillNewSetup,
  activeWorkout as fullWorkout,
  newSetup,
  verifyEmptyInputs,
} from "./activeWorkout/utils/tests";

describe("Component: UserGymPlan", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component", () => {
    mockGet.mockResolvedValue("");
    render(<UserGymComponent />);
    expect(screen.getByText("Adicionar treino")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! Nenhum treino ativo encontrado")
    ).toBeInTheDocument();
    expect(screen.getByText(/\Parece que Foo bar não tem/)).toBeInTheDocument();
    expect(mockGet).toHaveBeenCalledWith("/user/1/active-workout");
  });

  it("should open the modal to create a new workout", () => {
    mockGet.mockResolvedValue("");
    render(<UserGymComponent />);
    TestUtils.getByTextAndClick("Adicionar treino");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should not fill the modal and get errors", async () => {
    mockGet.mockResolvedValue("");
    render(<UserGymComponent />);
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

  it("should add setup to a fresh new workout", async () => {
    await createNewWorkout({ mockGet, mockPost });
    TestUtils.clickEvent(screen.getByText("Adicionar exercícios"));

    // fill set
    TestUtils.changeByPlaceholder("Nome do set", "Arms");
    TestUtils.changeByPlaceholder("Observações", "Triceps");

    // fill setup
    await fillNewSetup(newSetup, mockGet, 0);

    // check empty inputs
    verifyEmptyInputs();

    // check values in table
    const rows = await screen.findAllByRole("row");
    TestUtils.textInsideElement(rows[2], newSetup.exerciseName);
    TestUtils.textInsideElement(rows[2], newSetup.series);
    TestUtils.textInsideElement(rows[2], newSetup.repetitions);
    TestUtils.textInsideElement(rows[2], newSetup.rest);

    mockPost.mockReset();
    mockPost.mockResolvedValueOnce("");
    mockGet.mockResolvedValueOnce(fullWorkout);
    TestUtils.clickEvent(screen.getByTestId("btn-save-set"));
    expect(mockPost).toHaveBeenCalledWith("/workout/1/exercise-set", {
      description: "Triceps",
      name: "Arms",
      exerciseSetupList: [{ ...newSetup, observation: "" }],
    });
    expect(mockGet).toHaveBeenCalledWith("/user/1/active-workout");
  });
});
