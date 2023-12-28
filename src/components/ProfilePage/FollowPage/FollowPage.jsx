import React from "react"
import { useParams } from "react-router-dom"
import { Outlet } from "react-router"
import HorizontalNavbar from "../../General/HorizontalNavbar"
import { useSelector } from "react-redux"
import Header from "../ProfileHeader"
import { useState, useEffect } from "react"
import ProfileRequests from "../profilerequests"

import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
const FollowPage = () => {
  const FollowNavLinks = [
    { title: "Following", location: "Following" },
    { title: "Followers", location: "Followers" },
  ]
  const { token } = useSelector((state) => state.user)
  const [profileres, setProfile] = useState()
  const APIs = {
    mock: { getProfileAPI: `https://localhost:3001/api/profile/` },
    actual: { getProfileAPI: `https://backend.gigachat.cloudns.org/api/user/profile/` },
  }
  const { tag } = useParams()
  const { user } = useSelector((state) => state.user)
  useEffect(() => {
    if (user) if (tag !== user.username) ProfileRequests.getOtherprofile(false, APIs, tag, setProfile, token)
  }, [tag])

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  return (
    <>
      {user && (
        <div id="followers-following-page-test" className=" flex w-screen flex-1 flex-grow-[8]">
          <div className="home ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-xs:border-l-0 max-xs:border-r-0 sm:w-[600px]">
            {(tag === user.username || profileres) && <Header profilename={user.username === tag ? user.nickname : profileres.nickname} profiletag={user.username === tag ? tag : profileres.nickname}></Header>}
            <div id="FollowNavbar-div" className={`flex h-[50px] w-[100%] flex-row  `}>
              {(tag === user.username || profileres) && <HorizontalNavbar urls={FollowNavLinks} originalUrl={`/${tag}`} handlers={[]} />}
            </div>
            <div>{(tag === user.username || profileres) && <Outlet />}</div>
          </div>
        </div>
      )}
      {!user && (
        <div
          className="dark-text-[black] absolute left-[45%] top-[45%] h-[100px] w-[100px] rounded-full bg-[black]
      text-white dark:bg-[white]"
        >
          <Link to="/signup">
            <button className="h-[100%] w-[100%] ">Sign up pls</button>
          </Link>
        </div>
      )}
    </>
  )
}

export default FollowPage
