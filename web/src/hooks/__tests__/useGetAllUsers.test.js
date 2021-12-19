import { renderHook } from "@testing-library/react-hooks";
import useGetAllUsers from "../useGetAllUsers";

beforeEach(() => {
  fetch.resetMocks();
});

afterAll(() => {
  Object.defineProperty(window.document, "cookie", {
    writable: true,
    value: "",
  });
});

describe("useCompetenceCategories hook", () => {
  it("should return an empty array when hub-jtw is not defined", () => {
    const { result } = renderHook(() => useGetAllUsers("something"));
    expect(result.current.length).toEqual(0);
  });

  it("should return users list when hub-jwt is defined and the jwt is proper", async () => {
    const mockUserData = [{ id: 1, name: "cat" }];
    fetch.mockResponseOnce(JSON.stringify(mockUserData), {
      status: 200,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetAllUsers("jwt")
    );
    await waitForNextUpdate();
    expect(result.current).toEqual(mockUserData);
  });
});
