import React from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import ActionButtonContainer from "../components/ActionButtonContainer";
import useEmailDomain from "../hooks/useEmailDomai";
import ItemListEdit from "../components/ItemListEdit";
import TextField from "../components/TextField";
import useCompetences from "../hooks/useCompetences";
import { useUserContext } from "../userContext";

const Admins = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Domains = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Languages = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 2;
    grid-row: span 3;
  }
`;
const Keywords = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
    grid-row: span 3;
  }
`;

function AdminPage() {
  const emailDomain = useEmailDomain();

  const { jwt } = useUserContext();

  const allLanguages = useCompetences("coding languages", jwt);
  const allKeywords = useCompetences("keywords", jwt);
  const [languages, setLanguages] = useCompetences([]);
  const [keywords, setKeywords] = useCompetences([]);

  console.log(allLanguages, allKeywords);
  const onLanguageAdd = (newLanguage) => {
    setLanguages({
      ...allLanguages,
      newLanguage,
    });
  };

  const onKeywordAdd = (newKeyword) => {
    setKeywords({
      ...allKeywords,
      newKeyword,
    });
  };

  const onKeywordRemove = (keywords) => {
    setKeywords(keywords);
  };

  const onLanguageRemove = (languages) => {
    setLanguages(languages);
  };
  console.log(languages, keywords);
  return (
    <Page>
      <Admins>
        <Typography variant="h2" colour="primary">
          Admins
        </Typography>
      </Admins>
      <Domains>
        <Typography variant="h2" colour="primary">
          Allowed email domain
        </Typography>
        <Typography variant="p" colour="primary">
          {emailDomain}
        </Typography>
      </Domains>
      <Languages>
        <Typography variant="h2" colour="primary">
          Language proficiencies
        </Typography>
        {languages && (
          <ItemListEdit items={languages} onRemove={onLanguageRemove} />
        )}
        <TextField
          required
          fullWidth
          id="language_add"
          type="text"
          label=""
          name="language"
          value=""
          onChange={(e) => {
            onLanguageAdd(e.target.value);
          }}
        />
      </Languages>
      <Keywords>
        <Typography variant="h2" colour="primary">
          Keywords
        </Typography>
        {keywords && (
          <ItemListEdit items={keywords} onRemove={onKeywordRemove} />
        )}
        <TextField
          required
          fullWidth
          id="keyword_add"
          type="text"
          label=""
          name="keyword"
          value=""
          onChange={(e) => {
            onKeywordAdd(e.target.value);
          }}
        />
      </Keywords>
      <ActionButtonContainer>
        <Button fullWidth variant="contained" type="submit" color="primary">
          Save
        </Button>
      </ActionButtonContainer>
    </Page>
  );
}

export default AdminPage;
