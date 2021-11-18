import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import SearchBar from "../SearchBar";

const keywords = ['css', 'admin'];

describe.only("SearchBar component", () => {
  afterEach(cleanup);

  it("should render without crashing", () => {
    const { container } = renderWithTheme(<SearchBar keywords={keywords} setKeywords={()=>{}} />);
    expect(container).toBeTruthy();
  });

  it("should render content correctly", () =>{
    const { getByLabelText, container } = renderWithTheme(<SearchBar keywords={keywords} />);
    const searchButtons = getByLabelText('search');
    const searchInput = container.querySelector('input');
    expect(searchButtons).toBeInTheDocument();
    expect(searchInput.value).toEqual(keywords.join(', '));
  });

  it("should call correct keywords when input changes", () =>{
    const setKeywords = jest.fn();
    const { container } = renderWithTheme(<SearchBar setKeywords={setKeywords}/>);
    const searchInput = container.querySelector('input');
    fireEvent.change(searchInput, { target: { value: keywords.join(', ') } });
    expect(setKeywords).toHaveBeenCalledWith(keywords);
  });

  it("should run onSubmit when the form is submitted", () => {
    const onSubmit = jest.fn();
    const { container } = renderWithTheme(<SearchBar onSubmit={onSubmit} />);
    const searchForm = container.querySelector('form');
    fireEvent.submit(searchForm);
    expect(onSubmit).toHaveBeenCalled();
  })

});
