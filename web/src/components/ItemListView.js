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

const ItemListView = (props) => {
  return (
    <>
    <Typography variant="h2">{capitalizeFirstLetters(props.title)}</Typography>
      <StyledUl>
        {props.items && props.items.map(item => 
            <li key={item.id}><Typography variant="body1">{item.name}</Typography></li>
          )
        }
      </StyledUl>
    </>
  );
};
ItemListView.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default ItemListView;
