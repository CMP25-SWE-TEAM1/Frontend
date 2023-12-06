import React from 'react'
import { useSelector } from 'react-redux'

function ProfileMediabuttons() {
    const darkMode = useSelector((state)=>state.theme.darkMode)
  return (
    <div id="profile-buttons-div" className={`flex flex-row w-[100%] h-[7%] justify-center 
    border border-b-1 border-t-0 border-lightBorder dark:border-darkBorder`}>
       <div className="w-[calc(100%/4)] justify-center " >
       <button className={` ${darkMode? `bg-black` : `bg-white`} hover:bg-lightHover dark:hover:bg-darkHover
           text-center font-bold  w-[100%] h-[100%] `}>
               Posts
           </button> 
       </div>
       <div className="w-[calc(100%/4)]" >
       <button className={` ${darkMode? `bg-black` : `bg-white`} hover:bg-lightHover dark:hover:bg-darkHover
           text-center font-bold  w-[100%] h-[100%] `}>
               Replies
           </button> 
       </div>
       <div className="w-[calc(100%/4)]" >
       <button className={` ${darkMode? `bg-black` : `bg-white`} hover:bg-lightHover dark:hover:bg-darkHover
           text-center font-bold  w-[100%] h-[100%] `}>
               Media
           </button> 
       </div>
       <div className="w-[calc(100%/4)]" >
       <button className={` ${darkMode? `bg-black` : `bg-white`} hover:bg-lightHover dark:hover:bg-darkHover
           text-center font-bold w-[100%] h-[100%] `}>
               Likes
           </button>
        </div> 
    </div>
  )
}

export default ProfileMediabuttons