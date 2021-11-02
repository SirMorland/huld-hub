import { styled } from '@mui/system';

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 4px 8px RGBA(0, 0, 0, 0.16);
  padding: 24px 16px;
  background: white;
  width: 512px;
  max-width: calc(100vw - 32px);
`;

export default function DialogWrapper({ children }) {
  return (
    <StyledBox>
      {children}
    </StyledBox>
  )
}

