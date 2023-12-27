import React from "react"

function ProfileBio(props) {
  return (
    <div id="bio-div-test" className={`relative mb-[2.5%] ml-[2.5%] w-[100%] ${props.profilebio === undefined ? `hidden` : `block`}`}>
      <p id="bio-p-test" className={`h-[100%] w-[95%] break-words text-[15px] font-light leading-[20px] `}>
        {props.profilebio}
      </p>
    </div>
  )
}

export default ProfileBio
