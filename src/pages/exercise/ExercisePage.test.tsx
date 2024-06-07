import { render, screen } from "@testing-library/react";

const mockGet = jest.fn().mockResolvedValue([]);
const mockUseFetch = jest.fn().mockReturnValue({
  get: mockGet,
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
  it("should render", () => {
    render(<ExercisePage />);
    const table = screen.getByRole("table");
    TestUtils.textInsideElement(table, "Nome");
    TestUtils.textInsideElement(table, "Grupo Muscular");
    TestUtils.textInsideElement(table, "URL");
    TestUtils.textInsideElement(table, "Imagem");

    expect(screen.getByText("Add exercisio")).toBeInTheDocument();

    expect(mockGet).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith("/exercises/getall", undefined);
  });

  it("should render exercise", () => {
    render(<ExercisePage />);
    const table = screen.getByRole("table");
    TestUtils.textInsideElement(table, mockExerciseMG.name);
    TestUtils.textInsideElement(table, mockExerciseMG.muscularGroup.name);
    TestUtils.textInsideElement(table, mockExerciseMG.url);
    TestUtils.textInsideElement(table, mockExerciseMG.image as string);
  });

  it("should render action buttons", () => {
    render(<ExercisePage />);
    const table = screen.getByRole("table");
    TestUtils.existByTestId("btn-edit-exercise", table);
    TestUtils.existByTestId("btn-remove-exercise", table);
  });

  it("should render add exercise modal", () => {
    render(<ExercisePage />);
    TestUtils.getByTextAndClick("Add exercisio");
    TestUtils.existByRole("dialog", {
      options: { name: "Adicionar Exercício" },
    });
  });
});
