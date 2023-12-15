import React from 'react'

function ProfileName(props) {
  return (
    <div id="name" className="relative flex flex-col ml-[1.5%] top-[-2.5%] w-[50%]">
    <div className="">
        <h1 className={`font-bold text-lg `}>
            {props.profilename}
        </h1>
    </div>
    <div className="">
        <p className={`text-sm font-light text-[gray] `}>
        {props.profiletag}
        </p>
    </div>
</div>
  )
}

export default ProfileName