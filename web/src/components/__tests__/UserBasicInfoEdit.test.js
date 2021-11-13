import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import UserBasicInfoEdit from "../UserBasicInfoEdit";
import React, { useState } from "react";

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
  it("should render all all input fields", () => {
    const { getByTestId } = renderWithTheme(<UserBasicInfoEdit  edited={profile} setEdited={UpdateFunction} />);
    expect(getByTestId('first_name_Edit_test')).toBeInTheDocument();
    expect(getByTestId('last_name_Edit_test')).toBeInTheDocument();
    expect(getByTestId('title_Edit_test')).toBeInTheDocument();
    expect(getByTestId('address_Edit_test')).toBeInTheDocument();
    expect(getByTestId('phone_Edit_test')).toBeInTheDocument();
    expect(getByTestId('email_Edit_test')).toBeInTheDocument();
    expect(getByTestId('slack_Edit_test')).toBeInTheDocument();
    expect(getByTestId('linkedin_Edit_test')).toBeInTheDocument();
    expect(getByTestId('github_Edit_test')).toBeInTheDocument();
  })
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