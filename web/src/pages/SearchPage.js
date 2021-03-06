import { useState } from "react";
import { styled } from "@mui/system";
import Page from "../components/Page/Page";
import { search } from "../api";
import SearchBar from "../components/SearchBar";
import SearchItems from "../components/SearchResult/SearchItems";
import useCompetenceCategories from "../hooks/useCompetenceCategories";

import { useUserContext } from "../userContext";

const HeaderContentContainer = styled("div")`
  max-width: 576px;
  margin: auto;
`;

function SearchPage() {
  const { jwt } = useUserContext();

  const [keywords, setKeywords] = useState([]);
  const [results, setResults] = useState(null);
  const competenceCategories = useCompetenceCategories(jwt);

  const onSearch = async (query) => {
    setKeywords(query);
    if (query.length !== 0) {
      const profiles = await search(query, jwt);
      setResults(profiles);
    }
  };

  return (
    <Page
      header={
        <HeaderContentContainer>
          <SearchBar onSubmit={onSearch} />
        </HeaderContentContainer>
      }
    >
      <SearchItems
        results={results}
        searchTerms={keywords}
        competenceCategories={competenceCategories}
      />
    </Page>
  );
}

export default SearchPage;
