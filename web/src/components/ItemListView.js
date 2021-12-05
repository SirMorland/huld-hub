import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/system';
import { capitalizeFirstLetters } from "../utils";

const StyledUl = styled('ul')({
  listStyleType: "none",
  margin: "0",
  padding: "0",
});

const EmptyItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
}));

const renderItems = ({ items, noItemDescription }) => {
  if (items && items.length > 0) {
    return (
      <>
        <StyledUl>
          {items && items.map(item => 
              <li key={item.id}><Typography variant="body1">{item.name}</Typography></li>
            )
          }
        </StyledUl>
      </>
    );
  } else {
    return (
      <EmptyItem variant="body1" data-testid="no-item-description">
        {noItemDescription}
      </EmptyItem>
    );
  }
};


const ItemListView = (props) => {
  return (
    <>
      <Typography variant="h2">{capitalizeFirstLetters(props.title)}</Typography>
      {renderItems(props)}
    </>
  );
};
ItemListView.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  noItemDescription: PropTypes.string,
};

export default ItemListView;
