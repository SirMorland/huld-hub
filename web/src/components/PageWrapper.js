import React from 'react';

import { styled } from '@mui/system';
import { GlobalStyles } from '@mui/material';

import NavBar from './NavBar/NavBar';
import { useUserContext } from '../userContext';

const styles = (theme) => `
  body {
    background-color: ${theme.colors.primaryText};
    
    @media (min-height: 640px) {
      background-color: initial;
    }
  }
`;

const StyledContainer = styled('div')(({ theme }) => `
  &::before {
    @media (min-height: 640px) {
      content: "";
      display: block;
      width: 100%;
      height: 50vh;

      position: absolute;
      top: 0;
      z-index: -1;

      background-color: ${theme.colors.primaryText};
    }
  }
`);

export default function PageWrapper({ children }) {
  const { user, logout, jwt } = useUserContext();
  return (
    <>
      <GlobalStyles styles={styles} />
      <StyledContainer>
        <NavBar onLogOutClick={logout} loggedIn={!!jwt} role={user?.role?.type} />
        {children}
      </StyledContainer>
    </>
  );
}
