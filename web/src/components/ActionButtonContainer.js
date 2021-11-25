import { styled } from '@mui/system';

const StyledContainer = styled('div') (({ theme }) => `
  left: 0px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  display: grid;
  grid-auto-flow: column;
  gap: 32px;
  z-index: 1;
  justify-content: right;
  background-color: ${theme.palette.primary.main};
  padding: 16px;


  @media (min-width: 768px){
    bottom: 0px;
    padding: 32px;
  }
`);

const ActionButtonContainer = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
}

export default ActionButtonContainer;