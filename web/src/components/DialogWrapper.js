import { styled } from '@mui/system';

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;

  width: 512px;
  max-width: calc(100vw - 32px);
  min-height: 512px;
  margin: 16px auto;
  padding: 24px 16px;
  
  position: relative;
  z-index: 20;

  background: white;
  box-shadow: 2px 4px 8px RGBA(0, 0, 0, 0.16);
  
  @media (min-height: 640px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
`;

export default function DialogWrapper({ children }) {
  return (
    <StyledBox>
      {children}
    </StyledBox>
  )
}
