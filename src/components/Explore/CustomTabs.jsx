import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

import { useSelector } from "react-redux"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const CustomTabs = ({ tabValue, handleChangeTabValue }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{
            "& .MuiTabs-indicator": {
              marginLeft: "4.3%",
              height: "4px",
              borderRadius: "999px",
              maxWidth: 70,
              width: "100%",
              backgroundColor: "#1d9bf0",
            },
          }}
          value={tabValue}
          onChange={handleChangeTabValue}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab
            label="For you"
            sx={{
              width: "20%",
              fontWeight: tabValue === 0 ? "550" : "100",
              fontSize: "12px",
              padding: 0,
              color: tabValue === 0 && darkMode ? "white" : tabValue === 0 ? "black" : darkMode ? "#9aa1ad" : "",
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Trending"
            sx={{
              width: "20%",
              fontWeight: tabValue === 1 ? "550" : "100",
              fontSize: "12px",
              padding: 0,
              color: tabValue === 1 && darkMode ? "white" : tabValue === 1 ? "black" : darkMode ? "#9aa1ad" : "",
            }}
            {...a11yProps(1)}
          />
          <Tab
            label="News"
            sx={{
              width: "20%",
              fontWeight: tabValue === 2 ? "550" : "100",
              fontSize: "12px",
              padding: 0,
              color: tabValue === 2 && darkMode ? "white" : tabValue === 2 ? "black" : darkMode ? "#9aa1ad" : "",
            }}
            {...a11yProps(2)}
          />
          <Tab
            label="Sports"
            sx={{
              width: "20%",
              fontWeight: tabValue === 3 ? "550" : "100",
              fontSize: "12px",
              padding: 0,
              color: tabValue === 3 && darkMode ? "white" : tabValue === 3 ? "black" : darkMode ? "#9aa1ad" : "",
            }}
            {...a11yProps(3)}
          />
          <Tab
            label="Entertainment"
            sx={{
              width: "20%",
              fontWeight: tabValue === 4 ? "550" : "100",
              fontSize: "12px",
              padding: 0,
              color: tabValue === 4 && darkMode ? "white" : tabValue === 4 ? "black" : darkMode ? "#9aa1ad" : "",
            }}
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
    </Box>
  )
}

export default CustomTabs
