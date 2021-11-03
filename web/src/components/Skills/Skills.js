import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

const Header = styled("h2")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

const Description = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-betweenz",
  fontSize: theme.typography.flexSize,
  color: theme.palette.text.primary,
  textAlign: "left",
}));

const Skills = (props) => {
  return (
    <div className="skills">
      <Header>Skills</Header>
      {props.skills && (
        <Description className="description">{props.skills}</Description>
      )}
    </div>
  );
};

Skills.defaultProps = {
  skills: [],
};

Skills.propTypes = {
  skills: PropTypes.string,
};

export default Skills;
