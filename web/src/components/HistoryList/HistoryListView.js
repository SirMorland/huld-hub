import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import HistoryItemView, { HistoryItemViewProps } from "../HistoryItem/HistoryItemView.js";

const EmptyHistory = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
}));

const renderHistoryItems = ({ historyItems, noItemDescription }) => {
  if (historyItems && historyItems.length > 0) {
    return historyItems.map((historyItem) => (
      <HistoryItemView historyItem={historyItem} key={historyItem.id} />
    ));
  } else {
    return (
      <EmptyHistory variant="body1" data-testid="no-item-description">
        {noItemDescription}
      </EmptyHistory>
    );
  }
};

/**
 * A component that renders a list of history items of a user
 * 
 * @param {{ title: string; noItemDescription: string; historyItems: Array<object>; }} props 
 * @returns {JSX.Element}
 */
function HistoryListView(props) {
  return (
    <div data-testid="history">
      <Typography variant="h2" data-testid="history-title">
        {props.title}
      </Typography>
      <div data-testid="history-items">{renderHistoryItems(props)}</div>
    </div>
  );
}

HistoryListView.defaultProps = {
  historyItems: [],
};

HistoryListView.propTypes = {
  title: PropTypes.string.isRequired,
  noItemDescription: PropTypes.string,
  historyItems: PropTypes.arrayOf(HistoryItemViewProps),
};

export default HistoryListView;
