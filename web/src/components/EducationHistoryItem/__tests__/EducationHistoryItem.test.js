import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import EducationHitoryItem from "../EducationHistoryItem.js";

const testData = {
  id: 1,
  school: "Air Force",
  degree: "Bachelor's degree",
  startDate: "20.10.2020",
  endDate: "10.11.2021",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
};

describe("EducationHitoryItem component", () => {
  beforeEach(() => {
    renderWithTheme(<EducationHitoryItem educationItem={testData} />);
  });
  afterAll(cleanup);
  it("should render school correctly", () => {
    const schoolEl = document.querySelector(".school");
    expect(schoolEl).toBeTruthy();
    expect(schoolEl.textContent).toBe(testData.school);
  });
  it("should render degree correctly", () => {
    const degreeEl = document.querySelector(".degree");
    expect(degreeEl).toBeTruthy();
    expect(degreeEl.textContent).toBe(testData.degree);
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
