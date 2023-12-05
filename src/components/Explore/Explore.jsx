import { useSelector } from "react-redux"
import Widgets from "../Widgets"

import { useState } from "react"

import CustomTabPanel from "./CustomTabPanel"
import CustomTabs from "./CustomTabs"
import TrendComponent from "./TrendComponent"
import TrendsContainer from "./TrendsContainer"

const Explore = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)

  const [tabValue, setTabValue] = useState(0)

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className="flex flex-1 max-xs:w-fit max-xs:max-w-[475]">
      <div className="home ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder max-xs:w-fit max-xs:max-w-[475px] sm:w-[600px]">
        <div className="sticky top-0 z-50 mb-0 border-0 border-b border-lightBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-darkBorder dark:bg-inherit dark:bg-opacity-[99%] ">
          <CustomTabs tabValue={tabValue} handleChangeTabValue={handleChangeTabValue} />
        </div>
        <CustomTabPanel value={tabValue} index={0}>
          <TrendsContainer type={"For you"} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <TrendsContainer type={"For you"} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <TrendsContainer type={"For you"} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <TrendsContainer type={"For you"} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={4}>
          <TrendsContainer type={"For you"} />
        </CustomTabPanel>
      </div>

      {user && <Widgets />}
    </div>
  )
}

export default Explore
