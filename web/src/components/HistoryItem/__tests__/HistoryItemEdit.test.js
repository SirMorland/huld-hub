import { cleanup, getByTestId, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import HistoryItemEdit from "../HistoryItemEdit.js";

const testData = {
  index: 0,
  type: "education",
  removeItemByIndex: jest.fn((index) => index),
  historyItem: {
    mapId: Math.floor(Math.random() * 100000),
    organisation: "Air Force",
    title: "Bachelor's degree",
    start_date: "2021-10-29T11:35:16.000Z",
    end_date: "2021-10-29T11:35:16.000Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
  },
};

const testEditData = {
  index: 0,
  type: "education",
  removeItemByIndex: jest.fn((index) => index),
  historyItem: {
    mapId: Math.floor(Math.random() * 100000),
    organisation: "Tampere University",
    title: "Software Engineering",
    start_date: "2001-10-29T08:15:16.000Z",
    end_date: "2031-12-29T10:25:16.000Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
};


describe("HistoryItemEdit component", () => {
  let container = null;
  
  beforeEach(() => {
    container = renderWithTheme(<HistoryItemEdit {...testData} />);
  });

  afterAll(cleanup);

  it("should render organisation correctly", () => {
    const organisationEl = container.getByTestId("textfield-organisation");
    expect(organisationEl).toBeTruthy();
    const organisationInput = getByTestId(organisationEl, "textfield-input");
    expect(organisationInput).toBeTruthy();
    expect(organisationInput.value).toBe(testData.historyItem.organisation);
  });

  it("should update organisation correctly", () => {
    const organisationEl = container.getByTestId("textfield-organisation");
    expect(organisationEl).toBeTruthy();
    const organisationInput = getByTestId(organisationEl, "textfield-input");
    expect(organisationInput).toBeTruthy();
    fireEvent.change(organisationInput, { target: { value: testEditData.historyItem.organisation } });
    expect(organisationInput.value).toBe(testEditData.historyItem.organisation);
  });

  it("should render title correctly", () => {
    const titleEl = container.getByTestId("textfield-title");
    expect(titleEl).toBeTruthy();
    const titleInput = getByTestId(titleEl, "textfield-input");
    expect(titleInput).toBeTruthy();
    expect(titleInput.value).toBe(testData.historyItem.title);
  });


  it("should update title correctly", () => {
    const titleEl = container.getByTestId("textfield-title");
    expect(titleEl).toBeTruthy();
    const titleInput = getByTestId(titleEl, "textfield-input");
    expect(titleInput).toBeTruthy();
    fireEvent.change(titleInput, { target: { value: testEditData.historyItem.title } });
    expect(titleInput.value).toBe(testEditData.historyItem.title);
  });

  it("should render description correctly", () => {
    const descriptionEl = container.getByTestId("textfield-description");
    expect(descriptionEl).toBeTruthy();
    const descriptionInput = getByTestId(descriptionEl, "textfield-input");
    expect(descriptionInput).toBeTruthy();
    expect(descriptionInput.value).toBe(testData.historyItem.description);
  });

  it("should update description correctly", () => {
    const descriptionEl = container.getByTestId("textfield-description");
    expect(descriptionEl).toBeTruthy();
    const descriptionInput = getByTestId(descriptionEl, "textfield-input");
    expect(descriptionInput).toBeTruthy();
    fireEvent.change(descriptionInput, { target: { value: testEditData.historyItem.description } });
    expect(descriptionInput.value).toBe(testEditData.historyItem.description);
  });

  it("should render start_date correctly", () => {
    const start_dateEl = container.getByTestId("grid-start_date");
    expect(start_dateEl).toBeTruthy();
    const start_dateInput = getByTestId(start_dateEl, "date-input");
    expect(start_dateInput).toBeTruthy();
    const date = new Date(testData.historyItem.start_date)
    expect(start_dateInput.value).toBe(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);
  });

  it("should render end_date correctly", () => {
    const end_dateEl = container.getByTestId("grid-end_date");
    expect(end_dateEl).toBeTruthy();
    const end_dateInput = getByTestId(end_dateEl, "date-input");
    expect(end_dateInput).toBeTruthy();
    const date = new Date(testData.historyItem.end_date)
    expect(end_dateInput.value).toBe(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);
  });

  it("should call removeItem function correctly", () => {
    const btnDelete = container.getByTestId("btn-delete");
    expect(btnDelete).toBeTruthy();
    fireEvent.click(btnDelete)
    expect(testData.removeItemByIndex).toHaveBeenCalledTimes(1)
    expect(testData.removeItemByIndex).toHaveBeenCalledWith(testData.index)
  });

});
