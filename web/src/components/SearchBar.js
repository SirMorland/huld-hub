import React from "react";
import PropTypes from "prop-types";
import TextField from "../components/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/system";

const Wrapper = styled("div")(`
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
`);

const SearchBar = ({ searchValue, setQuery, onSearch }) => {
  return (
    <Wrapper>
      <TextField value={searchValue} onChange={(e) => { setQuery(e.target.value.split(",")); }} placeholder="Ex: Front-end,HTML,CSS"/>
      <StyledIconButton  aria-label="search" onClick={(e) => { onSearch(e); }} >
        <StyledIcon />
      </StyledIconButton>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
