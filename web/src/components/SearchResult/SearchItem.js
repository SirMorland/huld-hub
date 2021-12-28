import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { escapeRegex } from '../../utils';
import useGetCompetencesByCategory from '../../hooks/useGetCompetencesByCategory';

const StyledAvatar = styled(Avatar)`
  margin-right: 16px;
  width: 64px;
  height: 64px;
`;

const InfoName = styled(Typography)`
  font-size: 24px;
  font-weigth: bold;
`;

const InfoTitle = styled(Typography)`
  font-size: 20px;
  font-weigth: bold;
`;

const ProfileLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textDecoration: 'none',
  marginLeft: 'auto',
}));

const Match = styled('span')({
  fontWeight: 'bold',
  color: 'blue',
});

const Body = styled('div')({
  marginTop: '8px',
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

/**
 * A function that highlights matched terms in a string
 *
 * @param {*} string - string to be matched against
 * @param {*} searchTerms - array of search terms to be used for matching
 * @returns
 */
const highlightMatchedText = (string, searchTerms) => {
  // Array that holds the index of the matched string
  let matchIndexes = [];
  // loop through the search terms
  searchTerms.forEach((key) => {
    // Find the term location(s) in the string by index
    const regrex = RegExp(escapeRegex(key), 'ig');
    let match;
    while ((match = regrex.exec(string)) != null) {
      // Store the value and start index of the matched term
      matchIndexes.push({ value: match[0], startIndex: match.index });
    }
  });

  // Sort all matched terms according to there start index
  const sortedMatches = matchIndexes.sort(
    (a, b) => a.startIndex - b.startIndex
  );

  // Array for holding the formatted data i.e. hasMatch or !hasMatch
  const formattedArr = [];
  let index = 0;
  while (index < string.length) {
    // Check if there is a match for the current index
    const matchFound = sortedMatches.find(
      // eslint-disable-next-line no-loop-func
      (match) => match.startIndex === index
    );

    // If match found, add it to array and identify as being a match. 
    // Also, continue checking where the found term ends.
    if (matchFound) {
      formattedArr.push({ text: matchFound.value, isMatch: true });
      index += matchFound.value.length;
      continue;
    }

    // If not a match, either add new not match or append if the last item in the array is not a match as well
    if (
      formattedArr.length === 0 ||
      formattedArr[formattedArr.length - 1].isMatch
    ) {
      formattedArr.push({ text: string[index], isMatch: false });
    } else {
      formattedArr[formattedArr.length - 1].text += string[index];
    }
    // Increase index to check for the next value
    index += 1;
  }

  // loop through the array and decorate text with which has a match
  return formattedArr.map((value, i) =>
    value.isMatch ? (
      <Match key={i}>{value.text}</Match>
    ) : (
      <span key={i}>{value.text}</span>
    )
  );
};

function SearchItem(props) {
  const {
    first_name,
    last_name,
    title,
    image,
    searchTerms,
    id,
    competenceCategories,
    competences,
  } = props;

  const languages = useGetCompetencesByCategory(
    { competences },
    competenceCategories,
    'coding languages'
  );
  const keywords = useGetCompetencesByCategory(
    { competences },
    competenceCategories,
    'keywords'
  );

  const renderLanguages = useMemo(() => {
    const languagesNamesString = languages
      .map((key) => key.name.trim())
      .join(', ');
    return highlightMatchedText(languagesNamesString, searchTerms);
  }, [languages, searchTerms]);

  const renderKeywords = useMemo(() => {
    const keywordsNamesString = keywords
      .map((key) => key.name.trim())
      .join(', ');
    return highlightMatchedText(keywordsNamesString, searchTerms);
  }, [keywords, searchTerms]);

  return (
    <div>
      <Header>
        <StyledAvatar
          alt="Profile Picture"
          src={
            image &&
            `${process.env.REACT_APP_BACKEND_HOST}${image.formats.thumbnail.url}`
          }
          data-testid="avatar"
        />
        <div>
          <InfoName variant="body1">
            {highlightMatchedText(`${first_name} ${last_name}`, searchTerms)}
          </InfoName>
          <InfoTitle variant="body1">
            {title && highlightMatchedText(title, searchTerms)}
          </InfoTitle>
        </div>
        <ProfileLink to={`/profile/${id}`}>Profile</ProfileLink>
      </Header>
      <Body>
        {renderLanguages.length > 1 && (
          <Typography variant="body2">
            <strong>Language proficiencies:</strong> {renderLanguages}
          </Typography>
        )}
        {renderKeywords.length > 1 && (
          <Typography variant="body2">
            <strong>Keywords:</strong> {renderKeywords}
          </Typography>
        )}
      </Body>
    </div>
  );
}

SearchItem.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.any,
  searchTerms: PropTypes.array,
  id: PropTypes.number,
  competenceCategories: PropTypes.array,
  competences: PropTypes.array,
};

export default SearchItem;
