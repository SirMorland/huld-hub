import { styled } from '@mui/system';

const StyledContainer = styled('div')(({theme}) => `
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, ${theme.colors.primaryText} 50%, #ffffff 50%);
    height: 100vh;
`);

export default function PageWrapper({ children }) {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
}

