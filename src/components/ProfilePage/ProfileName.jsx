import React from 'react'

function ProfileName(props) {
  return (
    <div id="name" className="flex flex-col ml-[-1.5%]">
    <div className="">
        <h1 className={`font-bold text-lg mt-[-0.6vh] mx-[1.6vw]`}>
            {props.profilename}
        </h1>
    </div>
    <div className="">
        <p className={`text-sm font-light text-[gray] mx-[1.6vw] py-[0.3vh]`}>
        {props.profiletag}
        </p>
    </div>
</div>
  )
}

export default ProfileName