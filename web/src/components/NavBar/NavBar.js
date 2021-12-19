import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const StyledHeaderContainer = styled("div")(({ theme }) => `
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

const StyledHeader = styled("header")`
  width: 100%;
  max-width: 1920px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 0 16px;
  }
`;
const StyledContent = styled("div")`
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
  color: "white",
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

const StyledButton = styled("button")(({ theme }) => headerTypography(theme));
const StyledLink = styled(Link)(({ theme }) => headerTypography(theme));

const changePasswordTypography = (theme) => ({
  fontFamily: theme.fonts.header,
  color: "black",
  border: 0,
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  cursor: "pointer",
  lineHeight: 1,
  textDecoration: "none",
  verticalAlign: "bottom",
});
const StyledChangeLink = styled(Link)(({ theme }) => changePasswordTypography(theme));

const HeaderLink = styled(StyledLink)({
  fontWeight: "bold",
  padding: "16px",
  display: "block",
  textAlign: "center",
});

const StyledUl = styled("ul")({
  listStyleType: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledLi = styled("li")({
  padding: "16px",
});

const StyledSearchIcon = styled(SearchIcon)`
  width: 24px;
  height: 24px;
  vertical-align: bottom;
`;

const NavBar = ({ children, onLogOutClick, loggedIn, role }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <HeaderLink to="/">Hub</HeaderLink>
        {loggedIn && (
          <StyledUl>
            {role === "admin" && (
              <StyledLi>
                <StyledLink to="/admin">Admin</StyledLink>
              </StyledLi>
            )}
            <StyledLi>
              <StyledButton type="button" onClick={handleClick}>
                  Settings
                </StyledButton>
            </StyledLi>
            <Menu  anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <PublishedWithChangesIcon  fontSize="small" />
                </ListItemIcon>
                <StyledChangeLink to="/settings">Change password</StyledChangeLink>
              </MenuItem>
              <Divider />
              <MenuItem sx={{ color: "black" }}  onClick={onLogOutClick}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <StyledButton sx={{ color: "black", fontSize: "inherit"}} >Log out</StyledButton>
              </MenuItem>
            </Menu>

            {role && (
              <StyledLi>
                <StyledLink to="/search">
                  <StyledSearchIcon />
                </StyledLink>
              </StyledLi>
            )}
          </StyledUl>
        )}
      </StyledHeader>
      {children && <StyledContent>{children}</StyledContent>}
    </StyledHeaderContainer>
  );
};

NavBar.propTypes = {
  children: PropTypes.element,
  onLogOutClick: PropTypes.func,
  role: PropTypes.string,
  loggedIn: PropTypes.bool,
};

NavBar.defaultProps = {
  onLogOutClick: null,
};

export default NavBar;
