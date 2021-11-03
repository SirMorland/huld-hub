import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import EducationHitoryList from "../EducationHistoryList.js";

const testData = [
  {
    id: 1,
    school: "Air Force",
    degree: "Bachelor's degree",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
  {
    id: 2,
    school: "Air Force",
    degree: "Bachelor's degree",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },

  {
    id: 3,
    school: "Air Force",
    degree: "Bachelor's degree",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
  {
    id: 4,
    school: "Air Force",
    degree: "Bachelor's degree",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
];

describe("EducationHitoryList component", () => {
  afterEach(cleanup);
  it("should render no education data", () => {
    renderWithTheme(<EducationHitoryList />);
    const educationListEl = document.querySelector(".education-list");
    expect(educationListEl).toBeTruthy();
    expect(educationListEl.childElementCount).toBe(0);
  });
  it("should render correct number of education", () => {
    renderWithTheme(<EducationHitoryList educationList={testData} />);
    const educationListEl = document.querySelector(".education-list");
    expect(educationListEl).toBeTruthy();
    expect(educationListEl.childElementCount).toBe(testData.length);
  });
  it("should render correct education", () => {
    renderWithTheme(<EducationHitoryList educationList={testData} />);
    const educationListEl = document.querySelectorAll(".education-item"); 
    expect(educationListEl).toBeTruthy();
    expect(educationListEl.length).toBe(testData.length);
    Array.from(educationListEl).forEach((educationHitoryItem, index) => {
      const schoolEl = educationHitoryItem.querySelector(".school");
      expect(schoolEl).toBeTruthy();
      expect(schoolEl.textContent).toBe(testData[index].school);
      const degreeEl = educationHitoryItem.querySelector(".degree");
      expect(degreeEl).toBeTruthy();
      expect(degreeEl.textContent).toBe(testData[index].degree);
      const startDateEl = educationHitoryItem.querySelector(".start-date");
      expect(startDateEl).toBeTruthy();
      expect(startDateEl.textContent).toBe(testData[index].startDate);
      const endDateEl = educationHitoryItem.querySelector(".end-date");
      expect(endDateEl).toBeTruthy();
      expect(endDateEl.textContent).toBe(testData[index].endDate);
      const descriptionEl = educationHitoryItem.querySelector(".description");
      expect(descriptionEl).toBeTruthy();
      expect(descriptionEl.textContent).toBe(testData[index].description);
    });
  });
});
