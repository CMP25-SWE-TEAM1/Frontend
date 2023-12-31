import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import React from "react"

import { useSelector } from "react-redux"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

/**
 * Renders a tabbed interface with customizable styling and theme-aware color adjustments, managing tab selection and indicator display.
 *
 * @component
 */
const CustomTabs = ({ tabValue, handleChangeTabValue, tabsNames }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const themeColor = useSelector((state) => state.theme.color)

  const getColor = () => {
    let c
    switch (themeColor) {
      case 1:
        c = "#1d9bf0"
        break
      case 2:
        c = "#ffd400"
        break
      case 3:
        c = "#f91880"
        break
      case 4:
        c = "#7856ff"
        break
      case 5:
        c = "#ff7a00"
        break
      case 6:
        c = "#00ba7c"
        break
      default:
        c = "#1d9bf0"
    }

    return c
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{
            "& .MuiTabs-indicator": {
              marginLeft: `${tabsNames.length === 3 ? 11 : 4.3}%`,
              height: "4px",
              borderRadius: "999px",
              maxWidth: 70,
              width: "100%",
              backgroundColor: getColor(),
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
                key={tab}
                label={tab}
                sx={{
                  width: `${100 / tabsNames.length}%`,
                  fontWeight: tabValue === index ? "550" : "100",
                  fontSize: "12px",
                  padding: 0,
                  color: tabValue === index && darkMode ? "white" : tabValue === index ? "black" : darkMode ? "#9aa1ad" : "",
                  "&.Mui-selected": {
                    color: getColor(),
                  },
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

// CustomTabs.propTypes = {
//   /**
//    * The index of the currently selected tab
//    */
//   tabValue: React.PropTypes.number.isRequired,
//   /**
//    * Function to handle tab changes
//    */
//   handleChangeTabValue: React.PropTypes.func.isRequired,
//   /**
//    * Array of tab names
//    */
//   tabsNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
// }

export default CustomTabs
