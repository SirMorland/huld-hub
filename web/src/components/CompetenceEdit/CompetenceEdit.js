import React, { useState } from "react";
import TextField from "../TextField";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import IconButton from "@mui/material/IconButton";
import { capitalizeFirstLetters } from "../../utils";

const StyledIcon = styled(DoDisturbOnIcon)(`
  font-size: 20px;
`);

const Wrapper = styled("div")(`
  margin: 8px 0px;
`);

export const ItemListEdit = ({ items, onRemove }) => {
  return (
    <Wrapper>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <div key={index} data-textid={`item-${index}`}>
            <IconButton
              size="small"
              aria-label="delete"
              color="error"
              onClick={onRemove.bind(null, index)}
              data-testid="delete-item-btn"
            >
              <StyledIcon />
            </IconButton>
            <span data-testid="item-name">{item.name}</span>
          </div>
        ))}
    </Wrapper>
  );
};

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
          id="new-competence-item"
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

export default CompetenceEdit;
