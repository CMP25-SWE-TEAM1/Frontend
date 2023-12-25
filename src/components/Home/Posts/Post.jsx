import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"
import axios from "axios"
import { useSelector } from "react-redux"
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt"
import { useLocation } from "react-router-dom"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import ReplyingTo from "../../General/ReplyingTo"

const Post = ({ userProfilePicture, postType, userName, userTag, bio,id, date, replyCount, repostCount, likeCount, viewCount, description, media, isLiked, isReposted, followingUser, setPosts, posts }) => {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null)
  const [mediaUrls, setMediaUrls] = useState([])
  const [mediaTypes, setMediaTypes] = useState([])
  const [liked, setLiked] = useState(isLiked)
  const [likesNum, setLikesNum] = useState(likeCount)
  const [reposted, setReposted] = useState(isReposted)
  const [repostsNum, setRepostsNum] = useState(repostCount)
console.log("post type is : ",postType  )
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutRef, setTimeoutRef] = useState(null)

  const [hoveredProfile, setHoveredProfile] = useState([])

  const pathname = useLocation().pathname
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
  }

  useEffect(() => {
    setTimeout(() => {
      if (userTag) {
        if (user.username !== userTag) {
          axios
            .get(APIs.actual.getProfileAPI + `${userTag}`, {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                // console.log(res.data.user)
                setHoveredProfile(res.data.user)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }, 100)
  }, [userTag])

  // useEffect(() => {
  //   console.log(isLiked)
  // }, [isLiked])

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef)
    const timer = setTimeout(() => setIsVisible(true), 1000) // Change 1000 to desired delay
    setTimeoutRef(timer)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef)
    setIsVisible(false)
  }

  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)

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
      // console.log(userToken)
      // console.log(id)
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
          setLikesNum(likesNum - 1)
          setLiked(!liked)
          // console.log("unlike success", response)
        })
        .catch((error) => {
          console.log("unlike fail", error)
        })
    } else {
      // console.log(id)
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
          // console.log("like success", response)
          setLikesNum(likesNum + 1)
          setLiked(!liked)
        })
        .catch((error) => {
          console.log("like fail", error)
        })
    }
  }
  const handleRepostClick = () => {
    if (reposted) {
      // console.log(userToken)
      // console.log(id)
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
          setRepostsNum(repostsNum - 1)
          setReposted(!reposted)
          console.log("unrepost success", response)
        })
        .catch((error) => {
          console.log("unrepost fail", error)
        })
    } else {
      // console.log(id)
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
          setRepostsNum(repostsNum + 1)
          setReposted(!reposted)
          console.log("repost success", response)
        })
        .catch((error) => {
          console.log("repost fail", error)
        })
    }
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

  // useEffect(() => {
  //   console.log(date)
  // },[date])
  return (
    <Link className={`w-full ${pathname.search(id) === -1 ? "" : "pointer-events-none"}`} to={`/${userTag}/status/${id}`}>
      <div className={` h-fit border border-l-0 border-r-0 ${pathname.search(id) === -1 ? "hover:bg-gray-100 dark:hover:bg-[#080808]" : ""} border-lightBorder p-3  dark:border-darkBorder `} data-testid="postId">
        <div></div>
        <div className={`ml-5 flex items-center text-sm text-ternairy dark:text-secondary ${postType === "retweet" ? "" : "hidden"}`}>
          <CachedOutlinedIcon
            sx={{
              width: 16,
              height: 16,
            }}
          />
          <span className="ml-2 hover:underline">{followingUser ? (followingUser.username === user.username ? "You" : followingUser.username) : ""} reposted</span>
        </div>
        <div className="flex">
          <div className=" h-fit w-10 sm:mr-3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link className="pointer-events-auto hover:brightness-90" to={`/${userTag}`}>
              <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 40, height: 40 }} />
            </Link>
          </div>
          <div className=" w-full sm:mr-2">
            <PostHeader pathname={pathname} postType={postType} userTag={userTag} bio={bio} userProfilePicture={userProfilePicture} userName={userName} finalDate={finalDate} id={id} isVisible={isVisible} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} hoveredProfile={hoveredProfile} openMenu={openMenu} anchorPostMenu={anchorPostMenu} handleMenuClose={handleMenuClose} htmlElement={htmlElement} handleMenuButtonClick={handleMenuButtonClick} followingUser={followingUser} setPosts={setPosts} posts={posts} />
            {postType==="reply"&&<ReplyingTo username="ismail" leftMargin="7"/>}
          </div>
        </div>
        <PostBody descriptionLines={descriptionLines} mediaUrls={mediaUrls} mediaTypes={mediaTypes} />
        <div className={`${pathname.search(id) !== -1 ? "" : "hidden"}`}>
          <Link className={`pointer-events-auto`} to={`/${userTag}/status/${id}/retweets`}>
            <div className="flex h-14 items-center border-b border-t border-lightBorder text-sm text-ternairy dark:border-lightBorder dark:text-secondary">
              <SignalCellularAltIcon
                sx={{
                  width: 16,
                  height: 16,
                  mr: 1,
                }}
              />
              View post engagements
            </div>
          </Link>
        </div>
        <PostFooter id={id} pathname={pathname} replyCount={replyCount} reposted={reposted} repostsNum={repostsNum} liked={liked} likesNum={likesNum} viewCount={viewCount} handleRepostClick={handleRepostClick} handleLikeClick={handleLikeClick} />
      </div>
    </Link>
  )
}

export default Post
