import React from "react";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const OutlinedInput = styled(MuiOutlinedInput)(({ theme }) => ({
  "& .MuiOutlinedInput-input::placeholder": {
    color: theme.palette.grey[500],
  },
  "& .MuiOutlinedInput-input": {
    background: "white",
  },
  margin: "4px 0",
}));

/**
 *
 * @param {{textarea: boolean; label: string; placeholder: string; error: boolean; required: boolean; type: string; value: string; onChange: Function; }} param0
 * @returns
 */
function TextField({ label, textarea, className, ...props }) {
  const inputProps = {
    fullWidth: true,
    placeholder: label,
    ...(textarea && { multiline: true, minRows: 4 }),
    ...props,
  };
  return (
    <div data-testid="textfield-container" className={className}>
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
    </div>
  );
}

export default TextField;
