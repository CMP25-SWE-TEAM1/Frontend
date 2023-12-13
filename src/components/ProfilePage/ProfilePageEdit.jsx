import { useState,useEffect,useRef } from "react"
import React from 'react'
import { Modal, Box } from "@mui/material"
import { useSelector } from "react-redux"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import defaultProfilePic from "../../assets/imgs/Default_Profile_Picture.png"
import CoverImage from "./CoverImage"
import axios from "axios"
const ProfilePageEdit = (props)=>{
  const APIs = {
    mock: { getProfileAPI: `http://localhost:3001/api/profile/` },
    actual: { getProfileAPI: `http://backend.gigachat.cloudns.org/api/user/profile/` },
  }
  const mock = false;
  const {user}  = useSelector((state) =>(state.user))
  const {token} = useSelector((state)=>(state.user))
  const [name,setName]       = useState();
  const [bio, setBio] = useState()
  const [location, setLocation] = useState();
  const [website, setWebsite] = useState();
  const [birthdate, setBirthDate] = useState();
  const [profileimage,setProfileimage] = useState();
  const [coverpage, setCoverpage] = useState();
  useEffect(()=>{
    
        // console.log(`Bearer ${token}`)
        setName(user.nickname)
        setBio(user.bio)
        setProfileimage(user.profile_image)
        setCoverpage(user.banner_image)
        setLocation(user.location)
        setWebsite(user.website)
        setBirthDate(user.birth_date)
  },[])
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
  function EditProfile()
  {
    if(name !== user.nickname || bio !== user.bio)
    {

    } 
  }
  const modalStyle = {
    position: "absolute",
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
      <Modal open={false} onClose={handleCloseModal} data-testid="loginModal"  disableEscapeKeyDown disablePortal>
        <Box style={modalStyle} className={`${darkMode?  `bg-black`:`bg-white`}`}>
      <div className="pop-up flex flex-col overflow-y-scroll no-scrollbar   ">
        <div className={`absolute w-[100%] h-[10%]  top-0  z-10 backdrop-blur-sm  ${darkMode? `bg-black`:`bg-white`}  flex flex-row`}>
        <button className="relative ml-[5px] mt-[5px] h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>
            <p className="mt-[15px] ml-[15px] text-xl font-semibold">Edit Profile</p>
        </div>
        <form className="flex flex-col"> 
        <button className=" absolute z-10 top-[12.5px] right-[12.5px] bg-white text-black w-[70px] h-[35px] font-medium text-lg rounded-full" onSubmit={()=>{EditProfile()}}>Save</button>
        <div className="w-[100%] m-0">
        <CoverImage coverimage={coverpage} ></CoverImage>
        <button className="relative  top-[-30%] m-auto h-[47px] w-[47px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-darkHover hover:bg-darkBorder dark:bg-gray-600 dark:hover:bg-darkHover" onClick={()=>{}}>
            <AddAPhotoOutlinedIcon className={`-ml-[3px] -mt-[5px] 
            ${darkMode ? "text-white" : "text-black"}  ${coverpage === "https://answers.flexsim.com/themes/base/admin/img/default-coverImage.png"? `left-[50%]` :`left-[40%]`} `} />
            <input
              type="file" 
              onChange={()=>{}}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
          <button className={`relative font-medium text-xl left-[55%] top-[-30%] m-auto h-[47px] w-[47px] 
          -translate-x-[50%] -translate-y-[50%]  rounded-full bg-darkHover hover:bg-darkBorder 
          dark:bg-gray-600 dark:hover:bg-darkHover ${coverpage === "https://answers.flexsim.com/themes/base/admin/img/default-coverImage.png"? `hidden` :``} `} >
              x
            </button>
        </div>
        <div className="relative m-0 top-[-20%] ml-[5%] w-fit rounded-full border-2 border-black dark:border-white">
          <div className="w-fit rounded-full border border-white dark:border-black">
            <img src={profileimage ? profilePicURL : defaultProfilePic} alt="profile" className="h-[120px] w-[120px] rounded-full" />
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
         <div className="input-container top-[-17.5%] mb-[2.5%] mx-auto w-[95%]">
          <input  className={`${name === "" ?  `form-input` : `form-input filled-input` } rounded`}
           id="Name" type="text" autoComplete="off" value={name}
          onChange={(e) => setName(e.target.value)}></input>
          <label  className="input-label"  htmlFor="Name"> Name </label>
          </div>
          <div className="input-container top-[-17.5%] mb-[2.5%] mx-auto w-[95%]">
          <input  className={`h-[100px] ${bio === undefined ?  `form-input` : `form-input filled-input` } rounded`}
          autoComplete="off" value={bio} onChange={(e) => setBio(e.target.value)}  id="Bio" type="text"></input>
          <label  className="input-label top-[15%]"  htmlFor="Bio"> Bio </label>
          </div>
          <div className="input-container top-[-17.5%] mb-[2.5%] mx-auto w-[95%]">
          <input className={` ${location === undefined ?  `form-input` : `form-input filled-input` } rounded`} value={location} onChange={(e) => setLocation(e.target.value)} id ="Location" type = "text"></input>
          <label  className="input-label rounded"  htmlFor="Location"> Location </label>
          </div>
          <div className="input-container top-[-17.5%] mb-[2.5%] mx-auto w-[95%]">
          <input className={` ${website === undefined ?  `form-input` : `form-input filled-input` } rounded`} value={website} onChange={(e) => setWebsite(e.target.value)}  type= "text"></input>
          <label  className="input-label"  htmlFor="Website"> Website </label>
          </div>
        </form>
      </div>
      </Box>
      </Modal>
    )
}

export default ProfilePageEdit