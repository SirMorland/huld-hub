import { cleanup, getByTestId } from "@testing-library/react";
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
    const { getByTestId } = renderWithTheme(
      <HitoryList title={testData.title} />
    );
    const historyTitleEl = getByTestId("history-title");
    expect(historyTitleEl).toBeTruthy();
    expect(getByTestId("history-title")).toHaveTextContent(testData.title);
  });
  it("should render no education data", () => {
    const { getByTestId } = renderWithTheme(
      <HitoryList title={testData.title} />
    );
    const historyListEl = getByTestId("history-list");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl.children).toHaveLength(0);
  });
  it("should render correct number of history items", () => {
    const { getByTestId } = renderWithTheme(
      <HitoryList title={testData.title} historyList={testData.historyItems} />
    );
    const historyListEl = getByTestId("history-list");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl.children).toHaveLength(testData.historyItems.length);
  });
  it("should render correct history item data", () => {
    const { getAllByTestId } = renderWithTheme(
      <HitoryList title={testData.title} historyList={testData.historyItems} />
    );
    const historyListEl = getAllByTestId("history-item");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl).toHaveLength(testData.historyItems.length);

    historyListEl.forEach((educationHitoryItem, index) => {
      const organisationEl = getByTestId(educationHitoryItem, "organisation");
      expect(organisationEl).toBeTruthy();
      expect(organisationEl).toHaveTextContent(
        testData.historyItems[index].organisation
      );
      const titleEl = getByTestId(educationHitoryItem, "title");
      expect(titleEl).toBeTruthy();
      expect(titleEl).toHaveTextContent(testData.historyItems[index].title);
      const startDateEl = getByTestId(educationHitoryItem, "start-date");
      expect(startDateEl).toBeTruthy();
      expect(startDateEl).toHaveTextContent(
        testData.historyItems[index].startDate
      );
      const endDateEl = getByTestId(educationHitoryItem, "end-date");
      expect(endDateEl).toBeTruthy();
      expect(endDateEl).toHaveTextContent(testData.historyItems[index].endDate);
      const descriptionEl = getByTestId(educationHitoryItem, "description");
      expect(descriptionEl).toBeTruthy();
      expect(descriptionEl).toHaveTextContent(
        testData.historyItems[index].description
      );
    });
  });
});
