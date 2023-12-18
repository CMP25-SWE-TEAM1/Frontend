import { useState,useEffect,useRef } from "react"
import React from 'react'
import { Modal, Box } from "@mui/material"
import { useSelector } from "react-redux"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import defaultProfilePic from "../../../assets/imgs/Default_Profile_Picture.png"
import CoverImage from "../CoverImage.jsx"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { APIs } from "../../../constants/signupConstants.js"
import {months,DefaultCoverPage} from "../../../constants/index"
import Crop from "../../General/Crop/Crop.jsx"
import Alert from "@mui/material/Alert"
import { styles } from "../../../styles.js"
import TextInput from "./TextInput.jsx"
import EditDate from "./EditDate.jsx"
import EditProfileImage from "./EditProfileImage.jsx"
import EditBannerImage from "./EditBannerImage.jsx"
import Header from "./Header.jsx"
const ProfilePageEdit = (props)=>{
  const APIds = {
    mock: { getProfileAPI: `http://localhost:3001/api/profile/` },
    actual: { EditProfileAPI: `http://backend.gigachat.cloudns.org/api/user/profile/` },
  }
 

  const mock = false;
  const {user}  = useSelector((state) =>(state.user))
  const {token} = useSelector((state)=>(state.user))
  const [name,setName]       = useState(user.nickname);
  const [bio, setBio] = useState(user.bio? user.bio:'')
  const [location, setLocation] = useState(user.location? user.location:'');
  const [website, setWebsite] = useState(user.website? user.website:'');
  const [birthdate, setBirthDate] = useState(user.birth_date?(user.birth_date).slice(0,10).split('-'):'');
  const [profileimage,setProfileimage] = useState(user.profile_image);
  const [profileimagefile,setProfileimagefile]= useState();
  const [coverimagefile,setCoverimagefile] = useState();
  const [coverpage, setCoverpage] = useState(user.banner_image);
  const {darkMode} = useSelector((state)=> state.theme)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate();
  const locationURL = useLocation();
  const [selectdatedisplay,setSelectdatedisplay]= useState(false);
  const htmldate  = `${months[birthdate[1]-1]} ${birthdate[2]}, ${birthdate[0]}`
  const [year, setYear] = useState(birthdate[0])
  const [month, setMonth] = useState(months[birthdate[1]-1])
  const [day, setDay] = useState(birthdate[2])
  const [openCrop, setOpenCrop] = useState(false)
  const [opencoverCrop,setOpenCoverCrop] = useState(false)
 
  //.log(openCrop)
  // Update the window width when the component mounts

  useEffect(() => {
    if(locationURL.pathname === "/settings/profile")
    {
      props.handleOpenProfileEditModal()
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  function EditProfile(e)
  {
    e.preventDefault()
    
    if(name !== user.nickname || bio !== user.bio || location !== user.location 
    || website !== user.website || JSON.stringify(`${month}-${day}-${year}`) !==JSON.stringify((user.birth_date).slice(0,10).split('-')))
    {
      
      axios.patch(
        APIds.actual.EditProfileAPI,{
          bio: bio,
          location: location? location : '',
          website: website,
          nickname: name,
          birth_date:  `${month}-${day}-${year}`,
        },{
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
      ).then((res)=>{
        //.log(res)
      }).catch((err)=>{
        //.log(err)
      })
    } 
    if(profileimage !== user.profile_image )
    {
      
      //handle uploading the image
      const mediaFormdata = new FormData();
      mediaFormdata.append("media",profileimagefile)
      axios
      .post(APIs.actual.uploadMedia, mediaFormdata, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //.log("i'm here")
        axios.patch(
          APIs.actual.changeProfilePicture,
          { profile_image: res.data.data.usls[0] },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        ).catch((err)=>{
          //.log(err);
        })
      }).catch((err)=>{
        //.log("i'm here")
        //.log(err);
      })
    }
    if(coverpage=== DefaultCoverPage  && DefaultCoverPage !== user.banner_image)
    {
      //delete the image
      axios.delete(
        "http://backend.gigachat.cloudns.org/api/user/profile/banner",
      {
          headers: {
          authorization: "Bearer "+ token,
        }
      }).then((res)=>{
        //.log(res)
      }).then((err)=>{
        //.log(err)
      })
    }else if ( coverpage !== user.banner_image)
    {
      
      //set the image
      const mediaFormdata = new FormData();
      mediaFormdata.append("media",coverimagefile)
      axios
      .post(APIs.actual.uploadMedia, mediaFormdata, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //.log(res)
        axios.patch(
          "http://backend.gigachat.cloudns.org/api/user/profile/banner",
          { profile_banner: res.data.data.usls[0] },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        ).catch((err)=>{
          //.log(err);
        })
      }).catch((err)=>{
        //.log("i'm here")
        //.log(err);
      })
    }
    props.handleCloseModal()
    navigate(`/${user.username}`)
    
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
  //.log(name)
  const hiddenFileInput = useRef(null)
  const hiddencoverFileInput = useRef(null)
  const hiddenFormSubmit    = useRef(null)
  const handlePictureClick = (event) => {
    hiddenFileInput.current.click()
  }
  const handlecoverPictureClick = (event) => {
    hiddencoverFileInput.current.click()

  }
  const handlecoverPictureChange = (event) => {
    //.log(event)
    const fileUploaded = event.target.files[0]
   // setcoverimagefile(fileUploaded)
   if(fileUploaded)
   {
    setCoverpage(URL.createObjectURL(fileUploaded))
    setCoverimagefile(fileUploaded)
    setOpenCoverCrop(true)
   }
  }
  const handlePictureChange = (event) => {
    event.preventDefault()
    const fileUploaded = event.target.files[0]
    setProfileimagefile(fileUploaded)
    setProfileimage(URL.createObjectURL(fileUploaded))

    setOpenCrop(true)
    
  }
    return(
      <Modal open={props.openModal} onClose={()=>{props.handleCloseModal()
        navigate(`/${user.username}`)}} data-testid="loginModal"  disableEscapeKeyDown disablePortal>
        <Box style={modalStyle} className={` ${darkMode?  `bg-black`:`bg-white`}`}>
          <div id="ParentDiv-test">
        <div id="ParentDiv2-test" className={`pop-up ${openCrop||opencoverCrop ? "!hidden" : ""}  flex flex-col overflow-y-auto no-scrollbar  `}>
       <Header handleCloseModal={props.handleCloseModal} hiddenFormSubmit={hiddenFormSubmit} name={name} year={year} website={website.search(".com") === -1}></Header>
        <form id="EditProfileForm-test" className="relative h-[60%] flex flex-col" onSubmit={(e)=>{EditProfile(e)}}> 
        <input id="FormSubmit-test" type="submit" ref={hiddenFormSubmit} className="hidden"></input>
        <EditBannerImage coverpage={coverpage} handlecoverPictureChange={handlecoverPictureChange} handlecoverPictureClick={handlecoverPictureClick} hiddencoverFileInput={hiddencoverFileInput} setCoverpage={setCoverpage}></EditBannerImage>
        <EditProfileImage profileimage={profileimage} handlePictureClick={handlePictureClick} handlePictureChange={handlePictureChange} hiddenFileInput={hiddenFileInput}></EditProfileImage>
        <TextInput max="50" inputtext={name} setInputtext={setName} label="Name" divcustomizedstyle="input-container mt-[10%]  mb-[2.5%] mx-auto w-[95%]" id="Name" inputcustomizedstyle=""></TextInput>
        <Alert severity="error" className={`${name==="" ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              Name can't be blank
        </Alert>
          <TextInput max="300" inputtext={bio} setInputtext={setBio} label="Bio" id="Bio" divcustomizedstyle="input-container  mb-[2.5%] mx-auto w-[95%]" inputcustomizedstyle="h-[100px]" ></TextInput>
          <TextInput max="30" inputtext={location} setInputtext={setLocation} label="Location" id="Location" divcustomizedstyle="input-container  mb-[2.5%] mx-auto w-[95%]" inputcustomizedstyle=""></TextInput> 
          <TextInput max="100" inputtext={website} setInputtext={setWebsite} label="Website" id="Website" divcustomizedstyle="input-container  mb-[2.5%] mx-auto w-[95%]" inputcustomizedstyle=""></TextInput>
          <Alert severity="error" className={`${ website.search(".com") === -1 ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              Enter A valid URL
        </Alert>
          <EditDate selectdatedisplay={selectdatedisplay} setSelectdatedisplay={setSelectdatedisplay}
          htmldate={htmldate} month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} ></EditDate>
        </form>
      </div>
      <div id="CROP-ForProfile" className={` ${openCrop ? "!block" : "!hidden"}  !mt-0`}>
        <Crop photoURL={profileimage}setOpenCrop={setOpenCrop} setPhotoURL={setProfileimage} setFile={setProfileimagefile} aspect={1} originalPhoto={user ? user.profileImage : defaultProfilePic} />
      </div>
      <div className={` ${opencoverCrop ? "!block" : "!hidden"}  !mt-0`}>
        <Crop id="CROP-ForCover"  photoURL={coverpage}  setOpenCrop={setOpenCoverCrop} setPhotoURL={setCoverpage} setFile={setCoverimagefile} aspect={2}  />
      </div>
      </div>
      </Box>
      </Modal>
    )
}

export default ProfilePageEdit