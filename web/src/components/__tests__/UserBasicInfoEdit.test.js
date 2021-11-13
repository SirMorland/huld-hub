import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import UserBasicInfoEdit from "../UserBasicInfoEdit";
import React from "react";

const profile = {
    "id": 1,
    "first_name": "firstname",
    "last_name": "lastname",
    "title": "Administrator",
    "email": "test@huld.io",
    "phone": "+23456789",
    "address": "address",
    "github":"@github",
    "slack":"@slack",
    "linkedin": "@linkedin"
}

const UpdateFunction = async (profile) => {
    ;
}

describe("UserContactinfo component", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    const { container } = renderWithTheme(<UserBasicInfoEdit  edited={profile} setEdited={UpdateFunction} />);
    expect(container).toBeTruthy();
  });
  it("should render profile data in input fields", () => {
    const { getByDisplayValue } = renderWithTheme(<UserBasicInfoEdit  edited={profile} setEdited={UpdateFunction} />);
    expect(getByDisplayValue(profile.email)).toBeInTheDocument();
    expect(getByDisplayValue(profile.slack)).toBeInTheDocument();
    expect(getByDisplayValue(profile.github)).toBeInTheDocument();
    expect(getByDisplayValue(profile.phone)).toBeInTheDocument();
    expect(getByDisplayValue(profile.address)).toBeInTheDocument();
    expect(getByDisplayValue(profile.first_name)).toBeInTheDocument();
    expect(getByDisplayValue(profile.last_name)).toBeInTheDocument();
    expect(getByDisplayValue(profile.title)).toBeInTheDocument();
    expect(getByDisplayValue(profile.linkedin)).toBeInTheDocument();
  });
 
});