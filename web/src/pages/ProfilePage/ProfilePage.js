import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import Cookies from "js-cookie";

import useProfile from "../../hooks/useProfile";
import useCompetences from "../../hooks/useCompetences";
import useHistoryList from "../../hooks/useHistoryList";
import useCompetenceCategories from "../../hooks/useCompetenceCategories";

import ProfilePageEdit from "./ProfilePageEdit";
import ProfilePageView from "./ProfilePageView";

import { UserContext } from "../../App";
import useGetCompetencesByCategory from "../../hooks/useGetCompetencesByCategory";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";
import { formatProfileForSave } from "../../utils";

function ProfilePage({ id, postProfile, uploadPicture }) {
  let history = useHistory();
  let match = useRouteMatch();

  const { jwt } = useContext(UserContext);

  const [profile, setProfile] = useProfile(id || match.params.id, jwt);

  const allLanguages = useCompetences("coding languages", jwt);
  const allKeywords = useCompetences("keywords", jwt);
  const competenceCategories = useCompetenceCategories(jwt);

  const [edit, setEdit] = useState(false);
  
  const onSaveClick = async (profile) => {
    // if profile.file exists, we need to upload the picture and set the new image to the new media id
    if (profile.file) {
      const [newPic] = await uploadPicture(profile.file, jwt);
      profile.image = newPic.id;
    }
    const profileToBeSaved = formatProfileForSave(profile);
    const newProfile = await postProfile(profileToBeSaved, jwt);
    setProfile(newProfile);
    setEdit(false);
  }

  useEffect(() => {
    let jwt = Cookies.get("hub-jwt");
    if (!jwt) {
      history.push("/");
    }
  }, [history]);

  const languages = useGetCompetencesByCategory(profile, competenceCategories, "coding languages");
  const keywords = useGetCompetencesByCategory(profile, competenceCategories, "keywords");

  const educationHistory = useHistoryList(profile, HISTORY_TYPE.education)
  const workHistory = useHistoryList(profile, HISTORY_TYPE.work)


  if (profile === false) {
    // TODO: render actual 404 page
    return <h1>404</h1>;
  }

  const profileProps = { ...profile, languages, keywords, educationHistory, workHistory };

  if (edit) {
    return (
      <ProfilePageEdit
        profile={profileProps}
        onSaveClick={onSaveClick}
        onCancelClick={() => setEdit(false)}
        allLanguages={allLanguages}
        allKeywords={allKeywords}
      />
    );
  } else {
    return (
      <ProfilePageView profile={profileProps} onEditClick={() => setEdit(true)} />
    );
  }
}

export default ProfilePage;
