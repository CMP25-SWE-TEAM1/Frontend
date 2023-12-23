import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import { Dropdown } from "@mui/base/Dropdown"
import { MenuButton } from "@mui/base/MenuButton"
import { Modal, Box } from "@mui/material"
import { Avatar } from "@mui/material"
import { styled } from "@mui/system"

import { useState } from "react"

import UploadProfilePicture from "../Signup/UploadProfilePicture"

import { styles } from "../../styles"

import { useSelector } from "react-redux"

import darkLogo from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import lightLogo from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

function SwitchAccount({ handleLogout,openMenu,anchorMenu,handleCloseMenu,handleClickMenu }) {
  

  const htmlElement = document.getElementById("htmlid")

  const [openModal, setOpenSignupModal] = useState(false)
  const handleOpenModal = () => setOpenSignupModal(true)
  const handleCloseModal = () => {
    setOpenSignupModal(false)
  }

  const user = useSelector((state) => state.user.user)

  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <>
      <p className="group !mb-0 mt-auto box-border w-full cursor-pointer border-0">
        <div title="Accounts" className=" flex w-full items-center justify-around rounded-full group-hover:bg-lightHover dark:group-hover:bg-darkHover xs:!p-3">
          <Avatar alt={user.nickname} src={user.profileImage} />
          <div>
            <div className="truncate font-semibold" id="mahmoud_name">{user.nickname}</div>
            <div className="truncate text-secondary" id="mahmoud_username">@{user.username}</div>
          </div>

          <div title="moreIcon" className="w-[10%]" id="mahmoud_account_options">
            <MoreHorizOutlinedIcon id="demo-positioned-button" aria-controls={openMenu ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />

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
                Logout @{user.username}
              </MenuItem>
            </Menu>
          </div>
        </div>
      </p>

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
