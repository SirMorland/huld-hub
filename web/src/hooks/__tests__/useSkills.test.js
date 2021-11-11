import { renderHook } from "@testing-library/react-hooks";
import useSkills from "../useSkills";

// const testProfile = {
//   competences:
// }

beforeEach(() => {
  fetch.resetMocks();
});

afterAll(() => {
  Object.defineProperty(window.document, "cookie", {
    writable: true,
    value: "",
  });
});

describe("useSkills hook", () => {
  it("should return false when hub-jwt is not defined", () => {
    const { result } = renderHook(() => useSkills("jwt"));
    const {keywords, languages} = result.current
    expect(JSON.stringify(keywords)).toBe("[]");
    expect(JSON.stringify(languages)).toBe("[]");
  });
//   it("should return user when hub-jwt is defined and the jwt is proper", async () => {
//     const mockSkills = [
//       { category_name: "coding languages", type: "C++" },
//       { category_name: "coding languages", type: "Java" },
//       { category_name: "coding languages", type: "JavaScript" },
//       { category_name: "coding languages", type: "C#" },
//       { category_name: "keywords", type: "Full Stack" },
//       { category_name: "keywords", type: "Backend" },
//       { category_name: "keywords", type: "Frontend" },
//     ];
//     fetch.mockResponseOnce(JSON.stringify(mockSkills), { status: 200 });
//     const { result, waitForNextUpdate } = renderHook(() => useSkills("jwt"));
//     await waitForNextUpdate();
//     expect(result.current).toBeTruthy();
//     const {languages, keywords} = result.current;
//     expect(languages).toHaveLength(mockSkills.map(skill => skill.category_name === "coding languages").length)
//     languages.forEach(language => {
//       expect(mockSkills.some(skill => skill.type === language.type)).toBe(true)
//     })
//     expect(keywords).toHaveLength(mockSkills.map(skill => skill.category_name === "keywords").length)
//     keywords.forEach(keyword => {
//       expect(mockSkills.some(skill => skill.type === keyword.type)).toBe(true)
//     })
//   });
});
