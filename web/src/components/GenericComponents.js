import { styled } from "@mui/system";

export const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 24px;
`; 

export const DoubleFieldContainer =  styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
  gap: 16px;
`;

export const Grid = styled('div')`
  display: grid;
  gap: 16px;
`;

export const CondensedGrid = styled('div')`
  display: grid;
  gap: 8px;
`;