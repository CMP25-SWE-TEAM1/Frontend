import React, { useEffect, useState } from "react"
import SidebarOption from "./SidebarOption"
import SwitchAccount from "./SwitchAccount"
import Button from "./Button"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"
import ListAltRoundedIco from "@mui/icons-material/ListAltRounded"
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import SettingsIcon from "@mui/icons-material/Settings"
import darkLogo from "../assets/gigachatLogoOne_dark-removebg-preview.png"
import lightLogo from "../assets/gigachatLogoOne_light_v2-removebg-preview.png"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../../store/UserSlice"

const Sidebar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const moreIcon = <MoreHorizOutlinedIcon />
  const userName = "Ismail Ramadan Mokhtar"
  const userTag = "ismail_sh02"
  const imageIcon = (altName, image, radius) => {
    return <img src={image} alt={`${altName}ImageIcon`} className={`h-${radius} w-${radius} rounded-full`} />
  }
  const optionsNames = ["Home", "Explore", "Notifications", "Messages", "Lists", "Bookmarks", "Communities", "Profile", "Settings"]
  const optionsIcons = [<HomeOutlinedIcon />, <SearchRoundedIcon />, <NotificationsNoneRoundedIcon />, <MailOutlineRoundedIcon />, <ListAltRoundedIco />, <TurnedInNotOutlinedIcon />, <PeopleOutlinedIcon />, <PersonOutlinedIcon />, <SettingsIcon />]
  const optionLinks = ["/home", "/explore", "/notifications", "/messages", `/${userTag}/lists`, "/i/bookmarks", `/${userTag}/communities`, `/${userTag}`, "/settings/account"]
  const options = optionsNames.map((optionName, index) => <SidebarOption key={optionName} icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} />)

  const user = useSelector((state) => state.user.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(logoutUser())
    navigate("/")
  }

  return (
    <div className="flex max-w-[400px] flex-grow justify-end border-r border-lightBorder text-center text-black dark:border-darkBorder dark:text-white">
      <div className="flex h-full flex-col pl-[30%] normalSidebar:bg-blue-400">
        <Button name={darkMode ? imageIcon("logo", darkLogo, 12) : imageIcon("logo", lightLogo, 12)} color="text-white" height="h-12" width="w-12" link="/home" />
        {options}
        <Button name="Post" color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-12" width="w-56" link="/compose/tweet" />
        <SwitchAccount profilePhoto={imageIcon("profile", user.picture, 2.5)} userName={user.name} userTag={`@${userTag}`} moreIcon={moreIcon} handleLogout={handleLogout} />
      </div>
    </div>
  )
}

export default Sidebar
