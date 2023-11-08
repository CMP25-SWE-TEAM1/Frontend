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
import darkLogo from "./assets/gigachatLogoOne_dark-removebg-preview.png"
import lightLogo from "./assets/gigachatLogoOne_light_v2-removebg-preview.png"
import profileImage from "./assets/IMG20210811224307.jpg"
import { useNavigate } from "react-router"


const Sidebar = ({user,setUser}) => {
  const moreIcon = <MoreHorizOutlinedIcon />
  const userName = "Ismail Ramadan Mokhtar"
  const userTag = "ismail_sh02"
  const imageIcon = (altName, image, radius) => {
    return <img src={image} alt={`${altName}ImageIcon`} className={`h-${radius} w-${radius} rounded-full`} />
  }
  const optionsNames = [
    "Home",
    "Explore",
    "Notifications",
    "Messages",
    "Lists",
    "Bookmarks",
    "Communities",
    "Premium", // makes a problem in size
    "Profile",
    "More",
  ]
  const optionsIcons = [
    <HomeOutlinedIcon />,
    <SearchRoundedIcon />,
    <NotificationsNoneRoundedIcon />,
    <MailOutlineRoundedIcon />,
    <ListAltRoundedIco />,
    <TurnedInNotOutlinedIcon />,
    <PeopleOutlinedIcon />,
    "X", // imageIcon(lightLogo,4),
    <PersonOutlinedIcon />,
    <PendingOutlinedIcon />,
  ]
  const optionLinks = ["/home", "/explore", "/notifications", "/messages", `/${userTag}/lists`, "/i/bookmarks", `/${userTag}/communities`, "/i/verified-choose", `/${userTag}`]
  const options = optionsNames.map((optionName, index) => <SidebarOption icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} />)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  return (
    <div className="max-w-[400px]  border  border-black text-center text-black dark:text-white flex-grow flex justify-end">
      <div className="flex h-full flex-col pl-[30%]">
        <Button name={imageIcon("logo", lightLogo, 8)} color="text-white" backgroundColor="" height="h-12" width="w-12" link="/home" />
        {options}
        <Button name="Post" color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-14" width="w-56" link="/compose/tweet" />
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
