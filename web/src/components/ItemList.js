import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { capitalizeFirstLetters } from "../utils";

const ItemList = (props) => {
  return (
    <>
    <Typography variant="h4">{capitalizeFirstLetters(props.title)}</Typography>
      <ul>
        {props.items && props.items.map(item => 
            <li key={item.id}><Typography variant="body1">{item.name}</Typography></li>
          )
        }
      </ul>
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
