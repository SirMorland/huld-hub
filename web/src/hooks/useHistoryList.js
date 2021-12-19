import { useMemo } from "react";
import { capitalizeFirstLetters } from "../utils";

export const HISTORY_TYPE = {
  education: "education",
  work: "work",
};

/**
 * A function that produces the props for using HistoryListView component
 *
 * @param {Array<object>} historyItems - Array of history items
 * @param {"work" | "education"} type - type of history items
 * @returns {object}
 */
const getHistoryProps = (historyItems = [], type) => {
  return {
    title: `${capitalizeFirstLetters(type)} History`,
    noItemDescription: `No ${capitalizeFirstLetters(type)} History Provided`,
    historyItems: historyItems.map((historyItem) => ({
      id: historyItem.id,
      organisation:
        historyItem[type === HISTORY_TYPE.education ? "school" : "company"],
      title:
        historyItem[type === HISTORY_TYPE.education ? "degree" : "position"],
      description: historyItem.description,
      start_date: historyItem.start_date,
      end_date: historyItem.end_date,
    })),
  };
};


/**
 * A custome hook for extracting and creating the props for the HistoryListView component from the profile object
 * 
 * @param {object} profile user profile object
 * @param {"work" | "education"} type - history list type
 * @returns {object}
 */
const useHistoryList = (profile, type) => {
  const historyList = useMemo(
    () =>
      getHistoryProps(
        profile
          ? profile[
              type.toLowerCase() === HISTORY_TYPE.education.toLowerCase()
                ? "education_histories"
                : "work_experiences"
            ]
          : [],
        type.toLowerCase()
      ),
    [profile, type]
  );

  return historyList;
};

export default useHistoryList;
