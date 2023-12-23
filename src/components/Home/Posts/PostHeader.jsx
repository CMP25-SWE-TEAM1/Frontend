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

function PostHeader({ pathname, postType, userTag, userProfilePicture, userName, finalDate, id, isVisible, handleMouseEnter, handleMouseLeave, hoveredProfile, openMenu, anchorPostMenu, handleMenuClose, htmlElement, handleMenuButtonClick, followingUser, setPosts, posts }) {
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
      like: `http://backend.gigachat.cloudns.org/api/tweets/like/${id}`,
      unlike: `http://backend.gigachat.cloudns.org/api/tweets/unlike/${id}`,
      repost: `http://backend.gigachat.cloudns.org/api/tweets/retweet/${id}`,
      unrepost: `http://backend.gigachat.cloudns.org/api/tweets/unretweet/${id}`,
      delete: `http://backend.gigachat.cloudns.org/api/tweets/${id}`,
      getProfileAPI: `http://backend.gigachat.cloudns.org/api/user/profile/`,
    },
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
  return (
    <>
      <div className="post-header flex items-center justify-between">
        <div className="flex items-center">
          <div className=" relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isVisible && (
              <Box className="transition-all" sx={{ zIndex: 5, position: "absolute", top: 0, backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black", padding: "10px", borderRadius: "10px", boxShadow: darkMode ? "0px 0px 1px 1px gray" : "0px 0px 1px 1px black", width: "250px" }}>
                <div className="flex ">
                  <div className="w-fit">
                    <Link className="pointer-events-auto hover:brightness-90" to={`/${userTag}`}>
                      <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 50, height: 50 }} />
                    </Link>
                    <div className="text-secondary">{userName}</div>
                    <div className="text-secondary">@{userTag}</div>
                  </div>
                  <div>{userTag !== user.username && <FollowButton tag={userTag} buttonName={hoveredProfile.is_wanted_user_followed ? `Following` : `Follow`}></FollowButton>}</div>
                </div>
                <div className="mt-6">
                  <div className="text-sm text-secondary">{user.username !== userTag ? moment(hoveredProfile.birth_date).format("DD/MM/YYYY") : moment(user.birthDate).format("DD/MM/YYYY")}</div>
                  <div className="mt-2 flex w-full justify-around">
                    <span className="text-sm text-secondary">{user.username !== userTag ? hoveredProfile.followings_num : user.followings_num} Following</span>
                    <span className="text-sm text-secondary">{user.username !== userTag ? hoveredProfile.followers_num : user.followers_num} Followers</span>
                  </div>
                </div>
              </Box>
            )}
            <div className="pointer-events-auto">
              <div className="hover:underline">
                {userName}
                <VerifiedIcon className="pl-1 text-primary" sx={{ fontSize: "22px" }} />
              </div>
              <Link className={`${pathname.search(id) === -1 ? "hidden" : ""} pointer-events-auto text-sm text-ternairy dark:text-secondary`} to={`/${userTag}`}>
                @{userTag}
              </Link>
            </div>
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
          <div className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full text-secondary hover:bg-[#e7f5fd] hover:text-primary dark:hover:bg-[#031018]">
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
              <MenuItem onClick={handleMenuClose} className="flex items-center">
                <SentimentVeryDissatisfiedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Not interested in this post</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <PersonAddAltIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Follow @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <VolumeOffOutlinedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Mute @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
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
