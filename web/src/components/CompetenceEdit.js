import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "./TextField";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ItemListEdit from "./ItemListEdit";
import { capitalizeFirstLetters } from "../utils";

const StyledForm = styled("form")({
  display: "flex",
});

const StyledTextField = styled(TextField)({
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  margin: "4px 0 4px 10px",
});

function CompetenceEdit(props) {
  const { items, onAdd, onRemove, type } = props;
  const [newItem, setNewItem] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd(newItem);
    setNewItem("");
  };

  return (
    <div>
      <Typography variant="h2" colour="primary">
        {capitalizeFirstLetters(type)}
      </Typography>
      <ItemListEdit items={items} onRemove={onRemove} />
      <StyledForm onSubmit={submit}>
        <StyledTextField
          data-testid="new-competence-item"
          placeholder={`Create new ${type}`}
          required
          value={newItem}
          onChange={({ target }) => setNewItem(target.value)}
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
    </div>
  );
}

CompetenceEdit.default = {
  items: [],
  onRemove: () => {},
  onAdd: () => {},
  type: "",
};

CompetenceEdit.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default CompetenceEdit;
