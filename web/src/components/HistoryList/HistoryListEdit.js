import React, {
  useState,
  useRef,
  createRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import HistoryItemEdit, {
  HistoryItemProps,
} from "../HistoryItem/HistoryItemEdit.js";
import { capitalizeFirstLetters } from "../../utils";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";

const historyProfileFormat = (data = [], type) =>
  data.map(({ organisation, title, start_date, end_date, description }) => ({
    [type === HISTORY_TYPE.work ? "company" : "school"]: organisation,
    [type === HISTORY_TYPE.work ? "position" : "degree"]: title,
    start_date: start_date && start_date.toISOString(),
    end_date: end_date && end_date.toISOString(),
    description,
  }));

const HistoryListEdit = forwardRef((props, ref) => {
  const [historyItems, setHistoryItem] = useState(
    props.historyItems.map((historyItems) => ({
      ...historyItems,
      mapId: Math.floor(Math.random() * 100000),
    })) || []
  );
  const historyItemRefs = useRef([]);

  const getHistoryListData = () => {
    const data = historyItemRefs.current.map((historyItem) =>
      historyItem.current.getValue()
    );
    return data;
  };

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
    historyItemRefs.current = historyItemRefs.current.splice(index, 1);
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
      <Typography
        variant="h2"
        data-testid="history-title"
        sx={{ marginTop: "24px" }}
      >
        {capitalizeFirstLetters(props.type)} history
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={addNewItem}
        sx={{
          marginTop: "24px",
        }}
      >
        Add a new {props.type}
      </Button>

      {historyItems.map((_, i) => {
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
      })}
    </div>
  );
});

HistoryListEdit.defaultProps = {
  historyItems: [],
};

HistoryListEdit.displayName ="HistoryListEdit"

HistoryListEdit.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  noItemDescription: PropTypes.string.isRequired,
  historyItems: PropTypes.arrayOf(HistoryItemProps),
};

export default HistoryListEdit;
