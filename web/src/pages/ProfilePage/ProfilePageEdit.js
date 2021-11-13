import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { styled } from "@mui/system";

import Page from '../../components/Page/Page';
import ActionButtonContainer from "../../components/ActionButtonContainer";
import UserBasicInfoEdit from "../../components/UserBasicInfoEdit";

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

function ProfilePageEdit({ profile, onSaveClick, onCancelClick }) {
  const [edited, setEdited] = useState(profile);

  const onSave = async () => {
    await onSaveClick(edited);
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
      </Languages>
      <Keywords>
        <h2>Keywords</h2>
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
