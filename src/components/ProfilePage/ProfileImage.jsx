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
    <div id="profile-page" className='relative min-w-[140px] max-w-[140px] w-[calc(100%/3)] min-h-[140px] max-h-[140px]
    left-[1.5%] '> 
    <Avatar src={props.profileimageURL} className={`relative w-[140px] h-[140px] 
    ${darkMode? `border-black` : `border-white`} border-[5px] `} onClick={()=>{profilepagehandler()}}></Avatar>
    </div>
  )
}

export default ProfileImage