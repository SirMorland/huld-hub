import React from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/system';

const StyledHeader = styled('div')(({theme}) =>`
  position: sticky;
  top: 0;
  background-color: ${theme.colors.primaryText};
  display: flex;
  flex-direction: column;
  align-items: center;
`);

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
			<StyledHeader>
				<header style={{width: '100%', maxWidth: 1920, padding: '0 16px',  boxSizing: 'border-box'}}>
					<a href="/" style={{display: 'inline-block', fontSize: 24, padding: 16, lineHeight: 1, color: 'white', fontWeight: 'bold', appearance: 'none', textDecoration: 'none'}}>Hub</a>
				</header>
				{header &&
					<div style={{width: '100%', maxWidth: 1920, padding: 32, boxSizing: 'border-box'}}>
						{header}
					</div>
				}
			</StyledHeader>
			<StyledMain>
				{children}
			</StyledMain>
		</React.Fragment>
	);
};

Page.propTypes = {
  header: PropTypes.element,
  children: PropTypes.element
}

export default Page;