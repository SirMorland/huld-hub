import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const queryKey = "search";

const SearchBar = ({ onSubmit }) => {
  const params = useQuery();
  const history = useHistory();
  const [query, setQuery] = React.useState("");

  useEffect(() => {
    const queryValue = params.get(queryKey);
    if(queryValue){
      setQuery(queryValue)
      onSubmit(queryValue.split(",").map((s) => s.trim()))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e) => {
    e && e.preventDefault();
    const params = new URLSearchParams();
    params.append(queryKey, query);
    history.push({ search: params.toString() });
    const keywords = query.split(",").map((s) => s.trim());
    onSubmit(keywords);
  };
  return (
    <Wrapper onSubmit={submit}>
      <TextField
        required
        aria-label="search-input"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        placeholder="e.g. name, languages, keywords, title"
      />
      <StyledIconButton aria-label="search" type="submit">
        <StyledIcon />
      </StyledIconButton>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

SearchBar.defaultProps = {
  onSubmit: () => {},
};

export default SearchBar;
