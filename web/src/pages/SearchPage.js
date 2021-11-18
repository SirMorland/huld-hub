import { useContext, useState } from "react";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import SearchBar from "../components/SearchBar";

import { UserContext } from "../App";

const HeaderContentContainer = styled('form')`
  max-width: 576px;
  margin: auto;
`;

function SearchPage({ onSearch }) {
  const { jwt } = useContext(UserContext);

  let [query, setQuery] = useState([]);
  let [results, setResults] = useState(null);
 

  const search = async event => {
    event.preventDefault();
    console.log(query);
    let results = await onSearch(query, jwt);
    // splitting query into keyword array
    
    
    //TO:DO check for errors, i.e., not authenticated or authorized
    setResults(results);
  }

  return (
    <Page header={
      <HeaderContentContainer onSubmit={search} >
        <SearchBar searchValue={query} setQuery={setQuery} onSearch={search}/>
      </HeaderContentContainer>
    }>
      {/* TO:DO replace with nice looking search results */}
      <div>
        {results ?
          (results.length > 0 ?
            <ul>
              {results.map(result =>
                <li key={result.id}>
                  <p>{result.first_name} {result.last_name}</p>
                  <p>{result.title}</p>
                  <p>{result.bio}</p>
                  <p>{result.skills}</p>
                  <p>
                  {result.competences.map(competence => <span key={competence.id}>{competence.name}, </span>)}
                  </p>
                </li>
              )}
            </ul>
          :
            <p>No results</p>
          )
        :
          <p>Start by searching something...</p>
        }
      </div>
    </Page>
  );
}

export default SearchPage;
