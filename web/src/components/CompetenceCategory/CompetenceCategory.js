import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

import Competence, {
  CompetenceProps,
} from "../Competence/Competence.js";

const Header = styled("h2")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

function CompetenceCategory(props) {
  return (
    <div className="education-history">
      <Header>skills</Header>
      <div className="education-list">
        {props.educationList &&
          props.educationList.map((educationItem) => (
            <Competence educationItem={educationItem} key={educationItem.id} />
          ))}
      </div>
    </div>
  );
}

CompetenceCategory.defaultProps = {
  educationList: [],
};

CompetenceCategory.propTypes = {
  educationList: PropTypes.arrayOf(CompetenceProps),
};

export default CompetenceCategory;
