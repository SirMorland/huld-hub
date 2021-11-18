import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/system";
import { UserContext } from "../App";

const Wrapper = styled("div")(`
    display: flex;
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
      <TextField value={searchValue} onChange={(e) => { setQuery(e.target.value); }} fullWidth placeholder="Front-end,HTML,CSS"/>
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
