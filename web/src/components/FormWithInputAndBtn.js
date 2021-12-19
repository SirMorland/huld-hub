import React from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';

const StyledForm = styled('form')`
  display: flex;
  gap: 16px;
`;

const StyledTextField = styled(TextField)`
  flex-grow: 1;
`;


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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        data-testid="add-item-btn"
      >
        Add
      </Button>
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
