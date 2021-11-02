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

function EducationHistoryItem(props) {
  return (
    <div>
      <Header>
        <div>
          {props.educationItem.school} - {props.educationItem.degree}
        </div>
        <div>
          {props.educationItem.startDate} - {props.educationItem.endDate}
        </div>
      </Header>
      <Description>{props.educationItem.description}</Description>
    </div>
  );
}

export const EducationHistoryItemProps = PropTypes.shape({
  school: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
});

EducationHistoryItem.propTypes = {
  educationItem: EducationHistoryItemProps,
};

export default EducationHistoryItem;
