import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import ItemList from "./components/ItemList";
import NavBar from "./components/NavBar/NavBar";

function App() {
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
      "category": 4,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 11,
      "name": "Team leading",
      "description": null,
      "category": 4,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 12,
      "name": "UI/UX",
      "description": null,
      "category": 1,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 13,
      "name": "Embedded systems",
      "description": null,
      "category": 1,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    },
    {
      "id": 16,
      "name": "Mobile Development",
      "description": null,
      "category": 1,
      "created_at": "2021-10-29",
      "updated_at": "2021-10-29"
    }
  ];

  const groupCompetencesByCategories = (competences, categoryList) => {
    return categoryList.map(category => {
      return {
        id: category.id,
        title: category.name,
        competences: competences.filter(competence => competence.category === category.id)
      };
    });
  };
  const categories = groupCompetencesByCategories(competenceList, categoryList);

  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedIn role="admin" />
      {categories.map((category) => (
        category.competences.length !== 0 && <ItemList key={category.id} title={category.title} items={category.competences} />
      ))}
    </ThemeProvider>
  );
}

export default App;
