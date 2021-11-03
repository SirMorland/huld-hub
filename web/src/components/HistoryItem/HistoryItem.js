import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

const Header = styled("h3")(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "16px",
}));

const Description = styled("div")(({ theme }) => ({
  fontSize: theme.typography.flexSize,
  color: theme.palette.text.primary,
  textAlign: "justify",
}));

function HistoryItem(props) {
  return (
    <div id={`history-${props.historyItem.id}`} className="history-item">
      <Header>
        <div>
          <span className="organisation">{props.historyItem.organisation}</span> - <span className="title">{props.historyItem.title}</span>
        </div>
        <div>
          <span className="start-date">{props.historyItem.startDate}</span> - <span className="end-date">{props.historyItem.endDate}</span>
        </div>
      </Header>
      <Description className="description">{props.historyItem.description}</Description>
    </div>
  );
}

export const HistoryItemProps = PropTypes.shape({
  organisation: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
});

HistoryItem.propTypes = {
  historyItem: HistoryItemProps,
};

export default HistoryItem;
