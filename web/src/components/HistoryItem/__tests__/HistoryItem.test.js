import { cleanup } from "@testing-library/react";
import { renderWithTheme, getYear } from "../../../utils";
import HistoryItem from "../HistoryItem.js";

const testData = {
  id: 1,
  organisation: "Air Force",
  title: "Bachelor's degree",
  start_date: "2021-10-29T11:35:16.000Z",
  end_date: "2021-10-29T11:35:16.000Z",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
};

describe("HistoryItem component", () => {
  let container = null;
  beforeEach(() => {
    container = renderWithTheme(<HistoryItem historyItem={testData} />);
  });
  afterAll(cleanup);
  it("should render organisation correctly", () => {
    const { getByTestId } = container;
    const organisationEl = getByTestId("organisation");
    expect(organisationEl).toBeTruthy();
    expect(organisationEl).toHaveTextContent(testData.organisation);
  });
  it("should render title correctly", () => {
    const { getByTestId } = container;
    const titleEl = getByTestId("title");
    expect(titleEl).toBeTruthy();
    expect(titleEl).toHaveTextContent(testData.title);
  });
  it("should render start date correctly", () => {
    const { getByTestId } = container;
    const start_dateEl = getByTestId("start-date");
    expect(start_dateEl).toBeTruthy();
    expect(start_dateEl).toHaveTextContent(getYear(testData.start_date));
  });
  it("should render end date correctly", () => {
    const { getByTestId } = container;
    const end_dateEl = getByTestId("end-date");
    expect(end_dateEl).toBeTruthy();
    expect(end_dateEl).toHaveTextContent(getYear(testData.end_date));
  });
  it("should render description correctly", () => {
    const { getByTestId } = container;
    const descriptionEl = getByTestId("description");
    expect(descriptionEl).toBeTruthy();
    expect(descriptionEl).toHaveTextContent(testData.description);
  });
});
