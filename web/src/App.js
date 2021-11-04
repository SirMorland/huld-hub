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
  const getCompetencesWithCategoryNames = (categories, competences) => {
    return competences.map(competence => {
      const category = categories.find(category => category.id === competence.category);
      return {
        ...competence,
        category_name: category.name,
      }
    });
  }
  
  const competences = getCompetencesWithCategoryNames(categoryList, competenceList);
  
  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedIn role="admin" />
      <ItemList title="Language proficiencies" items={competences.filter(a => a.category_name === "coding languages")} />
      <ItemList title="Keywords" items={competences.filter(a => a.category_name === "keywords")} />
    </ThemeProvider>
  );
}

export default App;
