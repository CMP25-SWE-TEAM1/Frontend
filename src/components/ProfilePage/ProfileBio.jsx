import React from 'react'

function ProfileBio(props) {
    
  return (
    <div id="bio-div-test" className={`relative ml-[2.5%] w-[100%] mb-[2.5%] ${props.profilebio === undefined ? `hidden`:`block`}`}>
    <p id="bio-p-test" className={`text-[15px] font-light leading-[20px] w-[95%] h-[100%] break-words ` } >
        {props.profilebio}
    </p>
    </div>
  )
}

export default ProfileBio