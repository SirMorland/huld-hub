import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import IconButton from "@mui/material/IconButton";

const StyledIcon = styled(DoDisturbOnIcon)(`
  font-size: 16px;
`);

const Wrapper = styled("div")(`
  margin: 8px 0px;
`);

const ItemListEdit = ({ items, onRemove }) => {
  return (
    <Wrapper>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <div key={index}>
            <IconButton
              size="small"
              aria-label="delete"
              color="error"
              onClick={() => onRemove(item)}
            >
              <StyledIcon />
            </IconButton>
            {item.name}
          </div>
        ))}
    </Wrapper>
  );
};

ItemListEdit.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ItemListEdit;
