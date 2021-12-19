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
  padding: 12px 18px;
  opacity: 0.95;

  @media (min-width: 768px){
    bottom: 0px;
    padding: 10px 32px;
  }

  @media print
  {    
    display: none;
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