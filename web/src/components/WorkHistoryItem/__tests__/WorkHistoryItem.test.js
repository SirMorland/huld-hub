import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import WorkHitoryItem from "../WorkHistoryItem.js";

const testData = {
  id: 1,
  company: "Huld",
  position: "Fullstack Developer",
  startDate: "20.10.2020",
  endDate: "10.11.2021",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
};

describe("WorkHitoryItem component", () => {
  beforeEach(() => {
    renderWithTheme(<WorkHitoryItem workItem={testData} />);
  });
  afterAll(cleanup);
  it("should render company correctly", () => {
    const companyEl = document.querySelector(".company");
    expect(companyEl).toBeTruthy();
    expect(companyEl.textContent).toBe(testData.company);
  });
  it("should render position correctly", () => {
    const positionEl = document.querySelector(".position");
    expect(positionEl).toBeTruthy();
    expect(positionEl.textContent).toBe(testData.position);
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
