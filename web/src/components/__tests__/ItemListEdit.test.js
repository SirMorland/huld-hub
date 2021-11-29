import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import ItemListEdit from "../ItemListEdit.js";

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
describe.only("ItemlistEdit component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<ItemListEdit items={mockData.items} onRemove={()=>{}}/>);
    expect(container).toBeTruthy();
  });
  it("should render items", () => {
    const { getByText } = renderWithTheme(<ItemListEdit items={mockData.items} onRemove={()=>{}} />);
    expect(getByText(mockData.items[0].name)).toBeInTheDocument();
    expect(getByText(mockData.items[1].name)).toBeInTheDocument();
  })
  it("should remove correct item, and call onRemove with correct items", () =>{
    const onRemove = jest.fn();
    const { getAllByLabelText } = renderWithTheme(<ItemListEdit items={mockData.items} onRemove={onRemove}/>);
    const deleteButtons = getAllByLabelText('delete');
    expect(deleteButtons.length).toEqual(2);
    deleteButtons[0].click();
    expect(onRemove).toBeCalledWith(mockData.items[0]);
  })
});
