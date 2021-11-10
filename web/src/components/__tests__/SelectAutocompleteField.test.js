import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import SelectAutocompleteField from "../SelectAutocompleteField.js";
import { fireEvent } from '@testing-library/react';

const mockData = {
  "label": "keywords",
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
describe("SelectAutocompleteField component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<SelectAutocompleteField options={mockData.items} />);
    expect(container).toBeTruthy();
  });
  it("should render label", () => {
    const { getByLabelText} = renderWithTheme(<SelectAutocompleteField options={mockData.items} label={mockData.label} />);
    expect(getByLabelText(mockData.label)).toBeInTheDocument();
  });
  it("should select item and clears input field", () => {
    const onSelect = jest.fn();
    const { getByTestId } = renderWithTheme(<SelectAutocompleteField options={mockData.items} label={mockData.label} onSelect={onSelect}/>);
    const autocomplete = getByTestId('select-autocomplete-field');
    const input = autocomplete.querySelector('input')
    fireEvent.change(input, { target: { value: mockData.items[0].name } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith(mockData.items[0]);
    expect(input.value).toBe('');
  })
});
