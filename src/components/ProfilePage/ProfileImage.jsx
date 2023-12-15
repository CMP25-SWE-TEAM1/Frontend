import React from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from "react-redux";

function ProfileImage(props) {
    //props:profileimage,profileimageURL
    const darkMode = useSelector((state)=> state.theme.darkMode);
    function profilepagehandler()
    {
        //will open a Modal
    }
    // console.log(props)
  return (
    <div id="profile-page"> 
    <Avatar src={props.profileimageURL} className={`relative w-[140px] h-[140px] top-[-50%] left-[5%] 
    ${darkMode? `border-black` : `border-white`} border-[5px] `} onClick={()=>{profilepagehandler()}}></Avatar>
    </div>
  )
}

export default ProfileImage