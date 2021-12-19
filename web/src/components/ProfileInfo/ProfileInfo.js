import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledTypography = styled(Typography)`
  white-space: pre-wrap;
`;

const EmptyItem = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey.main,
}));

const ProfileInfo = ({ title, data = "" }) => {
    return (
        <div className="profileBio">
            <Typography variant="h2" colour="primary" data-testid="title">
                {title}
            </Typography>
            {
                data ? (
                    <StyledTypography data-testid="data">
                        {
                            data.split("\n").map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                    </StyledTypography>
                ) : (
                <EmptyItem variant="body1" data-testid="no-item-description">
                    No {title} provided
                </EmptyItem>
                )
            }

        </div>
    );
};

export default ProfileInfo;
