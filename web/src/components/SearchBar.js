import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/system";

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

const SearchBar = () => {
  const [state , setState ] = useState();
  const onInputChange = (event) => {
    const  searchKey = event.target.value.split(","); 
    setState(searchKey);
  }
  const onSearch = () => {
    console.log(state);
  };

  return (
    <Wrapper>
      <TextField onChange={onInputChange} fullWidth id="search_keyword" type="text" label="" name="search_keyword" />
      <StyledIconButton aria-label="search" onClick={() => { onSearch(); }} >
        <StyledIcon />
      </StyledIconButton>
    </Wrapper>
  );
};

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;
