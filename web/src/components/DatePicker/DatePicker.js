import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const DateInputDiv = styled("div")({
  margin: "4px 0",
});

function DatePicker({ label, value, setValue, ...props }) {
  const [dateValue, setDateValue] = React.useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const MuiDatePicker = isSmallScreen ? MobileDatePicker : DesktopDatePicker;

  React.useEffect(() => {
    value && setDateValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setValue && setValue(dateValue.toISOString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);

  const dateProps = {
    inputFormat: "dd.MM.yyyy",
    mask: "__.__.____",
    ...props,
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
    >
      <div data-testid="date-locale-provider">
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
        <DateInputDiv>
          <MuiDatePicker
            data-testid="date-picker"
            {...dateProps}
            value={dateValue}
            onChange={setDateValue}
            renderInput={({ inputProps, ...params }) => (
              <TextField
                fullWidth
                {...params}
                placeholder="dd.mm.yyyy"
                inputProps={{ ...inputProps, "data-testid": "date-input" }}
              />
            )}
          />
        </DateInputDiv>
      </div>
    </LocalizationProvider>
  );
}

export default DatePicker;
