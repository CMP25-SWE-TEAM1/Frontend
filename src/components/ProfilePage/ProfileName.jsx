import React from "react"

function ProfileName(props) {
  return (
    <div id="name" className="relative left-[2.5%] flex w-[50%] flex-col">
      <div id="profile-nickname-test" className="">
        <h1 className={`text-lg font-bold `}>{props.profilename}</h1>
      </div>
      <div id="profile-username-test" className="">
        <p className={`text-sm font-light text-[gray] `}>{props.profiletag}</p>
      </div>
    </div>
  )
}

export default ProfileName
