import React, { useState } from "react";
import { useRouteMatch } from "react-router";

import useProfile from "../../hooks/useProfile";
import useCompetences from "../../hooks/useCompetences";
import useHistoryList from "../../hooks/useHistoryList";
import useCompetenceCategories from "../../hooks/useCompetenceCategories";
import { formatProfileForSave } from "../../utils";
import { postProfile, uploadPicture } from "../../api";

import ProfilePageEdit from "./ProfilePageEdit";
import ProfilePageView from "./ProfilePageView";

import { useUserContext } from "../../userContext";
import useGetCompetencesByCategory from "../../hooks/useGetCompetencesByCategory";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";

function ProfilePage() {
  let match = useRouteMatch();
  const profileId = match.params.profileId;

  const { jwt, user } = useUserContext();

  // user can edit the profile is the current user is the profile owner or if the user is an admin
  const canEdit = user 
    && (parseInt(profileId) === parseInt(user.profile) || user.role.type === "admin");

  const [profile, setProfile] = useProfile(profileId, jwt);

  const allLanguages = useCompetences("coding languages", jwt);
  const allKeywords = useCompetences("keywords", jwt);
  const competenceCategories = useCompetenceCategories(jwt);

  const [edit, setEdit] = useState(false);

  const onSaveClick = async (profile) => {
    if (canEdit) {
      // if profile.file exists, we need to upload the picture and set the new image to the new media id
      if (profile.file) {
        const [newPic] = await uploadPicture(profile.file, jwt);
        profile.image = newPic.id;
      }
      const profileToBeSaved = formatProfileForSave(profile);
      const newProfile = await postProfile(profileToBeSaved, jwt);
      setProfile(newProfile);
    }
    setEdit(false);
  };

  const languages = useGetCompetencesByCategory(
    profile,
    competenceCategories,
    "coding languages"
  );
  const keywords = useGetCompetencesByCategory(
    profile,
    competenceCategories,
    "keywords"
  );

  const educationHistory = useHistoryList(profile, HISTORY_TYPE.education);
  const workHistory = useHistoryList(profile, HISTORY_TYPE.work);

  if (profile === false) {
    // TODO: render actual 404 page
    return <h1>404</h1>;
  }

  const profileProps = {
    ...profile,
    languages,
    keywords,
    educationHistory,
    workHistory,
  };

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
      <ProfilePageView
        profile={profileProps}
        onEditClick={() => setEdit(true)}
        canEdit={canEdit}
      />
    );
  }
}

export default ProfilePage;
