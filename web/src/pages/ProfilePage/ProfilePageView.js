import React from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/system";

import Page from "../../components/Page/Page";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import HistoryListView from "../../components/HistoryList/HistoryListView";
import ItemListView from "../../components/ItemListView";
import Title from "../../components/Title/Title";
import UserContactinfo from "../../components/UserContactinfo";
import ActionButtonContainer from "../../components/ActionButtonContainer";

const HeaderContentContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Skills = styled("div")`
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
    grid-row: span 5;
  }
`;
const Education = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
    grid-row: span 5;
  }
`;

function ProfilePageView({ profile, onEditClick, isMyPage }) {
  const { languages, keywords, educationHistory, workHistory } = profile;

  return (
    <Page
      header={
        profile && (
          <HeaderContentContainer>
            <Title
              first_name={profile.first_name}
              last_name={profile.last_name}
              title={profile.title}
              image={
                profile.image &&
                `${process.env.REACT_APP_BACKEND_HOST}${profile.image.url}`
              }
            />
            <UserContactinfo {...profile}></UserContactinfo>
          </HeaderContentContainer>
        )
      }
    >
      <Skills>
        <ProfileInfo title="Skills" data={profile && profile.skills} />
      </Skills>
      <Languages>
        <ItemListView
          title="Language proficiencies"
          items={languages}
          noItemDescription="No Language Proficiencies Provided"
        />
      </Languages>
      <Keywords>
        <ItemListView
          List
          title="Keywords"
          items={keywords}
          noItemDescription="No Keywords Provided"
        />
      </Keywords>
      <Bio>
        <ProfileInfo title="Bio" data={profile && profile.bio} />
      </Bio>

      <Work>
        <HistoryListView
          title={workHistory.title}
          historyItems={workHistory.historyItems}
          noItemDescription={workHistory.noItemDescription}
        />
      </Work>

      <Education>
        <HistoryListView
          title={educationHistory.title}
          historyItems={educationHistory.historyItems}
          noItemDescription={educationHistory.noItemDescription}
        />
      </Education>

      <ActionButtonContainer>
        {isMyPage && (
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="secondary"
            onClick={onEditClick}
          >
            Edit
          </Button>
        )}
      </ActionButtonContainer>
    </Page>
  );
}

export default ProfilePageView;
