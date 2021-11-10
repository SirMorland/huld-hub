import { styled } from '@mui/system';

const StyledContainer = styled('div')`
  position: fixed;
  bottom: 16px;
  display: grid;
  grid-auto-flow: column;
  gap: 32px;
  z-index: 1;

  @media (min-width: 768px){
    bottom: 32px;
  }
`;

const ActionButtonContainer = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
}

export default ActionButtonContainer;