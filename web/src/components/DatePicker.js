import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/lab";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const DatePickerContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-input {
    height: 16px;
    padding: 16px 12px;
  }
`;

function DatePicker({ label, textInputProps, ...props }) {
  const dateProps = {
    inputFormat: "dd.MM.yyyy",
    mask: "__.__.____",
    ...props,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerContainer data-testid="date-locale-provider">
        {label && (
          <Typography
            data-testid="date-label"
            component="label"
            variant="body1"
            htmlFor={props.id || ""}
          >
            {label}
          </Typography>
        )}
        <MuiDatePicker
          data-testid="date-picker"
          {...dateProps}
          renderInput={({ inputProps, ...params }) => (
            <StyledTextField
              fullWidth
              {...{ ...params, ...textInputProps }}
              placeholder="dd.mm.yyyy"
              inputProps={{ ...inputProps, "data-testid": "date-input" }}
            />
          )}
        />
      </DatePickerContainer>
    </LocalizationProvider>
  );
}

export default DatePicker;
