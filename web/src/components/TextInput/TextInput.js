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

function TextInput({ label, ...props }) {
  const inputProps = {
    fullWidth: true,
    placeholder: label,
    ...props,
  };
  return (
    <div data-testid="textinput-container">
      {label && (
        <Typography
          component="label"
          variant="body1"
          htmlFor={props.id || ""}
          data-testid="textinput-label"
        >
          {label}
        </Typography>
      )}
      <OutlinedInput
        {...inputProps}
        inputProps={{ "data-testid": "textinput-input" }}
      />
    </div>
  );
}

export default TextInput;
