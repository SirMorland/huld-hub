import React from 'react';

import { styled } from '@mui/system';

import NavBar from './NavBar/NavBar';

import { useUserContext } from '../userContext';

const StyledContainer = styled('div')(({ theme }) => `
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 50vh;

    position: fixed;
    top: 0;

    background-color: ${theme.colors.primaryText};
  }
`);

export default function PageWrapper({ children }) {
  const { user, logout, jwt } = useUserContext();
  return (
    <React.Fragment>
      <StyledContainer>
        <NavBar onLogOutClick={logout} loggedIn={!!jwt} role={user?.role?.type} />
        {children}
      </StyledContainer>
    </React.Fragment>
  );
}
