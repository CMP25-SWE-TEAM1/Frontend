import { useSelector } from "react-redux"
import Widgets from "../Widgets/Widgets"

import { useState, useEffect } from "react"

import CustomTabPanel from "../General/CustomTabs/CustomTabPanel"
import CustomTabs from "../General/CustomTabs/CustomTabs"
import WithConditionalDataFetching from "./WithDataFetching"
import SearchComponent from "./SearchComponent"

import { useNavigate } from "react-router-dom"

/**
 * Renders the Explore page, which showcases various content categories and widgets.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - User object from Redux state
 * @returns {JSX.Element} JSX element representing the Explore page
 */
const Explore = () => {
  const user = useSelector((state) => state.user.user)

  const [tabValue, setTabValue] = useState(0)

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue)
  }

  const tabsNames = ["FOR YOU", "TRENDING", "NEWS", "SPORTS", "ENTERTAINMENT"]

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  return (
    <div className="flex flex-1 flex-grow-[8] ">
      <div className="no-scrollbar ml-0 mr-1 max-w-[620px] flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder max-xs:w-fit  max-xs:border-l-0 max-xs:border-r-0 sm:w-fit md:shrink-0">
        <div className="sticky top-0 z-50 mb-0 border-0 border-b border-lightBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-darkBorder dark:bg-inherit dark:bg-opacity-[99%] dark:backdrop-brightness-[20%] dark:max-xs:bg-black dark:max-xs:bg-opacity-50 dark:max-xs:backdrop-blur-sm dark:max-xs:backdrop-brightness-[30%]">
          <SearchComponent query={""} />
          <CustomTabs tabValue={tabValue} handleChangeTabValue={handleChangeTabValue} tabsNames={tabsNames} />
        </div>
        <CustomTabPanel value={tabValue} index={0}>
          {WithConditionalDataFetching("foryou")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {WithConditionalDataFetching("trending")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          {WithConditionalDataFetching("news")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          {WithConditionalDataFetching("sports")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={4}>
          {WithConditionalDataFetching("entertainment")}
        </CustomTabPanel>
      </div>

      {user && <Widgets parent={"explore"} />}
    </div>
  )
}

export default Explore
