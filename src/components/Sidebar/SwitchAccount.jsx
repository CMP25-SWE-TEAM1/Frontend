import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import { Modal, Box } from "@mui/material"
import { Avatar } from "@mui/material"

import { useState } from "react"

import UploadProfilePicture from "../Signup/UploadProfilePicture"

import { styles } from "../../styles"

import { useSelector } from "react-redux"

import darkLogo from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import lightLogo from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

function SwitchAccount({ userName, userTag, link, handleLogout }) {
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

  const user = useSelector((state) => state.user.user)

  const darkMode = useSelector((state) => state.theme.darkMode)


  return (
    <>
      <a href={link} alt="" className="group mb-2 mt-auto box-border w-full cursor-pointer border-0">
        <div title="switchAccountContainer" className=" flex w-full  items-center justify-around rounded-full p-2 group-hover:bg-lightHover dark:group-hover:bg-darkHover">
          <Avatar alt={user.nickname} src={user.profileImage} className="-ml-2" />
          <div>
            <div className="truncate font-semibold">{user.nickname}</div>
            <div className="truncate text-secondary">@{user.username}</div>
          </div>

          <div title="moreIcon" className="w-[10%]">
            <MoreHorizOutlinedIcon id="basic-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />
            <Menu
              id="basic-menu"
              anchorEl={anchorMenu}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu()
                  handleOpenModal()
                }}
              >
                Change Profile Picture (beta)
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu()
                  handleLogout()
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </a>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={styles.modalStyle}>
          <div className="pop-up m-auto bg-white dark:bg-black md:rounded-2xl">
            <button className="relative left-[-70%] top-0 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>

            <img src={darkMode ? darkLogo : lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />
            <UploadProfilePicture userR={undefined} setUser={() => {}} handleCompleteSignup={() => {}} handleCloseModal={handleCloseModal} fromSwitch={true} />
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default SwitchAccount
