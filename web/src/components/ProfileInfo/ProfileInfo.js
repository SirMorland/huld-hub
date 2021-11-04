import React from 'react';
import { Typography } from '@mui/material'; 
import { styled } from '@mui/system';

const StyledTypography = styled(Typography)`
    white-space: pre-wrap;

`;


const ProfileInfo = ({title, data}) => {
    return(
        <div className="profileBio">
            <Typography variant="h4" colour="primary" >
                {title}
            </Typography>
            <StyledTypography>
                {data}
            </StyledTypography>
        </div>
    )

}

export default ProfileInfo;