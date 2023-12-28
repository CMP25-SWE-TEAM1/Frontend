import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import FollowButton from "../FollowButton"
import { useParams } from "react-router-dom"
import followPagerequests from "./followPagerequests"
import { Avatar } from "@mui/material"
const Followers = () => {
  const userd = useSelector((state) => state.user.user)
  const { token } = useSelector((state) => state.user)
  const { tag } = useParams()
  const darkMode = useSelector((state) => state.theme.darkMode)
  const [followers, setFollowers] = useState([])
  const APIs = {
    mock: { getProfileAPI: `https://localhost:3001/api/profile/` },
    actual: { getFollowers: `https://backend.gigachat.cloudns.org/api/user/profile/${tag}/followers` },
    followactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/` },
    unfollowactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/` },
  }
  useEffect(() => {
    followPagerequests.getfollowers(false, APIs, token, setFollowers)
  }, [])
  function HandleClick(e) {
    for (let i = 0; i < followers.length; i++) {
      if (followers[i].username === e.currentTarget.id) {
        if (followers[i].Followstate === "Follow") {
          followPagerequests.follow(false, APIs, token, setFollowers, followers, e.currentTarget.id)
        } else {
          followPagerequests.unfollow(false, APIs, token, setFollowers, followers, e.currentTarget.id)
        }
      }
    }
  }
  return (
    <div>
      {followers.map((user) => (
        <div id={user.id} key={user.id} className="flex h-[85px] w-[100%] hover:bg-lightHover dark:hover:bg-darkHover">
          <div className="pl-2 pr-2">
            <Link to={`/${user.username}`}>
              <Avatar src={user.profile_image} alt="profile" />

              {/* <img src={user.profile_image} alt="Profile Image" className="mt-1 h-10 w-10 rounded-3xl" /> */}
            </Link>
          </div>
          <div className="w-[70%] text-ellipsis ">
            <Link to={`/${user.username}`}>
              <h1 className="font-bold hover:underline">{user.nickname}</h1>
              <h2 className="text-sm text-secondary">{`@${user.username}`}</h2>
              <p className="truncate text-sm   ">{user.bio}</p>
            </Link>
          </div>
          <div className=" m-auto">
            <button
              id={user.username}
              data-Followstate={user.Followstate}
              onClick={(e) => {
                HandleClick(e)
              }}
              className={` ${user.username === userd.username ? `hidden` : `block`}
              ${
                darkMode
                  ? user.Followstate === "Follow"
                    ? `w-[80px] bg-white
                        text-black hover:bg-darkHover dark:hover:bg-lightHover`
                    : `bt w-[120px] bg-black text-white
                        hover:border-[rgb(244,33,46)] hover:bg-lightHover  hover:text-[rgb(244,33,46)] dark:hover:bg-darkHover `
                  : user.Followstate === "Follow"
                  ? `w-[80px] bg-black text-white hover:bg-darkHover  dark:hover:bg-lightHover`
                  : `bt w-[120px] bg-white text-black
                        hover:border-[rgb(244,33,46)] hover:bg-lightHover  hover:text-[rgb(244,33,46)] dark:hover:bg-darkHover`
              } 
                relative h-[40px]  
                rounded-full border border-lightBorder text-center  font-[500]
                dark:border-darkBorder`}
            >
              <span id={`${user.username}s`}>{user.Followstate}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Followers
