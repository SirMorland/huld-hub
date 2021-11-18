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
});
