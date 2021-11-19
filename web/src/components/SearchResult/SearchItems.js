import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";

import SearchItem from "./SearchItem";

const EmptyHistory = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
}));

function SearchItems(props) {
  const { results, competenceCategories, searchTerms } = props;
  return (
    <div>
      {results ? (
        results.map((profile, i, { length }) => (
          <span key={profile.id}>
            <SearchItem
              {...profile}
              competenceCategories={competenceCategories}
              searchTerms={searchTerms}
            />
            {i < length - 1 ? <Divider /> : ""}
          </span>
        ))
      ) : (
        <EmptyHistory variant="body1" data-testid="no-item-description">
          {searchTerms.length > 0
            ? "No Match Found"
            : "Start by searching something..."}
        </EmptyHistory>
      )}
    </div>
  );
}

SearchItems.propTypes = {
  results: PropTypes.array,
  competenceCategories: PropTypes.array,
  searchTerms: PropTypes.array,
};

SearchItems.defaultProps = {
  results: [],
  competenceCategories: [],
  searchTerms: [],
};

export default SearchItems;
