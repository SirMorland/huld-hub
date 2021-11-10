import { cleanup, fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import DatePicker from "../DatePicker";

const testData = {
  label: "end date",
  randomDay: 1 + Math.floor(Math.random() * 28),
  date: new Date(),
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

describe("DatePicker Component", () => {
  afterAll(cleanup);

  it("should render date picker", () => {
    const { getByTestId } = renderWithTheme(<DatePicker />);
    const dateLocaleEl = getByTestId("date-locale-provider");
    expect(dateLocaleEl).toBeTruthy();
    expect(dateLocaleEl.children).toHaveLength(1);
    expect(dateLocaleEl.tagName.toLowerCase()).not.toBe("label");
  });
  it("should render date picker and label", () => {
    const { getByTestId } = renderWithTheme(
      <DatePicker label={testData.label} />
    );
    const dateLocaleEl = getByTestId("date-locale-provider");
    expect(dateLocaleEl).toBeTruthy();
    expect(dateLocaleEl.children).toHaveLength(2);
    const labelEl = getByTestId("date-label");
    expect(labelEl).toBeTruthy();
    expect(labelEl.tagName.toLowerCase()).toBe("label");
    expect(labelEl).toHaveTextContent(testData.label);
  });

  it("should render date picker modal", () => {
    const { getByTestId } = renderWithTheme(
      <DatePicker label={testData.label} />
    );
    const calenderIconEl = getByTestId("CalendarIcon");
    fireEvent.click(calenderIconEl);
    expect(screen.getByText(testData.date.getFullYear())).toBeTruthy();
    expect(screen.getByText(testData.monthNames[testData.date.getMonth()])).toBeTruthy();
    expect(screen.getByText(testData.date.getDate())).toBeTruthy();
  });

  it("should set date correctly", () => {
    const { getByTestId } = renderWithTheme(
      <DatePicker label={testData.label} />
    );
    const calenderIconEl = getByTestId("CalendarIcon");
    fireEvent.click(calenderIconEl);

    fireEvent.click(screen.getByText(testData.randomDay));
    const dateInputEl = getByTestId("date-input")
    expect(dateInputEl.value).toBe(`${testData.randomDay.toString().padStart(2, '0')}.${testData.date.getMonth()+1}.${testData.date.getFullYear()}`);
  });
});
