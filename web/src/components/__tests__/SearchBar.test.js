import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import SearchBar from "../SearchBar";

const mockSearchKeyword = "CSS,Javascript,HTML,Admin";

describe.only("SearchBar component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<SearchBar searchValue={mockSearchKeyword} setQuery={()=>{}} onSearch={()=>{}}/>);
    expect(container).toBeTruthy();
  });
  it("should call onSearch when click search button", () =>{
    const onSearch = jest.fn();
    const { getAllByLabelText } = renderWithTheme(<SearchBar searchValue={mockSearchKeyword} setQuery={()=>{}} onSearch={onSearch}/>);
    const searchButtons = getAllByLabelText('search');
    expect(searchButtons.length).toEqual(1);
    searchButtons[0].click();
    expect(onSearch).toBeCalled();
  })
});
