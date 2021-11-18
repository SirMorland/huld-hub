import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledTypography = styled(Typography)`
  white-space: pre-wrap;
`;

const ProfileInfo = ({ title, data = "" }) => {
  return (
    <div className="profileBio">
      <Typography variant="h2" colour="primary" data-testid="title">
        {title}
      </Typography>
      <StyledTypography data-testid="data">
        {data.split("\n").map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </StyledTypography>
    </div>
  );
};

export default ProfileInfo;
