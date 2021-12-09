import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => `
  button, label {
    color: ${theme.palette.text.primary};
  }

  & .MuiOutlinedInput-root {
    height: 48px;
    padding: 0;
  }
  & .MuiOutlinedInput-input {
    height: 16px;
    padding: 16px 12px !important;
  }

  & .MuiInputLabel-root {
    top: 50%;
    transform: translate(12px, -50%) scale(1);
    transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                top 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  }
  & .MuiInputLabel-root.Mui-focused {
    top: 0%;
    transform: translate(12px, -50%) scale(0.75);
  }
`);


const SelectAutocompleteField = ({options, label, onSelect, ...props}) => {
  const [random, setRandom] = useState(Math.random());
  const onChange = (_, value) => {
    onSelect(value);
    // set random to clear the input 
    setRandom(Math.random());
  }
  return (
    <StyledAutocomplete
      options={options}
      getOptionLabel={option => option.name}
      data-testid="select-autocomplete-field"
      key={random}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          fullWidth
        />
      )}
      onChange={onChange}
      {...props}
    />
  );
}

export default SelectAutocompleteField;