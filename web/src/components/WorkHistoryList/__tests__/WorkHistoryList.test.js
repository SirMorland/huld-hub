import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import WorkHitoryList from "../WorkHistoryList.js";

const testData = [
  {
    id: 1,
    company: "Huld",
    position: "Fullstack Developer",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
  {
    id: 2,
    company: "Huld",
    position: "Fullstack Developer",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
  {
    id: 3,
    company: "Huld",
    position: "Fullstack Developer",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
  {
    id: 4,
    company: "Huld",
    position: "Fullstack Developer",
    startDate: "20.10.2020",
    endDate: "10.11.2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
];

describe("WorkHitoryList component", () => {
  afterEach(cleanup);
  it("should render no work data", () => {
    renderWithTheme(<WorkHitoryList />);
    const workListEl = document.querySelector(".work-list");
    expect(workListEl).toBeTruthy();
    expect(workListEl.childElementCount).toBe(0);
  });
  it("should render correct number of work", () => {
    renderWithTheme(<WorkHitoryList workList={testData} />);
    const workListEl = document.querySelector(".work-list");
    expect(workListEl).toBeTruthy();
    expect(workListEl.childElementCount).toBe(testData.length);
  });
  it("should render correct work", () => {
    renderWithTheme(<WorkHitoryList workList={testData} />);
    const workListEl = document.querySelectorAll(".work-item");
    expect(workListEl).toBeTruthy();
    expect(workListEl.length).toBe(testData.length);
    Array.from(workListEl).forEach((workHitoryItem, index) => {
      const companyEl = workHitoryItem.querySelector(".company");
      expect(companyEl).toBeTruthy();
      expect(companyEl.textContent).toBe(testData[index].company);
      const positionEl = workHitoryItem.querySelector(".position");
      expect(positionEl).toBeTruthy();
      expect(positionEl.textContent).toBe(testData[index].position);
      const startDateEl = workHitoryItem.querySelector(".start-date");
      expect(startDateEl).toBeTruthy();
      expect(startDateEl.textContent).toBe(testData[index].startDate);
      const endDateEl = workHitoryItem.querySelector(".end-date");
      expect(endDateEl).toBeTruthy();
      expect(endDateEl.textContent).toBe(testData[index].endDate);
      const descriptionEl = workHitoryItem.querySelector(".description");
      expect(descriptionEl).toBeTruthy();
      expect(descriptionEl.textContent).toBe(testData[index].description);
    });
  });
});
