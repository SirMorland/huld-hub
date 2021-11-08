import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';

const StyledContainer = styled('div')`
  display: flex;
  align-items: center;
`;
const NameContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;
const Title = (props) => {
    const { first_name, last_name, title, image } = props;

    return (
        <StyledContainer>
            <Avatar
                style={{ marginRight: "14px", width: '70px', height: '70px' }}
                alt="Jack Sparrow"
                src={image}
                data-testid="avatar"
            />
            <NameContainer >
                <Typography variant="h4" style={{ color: "white" }} data-testid="user_name">
                    {first_name} {last_name}
                </Typography>
                <Typography variant="h7" style={{ color: "white" }} data-testid="user_title">
                    {title}
                </Typography>
            </NameContainer>
        </StyledContainer>
    );
}

Title.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
}

export default Title;