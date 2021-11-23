import React, {
  useState,
  useRef,
  createRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";
import PropTypes from "prop-types";
import HistoryItemEdit, {
  HistoryItemProps,
} from "../HistoryItem/HistoryItemEdit.js";
import { capitalizeFirstLetters } from "../../utils";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";

/**
 * A function that formats the history items to the correct structure for saving
 * 
 * @param {Array<any>} data - array of history items
 * @param {"work" | "education"} type - type of the history items
 * @returns 
 */
const historyProfileFormat = (data = [], type) =>
  data
    .sort(
      (item1, item2) => item2.start_date.getTime() - item1.start_date.getTime()
    )
    .map(({ organisation, title, start_date, end_date, description }) => ({
      [type === HISTORY_TYPE.work ? "company" : "school"]: organisation,
      [type === HISTORY_TYPE.work ? "position" : "degree"]: title,
      start_date: start_date.toISOString(),
      end_date: end_date && end_date.toISOString(),
      description,
    }));

const EmptyHistory = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
  textAlign: "center",
}));

const Body = styled("div")({
  // marginTop: "8px",
});

const Header = styled(Typography)({
  // marginTop: "24px",
});

const HistoryListEdit = forwardRef((props, ref) => {
  // reverse the history item so that the most relevant appears first
  const [historyItems, setHistoryItem] = useState(
    props.historyItems.slice().reverse().map((historyItems) => ({
      ...historyItems,
      // Add the map id for rerenderung and caching purposes
      mapId: Math.floor(Math.random() * 100000),
    })) || []
  );
  const historyItemRefs = useRef([]);

  // fuction that gets the history item data using the refs
  const getHistoryListData = () => {
    const data = historyItemRefs.current.map((historyItem) =>
      historyItem.current.getValue()
    );
    return data;
  };

  // ref that is used the get all history item data in the correct format
  useImperativeHandle(
    ref,
    () => ({
      getHistoryList: () =>
        historyProfileFormat(getHistoryListData(), props.type),
    }),
    [props.type]
  );

  const removeItemByIndex = async (index) => {
    const newValue = [...getHistoryListData()];
    historyItemRefs.current.splice(index, 1);
    newValue.splice(index, 1);
    setHistoryItem(newValue);
  };

  const addNewItem = async () => {
    const newItem = {
      organisation: "",
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      mapId: Math.floor(Math.random() * 10000),
    };
    const newValue = [...getHistoryListData(), newItem];
    setHistoryItem(newValue);
  };

  return (
    <div>
      <Header variant="h2" data-testid="history-title">
        {capitalizeFirstLetters(props.type)} history
      </Header>
      <Button
        data-testid="btn-add-new"
        fullWidth
        variant="contained"
        color="primary"
        onClick={addNewItem}
        sx={{
          marginTop: "24px",
          whiteSpace: "nowrap",
        }}
      >
        Add a new {props.type}
      </Button>
      <Body data-testid="edit-history-list">
        {historyItems && historyItems.length > 0 ? (
          historyItems.map((_, i) => {
            const reverseIndex = historyItems.length - 1 - i;
            historyItemRefs.current[reverseIndex] = createRef();
            return (
              <HistoryItemEdit
                historyItem={historyItems[reverseIndex]}
                index={reverseIndex}
                type={props.type}
                key={historyItems[reverseIndex].mapId}
                removeItemByIndex={removeItemByIndex}
                ref={historyItemRefs.current[reverseIndex]}
              />
            );
          })
        ) : (
          <EmptyHistory variant="body1" data-testid="no-item-description">
            No {capitalizeFirstLetters(props.type)} item added
          </EmptyHistory>
        )}
      </Body>
    </div>
  );
});

HistoryListEdit.defaultProps = {
  historyItems: [],
};

HistoryListEdit.displayName = "HistoryListEdit";

HistoryListEdit.propTypes = {
  type: PropTypes.string.isRequired,
  historyItems: PropTypes.arrayOf(HistoryItemProps),
};

export default HistoryListEdit;
