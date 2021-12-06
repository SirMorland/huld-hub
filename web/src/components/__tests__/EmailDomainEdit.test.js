import { cleanup, fireEvent, getByTestId, getAllByLabelText } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import EmailDomainEdit from "../EmailDomainEdit.js";

const mockData = {
  emailDomains: [
    {
      id: 1,
      domain: "app.com",
      name: "@app.com",
      type: "internal"
    },    
    {
      id: 2,
      domain: "goo.com",
      name: "@goo.com",
      type: "external"
    },
    
  ],
  onRemove: jest.fn(),
  onAdd: jest.fn(),
};

describe.only("EmailDomainEdit component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<EmailDomainEdit {...mockData} />);
    expect(container).toBeTruthy();
  });

  it("should render items", () => {
    const { getByText } = renderWithTheme(<EmailDomainEdit {...mockData} />);
    mockData.emailDomains.forEach(emailDomain => {
      expect(getByText(`@${emailDomain.domain}`)).toBeInTheDocument();
    });
  });

  it("should remove correct item, and call onRemove with correct items", () => {
    const wrapper = renderWithTheme(
      <EmailDomainEdit {...mockData} />
    );
    const internalDomainSection = wrapper.getByTestId("internal-email-domains");
    const intDeleteButtons = getAllByLabelText(internalDomainSection, "delete");
    expect(intDeleteButtons.length).toEqual(1);
    intDeleteButtons[0].click();
    expect(mockData.onRemove).toBeCalledWith(mockData.emailDomains[0]);

    const externalDomainSection = wrapper.getByTestId("external-email-domains");
    const extDeleteButtons = getAllByLabelText(externalDomainSection, "delete");
    expect(extDeleteButtons.length).toEqual(1);
    extDeleteButtons[0].click();
    expect(mockData.onRemove).toBeCalledWith(mockData.emailDomains[1]);
  });

  it("should call onAdd function with correct item", () => {
    const wrapper = renderWithTheme(<EmailDomainEdit {...mockData} />);
    const internalDomainSection = wrapper.getByTestId("internal-email-domains");
    const intInputEl = getByTestId(internalDomainSection, "textfield-input");
    fireEvent.change(intInputEl, { target: { value: "@test.fi" } });
    const intSubmitBtn = getByTestId(internalDomainSection, "add-item-btn");
    fireEvent.click(intSubmitBtn);
    expect(mockData.onAdd).toBeCalledWith("internal", "test.fi");

    const externalDomainSection = wrapper.getByTestId("external-email-domains");
    const extInputEl = getByTestId(externalDomainSection, "textfield-input");
    fireEvent.change(extInputEl, { target: { value: "@test.fi" } });
    const extSubmitBtn = getByTestId(externalDomainSection, "add-item-btn");
    fireEvent.click(extSubmitBtn);
    expect(mockData.onAdd).toBeCalledWith("external", "test.fi");
  });
});