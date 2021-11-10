import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SelectAutocompleteField = ({options, label, onSelect, ...props}) => {
  const [random, setRandom] = useState(Math.random());
  const onChange = (_, value) => {
    onSelect(value);
    // set random to clear the input 
    setRandom(Math.random());
  }
  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option.name}
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