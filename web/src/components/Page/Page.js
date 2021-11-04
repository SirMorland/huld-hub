import React from "react";
import PropTypes from 'prop-types';

import { styled } from '@mui/system';

import NavBar from '../NavBar/NavBar';
import { logout } from "../../api";

const StyledMain = styled('main')`
  display: grid;
  grid-auto-flow: dense;
  justify-content: center;
  gap: 24px 64px;
  margin: 16px 0 112px auto;
  padding: 0 16px;
  max-width: 1920px;
  box-sizing: border-box;

  @media (min-width: 768px){
    grid-auto-columns: minmax(0, 576px);
    margin: 32px auto 112px auto;
    padding: 0 32px;
  }
`;


const Page = ({ header, children }) => {
	return (
		<React.Fragment>
      <NavBar onLogOutClick={logout}>
        {header}
      </NavBar>
			<StyledMain>
				{children}
			</StyledMain>
		</React.Fragment>
	);
};

Page.propTypes = {
  header: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Page;