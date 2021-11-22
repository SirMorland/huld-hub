import React from 'react';

import { styled } from '@mui/system';

import NavBar from './NavBar/NavBar';

import { useUserContext } from '../userContext';

const StyledContainer = styled('div')(({ theme }) => `
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
  const { user, removeJwt, jwt } = useUserContext();
  const onLogOutClick = () => {
    removeJwt();
  }
  return (
    <React.Fragment>
      <NavBar onLogOutClick={onLogOutClick} loggedIn={!!jwt} role={user?.role?.type} />
      <StyledContainer>
        {children}
      </StyledContainer>
    </React.Fragment>
  );
}

