import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

import WorkHistoryItem, {
  WorkHistoryItemProps,
} from "../WorkHistoryItem/WorkHistoryItem.js";

const Title = styled("h2")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

function WorkHistoryList(props) {
  return (
    <div className="work-history">
      <Title>Education History</Title>
      <div className="work-list">
        {props.workList &&
          props.workList.map((workItem) => (
            <WorkHistoryItem workItem={workItem} key={workItem.id} />
          ))}
      </div>
    </div>
  );
}

WorkHistoryList.defaultProps = {
  workList: [],
};

WorkHistoryList.propTypes = {
  workList: PropTypes.arrayOf(WorkHistoryItemProps),
};

export default WorkHistoryList;
