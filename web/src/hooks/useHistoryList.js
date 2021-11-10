import { useMemo } from "react";
import { capitalizeFirstLetters } from "../utils";

const HISTORY_TYPE = {
  education: "Education",
  work: "Work",
};

/**
 * A function that produces the props for using HistoryList component
 *
 * @param {Array<object>} historyItems - Array of history items
 * @param {*} type - type of history items
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

const useHistoryList = (profile, type) => {
  const historyList = useMemo(
    () =>
      getHistoryProps(
        profile
          ? profile[
              type.toLowerCase() === HISTORY_TYPE.education
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
