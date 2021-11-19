import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import SearchItem from "./SearchItem";

const EmptyHistory = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
}));

function SearchItems(props) {
  return (
    <div>
      {props.results ? (
        props.results.map((prop) => (
          <SearchItem
            {...prop}
            key={prop.id}
            competenceCategories={props.competenceCategories}
            searchTerms={props.searchTerms}
          />
        ))
      ) : (
        <EmptyHistory variant="body1" data-testid="no-item-description">
          {props.searchTerms.length > 0
            ? "No Match Found"
            : "Start by searching something..."}
        </EmptyHistory>
      )}
    </div>
  );
}

SearchItems.propTypes = {};

export default SearchItems;
