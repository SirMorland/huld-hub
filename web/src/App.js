import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import HistoryList from "./components/HistoryList/HistoryList";
import NavBar from "./components/NavBar/NavBar";

const workHistory = {
  title: "Work History",
  historyItems: [
    {
      id: 1,
      organisation: "Huld",
      title: "Fullstack Developer",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      organisation: "Huld",
      title: "Fullstack Developer",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      organisation: "Huld",
      title: "Fullstack Developer",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
};

const educationHistory = {
  title: "Education History",
  historyItems: [
    {
      id: 1,
      organisation: "Air Force",
      title: "Bachelor's degree",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      organisation: "Air Force",
      title: "Bachelor's degree",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      organisation: "Air Force",
      title: "Bachelor's degree",
      startDate: "20.10.2020",
      endDate: "10.11.2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedIn role="admin" />
      <HistoryList title={workHistory.title} historyList={workHistory.historyItems} />
      <HistoryList title={educationHistory.title} historyList={educationHistory.historyItems} />
    </ThemeProvider>
  );
}

export default App;
