import React from "react";
import PropTypes from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/system';

import NavBar from '../NavBar/NavBar';
import { useUserContext } from "../../userContext";

const StyledMain = styled('main')(({ rows }) => `
  display: grid;
  grid-auto-flow: dense;
  grid-auto-columns: 1fr;
  justify-content: center;
  gap: 24px 64px;
  margin: 16px 0 80px auto;
  padding: 0 16px;
  max-width: 1920px;
  box-sizing: border-box;

  @media (min-width: 768px){
    grid-auto-columns: minmax(0, 576px);
    ${rows ? `grid-template-rows: repeat(${rows - 1}, max-content) 1fr;` : ""}
    margin: 32px auto 112px auto;
    padding: 0 32px;
  }

  @media print {
    display: none;
  }
`);

const Backdrop = styled("div")(({ theme }) => ({
  position: "fixed", /* Sit on top of the page content */
  width: "100%",/* Full width (cover the whole page) */
  height: "100%", /* Full height (cover the whole page) */
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", /* Black background with opacity */
  zIndex: theme.zIndex.drawer + 1,   /* Specify a stack order in case you're using a different order for other elements */
  justifyContent: "center",
  alignItems: "center",

}))

const Page = ({ header, rows, children, loading }) => {
  const { user, logout, jwt } = useUserContext();
  return (
    <React.Fragment>
      <NavBar onLogOutClick={logout} loggedIn={!!jwt} role={user?.role?.type} >
        {header}
      </NavBar>
      <StyledMain rows={rows}>
        {children}
      </StyledMain>
      <Backdrop style={{ display: loading ? "flex" : "none" }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </React.Fragment>
  );
};

Page.propTypes = {
  header: PropTypes.element,
  rows: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  loading: PropTypes.bool
};

export default Page;