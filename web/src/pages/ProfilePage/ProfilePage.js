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
import { formatProfileForSave } from "../../utils";
import useGetCompetencesByCategory from "../../hooks/useGetCompetencesByCategory";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";

function ProfilePage({ id, onSave }) {
  let history = useHistory();
  let match = useRouteMatch();

  const { jwt } = useContext(UserContext);

  const [profile, setProfile] = useProfile(id || match.params.id, jwt);

  const allLanguages = useCompetences("coding languages", jwt);
  const allKeywords = useCompetences("keywords", jwt);
  const competenceCategories = useCompetenceCategories(jwt);

  const [edit, setEdit] = useState(false);
  const onSaveClick = async (profile) => {
    const profileToBeSaved = formatProfileForSave(profile);
    setProfile(await onSave(profileToBeSaved, jwt));
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

  const profileProps = {...profile, languages, keywords, educationHistory, workHistory};

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
