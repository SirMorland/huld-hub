import { styled } from '@mui/system';

const StyledWrapper = styled('div')`
  position: absolute;
  bottom: 16px;
  height: 80px;
`;

const StyledContainer = styled('div')`
  position: fixed;
  display: grid;
  grid-auto-flow: column;
  gap: 32px;
`;

const ActionButtonContainer = ({ children }) => {
  return (
    <StyledWrapper>
      <StyledContainer>
        {children}
      </StyledContainer>
    </StyledWrapper>
  );
}

export default ActionButtonContainer;