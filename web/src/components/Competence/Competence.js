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

function Competence(props) {
  return (
    <div id={`education-${props.educationItem.id}`} className="education-item">
      <Header>
        <div>
          <span className="school">{props.educationItem.school}</span> - <span className="degree">{props.educationItem.degree}</span>
        </div>
        <div>
          <span className="start-date">{props.educationItem.startDate}</span> - <span className="end-date">{props.educationItem.endDate}</span>
        </div>
      </Header>
      <Description className="description">{props.educationItem.description}</Description>
    </div>
  );
}

export const CompetenceProps = PropTypes.shape({
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

Competence.propTypes = {
  competenceItem: Competence,
};

export default Competence;
