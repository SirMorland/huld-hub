import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import Cookies from "js-cookie";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import HistoryList from "../components/HistoryList/HistoryList";

import { NotFoundError, UnauthorizedError } from "../api";

const h2 = {
  margin: 0,
};
const p = {
  margin: 0,
};

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

function ProfilePage({ id, getProfile }) {
  let history = useHistory();
  let match = useRouteMatch();

  let [profile, setProfile] = useState(null);

  useEffect(() => {
    let jwt = Cookies.get("hub-jwt");

    let fetchProfile = async (id) => {
      try {
        const json = await getProfile(id, jwt);
        setProfile(json);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setProfile(false);
            break;
          case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    };

    if (!jwt) {
      history.push("/");
    } else {
      fetchProfile(id || match.params.id);
    }
  }, [id, match.params.id, history, getProfile]);

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

  if (profile === false) {
    // TODO: render actual 404 page
    return <h1>404</h1>;
  }

  return (
    <Page
      header={
        profile && (
          <React.Fragment>
            <h1 style={{ margin: 0, color: "white" }}>
              {profile.first_name} {profile.last_name}
            </h1>
            <h2 style={{ margin: 0, color: "white" }}>{profile.title}</h2>
          </React.Fragment>
        )
      }
    >
      <Skills>
        <h2 style={h2}>Skills</h2>
        <p style={p}>Skill 1</p>
        <p style={p}>Skill 2</p>
        <p style={p}>Skill 3</p>
      </Skills>
      <Languages>
        <h2 style={h2}>Languages</h2>
        <p style={p}>Language 1</p>
        <p style={p}>Language 2</p>
        <p style={p}>Language 3</p>
      </Languages>
      <Keywords>
        <h2 style={h2}>Keywords</h2>
        <p style={p}>Keyword 1</p>
        <p style={p}>Keyword 2</p>
        <p style={p}>Keyword 3</p>
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
