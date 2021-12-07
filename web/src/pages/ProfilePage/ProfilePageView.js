import React from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from "react-router-dom";

import Page from '../../components/Page/Page';
import PrintPage from '../../components/Page/PrintPage';
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import HistoryListView from "../../components/HistoryList/HistoryListView";
import ItemListView from "../../components/ItemListView";
import Title from "../../components/Title/Title";
import UserContactinfo from "../../components/UserContactinfo";
import ActionButtonContainer from "../../components/ActionButtonContainer";
import { deleteUserProfile } from "../../api";


const HeaderContentContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media print{
    display: none;
  }
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

function Print() {
  window.print();
}

function ProfilePageView({ profile, onEditClick, canEdit, loading, canDelete, jwt }) {
  const { languages, keywords, educationHistory, workHistory } = profile;

  const [open, setOpen] = React.useState(false);
  const history = useHistory();
 
  const handleDelete = async () => {
    if (!canDelete)
      return;
    
    try {
      const json = await deleteUserProfile(profile.id, jwt);
      if (json){
        console.log("user deleted");
        history.push("/search");
      }
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Page
        loading={loading}
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
              <UserContactinfo profile={profile} iconSide={"right"}></UserContactinfo>
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
          {canEdit && (
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="secondary"
              onClick={onEditClick}
            >
              Edit
            </Button>)}
          {canEdit && (
            <Button fullWidth
              variant="contained"
              color="third"
              onClick={Print}
            >Print
            </Button>)}
          {canDelete && (
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="error"
              onClick={handleClickOpen}
            >
              Delete
            </Button>)}
        </ActionButtonContainer>
      </Page>
      <PrintPage {...profile}></PrintPage>
      {canDelete &&
					<Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete user"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText color="text" id="alert-dialog-description">
              Are you sure you wish to delete this account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus>Confirm</Button>
          </DialogActions>
        </Dialog>
				}
    </React.Fragment>
  );
}

export default ProfilePageView;
