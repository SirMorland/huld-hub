import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import HistoryList from "./components/HistoryList/HistoryList";
import NavBar from "./components/NavBar/NavBar";

const workHistory = {
  title: "Work History",
  noItemDescription: "No Work History Provided",
  historyItems: [
    {
      id: 1,
      organisation: "Huld",
      title: "Fullstack Developer",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      organisation: "Huld",
      title: "Fullstack Developer",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      organisation: "Huld",
      title: "Fullstack Developer",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
};

const educationHistory = {
  title: "Education History",
  noItemDescription: "No Education History Provided",
  historyItems: [
    {
      id: 1,
      organisation: "Air Force",
      title: "Bachelor's degree",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 2,
      organisation: "Air Force",
      title: "Bachelor's degree",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
    {
      id: 3,
      organisation: "Air Force",
      title: "Bachelor's degree",
      start_date: "2021-10-29T11:35:16.000Z",
      end_date: "2021-10-29T11:35:16.000Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
    },
  ],
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedIn role="admin" />
      <HistoryList title={workHistory.title} historyItems={workHistory.historyItems} noItemDescription={workHistory.noItemDescription}/>
      <HistoryList title={workHistory.title} noItemDescription={workHistory.noItemDescription}/>
      <HistoryList title={educationHistory.title} historyItems={educationHistory.historyItems} noItemDescription={educationHistory.noItemDescription} />
      <HistoryList title={educationHistory.title} noItemDescription={educationHistory.noItemDescription}/>
    </ThemeProvider>
  );
}

export default App;
