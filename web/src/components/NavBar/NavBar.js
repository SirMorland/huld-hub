import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const StyledHeaderContainer = styled('div')(({ theme }) => `
  position: sticky;
  top: 0;
  background-color: ${theme.colors.primaryText};
  min-height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
})

const StyledButton = styled('button')(({ theme }) => headerTypography(theme));
const StyledLink = styled('a')(({ theme }) => headerTypography(theme));

const HeaderLink = styled(StyledLink)({
  fontWeight: "bold",
  padding: "16px",
  display: "block",
  textAlign: "center",
})

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
})

const NavBar = ({ children, loggedIn = false, role, onLogOutClick }) => {
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <HeaderLink href="/">
          Hub
        </HeaderLink>
        {loggedIn && <StyledUl>
          {role === 'admin' && <StyledLi><StyledLink href="/admin">Admin</StyledLink></StyledLi>}
          <StyledLi><StyledButton type="button" onClick={onLogOutClick}>Log out</StyledButton></StyledLi>
          <StyledLi>
            <StyledLink href="/search">
              <SearchIcon fontSize="small"/>
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
  loggedIn: PropTypes.bool,
  role: PropTypes.oneOf(['admin', 'employee']),
  onLogOutClick: PropTypes.func,
}

NavBar.defaultProps = {
  loggedIn: false,
  onLogOutClick: null,
}

export default NavBar;