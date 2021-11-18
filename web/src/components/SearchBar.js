import React from "react";
import PropTypes from "prop-types";
import TextField from "../components/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/system";

const Wrapper = styled("form")(`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  align-items: center;
  gap: 16px;
`);

const StyledIcon = styled(ArrowForwardIosIcon)(`
  color: #fff;
`);

const StyledIconButton = styled(IconButton)(`
  background-color: #0047F2;
  border-radius: 0;
  width: 56px;
  height: 56px;
  cursor: pointer;
  &:hover, &:focus {
    background-color: #012c95;
  }
`);

const SearchBar = ({ keywords, setKeywords, onSubmit }) => {
  const [query, setQuery] = React.useState(keywords.join(", "));
  const onChange = (e) => {
    setQuery(e.target.value);
    setKeywords(e.target.value.split(",").map((s) => s.trim()));
  }
  return (
    <Wrapper onSubmit={onSubmit}>
      <TextField
        required
        aria-label="search-input"
        value={query}
        onChange={onChange}
        placeholder="Front-end, HTML, CSS" />
      <StyledIconButton aria-label="search" type="submit" >
        <StyledIcon />
      </StyledIconButton>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string),
  setKeywords: PropTypes.func,
  onSubmit: PropTypes.func,
};

SearchBar.defaultProps = {
  keywords: [],
  setKeywords: () => { },
  onSubmit: () => { },
}

export default SearchBar;
