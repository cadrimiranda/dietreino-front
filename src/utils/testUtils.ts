import { fireEvent, screen, waitFor } from "@testing-library/dom";

export class TestUtils {
  static checkTextByRole(role: string, text: string, name?: string) {
    const input = screen.getByRole(role, { name });
    expect(input).toHaveValue(text);
  }

  static changeByPlaceholder(placeholder: string, value: string) {
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value } });
  }

  static textToBeInTheDocument(text: string) {
    expect(screen.getByText(text)).toBeInTheDocument();
  }

  static async changeAutocompleteValue(
    position: number,
    value: string,
    mockGet: jest.Mock
  ) {
    const autocomplete = screen.getAllByRole("combobox")[position];
    fireEvent.change(autocomplete, {
      target: { value },
    });
    fireEvent.change(autocomplete, {
      target: { value },
    });
    await waitFor(
      () => {
        expect(mockGet).toHaveBeenCalledWith(value);
      },
      { timeout: 1100 }
    );
    const options = await screen.findAllByText(new RegExp(value, "i"));
    fireEvent.click(options[0]);
  }
}
