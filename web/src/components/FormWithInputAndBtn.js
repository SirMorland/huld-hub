import React from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';

const StyledForm = styled('form')({
  display: 'flex',
});

const StyledTextField = styled(TextField)({
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  margin: '4px 0 4px 10px',
});

const FormWithInputAndBtn = ({ value, setValue, onSubmit, placeholder }) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField
        data-testid="new-competence-item"
        placeholder={placeholder}
        required
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        data-testid="add-item-btn"
      >
        Add
      </StyledButton>
    </StyledForm>
  );
};

FormWithInputAndBtn.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FormWithInputAndBtn;
