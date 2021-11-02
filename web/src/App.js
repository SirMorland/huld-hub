import React, { useState } from "react";
import EducationHistoryList from "./components/EducationHistoryList/EducationHistoryList";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  const [educationList] = useState([
    {
      id: 1,
      school: "Air Force",
      degree: "Bachelor's degree",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      school: "Air Force",
      degree: "Bachelor's degree",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },

    {
      id: 3,
      school: "Air Force",
      degree: "Bachelor's degree",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 4,
      school: "Air Force",
      degree: "Bachelor's degree",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <EducationHistoryList educationList={educationList}/>
    </ThemeProvider>
  );
}

export default App;
