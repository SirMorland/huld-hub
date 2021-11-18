import { useContext, useState } from "react";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import TextField from "../components/TextField";

import { UserContext } from "../App";

const HeaderContentContainer = styled('form')`
  max-width: 576px;
  margin: auto;
`;

function SearchPage({ onSearch }) {
  const { jwt } = useContext(UserContext);

  let [query, setQuery] = useState("");
  let [results, setResults] = useState(null);

  const search = async event => {
    event.preventDefault();

    let results = await onSearch(query, jwt);
    //TO:DO check for errors, i.e., not authenticated or authorized
    setResults(results);
  }

  return (
    <Page header={
      <HeaderContentContainer onSubmit={search} >
        {/* TO:DO replace with search bar component */}
        <TextField value={query} onChange={e => setQuery(e.target.value)} />
      </HeaderContentContainer>
    }>
      {/* TO:DO replace with nice looking search results */}
      <div>
        {results ?
          (results.length > 0 ?
            <ul>
              {results.map(result =>
                <li key={result.id}>{result.first_name} {result.last_name}</li>
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
