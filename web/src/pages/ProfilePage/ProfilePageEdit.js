import { Button } from "@mui/material";
import TextField from "../../components/TextField";
import React, { useState, useRef } from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

import Page from "../../components/Page/Page";
import ActionButtonContainer from "../../components/ActionButtonContainer";
import { CondensedGrid, Grid } from "../../components/GenericComponents";
import SelectInputField from "../../components/SelectAutocompleteField";
import HistoryListEdit from "../../components/HistoryList/HistoryListEdit";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";
import ProfilePicEdit from "../../components/ProfilePicEdit";
import ItemListEdit from "../../components/ItemListEdit";
import UserBasicInfoEdit from "../../components/UserBasicInfoEdit";
import UserContactInfoEdit from "../../components/UserContactInfoEdit"

const BasicInfo = styled(Grid)`
  align-content: flex-end;

  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const ContactInfo = styled(Grid)`
  align-content: flex-end;

  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Skills = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Languages = styled(CondensedGrid)`
  align-content: space-between;

  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Keywords = styled(CondensedGrid)`
  align-content: space-between;

  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
    align-content: flex-start;
  }
`;
const Bio = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
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
    grid-row: span 6;
  }
`;
const Education = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
    grid-row: span 6;
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
  const profileImageRef = useRef();

  const [edited, setEdited] = useState(userProfile);
  const [profileBio, setProfileBio] = useState(edited.bio || "");
  const [newSkills, setnewSkills] = useState(edited.skills || "");

  const [basicInfo, setBasicInfo] = useState({
    first_name: edited.first_name || "",
    last_name: edited.last_name || "",
    title: edited.title || "",
    address: edited.address || "",
    phone: edited.phone || "",
    email: edited.email || "",
    slack: edited.slack || "",
    linkedin: edited.linkedin || "",
    github: edited.github || "",
  });

  const onSave = async (evt) => {
    evt.preventDefault();
    const education_histories = educationHistoryRef.current.getHistoryList();
    const work_experiences = workHistoryRef.current.getHistoryList();
    const file = profileImageRef.current.getFile();
    const competences = [...edited.keywords, ...edited.languages];
    const profile = {
      ...edited,
      ...basicInfo,
      competences,
      education_histories,
      work_experiences,
      bio: profileBio,
      skills: newSkills,
      file,
    };
    onSaveClick(profile);
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

  const onKeywordRemove = (itemToRemove) => {
    setEdited({
      ...edited,
      keywords: edited.keywords.filter((item) => item.id !== itemToRemove.id),
    });
  };

  const onLanguageRemove = (itemToRemove) => {
    setEdited({
      ...edited,
      languages: edited.languages.filter((item) => item.id !== itemToRemove.id),
    });
  };

  return (
    <form onSubmit={onSave}>
      <Page rows={6}>
        <BasicInfo>
          <ProfilePicEdit profileImage={edited.image} ref={profileImageRef} />
          <UserBasicInfoEdit
            basicInfo={basicInfo}
            setBasicInfo={setBasicInfo}
          ></UserBasicInfoEdit>
        </BasicInfo>
        <ContactInfo>
          <UserContactInfoEdit
            basicInfo={basicInfo}
            setBasicInfo={setBasicInfo}
          ></UserContactInfoEdit>
        </ContactInfo>

        <Bio>
          <Typography variant="h2">Bio</Typography>
          <TextField
            textarea
            required
            id="Profile_Info_Edit"
            type="text"
            placeholder="Few words about yourself"
            value={profileBio}
            onChange={(e) => setProfileBio(e.target.value)}
          />
        </Bio>
        <Skills>
          <Typography variant="h2">Skills</Typography>
          <TextField
            textarea
            required
            id="Profile_Skills_Edit"
            type="text"
            placeholder="Few skills about yourself"
            value={newSkills}
            onChange={(e) => setnewSkills(e.target.value)}
          />
        </Skills>

        <Languages>
          <CondensedGrid>
            <Typography variant="h2">Language proficiencies</Typography>
            <ItemListEdit items={edited.languages} onRemove={onLanguageRemove} />
          </CondensedGrid>
          <SelectInputField
            options={languagesToAdd}
            onSelect={onLanguageAdd}
            label="Pick new language proficiency"
          />
        </Languages>
        <Keywords>
          <CondensedGrid>
            <Typography variant="h2">Keywords</Typography>
            <ItemListEdit items={edited.keywords} onRemove={onKeywordRemove} />
          </CondensedGrid>
          <SelectInputField
            options={keywordsToAdd}
            onSelect={onKeywordAdd}
            label="Pick new keyword"
          />
        </Keywords>

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

        <ActionButtonContainer >
          <Button fullWidth variant="contained" type="submit" color="secondary" size="small">
            Save
          </Button>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="third"
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
