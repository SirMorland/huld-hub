import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import HitoryList from "../HistoryList.js";

const testData = {
  title: "Education History",
  historyItems: [
    {
      id: 1,
      organisation: "Air Force",
      title: "Bachelor's title",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      organisation: "Air Force",
      title: "Bachelor's title",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      organisation: "Air Force",
      title: "Bachelor's title",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 4,
      organisation: "Air Force",
      title: "Bachelor's title",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
};

describe("HitoryList component", () => {
  afterEach(cleanup);
  it("should render correct title", () => {
    renderWithTheme(<HitoryList title={testData.title} />);
    const historyTitleEl = document.querySelector(".history-title");
    expect(historyTitleEl).toBeTruthy();
    expect(historyTitleEl.textContent).toBe(testData.title);
  });
  it("should render no education data", () => {
    renderWithTheme(<HitoryList title={testData.title} />);
    const historyListEl = document.querySelector(".history-list");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl.childElementCount).toBe(0);
  });
  it("should render correct number of history items", () => {
    renderWithTheme(
      <HitoryList title={testData.title} historyList={testData.historyItems} />
    );
    const historyListEl = document.querySelector(".history-list");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl.childElementCount).toBe(testData.historyItems.length);
  });
  it("should render correct history item data", () => {
    renderWithTheme(
      <HitoryList title={testData.title} historyList={testData.historyItems} />
    );
    const historyListEl = document.querySelectorAll(".history-item");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl.length).toBe(testData.historyItems.length);
    Array.from(historyListEl).forEach((educationHitoryItem, index) => {
      const organisationEl = educationHitoryItem.querySelector(".organisation");
      expect(organisationEl).toBeTruthy();
      expect(organisationEl.textContent).toBe(testData.historyItems[index].organisation);
      const titleEl = educationHitoryItem.querySelector(".title");
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toBe(testData.historyItems[index].title);
      const startDateEl = educationHitoryItem.querySelector(".start-date");
      expect(startDateEl).toBeTruthy();
      expect(startDateEl.textContent).toBe(testData.historyItems[index].startDate);
      const endDateEl = educationHitoryItem.querySelector(".end-date");
      expect(endDateEl).toBeTruthy();
      expect(endDateEl.textContent).toBe(testData.historyItems[index].endDate);
      const descriptionEl = educationHitoryItem.querySelector(".description");
      expect(descriptionEl).toBeTruthy();
      expect(descriptionEl.textContent).toBe(testData.historyItems[index].description);
    });
  });
});
