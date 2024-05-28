import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { act } from "@testing-library/react";

export class TestUtils {
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
    act(() => {
      fireEvent.change(input, { target: { value } });
    });
  }

  static changeByRole(role: string, value: string, name?: string) {
    const input = screen.getByRole(role, { name });
    act(() => {
      fireEvent.change(input, { target: { value } });
    });
  }

  static textToBeInTheDocument(text: string) {
    expect(screen.getByText(text)).toBeInTheDocument();
  }

  static clickEvent(element: HTMLElement) {
    act(() => {
      fireEvent.click(element);
    });
  }

  static async changeAutocompleteValue(
    position: number,
    value: string,
    mockGet: jest.Mock
  ) {
    const autocomplete = screen.getAllByRole("combobox")[position];
    act(() => {
      fireEvent.change(autocomplete, {
        target: { value },
      });
    });
    act(() => {
      fireEvent.change(autocomplete, {
        target: { value },
      });
    });

    await waitFor(
      () => {
        expect(mockGet).toHaveBeenCalledWith(value);
      },
      { timeout: 1100 }
    );
    const options = await screen.findAllByText(new RegExp(value, "i"));
    act(() => {
      fireEvent.click(options[0]);
    });
  }
}
