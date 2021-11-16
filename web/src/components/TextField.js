import React from "react";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const OutlinedInput = styled(MuiOutlinedInput)(({ theme }) => ({
  "& .MuiOutlinedInput-input::placeholder": {
    color: theme.palette.grey[500],
  },
  margin: "4px 0",
}));

const Container = styled("div")({
  // some styling
})

/**
 * 
 * @param {StyledComponent<OutlinedInputProps & MUIStyledCommonProps<Theme>, {}, {}>} param0 
 * @returns 
 */
function TextField({ label, textarea, ...props }) {
  const inputProps = {
    fullWidth: true,
    placeholder: label,
    ...(textarea && { multiline: true, minRows: 4 }),
    ...props,
  };
  return (
    <Container data-testid="textfield-container">
      {label && (
        <Typography
          component="label"
          variant="body1"
          htmlFor={props.id || ""}
          data-testid="textfield-label"
        >
          {label}
        </Typography>
      )}
      <OutlinedInput
        {...inputProps}
        inputProps={{ "data-testid": "textfield-input" }}
      />
    </Container>
  );
}

export default TextField;
