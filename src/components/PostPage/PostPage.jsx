import React, { useEffect, useState } from "react"
import HorizontalNavbar from "../General/HorizontalNavbar"
import RepliesContainer from "./RepliesContainer"
import Widgets from "../Widgets/Widgets"
import Post from "../Home/Posts/Post"
import WestIcon from "@mui/icons-material/West"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import UpperNavbar from "../General/UpperNavbar"
import { useLocation } from "react-router-dom"
import axios from "axios"
import ComposeReply from "../Home/ComposePost/ComposePost"
import { getColor } from "../../constants"
import ReplyingTo from "../General/ReplyingTo"

import { useNavigate } from "react-router-dom"

function PostPage() {
  const [postLoaded, setPostLoaded] = useState(false)
  const [post, setPost] = useState({})
  const [postReplies, setPostReplies] = useState([])
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)
  const location = useLocation()
  const postId = location.pathname.slice(location.pathname.match(/\/status\/.*/).index + 8, location.pathname.length)
  const APIs = {
    mock: {},
    actual: {
      getPost: `https://backend.gigachat.cloudns.org/api/tweets/${postId}`,
      getPostReplies: `https://backend.gigachat.cloudns.org/api/tweets/replies/${postId}`,
    },
  }
  useEffect(() => {
    setPostLoaded(false)
    console.log(userToken)
    axios
      .get(APIs.actual.getPost, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("get post success", response)
        setPost(response.data.data)
        setPostLoaded(true)
      })
      .catch((error) => {
        console.log("get post fail", error)
      })

    axios
      .get(APIs.actual.getPostReplies, {
        params: { page: 1, count: 100 },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("get post replies success", response)
        setPostReplies(response.data.data)
      })
      .catch((error) => {
        console.log("get post replies fail", error)
      })
  }, [postId])

  const handleNewReply = (newReply) => {
    console.log("from handleNewReply", newReply)
    setPostReplies([newReply.data, ...postReplies])
  }

  const themeColor = useSelector((state) => state.theme.color)

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  return (
    <div className="flex flex-1 ">
      <div className="ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder max-xs:w-fit sm:w-[600px]">
        <div className="sticky top-0 z-50 mb-3 border-0 border-b border-lightBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-darkBorder dark:bg-inherit dark:bg-opacity-[99%] ">
          <UpperNavbar name="Post" />
        </div>
        {postLoaded && (
          <>
            <Post inPostPage={true} userProfilePicture={post.tweet_owner.profile_image} userName={post.tweet_owner.nickname} userTag={post.tweet_owner.username} id={post.id} date={post.creation_time} media={post.media} description={post.description} replyCount={post.repliesNum} repostCount={post.repostsNum} likeCount={post.likesNum} viewCount={post.viewsNum} isLiked={post.isLiked} isReposted={post.isRetweeted} key={post.id} />
            <ReplyingTo username={post.tweet_owner.username} leftMargin="14" />
            <ComposeReply buttonName="Reply" handleNewPost={handleNewReply} postType="reply" referredTweetId={post.id} />
            <RepliesContainer replies={postReplies} />
          </>
        )}
      </div>
      <Widgets parent={"postPage"} />
    </div>
  )
}

export default PostPage
