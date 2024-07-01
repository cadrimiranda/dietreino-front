import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

const mockGet = jest.fn().mockResolvedValue([]);
const mockDelete = jest.fn().mockResolvedValue({ data: "ok" });
const mockPut = jest.fn().mockResolvedValue({});
const mockPost = jest.fn().mockResolvedValue({ data: {} });

import { TestUtils } from "../../utils/testUtils";
import { ExercisePageWithRouter, mockExerciseMG } from "./utils/utilsTest";
import { COLUMN_SEARCH_DEBOUNCE } from "../../hooks/useTableColumnSearcn";

jest.mock("axios");

describe("ExercisePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (axios.get as jest.Mock) = mockGet;
    (axios.delete as jest.Mock) = mockDelete;
    (axios.put as jest.Mock) = mockPut;
    (axios.post as jest.Mock) = mockPost;
  });

  it("should render", () => {
    render(<ExercisePageWithRouter />);
    const table = screen.getByRole("table");
    TestUtils.textInsideElement(table, "Nome");
    TestUtils.textInsideElement(table, "Grupo Muscular");
    TestUtils.textInsideElement(table, "URL");
    TestUtils.textInsideElement(table, "Descrição");

    expect(screen.getByText("Exercício")).toBeInTheDocument();

    expect(mockGet).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith("/exercise/getall?page=0&size=10");
  });

  const mockGetExercises = () => {
    mockGet.mockReset();
    mockGet.mockResolvedValue(TestUtils.mockPageableResult(mockExerciseMG));
  };

  const renderWithExercise = async () => {
    mockGetExercises();
    const component = render(<ExercisePageWithRouter />);
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
    render(<ExercisePageWithRouter />);
    TestUtils.getByTextAndClick("Exercício");
    TestUtils.existByRole("dialog", {
      options: { name: "Adicionar Exercício" },
    });
  });

  it("should delete exercise", async () => {
    await renderWithExercise();
    mockGetExercises();
    const btnRemove = screen.getByTestId("btn-remove-exercise");
    TestUtils.clickEvent(btnRemove);
    TestUtils.getByTextAndClick("Sim");
    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalled();
    });

    expect(mockDelete).toHaveBeenCalledWith("exercise/" + mockExerciseMG.id);
    expect(mockGet).toHaveBeenCalled();
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
    TestUtils.selectAntdSelectOption(container, "Ombro");

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

  it("should search exercise", async () => {
    await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("icon-search-table-column"));
    TestUtils.fillInputByPlaceholder("Pesquise name", "name");

    fireEvent.keyDown(screen.getByPlaceholderText("Pesquise name"), {
      key: "Enter",
      code: "Enter",
    });
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith(
        "/exercise/getall?page=0&size=10&name=name"
      );
    });
  });

  it("should search with debounce", async () => {
    await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("icon-search-table-column"));
    TestUtils.fillInputByPlaceholder("Pesquise name", "name");

    await waitFor(
      () => {
        expect(mockGet).toHaveBeenCalledWith(
          "/exercise/getall?page=0&size=10&name=name"
        );
      },
      { timeout: COLUMN_SEARCH_DEBOUNCE + 500 }
    );
    expect(mockGet).toHaveBeenCalledTimes(2);
  });

  it("should close search", async () => {
    await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("icon-search-table-column"));
    TestUtils.toExist(screen.getByPlaceholderText("Pesquise name"));
    TestUtils.clickEvent(screen.getByText("Fechar"));
    expect(screen.queryByPlaceholderText("Pesquise name")).not.toBeVisible();
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it("should close search", async () => {
    await renderWithExercise();
    TestUtils.clickEvent(screen.getByTestId("icon-search-table-column"));
    TestUtils.fillInputByPlaceholder("Pesquise name", "name");
    TestUtils.clickEvent(screen.getByText("Resetar"));
    await waitFor(
      () => {
        expect(mockGet).toHaveBeenCalledWith("/exercise/getall?page=0&size=10");
      },
      { timeout: COLUMN_SEARCH_DEBOUNCE + 500 }
    );
    expect(mockGet).toHaveBeenCalledTimes(2);
  });

  it("should change page forward", async () => {
    mockGet.mockResolvedValueOnce(
      TestUtils.mockPageableResult(mockExerciseMG, {
        totalPages: 2,
        totalItems: 20,
        first: true,
        last: false,
      })
    );
    render(<ExercisePageWithRouter />);
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
    });

    mockGet.mockResolvedValueOnce(
      TestUtils.mockPageableResult(mockExerciseMG, { totalPages: 2 })
    );
    TestUtils.clickEvent(screen.getByRole("img", { name: "right" }));
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("/exercise/getall?page=1&size=10");
    });
  });

  it("should change page backward", async () => {
    mockGet.mockResolvedValueOnce(
      TestUtils.mockPageableResult(mockExerciseMG, {
        totalPages: 2,
        pageNumber: 2,
        pageSize: 10,
        totalItems: 20,
        first: false,
        last: true,
      })
    );
    render(<ExercisePageWithRouter />);
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
    });

    mockGet.mockResolvedValueOnce(
      TestUtils.mockPageableResult(mockExerciseMG, { totalPages: 2 })
    );
    TestUtils.clickEvent(screen.getByRole("img", { name: "left" }));
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("/exercise/getall?page=0&size=10");
    });
  });
});
