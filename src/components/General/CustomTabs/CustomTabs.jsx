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

const CustomTabs = ({ tabValue, handleChangeTabValue, tabsNames }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{
            "& .MuiTabs-indicator": {
              marginLeft: `${tabsNames.length == 3 ? 11 : 4.3}%`,
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
          {tabsNames.map((tab, index) => {
            return (
              <Tab
                key={index}
                label={tab}
                sx={{
                  width: `${100 / tabsNames.length}%`,
                  fontWeight: tabValue === index ? "550" : "100",
                  fontSize: "12px",
                  padding: 0,
                  color: tabValue === index && darkMode ? "white" : tabValue === index ? "black" : darkMode ? "#9aa1ad" : "",
                }}
                {...a11yProps(index)}
              />
            )
          })}
        </Tabs>
      </Box>
    </Box>
  )
}

export default CustomTabs
