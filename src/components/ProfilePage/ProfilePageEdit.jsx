import { useState,useEffect,useRef } from "react"
import React from 'react'
import { Modal, Box } from "@mui/material"
import { useSelector } from "react-redux"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import defaultProfilePic from "../../assets/imgs/Default_Profile_Picture.png"
import CoverImage from "./CoverImage"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import Birthdate from "../Signup/Birthdate"
import { APIs } from "../../constants/signupConstants"
import {months,DefaultCoverPage} from "../../constants/index"
import Crop from "../General/Crop/Crop"
import Alert from "@mui/material/Alert"
import { styles } from "../../styles.js"

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
    || website !== user.website || JSON.stringify(birthdate) !==JSON.stringify((user.birth_date).slice(0,10).split('-')))
    {
      //console.log("DAFASDAS")
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
  const colornameinput = useRef(null)
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
        <div id="Header-test" className={`absolute w-[100%] h-[10%]  top-0  z-10 backdrop-blur-sm  ${darkMode? `bg-black`:`bg-white`}  flex flex-row`}>
        <button type="button" className="relative ml-[5px] mt-[5px] h-10 w-10 rounded-3xl bg-transparent 
        bg-white text-2xl text-black no-underline 
        hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover"
         onClick={()=>{
          props.handleCloseModal() 
          navigate(`/${user.username}`)
           }}>
              x
            </button>
            <p className="mt-[15px] ml-[15px] text-xl font-semibold">Edit Profile</p>
            <button className={`absolute ${darkMode? `bg-white text-black`:`bg-black text-white`}  z-10 top-[12.5px] right-[12.5px] 
             hover:bg-lightHover dark:hover:bg-darkHover
              w-[70px] h-[35px] font-medium text-lg rounded-full`}onClick={()=>{hiddenFormSubmit.current.click()}} disabled={name === ""} >Save</button>
        </div>
        <form id="EditProfileForm-test" className="relative h-[60%] flex flex-col" onSubmit={(e)=>{EditProfile(e)}}> 
        <input id="FormSubmit-test" type="submit" ref={hiddenFormSubmit} className="hidden"></input>
        <div id="CoverimageDiv-test" className="relative h-[50%] w-[100%]">
        <CoverImage  coverimage={coverpage} height="h-[300px]" ></CoverImage>
        <button id="AddImage-test" type="button" className={`absolute ${coverpage === DefaultCoverPage? `left-[50%]`:`left-[40%] `} m-auto h-[47px] w-[47px] top-[25vh] -translate-x-[50%] -translate-y-[50%] rounded-full bg-darkHover hover:bg-darkBorder dark:bg-gray-600 dark:hover:bg-darkHover`} onClick={handlecoverPictureClick}>
            <AddAPhotoOutlinedIcon  className={`-ml-[3px] -mt-[5px] ${darkMode ? "text-white" : "text-black"}`} />
            <input
              type="file"
              onChange={handlecoverPictureChange}
              ref={hiddencoverFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
          <button id="remove-banner-test" type="button" className={`absolute font-medium text-xl left-[60%] top-[25vh] m-auto h-[47px] w-[47px] 
          -translate-x-[50%] -translate-y-[50%]  rounded-full bg-darkHover hover:bg-darkBorder 
          dark:bg-gray-600 dark:hover:bg-darkHover ${coverpage === DefaultCoverPage? `hidden` :``} `} 
          onClick={
            ()=>{
              setCoverpage(DefaultCoverPage)
            }
          } >
              x
            </button>
        </div>
        <div id="ProfileImageDiv-test" className="relative  m-0 top-[7.5%] ml-[5%] w-fit rounded-full border-2 border-black dark:border-white">
          <div className="w-fit rounded-full border border-white dark:border-black">
            <img id="ProfileImage-test" src={profileimage ? profileimage : defaultProfilePic} alt="profile" className="h-[120px] w-[120px] rounded-full" />
          </div>
          <button id="AddProfileImage-test" type="button" className="absolute left-[50%] top-[50%] m-auto h-[47px] w-[47px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-darkHover hover:bg-darkBorder dark:bg-gray-600 dark:hover:bg-darkHover" onClick={handlePictureClick}>
            <AddAPhotoOutlinedIcon className={`-ml-[3px] -mt-[5px] ${darkMode ? "text-white" : "text-black"}`} />
            <input
              type="file"
              onChange={handlePictureChange}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
        </div>
         <div id="Name-Input-Container-test" className="input-container mt-[10%]  mb-[2.5%] mx-auto w-[95%]">
          <input  ref={colornameinput} className={`${name === "" ?  `form-input` : `form-input filled-input` } rounded`}
           id="Name" type="text" autoComplete="off" value={name}
          onChange={(e) => setName(e.target.value)} ></input>
          <label  className="input-label text-[rgb(113,118,123)]"  htmlFor="Name"> Name </label>
          <Alert severity="error" className={`${name==="" ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              Name can't be blank
            </Alert>
          </div>
          <div className="input-container  mb-[2.5%] mx-auto w-[95%]">
          <input  className={`h-[100px] ${bio === undefined ?  `form-input` : `form-input filled-input` } rounded`}
          autoComplete="off" value={bio} onChange={(e) => setBio(e.target.value)}  id="Bio" type="text"></input>
          <label  className="input-label text-[rgb(113,118,123)] text-[rgb(113,118,123)] top-[15%]"  htmlFor="Bio"> Bio </label>
          </div>
          <div className="input-container  mb-[2.5%] mx-auto w-[95%]">
          <input className={` ${location === undefined ?  `form-input` : `form-input filled-input` } rounded`} value={location} onChange={(e) => setLocation(e.target.value)} id ="Location" type = "text"></input>
          <label  className="input-label rounded"  htmlFor="Location"> Location </label>
          </div>
          <div className="input-container  mb-[2.5%] mx-auto w-[95%]">
          <input className={` ${website === undefined ?  `form-input` : `form-input filled-input` } rounded`} value={website} onChange={(e) => setWebsite(e.target.value)}  type= "text"></input>
          <label  className="input-label text-[rgb(113,118,123)]"  htmlFor="Website"> Website </label>
          </div>
          <div className="relative flex flex-col  mb-[2.5%] mx-auto w-[95%]">
            <div className="flex flex-row  space-x-[10px] text-[rgb(113,118,123)]">
              <p >
                Birth date 
              </p>
              <p className="relative top-[-3px]">.</p>
              <button type="button" className={`${`${!selectdatedisplay? 'block': 'hidden' }`} bg-transparent text-[rgb(29,155,240)] hover:underline decoration-solid`} onClick={()=>{
                setSelectdatedisplay(true)
              }}>
                Edit
              </button>
              <button type="button" className={`${`${selectdatedisplay? 'block': 'hidden' }`} bg-transparent text-[rgb(29,155,240)] hover:underline decoration-solid`} onClick={()=>{
                setSelectdatedisplay(false)
              }}>
                Cancel
              </button>
            </div>
            <div className={`${!selectdatedisplay? 'block': 'hidden'} mb-[10%]`}>
              <p className="font-light text-xl">{htmldate}</p>
            </div>
          <div className={`${selectdatedisplay? 'block': 'hidden' } mb-[10%]`}>
          <Birthdate month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} yearwidth={"150px"} monthwidth={"300px"}></Birthdate>
          </div>
          </div>
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