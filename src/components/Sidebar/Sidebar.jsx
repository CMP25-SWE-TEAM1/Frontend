import React, { useState, useEffect } from "react"
import SidebarOption from "./SidebarOption"
import SwitchAccount from "./SwitchAccount"
import Button from "./Button"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"
import ListAltRoundedIco from "@mui/icons-material/ListAltRounded"
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined"
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SettingsIcon from "@mui/icons-material/Settings"
import darkLogo from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import lightLogo from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../../store/UserSlice"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { Avatar } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { Modal, Box } from "@mui/material"
import UploadProfilePicture from "../Signup/UploadProfilePicture"

import { styles } from "../../styles"

const Sidebar = () => {
  const user = useSelector((state) => state.user.user)
  const userTag = user.username
  const darkMode = useSelector((state) => state.theme.darkMode)
  const [shrink, setShrink] = useState(window.innerWidth < 1278)
  const handleResize = () => {
    if (window.innerWidth < 1278) setShrink(true)
    else setShrink(false)
  }
  window.addEventListener("resize", handleResize)

  const moreIcon = <MoreHorizIcon />
  const imageIcon = (altName, image, radius) => {
    return <img src={image} alt={`${altName}ImageIcon`} className={`h-${radius} w-${radius} rounded-full`} />
  }

  // const optionsNames = ["Home", "Explore", "Notifications", "Messages", "Lists", "Bookmarks", "Communities", "Profile", "Settings"]
  // const optionsIcons = [<HomeOutlinedIcon />, <SearchRoundedIcon />, <NotificationsNoneRoundedIcon />, <MailOutlineRoundedIcon />, <ListAltRoundedIco />, <TurnedInNotOutlinedIcon />, <PeopleOutlinedIcon />, <PersonOutlinedIcon />, <SettingsIcon />]
  // const optionLinks = ["/home", "/explore", "/notifications", "/messages", `/${userTag}/lists`, "/i/bookmarks", `/${userTag}/communities`, `/${userTag}`, "/settings/account"]
  // const options = optionsNames.map((optionName, index) => <SidebarOption key={optionName} icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} alt="sidebarOption" />)

  const optionsNames = ["Home", "Explore", "Notifications", "Messages", "Lists", "Bookmarks", "Profile", "Settings"]
  const optionsIcons = [<HomeOutlinedIcon />, <SearchRoundedIcon />, <NotificationsNoneRoundedIcon />, <MailOutlineRoundedIcon />, <ListAltRoundedIco />, <PeopleOutlinedIcon />, <PersonOutlinedIcon />, <SettingsIcon />]
  const optionLinks = ["/home", "/explore", "/notifications", "/messages", `/${userTag}/lists`, "/i/bookmarks", `/${userTag}`, "/settings/account"]
  const options = optionsNames.map((optionName, index) => <SidebarOption key={optionName} icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} alt="sidebarOption" />)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    dispatch(logoutUser())
    navigate("/")
  }
  const htmlElement = document.getElementById("htmlid")

  const [anchorMenu, setAnchorMenu] = useState(null)
  const openMenu = Boolean(anchorMenu)
  const handleClickMenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorMenu(null)
  }

  const [openModal, setOpenSignupModal] = useState(false)
  const handleOpenModal = () => setOpenSignupModal(true)
  const handleCloseModal = () => {
    setOpenSignupModal(false)
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle = {
    position: "absolute",

    backgroundColor: "transparent",
    border: "1px solid #767C86",
    borderRadius: "16px",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }

  return (
    <div className=" flex items-center justify-between  border-r border-lightBorder text-center text-black dark:border-darkBorder dark:text-white max-xs:!sticky max-xs:bottom-0 max-xs:z-10 max-xs:backdrop-brightness-[90%] dark:max-xs:bg-black dark:max-xs:bg-opacity-50 dark:max-xs:backdrop-blur-sm dark:max-xs:backdrop-brightness-[30%] xs:max-w-[400px] xs:justify-end md:flex-grow">
      <div className={`flex h-full w-full flex-row  max-[1278px]:items-end max-xs:!items-center xs:flex-col xs:pl-[30%]`} id="mahmoud_navigate_pre">
        <Button name={darkMode ? imageIcon("logo", darkLogo, 12) : imageIcon("logo", lightLogo, 12)} color="text-white" height="h-12" width="w-12" link="/home" alt="gigaChatIcon" />
        {options}
        <Button name={shrink ? <HistoryEduOutlinedIcon /> : "Post"} color="text-white" backgroundColor="bg-[#1D9BF0]" height={shrink ? "h-14" : "h-12"} width={shrink ? "w-14" : "w-56"} link="/compose/tweet" alt="post" />
        {shrink ? (
          <a alt="" className="group mt-auto box-border w-full cursor-pointer border-0">
            <div title="switchAccountContainer" className=" flex w-full  items-center justify-around rounded-full p-3 group-hover:bg-lightHover dark:group-hover:bg-darkHover" id="mahmoud_switch_account">
              <Avatar alt={user.nickname} src={user.profileImage} id="demo-positioned-button" aria-controls={openMenu ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorMenu}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={
                  htmlElement.classList.contains("dark")
                    ? {
                        "& .MuiMenu-paper": {
                          background: "black",
                          borderRadius: "20px",
                          boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                          border: "solid 1px #333435",
                        },
                      }
                    : {
                        "& .MuiMenu-paper": {
                          borderRadius: "20px",
                          boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                        },
                      }
                }
              >
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    handleOpenModal()
                  }}
                  className="text-base dark:text-white"
                >
                  Change Profile Picture (beta)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    handleLogout()
                  }}
                  className="text-base dark:text-white"
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </a>
        ) : (
          <SwitchAccount profilePhoto={imageIcon("profile", user.picture, 2.5)} userName={user.name} userTag={`@${user.userTag}`} moreIcon={moreIcon} handleLogout={handleLogout} openMenu={openMenu} anchorMenu={anchorMenu} handleCloseMenu={handleCloseMenu} handleClickMenu={handleClickMenu} />
        )}
      </div>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={modalStyle}>
          <div className="pop-up m-auto min-w-[350px] bg-white dark:bg-black md:rounded-2xl">
            <button className="relative  top-0 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>

            <img src={darkMode ? darkLogo : lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />
            <UploadProfilePicture userR={undefined} setUser={() => {}} handleCompleteSignup={() => {}} handleCloseModal={handleCloseModal} fromSwitch={true} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Sidebar
