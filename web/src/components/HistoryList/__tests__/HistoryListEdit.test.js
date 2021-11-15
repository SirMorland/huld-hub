import { cleanup, getByTestId } from "@testing-library/react";
import {
  renderWithTheme,
  getYear,
  capitalizeFirstLetters,
} from "../../../utils";
import HistoryListEdit from "../HistoryListEdit.js";

const testData = {
  type: "education",
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

describe("HistoryListEdit component", () => {
  afterEach(cleanup);
  it("should render correct title", () => {
    const { getByTestId } = renderWithTheme(
      <HistoryListEdit type={testData.type} />
    );
    const historyTitleEl = getByTestId("history-title");
    expect(historyTitleEl).toBeTruthy();
    expect(getByTestId("history-title")).toHaveTextContent(
      `${capitalizeFirstLetters(testData.type)} history`
    );
  });
  it("should render no education data info", () => {
    const { getByTestId } = renderWithTheme(
      <HistoryListEdit type={testData.type} />
    );
    const HistoryListEditEl = getByTestId("edit-history-list");
    expect(HistoryListEditEl).toBeTruthy();
    expect(HistoryListEditEl.children).toHaveLength(1);
    const noItemDescription = getByTestId("no-item-description");
    expect(noItemDescription).toHaveTextContent(
      `No ${capitalizeFirstLetters(testData.type)} item added`
    );
  });

  it("should render correct number of history items", () => {
    const { getByTestId } = renderWithTheme(
      <HistoryListEdit
        type={testData.type}
        historyItems={testData.historyItems}
      />
    );
    const HistoryListEditEl = getByTestId("edit-history-list");
    expect(HistoryListEditEl).toBeTruthy();
    expect(HistoryListEditEl.children).toHaveLength(
      testData.historyItems.length
    );
  });
  it("should render correct history item data", () => {
    const { getAllByTestId } = renderWithTheme(
      <HistoryListEdit
        type={testData.type}
        historyItems={testData.historyItems}
      />
    );

    const HistoryListEditEl = getAllByTestId("history-edit-item");
    expect(HistoryListEditEl).toBeTruthy();
    expect(HistoryListEditEl).toHaveLength(testData.historyItems.length);

    HistoryListEditEl.forEach((educationHitoryItem, index) => {
      const organisationEl = getByTestId(
        educationHitoryItem,
        "textfield-organisation"
      );
      expect(organisationEl).toBeTruthy();
      const organisationInput = getByTestId(organisationEl, "textfield-input");
      expect(organisationInput.value).toBe(testData.historyItems[index].organisation);
      expect(organisationInput).toBeTruthy();

      const titleEl = getByTestId(educationHitoryItem, "textfield-title");
      expect(titleEl).toBeTruthy();
      const titleInput = getByTestId(titleEl, "textfield-input");
      expect(titleInput).toBeTruthy();
      expect(titleInput.value).toBe(testData.historyItems[index].title);

      const start_dateEl = getByTestId(educationHitoryItem, "grid-start_date");
      expect(start_dateEl).toBeTruthy();
      const start_dateInput = getByTestId(start_dateEl, "date-input");
    expect(start_dateInput).toBeTruthy();
    const startDate = new Date(testData.historyItems[index].start_date)
    expect(start_dateInput.value).toBe(`${startDate.getDate()}.${startDate.getMonth()+1}.${startDate.getFullYear()}`);

      const end_dateEl = getByTestId(educationHitoryItem, "grid-end_date");
      expect(end_dateEl).toBeTruthy();
      const end_dateInput = getByTestId(end_dateEl, "date-input");
      expect(end_dateInput).toBeTruthy();
      const endDate = new Date(testData.historyItems[index].end_date)
      expect(end_dateInput.value).toBe(`${endDate.getDate()}.${endDate.getMonth()+1}.${endDate.getFullYear()}`);

      const descriptionEl = getByTestId(
        educationHitoryItem,
        "textfield-description"
      );
      expect(descriptionEl).toBeTruthy();
      const descriptionInput = getByTestId(descriptionEl, "textfield-input");
      expect(descriptionInput).toBeTruthy();
      expect(descriptionInput.value).toBe(testData.historyItems[index].description);
    });
  });
});
