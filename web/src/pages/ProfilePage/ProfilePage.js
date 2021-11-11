import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import Cookies from "js-cookie";

import useProfile from "../../hooks/useProfile";

import ProfilePageEdit from "./ProfilePageEdit";
import ProfilePageView from "./ProfilePageView";

import { UserContext } from "../../App";
import useSkills from "../../hooks/useSkills";
import useHistoryList from "../../hooks/useHistoryList";

const HISTORY_TYPE = {
  education: "education",
  work: "work",
};

function ProfilePage({ id, onSave }) {
  let history = useHistory();
  let match = useRouteMatch();

  const { jwt } = useContext(UserContext);

  const [profile, setProfile] = useProfile(id || match.params.id, jwt);
  const [edit, setEdit] = useState(false);

  const onSaveClick = async (profile) => {
    setProfile(profile);
    await onSave(profile, jwt);
    setEdit(false);
  }
  
  useEffect(() => {
    let jwt = Cookies.get("hub-jwt");
    if (!jwt) {
      history.push("/");
    } 
  }, [history]);

  const {languages, keywords} = useSkills(profile, jwt);
  const educationHistory = useHistoryList(profile, HISTORY_TYPE.education);
  const workHistory = useHistoryList(profile, HISTORY_TYPE.work);

  if (profile === false) {
    // TODO: render actual 404 page
    return <h1>404</h1>;
  }

  

  const profileProps = {...profile, languages, keywords, educationHistory, workHistory};

  if(edit) {
    return (
      <ProfilePageEdit profile={profileProps} onSaveClick={onSaveClick} onCancelClick={() => setEdit(false)} />
    );
  } else {
    return (
      <ProfilePageView profile={profileProps} onEditClick={() => setEdit(true)} />
    );
  }
}

export default ProfilePage;
