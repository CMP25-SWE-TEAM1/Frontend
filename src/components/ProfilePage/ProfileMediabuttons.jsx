import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import HorizontalNavbar from "../General/HorizontalNavbar"
import { Outlet } from "react-router"
import { useLocation } from "react-router"

function ProfileMediabuttons() {
  const user = useSelector((state) => state.user.user)

  const profileNavLinks = [
    { title: "Posts", location: "" },
    { title: "Replies", location: "with_replies" },
    { title: "Likes", location: "Likes" },
  ]
  const location = useLocation()
  const [root, setRoot] = useState("")
  useEffect(() => {
    setRoot(location.pathname.split("/")[1])
  }, [])

  const darkMode = useSelector((state) => state.theme.darkMode)
  return (
    <div>
      <div id="profile-buttons-div" className={`flex w-[100%] h-[50px] `}>
        <HorizontalNavbar urls={profileNavLinks} originalUrl={`/${root}`} handlers={[]}/>
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
