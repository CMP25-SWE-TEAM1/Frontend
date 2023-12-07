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
    <Avatar src={props.profileimageURL} className={`md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] ml-[20px]  mt-[-70px] mb-[12px] 
    ${darkMode? `border-black` : `border-white`} border-[5px] `} onClick={()=>{profilepagehandler()}}></Avatar>
    </div>
  )
}

export default ProfileImage