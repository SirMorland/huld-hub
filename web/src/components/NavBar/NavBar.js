import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';


const StyledHeaderContainer = styled('div')(({ theme }) => `
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${theme.colors.primaryText};
  min-height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media print
  {    
    display: none;
  }
`);

const StyledHeader = styled('header')`
  width: 100%;
  max-width: 1920px;
  padding: 0 16px;
  box-sizing: border-box;

  @media (min-width: 768px) {
      justify-content: space-between;
      display: flex;
  }
`;
const StyledContent = styled('div')`
  width: 100%;
  max-width: 1920px;
  padding: 16px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const headerTypography = (theme) => ({
  fontFamily: theme.fonts.header,
  color: 'white',
  fontSize: "24px",
  border: 0,
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  cursor: "pointer",
  lineHeight: 1,
  textDecoration: "none",
  verticalAlign: "bottom",
});

const StyledButton = styled('button')(({ theme }) => headerTypography(theme));
const StyledLink = styled(Link)(({ theme }) => headerTypography(theme));

const HeaderLink = styled(StyledLink)({
  fontWeight: "bold",
  padding: "16px",
  display: "block",
  textAlign: "center",
});

const StyledUl = styled('ul')({
  listStyleType: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const StyledLi = styled('li')({
  padding: "16px",
});

const StyledSearchIcon = styled(SearchIcon)`
  width: 24px;
  height: 24px;
  vertical-align: bottom;
`;

const NavBar = ({ children, onLogOutClick, loggedIn, role }) => {
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <HeaderLink to="/">
          Hub
        </HeaderLink>
        {loggedIn && <StyledUl>
          {role === 'admin' && <StyledLi><StyledLink to="/admin">Admin</StyledLink></StyledLi>}
          <StyledLi><StyledButton type="button" onClick={onLogOutClick}>Log out</StyledButton></StyledLi>
          <StyledLi>
            <StyledLink to="/search">
              <StyledSearchIcon />
            </StyledLink>
          </StyledLi>
        </StyledUl>}
      </StyledHeader>
      {children &&
        <StyledContent>
          {children}
        </StyledContent>
      }
    </StyledHeaderContainer>
  );
}

NavBar.propTypes = {
  children: PropTypes.element,
  onLogOutClick: PropTypes.func,
  role: PropTypes.string,
  loggedIn: PropTypes.bool,
}

NavBar.defaultProps = {
  onLogOutClick: null,
}

export default NavBar;