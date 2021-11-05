import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import Cookies from 'js-cookie';

import { styled } from '@mui/system';

import Page from '../components/Page/Page';
import ItemList from "../components/ItemList";
import { NotFoundError, UnauthorizedError } from '../api';

const h2 = {
  margin: 0
};
const h3 = {
  margin: 0,
  marginTop: 16

};
const p = {
  margin: 0
};

const Skills = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Languages = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Keywords = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Bio = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Work = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 2;
  }
`;
const Education = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
  }
`;

function ProfilePage({ id, getProfile, getCompetenceCategories }) {
  let history = useHistory();
  let match = useRouteMatch();

  let [profile, setProfile] = useState(null);
  let [competenceCategories, setCompetenceCategories] = useState(null);

  useEffect(() => {
    let jwt = Cookies.get("hub-jwt");

    let fetchProfile = async id => {
      try {
        const json = await getProfile(id, jwt);
        setProfile(json);
      } catch(error) {
        switch(true) {
          case error instanceof NotFoundError:
            setProfile(false);
            break;
          case error instanceof UnauthorizedError:  //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done");           //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    }

    let fetchCompetenceCategory = async () => {
      try {
        const json = await getCompetenceCategories(jwt);
        setCompetenceCategories(json);
      } catch(error) {
        switch(true) {
          case error instanceof NotFoundError:
            setCompetenceCategories(false);
            break;
          case error instanceof UnauthorizedError:  //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done");           //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    }

    if(!jwt) {
      history.push("/");
    } else {
      fetchProfile(id || match.params.id);
      fetchCompetenceCategory();
    }
  }, [id, match.params.id, history, getProfile, getCompetenceCategories]);

  if(profile === false) {
    // TODO: render actual 404 page
    return (
      <h1>404</h1>
    )
  }

  const getCompetencesWithCategoryNames = (categories, competences) => {
    return competences.map(competence => {
      const category = categories.find(category => category.id === competence.category);
      return {
        ...competence,
        category_name: category.name,
      }
    });
  }
  let competences = null;
  if(competenceCategories && profile != null && profile.competences !== null){
    competences = getCompetencesWithCategoryNames(competenceCategories, profile.competences);
  }
  
  return (
    <Page header={
      profile &&
      <React.Fragment>
        <h1 style={{margin: 0, color: 'white'}}>{profile.first_name} {profile.last_name}</h1>
        <h2 style={{margin: 0, color: 'white'}}>{profile.title}</h2>
      </React.Fragment>
    }>
      <Skills>
        <h2 style={h2}>Skills</h2>
        <p style={p}>Skill 1</p>
        <p style={p}>Skill 2</p>
        <p style={p}>Skill 3</p>
      </Skills>
      <Languages>
      {competences !== null && <ItemList title="Language proficiencies" items={competences.filter(a => a.category_name === "coding languages")} /> }
      </Languages>
      <Keywords>
        {competences !== null && <ItemList List title="Keywords" items={competences.filter(a => a.category_name === "keywords")} />}
      </Keywords>
      <Bio>
        <h2 style={h2}>Bio</h2>
        <p style={p}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </Bio>

      <Work>
        <h2 style={h2}>Work History</h2>
        <h3 style={h3}>Cleaner</h3>
        <p style={p}>I cleaned</p>
      </Work>
      
      <Education>
        <h2 style={h2}>Education History</h2>
        <h3 style={h3}>Daycare</h3>
        <p style={p}>I studied vector algebra</p>
      </Education>
    </Page>
  );
}

export default ProfilePage;
