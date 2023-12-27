import React from "react"
import { Avatar } from "@mui/material"
import { useSelector } from "react-redux"

function ProfileImage(props) {
  //props:profileimage,profileimageURL
  const darkMode = useSelector((state) => state.theme.darkMode)
  function profilepagehandler() {
    //will open a Modal
  }

  return (
    <div
      id="profile-image-test"
      className="relative left-[1.5%] max-h-[140px] min-h-[140px] w-[calc(100%/3)] min-w-[140px]
    max-w-[140px] "
    >
      <Avatar
        src={props.profileimageURL}
        className={`relative h-[140px] w-[140px] 
    ${darkMode ? `border-black` : `border-white`} border-[5px] `}
        onClick={() => {
          profilepagehandler()
        }}
      ></Avatar>
    </div>
  )
}

export default ProfileImage
