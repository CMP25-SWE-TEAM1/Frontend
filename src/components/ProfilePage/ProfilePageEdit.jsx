import { useState,useEffect,useRef } from "react"
import React from 'react'
import { Modal, Box } from "@mui/material"
import { useSelector } from "react-redux"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import defaultProfilePic from "../../assets/imgs/Default_Profile_Picture.png"
import CoverImage from "./CoverImage"
const ProfilePageEdit = (props)=>{
  const {darkMode} = useSelector((state)=> state.theme)
  function handleCloseModal()
  {
    console.log("hello")
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
  const hiddenFileInput = useRef(null)
  const profilePicURL = undefined;
    return(
      <Modal open={true} onClose={handleCloseModal} data-testid="loginModal"  disableEscapeKeyDown disablePortal>
        <Box style={modalStyle}>
      <div className="pop-up flex flex-col overflow-y-scroll no-scrollbar  ">
        <div className={`fixed w-[100%] h-[8%]  ${darkMode? `bg-black`:`bg-white`}  flex flex-row`}>
        <button className="relative ml-[5px] mt-[5px] h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>
            <p className="mt-[15px] ml-[15px] text-xl font-semibold">Edit Profile</p>
            <button className="ml-[340px] bg-white text-black mt-[10px] w-[70px] h-[35px] font-medium text-lg rounded-full">Save</button>
        </div>
        <form className="flex flex-col space-y-10"> 
        <div>
        <CoverImage></CoverImage>
        <button className="absolute left-[40%] top-[23%] m-auto h-[47px] w-[47px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-darkHover hover:bg-darkBorder dark:bg-gray-600 dark:hover:bg-darkHover" onClick={()=>{}}>
            <AddAPhotoOutlinedIcon className={`-ml-[3px] -mt-[5px] ${darkMode ? "text-white" : "text-black"}`} />
            <input
              type="file"
              onChange={()=>{}}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
          <button className="absolute font-medium text-xl left-[55%] top-[23%] m-auto h-[47px] w-[47px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-darkHover hover:bg-darkBorder dark:bg-gray-600 dark:hover:bg-darkHover"  onClick={handleCloseModal}>
              x
            </button>
        </div>
        <div className="absolute top-[23%] ml-[5%] w-fit rounded-full border-2 border-black dark:border-white">
          <div className="w-fit rounded-full border border-white dark:border-black">
            <img src={profilePicURL ? profilePicURL : defaultProfilePic} alt="profile" className="h-[120px] w-[120px] rounded-full" />
          </div>
          <button className="absolute left-[50%] top-[50%] m-auto h-[47px] w-[47px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-darkHover hover:bg-darkBorder dark:bg-gray-600 dark:hover:bg-darkHover" onClick={()=>{}}>
            <AddAPhotoOutlinedIcon className={`-ml-[3px] -mt-[5px] ${darkMode ? "text-white" : "text-black"}`} />
            <input
              type="file"
              onChange={()=>{}}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
        </div>
         <div className="input-container">
          <input  className="form-input"  id="Name" type="text"></input>
          <label  className="input-label"  htmlFor="Name"> Name </label>
          </div>
          <div className="input-container">
          <input  className="form-input" id="Bio" type="text"></input>
          <label  className="input-label"  htmlFor="Bio"> Bio </label>
          </div>
          <div className="input-container">
          <input  className="form-input" id ="Location" type = "text"></input>
          <label  className="input-label"  htmlFor="Location"> Location </label>
          </div>
          <div className="input-container">
          <input  className="form-input" id="Website" type= "text"></input>
          <label  className="input-label"  htmlFor="Website"> Website </label>
          </div>
          <div className="input-container">
          <input className="form-input" id="Birth-date" type="text"></input>
          <label  className="input-label"  htmlFor="Birth-date"> Birth Date </label>
          </div>

        </form>
      </div>
      </Box>
      </Modal>
    )
}

export default ProfilePageEdit