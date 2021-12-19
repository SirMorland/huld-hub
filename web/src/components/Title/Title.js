import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 32px;
  }

  @media print{
      display: none;
  }
`;
const NameContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const StyledAvatar = styled(Avatar)`
    width: 128px;
    height: 128px;
`;
const StyledHeader = styled(Typography)(({ theme }) => `
  font-weight: bold;
  color: white;
  font-size: 40px;
  font-family: ${theme.fonts.header};
  text-align: center;

  @media (min-width: 768px) {
    font-size: 48px;
    text-align: initial;
  }
`);
const StyledSubHeader = styled(Typography)(({ theme }) => `
  font-weight: bold;
  color: white;
  font-size: 24px;
  font-family: ${theme.fonts.header};
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 32px;
    text-align: initial;
  }
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