import React, { useEffect } from "react"
import { useSelector } from "react-redux"

import HorizontalNavbar from "../General/HorizontalNavbar"
import { Outlet } from "react-router"
import { useLocation } from "react-router"

function ProfileMediabuttons({ tag }) {
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    console.log(tag)
  }, [])

  const profileNavLinks = [
    { title: "Posts", location: "posts" },
    { title: "Replis", location: "replies" },
    { title: "Media", location: "media" },
    { title: "Likes", location: "Likes" },
  ]
  const location = useLocation()

  const darkMode = useSelector((state) => state.theme.darkMode)
  return (
    <div>
      <div id="profile-buttons-div" className={`flex w-[100%] `}>
        <HorizontalNavbar urls={profileNavLinks} originalUrl={`/${location.pathname.substring(1)}`} />
      </div>
      <div>
        <Outlet />
      </div>
      {/* <div className="w-[calc(100%/4)] justify-center " >
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
        </div>  */}
    </div>
  )
}

export default ProfileMediabuttons
