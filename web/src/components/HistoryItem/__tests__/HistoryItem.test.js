import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import HitoryItem from "../HistoryItem.js";

const testData = {
  id: 1,
  organisation: "Air Force",
  title: "Bachelor's degree",
  startDate: "20.10.2020",
  endDate: "10.11.2021",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
};

describe("HitoryItem component", () => {
  let container = null;
  beforeEach(() => {
    container = renderWithTheme(<HitoryItem historyItem={testData} />);
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
    const startDateEl = getByTestId("start-date");
    expect(startDateEl).toBeTruthy();
    expect(startDateEl).toHaveTextContent(testData.startDate);
  });
  it("should render end date correctly", () => {
    const { getByTestId } = container;
    const endDateEl = getByTestId("end-date");
    expect(endDateEl).toBeTruthy();
    expect(endDateEl).toHaveTextContent(testData.endDate);
  });
  it("should render description correctly", () => {
    const { getByTestId } = container;
    const descriptionEl = getByTestId("description");
    expect(descriptionEl).toBeTruthy();
    expect(descriptionEl).toHaveTextContent(testData.description);
  });
});
