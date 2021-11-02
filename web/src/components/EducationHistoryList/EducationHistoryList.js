import React from "react";
import PropTypes from "prop-types";
import { styled, Box } from "@mui/system";

import EducationHistoryItem, {
  EducationHistoryItemProps,
} from "../EducationHistoryItem/EducationHistoryItem.js";

const Title = styled("h2")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

function EducationHistoryList(props) {
  return (
    <div className="education-history">
      <Title>Education History</Title>
      <div className="education-list">
        {props.educationList &&
          props.educationList.map((educationItem) => (
            <EducationHistoryItem educationItem={educationItem} key={educationItem.id} />
          ))}
      </div>
    </div>
  );
}

EducationHistoryList.defaultProps = {
  educationList: [],
};

EducationHistoryList.propTypes = {
  educationList: PropTypes.arrayOf(EducationHistoryItemProps),
};

export default EducationHistoryList;
