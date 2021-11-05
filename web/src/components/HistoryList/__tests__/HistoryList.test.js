import { cleanup, getByTestId } from "@testing-library/react";
import { renderWithTheme, getYear } from "../../../utils";
import HistoryList from "../HistoryList.js";

const testData = {
  title: "Education History",
  noItemDescription: "Empty Education History",
  historyItems: [
    {
      id: 1,
      organisation: "Air Force",
      title: "Bachelor's title",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      organisation: "Air Force",
      title: "Bachelor's title",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      organisation: "Air Force",
      title: "Bachelor's title",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 4,
      organisation: "Air Force",
      title: "Bachelor's title",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
};

describe("HistoryList component", () => {
  afterEach(cleanup);
  it("should render correct title", () => {
    const { getByTestId } = renderWithTheme(
      <HistoryList
        title={testData.title}
        noItemDescription={testData.noItemDescription}
      />
    );
    const historyTitleEl = getByTestId("history-title");
    expect(historyTitleEl).toBeTruthy();
    expect(getByTestId("history-title")).toHaveTextContent(testData.title);
  });
  it("should render no education data", () => {
    const { getByTestId } = renderWithTheme(
      <HistoryList
        title={testData.title}
        noItemDescription={testData.noItemDescription}
      />
    );
    const historyListEl = getByTestId("history-items");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl.children).toHaveLength(1);
    const noItemDescription = getByTestId("no-item-description");
    expect(noItemDescription).toHaveTextContent(testData.noItemDescription);
  });
  it("should render correct number of history items", () => {
    const { getByTestId } = renderWithTheme(
      <HistoryList
        title={testData.title}
        historyItems={testData.historyItems}
        noItemDescription={testData.noItemDescription}
      />
    );
    const historyListEl = getByTestId("history-items");
    expect(historyListEl).toBeTruthy();
    expect(historyListEl.children).toHaveLength(testData.historyItems.length);
  });
  it("should render correct history item data", () => {
    const { getAllByTestId } = renderWithTheme(
      <HistoryList
        title={testData.title}
        historyItems={testData.historyItems}
        noItemDescription={testData.noItemDescription}
      />
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
      const start_dateEl = getByTestId(educationHitoryItem, "start-date");
      expect(start_dateEl).toBeTruthy();
      expect(start_dateEl).toHaveTextContent(
        getYear(testData.historyItems[index].start_date)
      );
      const end_dateEl = getByTestId(educationHitoryItem, "end-date");
      expect(end_dateEl).toBeTruthy();
      expect(end_dateEl).toHaveTextContent(
        getYear(testData.historyItems[index].end_date)
      );
      const descriptionEl = getByTestId(educationHitoryItem, "description");
      expect(descriptionEl).toBeTruthy();
      expect(descriptionEl).toHaveTextContent(
        testData.historyItems[index].description
      );
    });
  });
});
