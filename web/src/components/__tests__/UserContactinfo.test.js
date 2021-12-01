import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import UserContactinfo from "../UserContactinfo";

const profile = {
    "id": 1,
    "first_name": "firstname",
    "last_name": "lastname",
    "title": "Administrator",
    "email": "test@huld.io",
    "phone": "+23456789",
    "address": "address",
    "github":"@github",
    "slack":"@slack"
}
describe("UserContactinfo component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<UserContactinfo profile={profile}  iconSide={"right"} />);
    expect(container).toBeTruthy();
  });
  it("should render all items", () => {
    const { getByText } = renderWithTheme(<UserContactinfo profile={profile}  iconSide={"right"} />);
    expect(getByText(profile.email)).toBeInTheDocument();
    expect(getByText(profile.slack)).toBeInTheDocument();
    expect(getByText(profile.github)).toBeInTheDocument();
    expect(getByText(profile.phone)).toBeInTheDocument();
    expect(getByText(profile.address)).toBeInTheDocument();
  })
});