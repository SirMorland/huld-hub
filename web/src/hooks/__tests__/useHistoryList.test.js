import { renderHook } from "@testing-library/react-hooks";
import useHistoryList from "../useHistoryList";
import { capitalizeFirstLetters } from "../../utils";

const HISTORY_TYPE = ["Education", "Work"];

const emptyProfile = {
  education_histories: [],
  work_experiences: [],
};

const testProfile = {
  education_histories: [
    {
      id: 1,
      school: "Tampere University",
      degree: "Bachelor's degree",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      school: "Tampere University",
      degree: "Bachelor's degree",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      school: "Tampere University",
      degree: "Bachelor's degree",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
  work_experiences: [
    {
      id: 1,
      company: "Air Force",
      position: "Pilot",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      company: "Air Force",
      position: "Pilot",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      company: "Air Force",
      position: "Pilot",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 4,
      company: "Air Force",
      position: "Pilot",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
};

describe("useHistoryList hook", () => {
  it("should return correct data when user profile is not available", () => {
    const type = HISTORY_TYPE[Math.floor(Math.random() * 2)];
    const { result } = renderHook(() => useHistoryList(undefined, type));
    expect(result.current).toBeTruthy();
    const { title, noItemDescription, historyItems } = result.current;
    expect(title).toBe(`${capitalizeFirstLetters(type)} History`);
    expect(noItemDescription).toBe(
      `No ${capitalizeFirstLetters(type)} History Provided`
    );
    expect(historyItems).toHaveLength(0);
  
  });
  it("should return correct data when user history is empty", () => {
    const type = HISTORY_TYPE[Math.floor(Math.random() * 2)];
    const { result } = renderHook(() => useHistoryList(emptyProfile, type));
    expect(result.current).toBeTruthy();
    const { title, noItemDescription, historyItems } = result.current;
    expect(title).toBe(`${capitalizeFirstLetters(type)} History`);
    expect(noItemDescription).toBe(
      `No ${capitalizeFirstLetters(type)} History Provided`
    );
    expect(historyItems).toHaveLength(0);
  });
  it("should return correct data when user history is provided", async () => {
    const type = HISTORY_TYPE[Math.floor(Math.random() * 2)];
    const { result } = renderHook(() => useHistoryList(testProfile, type));
    expect(result.current).toBeTruthy();
    const { title, noItemDescription, historyItems } = result.current;
    expect(title).toBe(`${capitalizeFirstLetters(type)} History`);
    expect(noItemDescription).toBe(
      `No ${capitalizeFirstLetters(type)} History Provided`
    );

    const historyType =
      type === HISTORY_TYPE[0] ? "education_histories" : "work_experiences";
    expect(historyItems).toHaveLength(testProfile[historyType].length);
    historyItems.forEach((historyItem, i) => {
      expect(historyItem.id).toBe(testProfile[historyType][i].id);
      expect(historyItem.organisation).toBe(
        testProfile[historyType][i][
          type === HISTORY_TYPE[0] ? "school" : "company"
        ]
      );
      expect(historyItem.title).toBe(
        testProfile[historyType][i][
          type === HISTORY_TYPE[0] ? "degree" : "position"
        ]
      );
      expect(historyItem.description).toBe(
        testProfile[historyType][i].description
      );
      expect(historyItem.end_date).toBe(testProfile[historyType][i].end_date);
      expect(historyItem.end_date).toBe(testProfile[historyType][i].end_date);
    });
  });
});
