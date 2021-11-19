import { useContext, useState } from "react";
import { styled } from "@mui/system";
import Page from "../components/Page/Page";
import SearchBar from "../components/SearchBar";
import SearchItems from "../components/SearchResult/SearchItems";
import useCompetenceCategories from "../hooks/useCompetenceCategories";

import { UserContext } from "../App";

const HeaderContentContainer = styled("div")`
  max-width: 576px;
  margin: auto;
`;

function SearchPage({ search }) {
  const { jwt } = useContext(UserContext);
  

  const [keywords, setKeywords] = useState([]);
  const [results, setResults] = useState(null);
  const competenceCategories = useCompetenceCategories(jwt);

  // useEffect(() => {
  //   if(params.search)
  //   return () => {
  //     cleanup
  //   }
  // }, [input])


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
      {/* TO:DO replace with nice looking search results */}
      <div>
        {results ? (
          results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <p>
                    {result.first_name} {result.last_name}
                  </p>
                  <p>{result.title}</p>
                  <p>{result.bio}</p>
                  <p>{result.skills}</p>
                  <p>
                    {result.competences.map((competence) => (
                      <span key={competence.id}>{competence.name}, </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results</p>
          )
        ) : (
          <p>Start by searching something...</p>
        )}
      </div>
      <SearchItems results={results} searchTerms={keywords} competenceCategories={competenceCategories} />
    </Page>
  );
}

export default SearchPage;
