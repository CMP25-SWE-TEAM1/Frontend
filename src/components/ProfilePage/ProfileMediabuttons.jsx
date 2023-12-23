import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import HorizontalNavbar from "../General/HorizontalNavbar"
import { Outlet } from "react-router"
import { useLocation } from "react-router"

function ProfileMediabuttons() {

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

  return (
    <div>
      <div id="profile-buttons-div" className={`flex w-[100%] h-[50px] `}>
        <HorizontalNavbar urls={profileNavLinks} originalUrl={`/${root}`} handlers={[]}/>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileMediabuttons
