import React from 'react'

function ProfileBio(props) {
    
  return (
    <div id="biodiv" className={`ml-[2.5%] w-[100%] mb-[2.5%] ${document.getElementById(`biop`)===null ? `hidden`:`block`}`}>
    <p id="biop" className={`text-[15px] font-light leading-[20px] w-[95%] h-[100%] break-words ` } >
        {props.profilebio}
    </p>
    </div>
  )
}

export default ProfileBio