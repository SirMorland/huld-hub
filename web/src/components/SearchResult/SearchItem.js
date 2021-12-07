import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import useGetCompetencesByCategory from "../../hooks/useGetCompetencesByCategory";

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
  textDecoration: "none",
  marginLeft: "auto",
}));

const Match = styled("span")({
  fontWeight: "bold",
  color: "blue",
});

const Body = styled("div")({
  marginTop: "8px",
});

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
});

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
    "coding languages"
  );
  const keywords = useGetCompetencesByCategory(
    { competences },
    competenceCategories,
    "keywords"
  );

  const searchTermsLowerCase = searchTerms.join(",").toLowerCase();

  const match = useCallback(
    (data = [], delimeter = " ", hasMatch = false) => {
      const render = data.map((word, i, { length }) => {
        if (searchTermsLowerCase.includes(word.toLowerCase())) {
          hasMatch = true;
          return (
            <Match key={i}>
              {word}
              {i < length - 1 ? delimeter : ""}
            </Match>
          );
        }
        return (
          <span key={i}>
            {word}
            {i < length - 1 ? delimeter : ""}
          </span>
        );
      });

      return { render, hasMatch };
    },
    [searchTermsLowerCase]
  );

  const renderLanguages = useMemo(
    () =>
      match(
        languages.map((language) => language.name.trim()),
        ", "
      ),
    [languages, match]
  );

  const renderKeywords = useMemo(
    () =>
      match(
        keywords.map((key) => key.name.trim()),
        ", "
      ),
    [keywords, match]
  );

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
            {match(first_name?.split(" "), " ").render}{" "}
            {match(last_name?.split(" "), " ").render}
          </InfoName>
          <InfoTitle variant="body1">
            {match(title?.split(" "), " ").render}
          </InfoTitle>
        </div>
        <ProfileLink to={`/profile/${id}`}>Profile</ProfileLink>
      </Header>
      <Body>
        {renderLanguages.hasMatch && (
          <Typography variant="body2">
            <strong>Language proficiencies:</strong> {renderLanguages.render}
          </Typography>
        )}
        {renderKeywords.hasMatch && (
          <Typography variant="body2">
            <strong>Keywords:</strong> {renderKeywords.render}
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
