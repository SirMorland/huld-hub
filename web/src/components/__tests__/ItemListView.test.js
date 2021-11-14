import { cleanup } from "@testing-library/react";
import { renderWithTheme, capitalizeFirstLetters } from "../../utils";
import ItemListView from "../ItemListView.js";

const mockData = {
  "title": "keywords",
  "items": [
      {
          "id": 10,
          "name": "Mobile development",
          "description": null,
          "category": 4,
          "created_at": "2021-10-29",
          "updated_at": "2021-10-29"
      },
      {
          "id": 11,
          "name": "Team leading",
          "description": null,
          "category": 4,
          "created_at": "2021-10-29",
          "updated_at": "2021-10-29"
      }
  ]
}
describe("EducationHitoryList component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<ItemListView title={mockData.title} items={mockData.items} noItemDescription=""/>);
    expect(container).toBeTruthy();
  });
  it("should render title", () => {
    const { getByText } = renderWithTheme(<ItemListView title={mockData.title} items={mockData.items} noItemDescription=""/>);
    expect(getByText(capitalizeFirstLetters(mockData.title))).toBeInTheDocument();
  });
  it("should render items", () => {
    const { getByText } = renderWithTheme(<ItemListView title={mockData.title} items={mockData.items} noItemDescription=""/>);
    expect(getByText(mockData.items[0].name)).toBeInTheDocument();
    expect(getByText(mockData.items[1].name)).toBeInTheDocument();
  })
});
