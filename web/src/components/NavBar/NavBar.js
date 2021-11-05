import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

import { UserContext } from '../../App';

const StyledHeaderContainer = styled('div')(({ theme }) => `
  position: sticky;
  top: 0;
  z-index: 10;
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
const StyledLink = styled(Link)(({ theme }) => headerTypography(theme));

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

const NavBar = ({ children, onLogOutClick }) => {
	const user = useContext(UserContext);
  const history = useHistory();

  const logOut = async () => {
    await onLogOutClick();
    history.push("/login");
  }

  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <HeaderLink to="/">
          Hub
        </HeaderLink>
        {user && <StyledUl>
          {user.role.type === 'admin' && <StyledLi><StyledLink to="/admin">Admin</StyledLink></StyledLi>}
          <StyledLi><StyledButton type="button" onClick={logOut}>Log out</StyledButton></StyledLi>
          <StyledLi>
            <StyledLink to="/search">
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
  onLogOutClick: PropTypes.func,
}

NavBar.defaultProps = {
  onLogOutClick: null,
}

export default NavBar;