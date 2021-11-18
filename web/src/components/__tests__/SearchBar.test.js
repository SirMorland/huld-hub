import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import SearchBar from "../SearchBar";

const keywords = ['css', 'admin'];

describe.only("SearchBar component", () => {
  afterEach(cleanup);

  it("should render without crashing", () => {
    const { getByLabelText, container } = renderWithTheme(<SearchBar />);
    expect(container).toBeTruthy();
    const searchButtons = getByLabelText('search');
    const searchInput = container.querySelector('input');
    expect(searchInput).toBeTruthy();
    expect(searchButtons).toBeInTheDocument();
  });

  it("should run onSubmit when the form is submitted with correct value", () => {
    const onSubmit = jest.fn();
    const { container } = renderWithTheme(<SearchBar onSubmit={onSubmit} />);
    const searchInput = container.querySelector('input');
    fireEvent.change(searchInput, { target: { value: keywords.join(",") } });
    const searchForm = container.querySelector('form');
    fireEvent.submit(searchForm);
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(keywords);
  })

});
