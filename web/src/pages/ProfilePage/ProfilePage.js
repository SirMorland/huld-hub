import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import Cookies from "js-cookie";

import useProfile from "../../hooks/useProfile";
import useCompetenceCategories from "../../hooks/useCompetenceCategories";

import ProfilePageEdit from "./ProfilePageEdit";
import ProfilePageView from "./ProfilePageView";

import { UserContext } from "../../App";
import { getCompetencesWithCategoryNames } from "../../utils";


function ProfilePage({ id, onSave }) {
  let history = useHistory();
  let match = useRouteMatch();

  const { jwt } = useContext(UserContext);

  const [profile, setProfile] = useProfile(id || match.params.id, jwt);
  const competenceCategories = useCompetenceCategories();
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

  const {languages, keywords} = useMemo(()=>{
    if (profile && profile.competences) {
      const competences = getCompetencesWithCategoryNames(competenceCategories, profile.competences);
      return {
        languages: competences.filter(competence => competence.category_name === "coding languages"),
        keywords: competences.filter(competence => competence.category_name === "keywords"),
      }
    } 
    return {languages: [], keywords: []};
  }, [competenceCategories, profile]);

  if (profile === false) {
    // TODO: render actual 404 page
    return <h1>404</h1>;
  }

  const profileProps = {...profile, languages, keywords};

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
