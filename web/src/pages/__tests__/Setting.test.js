import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Setting from "../SettingPage";

import { renderHelper } from "../../utils";

describe("Login Form", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("should render setting form", () => {
    const { getByText } = renderHelper(<Setting />);
    expect(getByText("Change your password")).toBeInTheDocument();
  });

  it("render 2 input components", () => {
    const { getByLabelText } = renderHelper(<Setting />);
    expect(getByLabelText(/New password/i)).toBeInTheDocument();
    expect(getByLabelText(/Confirm password/i)).toBeInTheDocument();
  });

  it("renders a submit SAVE button", () => {
    const { getByText } = renderHelper(<Setting />);
    expect(getByText("SAVE")).toBeInTheDocument();
  });

  it("renders a submit LOGOUT button", () => {
    const { getByText } = renderHelper(<Setting />);
    expect(getByText("LOGOUT")).toBeInTheDocument();
  });

  const mockUser = {
    jwt: "asd",
    user: {
      id: 1,
    },
    password: "asdasd"
  };
  it("should submit when form inputs contain text", async () => {
    const { getByText, queryByText } = renderHelper(<Setting />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/New password/i), {
        target: { value: "asdasd" },
      });
      fireEvent.change(screen.getByLabelText(/Confirm password/i), {
        target: { value: "asdasd" },
      });
    });
    fetch.mockResponseOnce(JSON.stringify(mockUser), { status: 200 });
    await act(async () => {
      fireEvent.submit(getByText("SAVE"));
    });
    expect(queryByText("New password is required")).not.toBeInTheDocument();
    expect(queryByText("Confirm password is required")).not.toBeInTheDocument();
  });

  it("should show error message if password don't match", async () => {
    const { getByText, queryByText } = renderHelper(<Setting />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/New password/i), {
        target: { value: "123" },
      });
      fireEvent.change(screen.getByLabelText(/Confirm password/i), {
        target: { value: "456" },
      });
    });
    expect(queryByText(/Passwords don't match!/i)).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.submit(getByText("SAVE"));
    });
    expect(queryByText(/Passwords don't match!/i)).toBeInTheDocument();
  });
});
