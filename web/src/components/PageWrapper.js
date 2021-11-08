import React, { useContext } from 'react';

import { styled } from '@mui/system';

import NavBar from './NavBar/NavBar';

import { logout } from '../api';
import { UserContext } from '../App';

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
  const { user, setJwt, jwt } = useContext(UserContext);
  const onLogOutClick = () => {
    setJwt(null);
    logout();
  }
  return (
    <React.Fragment>
      <NavBar onLogOutClick={onLogOutClick} loggedIn={jwt !== null} role={user?.role?.type} />
      <StyledContainer>
        {children}
      </StyledContainer>
    </React.Fragment>
  );
}

