import React from 'react';

import { styled } from '@mui/system';

import NavBar from './NavBar/NavBar';

const StyledContainer = styled('div')(({theme}) => `
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, ${theme.colors.primaryText} 50%, #ffffff 50%);
    height: 100vh;
    width: 100%;
`);

export default function PageWrapper({ children }) {
  return (
    <React.Fragment>
      <NavBar />
      <StyledContainer>
        {children}
      </StyledContainer>
    </React.Fragment>
  );
}

