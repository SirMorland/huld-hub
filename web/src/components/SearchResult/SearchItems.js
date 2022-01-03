import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import MuiDivider from '@mui/material/Divider';
import { escapeRegex } from '../../utils';

import SearchItem from './SearchItem';

const EmptyHistory = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.main,
  whiteSpace: 'nowrap',
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
  color: theme.palette.grey[100],
  margin: '24px 0',
  fontSize: '2px',
}));

/**
 * A function that sorts found profiles based on match count
 * 
 * @param {Array<object>} profiles - matched user profile object
 * @param {string[]} searchTerms - Array of search terms
 * @returns 
 */
const sortProfileByMatchCount = (profiles = [], searchTerms = []) => {
  // Loop through the profiles
  return profiles?.map((profile) => {
    let matchCount = 0
    const { first_name, last_name, title, competences } = profile;

    // Make a string out of the competences
    const competenceString = competences
      .map((competence) => competence.name)
      .join(',');
    
    // Join all user data and convert to string
    const userDataString = [
      first_name,
      last_name,
      title,
      competenceString,
    ].join(';');

    // For each search term find the number of occurance in user data
    searchTerms.forEach((searchTerm) => {
      const regrex = RegExp(escapeRegex(searchTerm), 'ig');
      matchCount = (userDataString.match(regrex) || []).length;
    });

    // Return the total count and sort based on count
    return {
      ...profile,
      matchCount,
    };
  }).sort((a,b)=>b.matchCount - a.matchCount);
};

function SearchItems(props) {
  const { results, competenceCategories, searchTerms } = props;

  const sortedProfile = useMemo(()=>{
    return sortProfileByMatchCount(results, searchTerms)
  },[results, searchTerms])

  return (
    <div data-testid="search-results">
      {results && results.length > 0 ? (
        sortedProfile.map((profile, i, { length }) => (
          <span key={profile.id}>
            <SearchItem
              {...profile}
              competenceCategories={competenceCategories}
              searchTerms={searchTerms}
            />
            {i < length - 1 ? <Divider /> : ''}
          </span>
        ))
      ) : (
        <EmptyHistory variant="body1" data-testid="no-item-description">
          {searchTerms.length > 0
            ? 'No Match Found'
            : 'Search employee database...'}
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
