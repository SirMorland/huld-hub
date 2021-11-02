import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const StyledHeader = styled('header')(({ theme }) => `
  background-color: ${theme.colors.primaryText};
  min-height: 56px;
`);

const StyledContainer = styled('div')`
  @media (min-width: 768px) {
      justify-content: space-between;
      display: flex;
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

const NavBar = ({ loggedIn = false, role, onLogOutClick }) => {
  return (
    <StyledHeader>
      <StyledContainer>
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
      </StyledContainer>
    </StyledHeader>
  );
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool,
  role: PropTypes.oneOf(['admin', 'employee']),
  onLogOutClick: PropTypes.func,
}

NavBar.defaultProps = {
  loggedIn: false,
  onLogOutClick: null,
}

export default NavBar;