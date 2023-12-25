import React, { useEffect } from "react"
import VerifiedIcon from "@mui/icons-material/Verified"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import { Box } from "@mui/material"
import FollowButton from "../../ProfilePage/FollowButton"
import moment from "moment"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import axios from "axios"


import { getColor } from "../../../constants"
import ProfileRequests from "../../ProfilePage/profilerequests.js"

function PostHeader({ pathname, postType, isFollowed, userTag, bio, userProfilePicture, userName, finalDate, id, isVisible, handleMouseEnter, handleMouseLeave, hoveredProfile, openMenu, anchorPostMenu, handleMenuClose, htmlElement, handleMenuButtonClick, followingUser, setPosts, posts }) {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)

  const userToken = useSelector((state) => state.user.token)

  const APIs = {
    mock: {
      like: `/api/tweets/like/${id}`,
      unlike: `/api/tweets/unlike/${id}`,
      repost: `/api/tweets/retweet/${id}`,
      deleteRepost: `/api/tweets/${id}`,
    },
    actual: {
      like: `https://backend.gigachat.cloudns.org/api/tweets/like/${id}`,
      unlike: `https://backend.gigachat.cloudns.org/api/tweets/unlike/${id}`,
      repost: `https://backend.gigachat.cloudns.org/api/tweets/retweet/${id}`,
      unrepost: `https://backend.gigachat.cloudns.org/api/tweets/unretweet/${id}`,
      delete: `https://backend.gigachat.cloudns.org/api/tweets/${id}`,
      getProfileAPI: `https://backend.gigachat.cloudns.org/api/user/profile/`,

    },
    followactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/${userTag}/follow` },
    unfollowactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/${userTag}/unfollow` },
    muteactual: { mute: `https://backend.gigachat.cloudns.org/api/user/${userTag}/mute` },
    blockactual: { Block: `https://backend.gigachat.cloudns.org/api/user/${userTag}/block` },
    
  }
  const handleFollow = () => {
    axios
      .post(
        false ? APIs.followmock.postfollowProfileAPI : APIs.followactual.postfollowProfileAPI,
        {},
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleUnfollow = () => {
    axios
      .post(
        false ? APIs.unfollowmock.postfollowProfileAPI : APIs.unfollowactual.postfollowProfileAPI,
        {},
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleDeletePost = () => {
    axios
      .delete(APIs.actual.delete, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res)
        console.log("Tweet Deleted")
        const filteredPosts = posts.filter((p) => {
          const thisId = p.tweetDetails ? (p.tweetDetails._id ? p.tweetDetails._id : p.tweetDetails.id) : p.id
          return thisId !== id
        })
        setPosts(filteredPosts)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   console.log(finalDate)
  // }, [finalDate])

  const themeColor = useSelector((state) => state.theme.color)
 
  return (
    <>
      <div className="post-header flex items-center justify-between">
          <div className=" relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isVisible && (
              <Box className="transition-all" sx={{ zIndex: 5, position: "absolute", top:"20px", backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black", padding: "10px", borderRadius: "10px", boxShadow: darkMode ? "0px 0px 1px 1px gray" : "0px 0px 1px 1px black", width: "250px" }}>
                  <div className="w-full flex justify-between">
                    <Link className="pointer-events-auto hover:brightness-90" to={`/${userTag}`}>
                      <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 50, height: 50 }} />
                    </Link>
                  <div>{userTag !== user.username && <FollowButton tag={userTag} buttonName={hoveredProfile.is_wanted_user_followed ? `Following` : `Follow`}></FollowButton>}</div>
                  </div>
                    <div className="w-full hover:underline font-semibold">{userName}<VerifiedIcon className="pl-1 text-primary" sx={{ fontSize: "22px" }} /></div>
                    <div className="text-secondary">@{userTag}</div>
                <div className="mt-2">
                  <div className="text-sm">{bio}</div>
                  <div className="mt-2 flex w-full ">
                    <div className="text-sm mr-2"><span className="font-semibold">{user.username !== userTag ? hoveredProfile.followings_num : user.followings_num}</span> <span className="text-secondary">Following</span></div>
                    <div className="text-sm "><span className="font-semibold">{user.username !== userTag ? hoveredProfile.followers_num : user.followers_num}</span> <span className="text-secondary">Followers</span></div>
                  </div>
                </div>
              </Box>
            )}
            <div className="pointer-events-auto flex items-center">
            <Link className="hover:underline font-semibold" to={`/${userTag}`}>
            {userName}
            <VerifiedIcon className={`pl-1 ${"text-" + getColor(themeColor)}`} sx={{ fontSize: "22px" }} />
            </Link>
            <Link className={`${pathname.search(id) === -1 ? "" : "hidden"} pointer-events-auto ml-1 text-sm text-ternairy dark:text-secondary`} to={`/${userTag}`}>
              @{userTag}
            </Link>
          </div>
          <div className={`${pathname.search(id) === -1 ? "" : "hidden"} m-1 h-[2px] w-[2px] rounded-full bg-ternairy dark:bg-secondary`}></div>
          <Link className={`${pathname.search(id) === -1 ? "" : "hidden"} pointer-events-auto text-sm text-ternairy hover:underline dark:text-secondary`} to={`/${userTag}/status/${id}`}>
            {finalDate}
          </Link>
        </div>
        <Link>
          <div className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full text-secondary hover:bg-[#e7f5fd] hover:${"text-" + getColor(themeColor)} dark:hover:bg-[#031018]`}>
            <MoreHorizIcon target={"_blank"} variant="text" id="basic-button" data-testid="menu-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuButtonClick} className="bg-transparent" />
            <Menu
              id="basic-menu"
              anchorEl={anchorPostMenu}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={
                htmlElement.classList.contains("dark")
                  ? {
                      "& .MuiMenu-paper": {
                        background: "black",
                        borderRadius: "20px",
                        boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                        border: "solid 1px #333435",
                      },
                    }
                  : {
                      "& .MuiMenu-paper": {
                        borderRadius: "20px",
                        boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                      },
                    }
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleDeletePost()
                  handleMenuClose()
                }}
                className={`flex items-center ${userTag === user.username ? "" : "hidden"}`}
              >
                <DeleteOutlineIcon className="mr-3 text-base text-red-600" />
                <span className="text-[15px] text-red-600">Delete Tweet</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} 
              className={`flex items-center ${userTag !== user.username ? "" : "hidden"}`}
              >
                <SentimentVeryDissatisfiedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Not interested in this post</span>
              </MenuItem>
              <MenuItem onClick={()=>{
              isFollowed?handleUnfollow():handleFollow()
              handleMenuClose() }}
              className={`${userTag !== user.username ? "" : "hidden"}`}
              >
                <PersonAddAltIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">{isFollowed?"Unfollow":"Follow"} @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={
                ()=>{
                  ProfileRequests.mute(false,APIs,userToken)
                  handleMenuClose()
                }}
              className={`${userTag !== user.username ? "" : "hidden"}`}
              >
                <VolumeOffOutlinedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Mute @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={
                ()=>{
                  ProfileRequests.block(false,APIs,userToken)
                  handleMenuClose()
                }}
              className={`${userTag !== user.username ? "" : "hidden"}`}
              >
                <BlockOutlinedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Block @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link className="pointer-events-auto" to={`/${userTag}/status/${id}/retweets`}>
                  <QueryStatsOutlinedIcon className="mr-3 text-base dark:text-white" />
                  <span className="text-[15px] dark:text-white">View post engagements</span>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Link>
      </div>
    </>
  )
}

export default PostHeader
