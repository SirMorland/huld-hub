import React, { useEffect, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router";
import Cookies from "js-cookie";
import { styled } from "@mui/system";

import Page from '../components/Page/Page';
import HistoryList from "../components/HistoryList/HistoryList";
import ItemList from "../components/ItemList";
import UserContactinfo from '../components/UserContactinfo';
import useProfile from "../hooks/useProfile";
import useCompetenceCategories from "../hooks/useCompetenceCategories";
import { getCompetencesWithCategoryNames } from "../utils";


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

const HISTORY_TYPE = {
  education: "Education",
  work: "Work",
};

/**
 * A function that produces the props for using HistoryList component
 *
 * @param {Array<object>} historyItems - Array of history items
 * @param {*} type - type of history items
 * @returns {object}
 */
const getHistoryProps = (historyItems = [], type) => {
  return {
    title: `${type} History`,
    noItemDescription: `No ${type} History Provided`,
    historyItems: historyItems.map((historyItem) => ({
      id: historyItem.id,
      organisation:
        historyItem[type === HISTORY_TYPE.education ? "school" : "company"],
      title:
        historyItem[type === HISTORY_TYPE.education ? "degree" : "position"],
      description: historyItem.description,
      start_date: historyItem.start_date,
      end_date: historyItem.end_date,
    })),
  };
};

function ProfilePage({ id }) {
  let history = useHistory();
  let match = useRouteMatch();
  const profile = useProfile(id || match.params.id);
  const competenceCategories = useCompetenceCategories();
  
  useEffect(() => {
    let jwt = Cookies.get("hub-jwt");
    if (!jwt) {
      history.push("/");
    } 
  }, [history]);

  const educationHistory = useMemo(
    () =>
      getHistoryProps(
        profile ? profile.education_histories : [],
        HISTORY_TYPE.education
      ),
    [profile]
  );

  const workHistory = useMemo(
    () =>
      getHistoryProps(
        profile ? profile.work_experiences : [],
        HISTORY_TYPE.work
      ),
    [profile]
  );

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
    </Page>
  );
}

export default ProfilePage;
