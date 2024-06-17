import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockGet = jest.fn().mockResolvedValue([]);
const mockDelete = jest.fn().mockResolvedValue({});
const mockPut = jest.fn().mockResolvedValue({});
const mockPost = jest.fn().mockResolvedValue({});
const mockUseFetch = jest.fn().mockReturnValue({
  get: mockGet,
  del: mockDelete,
  put: mockPut,
  post: mockPost,
});
jest.mock("use-http", () => ({
  __esModule: true,
  ...jest.requireActual("use-http"),
  useFetch: mockUseFetch,
}));

import { ExercisePage } from "./ExercisePage";
import { TestUtils } from "../../utils/testUtils";
import { mockExerciseMG } from "./utils/utilsTest";

describe("ExercisePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    render(<ExercisePage />);
    const table = screen.getByRole("table");
    TestUtils.textInsideElement(table, "Nome");
    TestUtils.textInsideElement(table, "Grupo Muscular");
    TestUtils.textInsideElement(table, "URL");
    TestUtils.textInsideElement(table, "Descrição");

    expect(screen.getByText("Exercício")).toBeInTheDocument();

    expect(mockGet).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith("/exercise/getall");
  });

  const renderWithExercise = async () => {
    mockGet.mockResolvedValueOnce([mockExerciseMG]);
    const component = render(<ExercisePage />);
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
    });
    return component;
  };

  it("should render exercise", async () => {
    await renderWithExercise();

    const table = screen.getByRole("table");
    TestUtils.textInsideElement(table, mockExerciseMG.name);
    TestUtils.textInsideElement(table, "Peito");
    TestUtils.textInsideElement(table, mockExerciseMG.url);
  });

  it("should render action buttons", async () => {
    await renderWithExercise();
    const table = screen.getByRole("table");
    TestUtils.existByTestId("btn-edit-exercise", table);
    TestUtils.existByTestId("btn-remove-exercise", table);
  });

  it("should render add exercise modal", () => {
    render(<ExercisePage />);
    TestUtils.getByTextAndClick("Exercício");
    TestUtils.existByRole("dialog", {
      options: { name: "Adicionar Exercício" },
    });
  });

  it("should delete exercise", async () => {
    await renderWithExercise();
    const btnRemove = screen.getByTestId("btn-remove-exercise");
    TestUtils.clickEvent(btnRemove);
    TestUtils.getByTextAndClick("Sim");
    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalled();
    });

    expect(mockDelete).toHaveBeenCalledWith(
      "exercise/" + mockExerciseMG.id,
      undefined
    );
  });

  it("should not delete exercise", async () => {
    await renderWithExercise();
    const btnRemove = screen.getByTestId("btn-remove-exercise");
    TestUtils.clickEvent(btnRemove);
    TestUtils.getByTextAndClick("Não");
    expect(screen.queryByText("Não")).not.toBeVisible();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it("should change table action buttons when editting", async () => {
    await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("btn-edit-exercise"));
    expect(screen.getByTestId("btn-save-exercise")).toBeInTheDocument();
    expect(screen.getByTestId("btn-cancel-edit-exercise")).toBeInTheDocument();
    expect(screen.queryByTestId("btn-edit-exercise")).toBeNull();
    expect(screen.queryByTestId("btn-remove-exercise")).toBeNull();
  });

  it("should edit an exercise", async () => {
    const newExmg = {
      ...mockExerciseMG,
      name: "new name",
      description: "new desc",
      url: "new url",
      muscularGroup: "SHOULDERS",
    };

    const { container } = await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("btn-edit-exercise"));

    TestUtils.fillByLabel("name", "new name");
    TestUtils.fillByLabel("description", "new desc");
    TestUtils.fillByLabel("url", "new url");
    fireEvent.mouseDown(container.querySelector(".ant-select-selector")!);
    TestUtils.clickEvent(screen.getByText("Ombro"));

    mockPut.mockResolvedValueOnce(newExmg);
    TestUtils.clickEvent(screen.getByTestId("btn-save-exercise"));

    await waitFor(() => {
      expect(mockPut).toHaveBeenCalled();
    });

    expect(mockPut).toHaveBeenCalledWith(
      "exercise/" + mockExerciseMG.id,
      newExmg
    );
  });

  it("should cancel edit an exercise", async () => {
    await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("btn-edit-exercise"));

    expect(screen.queryByTestId("btn-edit-exercise")).toBeNull();
    expect(screen.queryByTestId("btn-remove-exercise")).toBeNull();
    expect(screen.getByTestId("btn-save-exercise")).toBeInTheDocument();
    expect(screen.getByTestId("btn-cancel-edit-exercise")).toBeInTheDocument();

    TestUtils.clickEvent(screen.getByTestId("btn-cancel-edit-exercise"));

    expect(screen.getByTestId("btn-edit-exercise")).toBeInTheDocument();
    expect(screen.getByTestId("btn-remove-exercise")).toBeInTheDocument();
    expect(screen.queryByTestId("btn-save-exercise")).toBeNull();
    expect(screen.queryByTestId("btn-cancel-edit-exercise")).toBeNull();

    expect(mockPut).not.toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it("should not edit an exercise", async () => {
    await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("btn-edit-exercise"));

    TestUtils.fillByLabel("name", "");
    TestUtils.fillByLabel("description", "");
    TestUtils.fillByLabel("url", "");
    TestUtils.clickEvent(screen.getByTestId("btn-save-exercise"));

    expect(mockPut).not.toHaveBeenCalled();
  });

  it("should add an exercise", async () => {
    const newExmg = {
      name: "new name",
      description: "new desc",
      url: "new url",
      muscularGroup: "BACK",
    };

    await renderWithExercise();
    TestUtils.getByTextAndClick("Exercício");
    TestUtils.fillByLabel("name", "new name");
    TestUtils.fillByLabel("description", "new desc");
    TestUtils.fillByLabel("url", "new url");

    fireEvent.mouseDown(document.querySelector(".ant-select-selector")!);
    TestUtils.getByTextAndClick("Costas");

    TestUtils.getByTextAndClick("OK");

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalled();
    });

    expect(mockPost).toHaveBeenCalledWith("/exercise", newExmg);
    await waitFor(() => {
      expect(screen.queryByText("Adicionar Exercício")).toBeNull();
    });
  });

  it("should not add an exercise", async () => {
    await renderWithExercise();
    TestUtils.getByTextAndClick("Exercício");
    TestUtils.getByTextAndClick("OK");

    expect(mockPost).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByText("Insira o nome do exercício")).not.toBeNull()
    );
    expect(screen.queryByText("Adicionar Exercício")).not.toBeNull();
  });
});
