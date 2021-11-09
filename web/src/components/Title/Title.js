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

const StyledAvatar = styled(Avatar)`
    margin-right: 32px;
    width: 128px;
    height: 128px;
`;
const StyledHeader = styled(Typography)(({ theme }) => `
  font-weight: bold;
  color: white;
  font-size: 48px;
  font-family: ${theme.fonts.header};
`);
const StyledSubHeader = styled(Typography)(({ theme }) => `
  font-weight: bold;
  color: white;
  font-size: 32px;
  font-family: ${theme.fonts.header};
`);
const Title = (props) => {
    const { first_name, last_name, title, image } = props;

    return (
        <StyledContainer>
            <StyledAvatar
                alt="Profile Picture"
                src={image}
                data-testid="avatar"
            />
            <NameContainer >
                <StyledHeader data-testid="user_name">
                    {first_name} {last_name}
                </StyledHeader>
                <StyledSubHeader data-testid="user_title">
                    {title}
                </StyledSubHeader>
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