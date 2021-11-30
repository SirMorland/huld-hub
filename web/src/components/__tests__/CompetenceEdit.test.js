import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import CompetenceEdit from "../CompetenceEdit.js";

const mockData = {
  type: "keywords",
  items: [
    {
      id: 10,
      name: "Mobile development",
      description: null,
      category: 4,
      created_at: "2021-10-29",
      updated_at: "2021-10-29",
    },
    {
      id: 11,
      name: "Team leading",
      description: null,
      category: 4,
      created_at: "2021-10-29",
      updated_at: "2021-10-29",
    },
  ],
  onRemove: jest.fn(),
  onAdd: jest.fn(),
};

describe.only("CompetenceEdit component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<CompetenceEdit {...mockData} />);
    expect(container).toBeTruthy();
  });
  it("should render items", () => {
    const { getByText } = renderWithTheme(<CompetenceEdit {...mockData} />);
    expect(getByText(mockData.items[0].name)).toBeInTheDocument();
    expect(getByText(mockData.items[1].name)).toBeInTheDocument();
  });
  it("should remove correct item, and call onRemove with correct items", () => {
    const { getAllByLabelText } = renderWithTheme(
      <CompetenceEdit {...mockData} />
    );
    const deleteButtons = getAllByLabelText("delete");
    expect(deleteButtons.length).toEqual(2);
    deleteButtons[0].click();
    expect(mockData.onRemove).toBeCalledWith(mockData.items[0]);
  });

  it("should call onAdd function with correct item", () => {
    const { getByTestId } = renderWithTheme(<CompetenceEdit {...mockData} />);
    const inputEl = getByTestId("textfield-input");
    fireEvent.change(inputEl, { target: { value: "PHP" } });
    const submitBtn = getByTestId("add-item-btn")
    fireEvent.click(submitBtn)
    expect(mockData.onAdd).toBeCalledWith("PHP");
  });
});
