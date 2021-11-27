import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import ActionButtonContainer from "../components/ActionButtonContainer";
import useEmailDomain from "../hooks/useEmailDomai";
import CompetenceEdit from "../components/CompetenceEdit/CompetenceEdit";
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

const COMPETENCE_TYPE = {
  languages: {
    serverName: "coding languages",
    clientName: "languages proficiencies",
  },
  keywords: "keywords",
};

function AdminPage() {
  const emailDomain = useEmailDomain();

  const { jwt } = useUserContext();

  const allLanguages = useCompetences(
    COMPETENCE_TYPE.languages.serverName,
    jwt
  );
  const allKeywords = useCompetences(COMPETENCE_TYPE.keywords, jwt);

  const [languages, setLanguages] = useState(allLanguages || []);
  const [keywords, setKeywords] = useState(allKeywords || []);

  useEffect(() => {
    setKeywords(allKeywords);
  }, [allKeywords]);

  useEffect(() => {
    setLanguages(allLanguages);
  }, [allLanguages]);

  const onLanguageAdd = (newLanguage) => {
    console.log(newLanguage);
    // TODO: send POST request to server
    setLanguages((prevLanguages) => [...prevLanguages, newLanguage]);
  };

  const onKeywordRemove = (index) => {
    const item = keywords.find((_, i) => i === index);
    console.log(item);
    // TODO: send DELETE request to server
    setKeywords((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const onKeywordAdd = (newKeyword) => {
    console.log(newKeyword);
    // TODO: send POST request to server
    setKeywords((prevKeywords) => [...prevKeywords, newKeyword]);
  };

  const onLanguageRemove = (index) => {
    const item = languages.find((_, i) => i === index);
    console.log(item);
    // TODO: send DELETE request to server
    setLanguages((prevItems) => prevItems.filter((_, i) => i !== index));
  };

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
        <CompetenceEdit
          type={COMPETENCE_TYPE.languages.clientName}
          onRemove={onLanguageRemove}
          onAdd={onLanguageAdd}
          items={languages}
        />
      </Languages>
      <Keywords>
        <CompetenceEdit
          type={COMPETENCE_TYPE.keywords}
          onRemove={onKeywordRemove}
          onAdd={onKeywordAdd}
          items={keywords}
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
