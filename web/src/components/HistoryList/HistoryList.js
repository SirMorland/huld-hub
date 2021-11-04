import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

import HistoryItem, { HistoryItemProps } from "../HistoryItem/HistoryItem.js";

const Title = styled("h2")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

const EmptyHistory = styled("p")(({ theme }) => ({
  fontSize: theme.typography.fontSize,
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
      <EmptyHistory data-testid="no-item-description">
        {noItemDescription}
      </EmptyHistory>
    );
  }
};

function HistoryList(props) {
  return (
    <div data-testid="history">
      <Title data-testid="history-title">{props.title}</Title>
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
