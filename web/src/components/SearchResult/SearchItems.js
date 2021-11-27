import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import MuiDivider from "@mui/material/Divider";

import SearchItem from "./SearchItem";

const EmptyHistory = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
  color: theme.palette.grey[100],
  margin: "24px 0",
  fontSize: "2px"
}));

function SearchItems(props) {
  const { results, competenceCategories, searchTerms } = props;
  return (
    <div data-testid="search-results">
      {results && results.length > 0 ? (
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
            : "Search employee database..."}
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
