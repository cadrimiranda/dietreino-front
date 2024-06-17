import {
  ByRoleOptions,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/dom";
import { act } from "@testing-library/react";
import * as dayjs from "dayjs";

export class TestUtils {
  static onChange(input: HTMLElement, value: string) {
    act(() => {
      fireEvent.change(input, { target: { value } });
    });
  }

  static fillInputByPlaceholder(placeholder: string, value: string) {
    const input = screen.getByPlaceholderText(placeholder);
    this.onChange(input, value);
  }

  static fillByLabel(label: string, value: string) {
    const input = screen.getByRole("textbox", { name: label });
    this.onChange(input, value);
  }

  static fillDatePicker(placeholder: string, value: string, position = 0) {
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.mouseDown(input);
    const selectedDate = dayjs(value);
    this.onChange(input, selectedDate.format("DD/MM/YYYY"));
    fireEvent.click(
      document.querySelectorAll(".ant-picker-cell-selected")[position]
    );
  }

  static checkTextByRole(role: string, text: string, name?: string) {
    const input = screen.getByRole(role, { name });
    expect(input).toHaveValue(text);
  }

  static checkTextByPlaceholder(placeholder: string, text: string) {
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toHaveValue(text);
  }

  static changeByPlaceholder(placeholder: string, value: string) {
    const input = screen.getByPlaceholderText(placeholder);
    this.onChange(input, value);
  }

  static changeByRole(role: string, value: string, name?: string) {
    const input = screen.getByRole(role, { name });
    this.onChange(input, value);
  }

  static textToBeInTheDocument(text: string) {
    expect(screen.getByText(text)).toBeInTheDocument();
  }

  static toExist(element: HTMLElement) {
    expect(element).toBeInTheDocument();
  }

  static textInsideElement(element: HTMLElement, text: string) {
    const textElement = within(element).getByText(text);
    this.toExist(textElement);
    return textElement;
  }

  static existByTestId(testId: string, element?: HTMLElement) {
    let result;
    if (element) {
      result = within(element).getByTestId(testId);
    } else {
      result = screen.getByTestId(testId);
    }

    this.toExist(result);
    return result;
  }

  static existByRole(
    role: string,
    { element, options }: { element?: HTMLElement; options?: ByRoleOptions }
  ) {
    let result;
    if (element) {
      result = within(element).getByRole(role, options);
    } else {
      result = screen.getByRole(role);
    }

    this.toExist(result);
    return result;
  }

  static clickEvent(element: HTMLElement) {
    act(() => {
      fireEvent.click(element);
    });
  }

  static getByTextAndClick(text: string) {
    const element = screen.getByText(text);
    TestUtils.clickEvent(element);
  }

  static async changeAutocompleteValue(
    position: number,
    value: string,
    mockGet: jest.Mock
  ) {
    const autocomplete = screen.getAllByRole("combobox")[position];
    this.onChange(autocomplete, value);
    this.onChange(autocomplete, value);

    await waitFor(
      () => {
        expect(mockGet).toHaveBeenCalledWith(value);
      },
      { timeout: 1100 }
    );
    const options = await screen.findAllByText(new RegExp(value, "i"));
    this.clickEvent(options[0]);
  }
}
