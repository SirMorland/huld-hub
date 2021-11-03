import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Skills from "./components/Skills/Skills";
import CompetenceCategory from "./components/CompetenceCategory/CompetenceCategory";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const skills = 'Front-end development';
  const categoryList = [
    {
      "id": 1,
      "name": "coding languages",
      "description": null,
      "created_at": "2021-10-29T11:35:16.000Z",
      "updated_at": "2021-10-29T11:35:16.000Z"
    },
    {
      "id": 2,
      "name": "positions",
      "description": null,
      "created_at": "2021-10-29T11:35:16.000Z",
      "updated_at": "2021-10-29T11:35:16.000Z"
    },
    {
      "id": 3,
      "name": "skills",
      "description": null,
      "created_at": "2021-10-29T11:35:16.000Z",
      "updated_at": "2021-10-29T11:35:16.000Z"
    },
    {
      "id": 4,
      "name": "keywords",
      "description": null,
      "created_at": "2021-10-29T11:35:16.000Z",
      "updated_at": "2021-10-29T11:35:16.000Z"
    }
  ];

  const competenceList = [
    {
      "id": 10,
      "name": "Mobile development",
      "description": null,
      "category": 3,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 11,
      "name": "Team leading",
      "description": null,
      "category": 3,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 12,
      "name": "UI/UX",
      "description": null,
      "category": 3,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 13,
      "name": "Embedded systems",
      "description": null,
      "category": 3,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 16,
      "name": "Mobile Development",
      "description": null,
      "category": 2,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    }
  ];

  const groupCompetencesByCategories = (competences) => {
    const categories = {};
    competences.forEach((competence) => {
      if (!categories[competence.category]) {
        categories[competence.category] = [];
      }
      categories[competence.category].push(competence);
    });
    return categories;
  };
  const competences = groupCompetencesByCategories(competenceList);
  console.log(competences);
  
  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedIn role="admin" />
      <Skills skills={skills} />
      {/* <CompetenceCategory competenceCategoryList={competenceCategoryList}/> */}
    </ThemeProvider>
  );
}

export default App;
