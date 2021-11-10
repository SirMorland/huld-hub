import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { getYear } from "../../utils";

const Header = styled(Typography)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "16px",
});

const Description = styled(Typography)({
  textAlign: "justify",
});

const DateSpan = styled("span")({
  whiteSpace: "nowrap",
});

function HistoryItem(props) {
  return (
    <div id={`history-${props.historyItem.id}`} data-testid="history-item">
      <Header variant="h3">
        <span>
          <span data-testid="organisation">
            {props.historyItem.organisation}
          </span>{" "}
          - <span data-testid="title">{props.historyItem.title}</span>
        </span>
        <DateSpan>
          <span data-testid="start-date">
            {getYear(props.historyItem.start_date)}
          </span>{" "}
          -{" "}
          <span data-testid="end-date">
            {getYear(props.historyItem.end_date)}
          </span>
        </DateSpan>
      </Header>
      <Description variant="body1" data-testid="description">
        {props.historyItem.description}
      </Description>
    </div>
  );
}

export const HistoryItemProps = PropTypes.shape({
  organisation: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

HistoryItem.propTypes = {
  historyItem: HistoryItemProps,
};

export default HistoryItem;
