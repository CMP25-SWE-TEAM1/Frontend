import React from "react"
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
import darkLogo from "./assets/gigachatLogoOne_dark-removebg-preview.png"
import lightLogo from "./assets/gigachatLogoOne_light_v2-removebg-preview.png"
import profileImage from "./assets/IMG20210811224307.jpg"
import { useNavigate } from "react-router"
import { useState } from "react"

const Sidebar = ({ user, setUser }) => {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("mode")
    return storedMode ? storedMode : "light"
  })

  const moreIcon = <MoreHorizOutlinedIcon />
  const userName = "Ismail Ramadan Mokhtar"
  const userTag = "ismail_sh02"
  const imageIcon = (altName, image, radius) => {
    return <img src={image} alt={`${altName}ImageIcon`} className={`h-${radius} w-${radius} rounded-full`} />
  }
  const optionsNames = ["Home", "Explore", "Notifications", "Messages", "Lists", "Bookmarks", "Communities", "Profile", "Settings"]
  const optionsIcons = [<HomeOutlinedIcon />, <SearchRoundedIcon />, <NotificationsNoneRoundedIcon />, <MailOutlineRoundedIcon />, <ListAltRoundedIco />, <TurnedInNotOutlinedIcon />, <PeopleOutlinedIcon />, <PersonOutlinedIcon />, <SettingsIcon />]
  const optionLinks = ["/home", "/explore", "/notifications", "/messages", `/${userTag}/lists`, "/i/bookmarks", `/${userTag}/communities`, `/${userTag}`, "/settings/account"]
  const options = optionsNames.map((optionName, index) => <SidebarOption icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} />)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  return (
    <div className="border-lightBorder dark:border-darkBorder flex max-w-[400px] flex-grow justify-end border-r text-center text-black dark:text-white">
      <div className="flex h-full flex-col pl-[30%]">
        <Button name={mode === "light" ? imageIcon("logo", lightLogo, 12) : imageIcon("logo", darkLogo, 12)} color="text-white" height="h-12" width="w-12" link="/home" />
        {options}
        <Button name="Post" color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-12" width="w-56" link="/compose/tweet" />
        <SwitchAccount
          profilePhoto={imageIcon("profile", user.picture, 2.5)}
          userName={user.name}
          userTag={`@${userTag}`}
          moreIcon={moreIcon}
          link="/" //incomplete
          handleLogout={handleLogout}
        />
      </div>
    </div>
  )
}

export default Sidebar
