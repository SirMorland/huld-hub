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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-betweenz",
  fontSize: theme.typography.flexSize,
  color: theme.palette.text.primary,
  textAlign: "justify",
}));

function WorkHistoryItem(props) {
  return (
    <div id={`work-${props.workItem.id}`} className="work-item">
      <Header>
        <div>
          <span className="company">{props.workItem.company}</span> - <span className="position">{props.workItem.position}</span>
        </div>
        <div>
          <span className="start-date">{props.workItem.startDate}</span> - <span className="end-date">{props.workItem.endDate}</span>
        </div>
      </Header>
      <Description className="description">{props.workItem.description}</Description>
    </div>
  );
}


export const WorkHistoryItemProps = PropTypes.shape({
  company: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
});

WorkHistoryItem.propTypes = {
  workItem: WorkHistoryItemProps,
};

export default WorkHistoryItem;
