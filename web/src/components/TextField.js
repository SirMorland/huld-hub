import React from "react";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const TextFieldContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OutlinedInput = styled(MuiOutlinedInput)(({ theme }) => `
  padding: 0;

  & .MuiOutlinedInput-input {
    height: 16px;
    padding: 16px 12px;
    background: white;
  }

  & .MuiOutlinedInput-input::placeholder {
    color: ${theme.palette.grey[500]};
  }
`);

/**
 *
 * @param {{textarea: boolean; label: string; placeholder: string; error: boolean; required: boolean; type: string; value: string; onChange: Function; }} param0
 * @returns
 */
function TextField({ label, textarea, className, helpText, errorText, ...props }) {
  const inputProps = {
    fullWidth: true,
    placeholder: label,
    ...(textarea && { multiline: true, minRows: 4 }),
    ...props,
  };
  return (
    <TextFieldContainer data-testid="textfield-container" className={className}>
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
        error={!!errorText}
      />
      {(helpText || errorText) &&
        <Typography component="p" variant="body2" color="error" align="center">
          {errorText} {helpText}
        </Typography>
      }
    </TextFieldContainer>
  );
}

export default TextField;
