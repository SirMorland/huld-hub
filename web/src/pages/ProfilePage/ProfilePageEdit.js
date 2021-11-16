import { Button } from "@mui/material";
import React, { useState, useRef } from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

import Page from "../../components/Page/Page";
import ActionButtonContainer from "../../components/ActionButtonContainer";
import {  Grid } from "../../components/GenericComponents";
import SelectInputField from "../../components/SelectAutocompleteField";
import HistoryListEdit from "../../components/HistoryList/HistoryListEdit";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";
import ItemListEdit from "../../components/ItemListEdit";
import UserBasicInfoEdit from "../../components/UserBasicInfoEdit";

const BasicInfo = styled(Grid)`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
// const ContactInfo = styled(Grid)`
//   @media (min-width: 768px) {
//     grid-column-start: 2;
//   }
//   @media (min-width: 1152px) {
//     grid-column-start: 1;
//   }
// `;
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

function ProfilePageEdit({
  profile,
  onSaveClick,
  onCancelClick,
  allLanguages,
  allKeywords,
}) {
  const { educationHistory, workHistory, ...userProfile } = profile;
  const workHistoryRef = useRef();
  const educationHistoryRef = useRef();

  const [edited, setEdited] = useState(userProfile);

  const [basicInfo, setBasicInfo] = useState({
    first_name: edited.first_name, last_name: edited.last_name,
    title: edited.title, address: edited.address, phone: edited.phone,
    email: edited.email, slack: edited.slack, linkedin: edited.linkedin, github: edited.github
  });

  const onSave = (evt) => {
    evt.preventDefault();
    const education_histories = educationHistoryRef.current.getHistoryList();
    const work_experiences = workHistoryRef.current.getHistoryList();
    const competences = [...edited.keywords, ...edited.languages];
    onSaveClick({
      ...edited,
      ...basicInfo,
      competences,
      education_histories,
      work_experiences,
    });
  };

  // filter languages that are not already in edited.languages by name
  const languagesToAdd = allLanguages.filter(
    (language) =>
      !edited.languages.some(
        (editedLanguage) => editedLanguage.name === language.name
      )
  );
  // filter keywords that are not already in edited.keywords by name
  const keywordsToAdd = allKeywords.filter(
    (keyword) =>
      !edited.keywords.some(
        (editedKeyword) => editedKeyword.name === keyword.name
      )
  );

  const onLanguageAdd = (language) => {
    setEdited({
      ...edited,
      languages: [...edited.languages, language],
    });
  };

  const onKeywordAdd = (keyword) => {
    setEdited({
      ...edited,
      keywords: [...edited.keywords, keyword],
    });
  };

  const onKeywordRemove = (keywords) => {
    setEdited({
      ...edited,
      keywords,
    });
  }

  const onLanguageRemove = (languages) => {
    setEdited({
      ...edited,
      languages,
    });
  }

  return (
    <form onSubmit={onSave}>
      <Page>
        
        <BasicInfo>
            <UserBasicInfoEdit basicInfo={basicInfo} setBasicInfo={setBasicInfo} ></UserBasicInfoEdit>
        </BasicInfo>
        <Skills>
          <h2>Skills</h2>
        </Skills>
        <Languages>
          <Typography variant="h2">Language proficiencies</Typography>
          <ItemListEdit items={edited.languages} onRemove={onLanguageRemove} />
          <SelectInputField options={languagesToAdd} onSelect={onLanguageAdd} label="Pick new language proficiency" />
        </Languages>
        <Keywords>
          <Typography variant="h2">Keywords</Typography>
          <ItemListEdit items={edited.keywords} onRemove={onKeywordRemove} />
          <SelectInputField options={keywordsToAdd} onSelect={onKeywordAdd} label="Pick new keyword" />
        </Keywords>

        <Bio>
          <h2>Bio</h2>
        </Bio>

        <Work>
          <HistoryListEdit
            type={HISTORY_TYPE.work}
            historyItems={workHistory.historyItems}
            ref={workHistoryRef}
          />
        </Work>

        <Education>
          <HistoryListEdit
            type={HISTORY_TYPE.education}
            historyItems={educationHistory.historyItems}
            ref={educationHistoryRef}
          />
        </Education>

        <ActionButtonContainer>
          <Button fullWidth variant="contained" type="submit" color="primary">
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
    </form>
  );
}

export default ProfilePageEdit;
