import React, { useCallback } from "react";
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
    (data = "", delimeter = "") => {
      const spitWords = data.split(delimeter);
      return spitWords.map((word, i, { length }) => {
        if (searchTermsLowerCase.includes(word.toLowerCase())) {
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
    },
    [searchTermsLowerCase]
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
            {match(first_name, " ")} {match(last_name, " ")}
          </InfoName>
          <InfoTitle variant="body1">{match(title, " ")}</InfoTitle>
        </div>
        <ProfileLink to={`/profile/${id}`}>Profile</ProfileLink>
      </Header>
      <Body>
        <Typography variant="body2">
          Language proficiencies:{" "}
          {match(languages.map((language) => language.name).join(", "), ", ")}
        </Typography>
        <Typography variant="body2">
          Keywords: {match(keywords.map((key) => key.name).join(", "), ", ")}
        </Typography>
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
