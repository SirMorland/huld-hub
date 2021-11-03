import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { capitalizeFirstLetters } from "../utils";

const ItemList = (props) => {
  return (
    <>
      <Typography variant="h4">{capitalizeFirstLetters(props.title)}</Typography>
      {props.items && props.items.map(item => 
          <Typography key={item.id} variant="body1">{item.name}</Typography>
        )
      }
    </>
  );
};
ItemList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default ItemList;
