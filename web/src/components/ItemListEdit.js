import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import IconButton from "@mui/material/IconButton";

const StyledIcon = styled(DoDisturbOnIcon)(`
  font-size: 16px;
`);

const ItemListEdit = ({ items, onRemove }) => {
  return (
    <div>
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
    </div>
  );
};

ItemListEdit.defaultProps = { items: [], onRemove: () => { } }
ItemListEdit.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};

export default ItemListEdit;
