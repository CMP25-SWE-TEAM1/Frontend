import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import HorizontalNavbar from "../General/HorizontalNavbar"
import { Outlet } from "react-router"
import { useLocation } from "react-router"

function ProfileMediabuttons(props) {
  const profileNavLinks = [
    { title: "Posts", location: "" },
    { title: "Replies", location: "with_replies" },
    { title: "Likes", location: "Likes" },
  ]

  return (
    <div>
      <div id="profile-buttons-div" className={`flex h-[50px] w-[100%] `}>
        <HorizontalNavbar urls={profileNavLinks} originalUrl={`/${props.root}`} handlers={[]} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileMediabuttons
