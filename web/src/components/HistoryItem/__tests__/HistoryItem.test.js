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
  beforeEach(() => {
    renderWithTheme(<HitoryItem historyItem={testData} />);
  });
  afterAll(cleanup);
  it("should render organisation correctly", () => {
    const organisationEl = document.querySelector(".organisation");
    expect(organisationEl).toBeTruthy();
    expect(organisationEl.textContent).toBe(testData.organisation);
  });
  it("should render title correctly", () => {
    const titleEl = document.querySelector(".title");
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent).toBe(testData.title);
  });
  it("should render start date correctly", () => {
    const startDateEl = document.querySelector(".start-date");
    expect(startDateEl).toBeTruthy();
    expect(startDateEl.textContent).toBe(testData.startDate);
  });
  it("should render end date correctly", () => {
    const endDateEl = document.querySelector(".end-date");
    expect(endDateEl).toBeTruthy();
    expect(endDateEl.textContent).toBe(testData.endDate);
  });
  it("should render description correctly", () => {
    const descriptionEl = document.querySelector(".description");
    expect(descriptionEl).toBeTruthy();
    expect(descriptionEl.textContent).toBe(testData.description);
  });
});
