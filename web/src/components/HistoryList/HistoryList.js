import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

import HistoryItem, { HistoryItemProps } from "../HistoryItem/HistoryItem.js";

const Title = styled("h2")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

function HistoryList(props) {
  return (
    <div className="history">
      <Title className="history-title">{props.title}</Title>
      <div className="history-list">
        {props.historyList &&
          props.historyList.map((historyItem) => (
            <HistoryItem historyItem={historyItem} key={historyItem.id} />
          ))}
      </div>
    </div>
  );
}

HistoryList.defaultProps = {
  historyList: [],
};

HistoryList.propTypes = {
  title: PropTypes.string.isRequired,
  historyList: PropTypes.arrayOf(HistoryItemProps),
};

export default HistoryList;
