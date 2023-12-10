import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import VerifiedIcon from "@mui/icons-material/Verified"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import DisplayMedia from "../DisplayMedia"
import PostFooter from "./PostFooter"
import axios from "axios"
import { useSelector } from "react-redux"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"

const Post = ({ userProfilePicture, userName, userTag, id, date, replyCount, repostCount, likeCount, viewCount, description, media, isLiked, isReposted }) => {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null)
  const [mediaUrls, setMediaUrls] = useState([])
  const [mediaTypes, setMediaTypes] = useState([])
  const [liked, setLiked] = useState(isLiked)
  const [likesNum, setLikesNum] = useState(likeCount)
  const [reposted, setReposted] = useState(isReposted)
  const [repostsNum, setRepostsNum] = useState(repostCount)

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
    },
  }
  const descriptionLines = description.split("\n") //need check for writing \n in description
  useEffect(() => {
    const urls = media.map((item) => item.data)
    const types = media.map((item) => item.type)

    // console.log("urls from post comp", urls)
    // console.log("types from post comp", types)
    setMediaUrls(urls)
    setMediaTypes(types)
  }, [media])

  const openMenu = Boolean(anchorPostMenu)

  const handleMenuButtonClick = (event) => {
    setAnchorPostMenu(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorPostMenu(null)
  }
  const handleLikeClick = () => {
    if (liked) {
      console.log(userToken)
      console.log(id)
      setLikesNum(likesNum - 1)
      axios
        .post(
          APIs.actual.unlike,
          {},
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("unlike success", response)
        })
        .catch((error) => {
          console.log("unlike fail", error)
        })
    } else {
      console.log(id)
      setLikesNum(likesNum + 1)
      axios
        .post(
          APIs.actual.like,
          {},
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("like success", response)
        })
        .catch((error) => {
          console.log("like fail", error)
        })
    }
    setLiked(!liked)
  }
  const handleRepostClick = () => {
    if (reposted) {
      console.log(userToken)
      console.log(id)
      setRepostsNum(repostsNum - 1)
      axios
        .patch(
          APIs.actual.unrepost,
          {},
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("unrepost success", response)
        })
        .catch((error) => {
          console.log("unrepost fail", error)
        })
    } else {
      console.log(id)
      setRepostsNum(repostsNum + 1)
      axios
        .patch(
          APIs.actual.repost,
          {},
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("repost success", response)
        })
        .catch((error) => {
          console.log("repost fail", error)
        })
    }
    setReposted(!reposted)
  }
  //"Thu Oct 26 2023 23:18:01 GMT+0200 (Eastern European Standard Time)" we need date in this format

  const htmlElement = document.getElementById("htmlid")

  const time1 = Date.parse(date)
  const time2 = new Date().getTime()

  const differenceInMilliseconds = time2 - time1

  const differenceInSeconds = differenceInMilliseconds / 1000
  const differenceInMinutes = differenceInSeconds / 60
  const differenceInHours = differenceInMinutes / 60

  const intDifferenceInSeconds = Math.floor(differenceInSeconds)
  const intDifferenceInMinutes = Math.floor(differenceInMinutes)
  const intDifferenceInHours = Math.floor(differenceInHours)

  const finalDate = intDifferenceInHours > 24 ? Math.floor(intDifferenceInHours / 24) + "d" : intDifferenceInHours ? intDifferenceInHours + "h" : intDifferenceInMinutes ? intDifferenceInMinutes + "m" : intDifferenceInSeconds + "s"

  return (
    <Link className="w-full" to={`/${userTag}/status/${id}`}>
      <div className=" h-fit border border-l-0 border-r-0 border-lightBorder p-3 hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover" data-testid="postId">
        <div className="flex">
          <div className=" h-fit w-10 sm:mr-3">
            <Link className="hover:brightness-90" to={`/${userTag}`}>
            <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 40, height: 40 }} />
            </Link>
          </div>
          <div className=" w-full sm:mr-2">
            <div className="post-header flex items-center justify-between">
              <div className="flex items-center">
                <Link className=" flex hover:underline" to={`/${userTag}`}>
                  {userName}
                  <VerifiedIcon className="pl-1 text-primary" sx={{ fontSize: "22px" }} />
                </Link>
                <Link className="ml-1 text-sm text-ternairy dark:text-secondary" to={`/${userTag}`}>@{userTag}</Link>
                <div className="m-1 h-[2px] w-[2px] rounded-full bg-ternairy dark:bg-secondary"></div>
                <Link className="text-sm text-ternairy hover:underline dark:text-secondary" to={`/${userTag}/status/${id}`}>
                  {finalDate}
                </Link>
              </div>
              <Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-secondary hover:bg-[#e7f5fd] hover:text-primary dark:hover:bg-[#031018]">
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
                    <Link to={`/${userTag}/status/${id}/retweets`}>
                    <QueryStatsOutlinedIcon className="mr-3 text-base dark:text-white" />
                    <span className="text-[15px] dark:text-white">View post engagements</span>
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="post-text">
            <div className="max-h-[100px] overflow-hidden text-start dark:text-gray-300" data-testid="post-text-id">
              {descriptionLines.map(line => <p>{line}<br/></p>)}
            </div>
          </div>
          <div className="post-media mt-3">
            <DisplayMedia mediaUrls={mediaUrls} mediaTypes={mediaTypes} margin={1}/>
          </div>
        <PostFooter replyCount={replyCount} reposted={reposted} repostsNum={repostsNum} liked={liked} likesNum={likesNum} viewCount={viewCount} handleRepostClick={handleRepostClick} handleLikeClick={handleLikeClick} />
      </div>
    </Link>
  )
}

export default Post
