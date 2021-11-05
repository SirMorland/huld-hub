import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import HistoryItem, { HistoryItemProps } from "../HistoryItem/HistoryItem.js";

const EmptyHistory = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
  textAlign: "center",
}));

const renderHistoryItems = ({ historyItems, noItemDescription }) => {
  if (historyItems && historyItems.length > 0) {
    return historyItems.map((historyItem) => (
      <HistoryItem historyItem={historyItem} key={historyItem.id} />
    ));
  } else {
    return (
      <EmptyHistory variant="body1" data-testid="no-item-description">
        {noItemDescription}
      </EmptyHistory>
    );
  }
};

function HistoryList(props) {
  return (
    <div data-testid="history">
      <Typography variant="h2" data-testid="history-title">
        {props.title}
      </Typography>
      <div data-testid="history-items">{renderHistoryItems(props)}</div>
    </div>
  );
}

HistoryList.defaultProps = {
  historyItems: [],
};

HistoryList.propTypes = {
  title: PropTypes.string.isRequired,
  noItemDescription: PropTypes.string.isRequired,
  historyItems: PropTypes.arrayOf(HistoryItemProps),
};

export default HistoryList;
