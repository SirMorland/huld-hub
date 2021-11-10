import { fireEvent, cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import TextField from "../TextField";

const testData = {
  label: "test label",
  placeholder: "test placeholder",
  value: "test value",
};

describe("TextField component", () => {
  afterAll(cleanup);

  it("should render text input without label when no label is provided", () => {
    const { getByTestId } = renderWithTheme(<TextField />);
    const containerEl = getByTestId("textfield-container");
    expect(containerEl.children).toHaveLength(1);
    const inputEl = getByTestId("textfield-input");
    expect(inputEl).toBeTruthy();
  });

  it("should render text area", () => {
    const { getByTestId } = renderWithTheme(<TextField textarea />);
    const containerEl = getByTestId("textfield-container");
    expect(containerEl.children).toHaveLength(1);
    const inputEl = getByTestId("textfield-input");
    expect(inputEl).toBeTruthy();
    expect(inputEl.tagName.toLowerCase()).toBe("textarea");
  });

  it("should render text input with label when label is provided", () => {
    const { getByTestId } = renderWithTheme(
      <TextField label={testData.label} />
    );
    const containerEl = getByTestId("textfield-container");
    expect(containerEl.children).toHaveLength(2);
    const labelEl = getByTestId("textfield-label");
    expect(labelEl).toBeTruthy();
    expect(labelEl).toHaveTextContent(testData.label);
    const inputEl = getByTestId("textfield-input");
    expect(inputEl).toBeTruthy();
  });

  it("should update text input value correctly", () => {
    const { getByTestId } = renderWithTheme(
      <TextField label={testData.label} />
    );
    const inputEl = getByTestId("textfield-input");
    expect(inputEl).toBeTruthy();
    fireEvent.change(inputEl, { target: { value: testData.value } });
    expect(inputEl.value).toBe(testData.value);
  });

  it("should update text input function is called correctly", () => {
    const setValue = jest.fn(({ target: { value } }) => value);
    const { getByTestId } = renderWithTheme(
      <TextField onChange={setValue} />
    );
    const inputEl = getByTestId("textfield-input");
    expect(inputEl).toBeTruthy();
    fireEvent.change(inputEl, { target: { value: testData.value } });
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveReturnedWith(testData.value);
  });
});
