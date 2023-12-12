import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"
import axios from "axios"
import { useSelector } from "react-redux"

const Post = ({ userProfilePicture, userName, userTag, id, date, replyCount, repostCount, likeCount, viewCount, description, media, isLiked, isReposted, followingUser, setPosts, posts }) => {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null)
  const [mediaUrls, setMediaUrls] = useState([])
  const [mediaTypes, setMediaTypes] = useState([])
  const [liked, setLiked] = useState(isLiked)
  const [likesNum, setLikesNum] = useState(likeCount)
  const [reposted, setReposted] = useState(isReposted)
  const [repostsNum, setRepostsNum] = useState(repostCount)

  const [isVisible, setIsVisible] = useState(false)
  const [timeoutRef, setTimeoutRef] = useState(null)

  const [hoveredProfile, setHoveredProfile] = useState([])

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

  useEffect(() => {
    console.log(isLiked)
  }, [isLiked])

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
          // console.log("unlike success", response)
        })
        .catch((error) => {
          console.log("unlike fail", error)
        })
    } else {
      // console.log(id)
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
          // console.log("like success", response)
        })
        .catch((error) => {
          console.log("like fail", error)
        })
    }
    setLiked(!liked)
  }
  const handleRepostClick = () => {
    if (reposted) {
      // console.log(userToken)
      // console.log(id)
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
          // console.log("unrepost success", response)
        })
        .catch((error) => {
          console.log("unrepost fail", error)
        })
    } else {
      // console.log(id)
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
          // console.log("repost success", response)
        })
        .catch((error) => {
          console.log("repost fail", error)
        })
    }
    setReposted(!reposted)
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
        <div></div>
        <div className="flex">
          <div className=" h-fit w-10 sm:mr-3">
            <Link className="hover:brightness-90" to={`/${userTag}`}>
              <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 40, height: 40 }} />
            </Link>
          </div>
          <div className=" w-full sm:mr-2">
            <PostHeader userTag={userTag} userProfilePicture={userProfilePicture} userName={userName} finalDate={finalDate} id={id} isVisible={isVisible} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} hoveredProfile={hoveredProfile} openMenu={openMenu} anchorPostMenu={anchorPostMenu} handleMenuClose={handleMenuClose} htmlElement={htmlElement} handleMenuButtonClick={handleMenuButtonClick}/>
          </div>
        </div>
        <PostBody descriptionLines={descriptionLines} mediaUrls={mediaUrls} mediaTypes={mediaTypes}/>
        <PostFooter replyCount={replyCount} reposted={reposted} repostsNum={repostsNum} liked={liked} likesNum={likesNum} viewCount={viewCount} handleRepostClick={handleRepostClick} handleLikeClick={handleLikeClick} />
      </div>
    </Link>
  )
}

export default Post
