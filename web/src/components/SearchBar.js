import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import PropTypes from "prop-types";
import TextField from "../components/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/system";

const Wrapper = styled("form")(`
  display: flex;
  align-items: start;
`);

const InputWrapper = styled("div")({
  flexGrow: 1,
});

const StyledButton = styled(Button)(`
  margin-left: 16px;
  margin-top: 4px;
  height: 56px;
`);

const StyledIcon = styled(ArrowForwardIosIcon)(`
  color: #fff;
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
    if (queryValue) {
      setQuery(queryValue);
      onSubmit(queryValue.split(",").map((s) => s.trim()));
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
      <InputWrapper>
        <TextField
          required
          aria-label="search-input"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="e.g. John, fullstack, CSS, iOS"
        />
        <Typography
          variant="caption"
          color="white"
          sx={{ whiteSpace: "nowrap" }}
        >
          Separate search terms with a comma (,)
        </Typography>
      </InputWrapper>
      <StyledButton
        aria-label="search"
        type="submit"
        variant="contained"
        color="primary"
      >
        <StyledIcon />
      </StyledButton>
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
