import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { styled } from "@mui/system";

import Page from '../../components/Page/Page';
import ActionButtonContainer from "../../components/ActionButtonContainer";
import UserBasicInfoEdit from "../../components/UserBasicInfoEdit";
import { DoubleFieldContainer } from "../../components/GenericComponents";
import SelectInputField from "../../components/SelectAutocompleteField";

const Grid = styled('div')`
  display: grid;
  gap: 16px;
`;

const BasicInfo = styled(Grid)`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Skills = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
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
    grid-column-start: 1;
  }
`;
const Keywords = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Bio = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Work = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 2;
    grid-row: span 4;
  }
`;
const Education = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
    grid-row: span 4;
  }
`;

function ProfilePageEdit({ profile, onSaveClick, onCancelClick, allLanguages, allKeywords }) {
  const [edited, setEdited] = useState(profile);

  const onSave = () => {
    const competences = [...edited.keywords, ...edited.languages];
    onSaveClick({...edited, competences});
  }

  // filter languages that are not already in edited.languages by name
  const languagesToAdd = allLanguages.filter(language => !edited.languages.some(editedLanguage => editedLanguage.name === language.name));
  // filter keywords that are not already in edited.keywords by name
  const keywordsToAdd = allKeywords.filter(keyword => !edited.keywords.some(editedKeyword => editedKeyword.name === keyword.name));

  const onLanguageAdd = (language) => {
    setEdited({
      ...edited,
      languages: [...edited.languages, language]
    });
  }

  const onKeywordAdd = (keyword) => {
    setEdited({
      ...edited,
      keywords: [...edited.keywords, keyword]
    });
  }

  return (
    <Page>
      <BasicInfo>
        <UserBasicInfoEdit edited={edited} setEdited={setEdited}></UserBasicInfoEdit>
      </BasicInfo>

      <Skills>
        <h2>Skills</h2>
      </Skills>
      <Languages>
        <h2>Language proficiencies</h2>
        {/* TODO: create a listing component so items can be removed */}
        {edited.languages.map(language => (<p>{language.name}</p>))}
        <SelectInputField options={languagesToAdd} onSelect={onLanguageAdd} label="Pick new language proficiency"/>
      </Languages>
      <Keywords>
        <h2>Keywords</h2>
        {/* TODO: create a listing component so items can be removed */}
        {edited.keywords.map(keyword => (<p>{keyword.name}</p>))}
        <SelectInputField options={keywordsToAdd} onSelect={onKeywordAdd} label="Pick new keyword"/>
      </Keywords>
      <Bio>
        <h2>Bio</h2>
      </Bio>

      <Work>
        <h2>Work History</h2>
      </Work>

      <Education>
        <h2>Education History</h2>
      </Education>

      <ActionButtonContainer>
        <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={onSave}
          >
            Save
          </Button>
          <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={onCancelClick}
          >
            Cancel
          </Button>
      </ActionButtonContainer>
    </Page>
  );
}

export default ProfilePageEdit;
