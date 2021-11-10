import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { styled } from "@mui/system";

import Page from '../../components/Page/Page';
import ActionButtonContainer from "../../components/ActionButtonContainer";
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
const ContactInfo = styled(Grid)`
  @media (min-width: 768px) {
    grid-column-start: 2;
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

  console.log(edited);
  const onSave = async () => {
    await onSaveClick(edited);
  }
  console.log(edited);

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
        <DoubleFieldContainer>
          <TextField
            required
            fullWidth
            id="first_name"
            type="text"
            label="First name"
            name="first_name"
            value={edited.first_name}
            onChange={e => setEdited(prev => ({...prev, first_name: e.target.value}))}
          />
          <TextField
            required
            fullWidth
            id="last_name"
            type="text"
            label="Last name"
            name="last_name"
            value={edited.last_name}
            onChange={e => setEdited(prev => ({...prev, last_name: e.target.value}))}
          />
        </DoubleFieldContainer>
        <TextField
          required
          fullWidth
          id="title"
          type="text"
          label="Title"
          name="title"
          value={edited.title}
          onChange={e => setEdited(prev => ({...prev, title: e.target.value}))}
        />
      </BasicInfo>

      <ContactInfo>
        <DoubleFieldContainer>
          <TextField
            required
            fullWidth
            id="email"
            type="email"
            label="Email"
            name="email"
            value={edited.email || ''}
            onChange={e => setEdited(prev => ({...prev, email: e.target.value}))}
            />
          <div />
        </DoubleFieldContainer>
      </ContactInfo>

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
