import React from "react";
import { styled } from "@mui/system";

import Page from '../../components/Page/Page';
import HistoryList from "../../components/HistoryList/HistoryList";
import ItemList from "../../components/ItemList";
import UserContactinfo from '../../components/UserContactinfo';
import ActionButtonContainer from "../../components/ActionButtonContainer";
import { Button } from "@mui/material";


const h2 = {
  margin: 0,
};
const p = {
  margin: 0,
};

const HeaderLeft =  styled('div')`
  width: 50%;
  float: left;
`;

const HeaderRight =  styled('div')`
  width: 50%;
  float: left;
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

function ProfilePageView({ profile, onEditClick }) {
  const {languages, keywords, workHistory, educationHistory} = profile;

  return (
    <Page header={
      profile &&
      <React.Fragment>
        <HeaderLeft>
          <h1 style={{margin: 0, color: 'white'}}>{profile.first_name} {profile.last_name}</h1>
          <h2 style={{margin: 0, color: 'white'}}>{profile.title}</h2>
        </HeaderLeft>
        <HeaderRight>
          <UserContactinfo {...profile} ></UserContactinfo>
        </HeaderRight>
      </React.Fragment>
    }>
      <Skills>
        <h2 style={h2}>Skills</h2>
        <p style={p}>Skill 1</p>
        <p style={p}>Skill 2</p>
        <p style={p}>Skill 3</p>
      </Skills>
      <Languages>
        {languages.length > 0 && <ItemList title="Language proficiencies" items={languages} /> }
      </Languages>
      <Keywords>
        {keywords.length > 0 && <ItemList List title="Keywords" items={keywords} />}
      </Keywords>
      <Bio>
        <h2 style={h2}>Bio</h2>
        <p style={p}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </Bio>

      <Work>
        <HistoryList
          title={workHistory.title}
          historyItems={workHistory.historyItems}
          noItemDescription={workHistory.noItemDescription}
        />
      </Work>

      <Education>
        <HistoryList
          title={educationHistory.title}
          historyItems={educationHistory.historyItems}
          noItemDescription={educationHistory.noItemDescription}
        />
      </Education>
      
      <ActionButtonContainer>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onEditClick}
        >
          Edit
        </Button>
      </ActionButtonContainer>
    </Page>
  );
}

export default ProfilePageView;
