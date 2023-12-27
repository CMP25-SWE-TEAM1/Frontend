import { useEffect } from "react"
import axios from "axios"

import { useSelector } from "react-redux"

import { useState } from "react"

import PostsContainer from "../Home/Posts/PostsContainer"

import { useLocation } from "react-router"
import ProfileRequests from "./profilerequests"
import EmptyProfileReplies from "./EmptyProfileReplies"

const ProfileLikes = () => {
  const user = useSelector((state) => state.user.user)
  const { token } = useSelector((state) => state.user)
  const [noposts,setNoposts]= useState(false)
  const location = useLocation()
  const [root, setRoot] = useState("")
  useEffect(() => {
   
    setRoot(location.pathname.split("/")[1])
  }, [location])

  const APIs = {
    mock: { getAllTweetsAPI: "httpss://aa80e208-6b14-409e-8ca1-1155aaa93e81.mock.pstmn.io/posts" },
    actual: {
      getAllTweetsAPI: "https://backend.gigachat.cloudns.org/api/homepage/following",
      getUserTweets: `https://backend.gigachat.cloudns.org/api/profile/${root}/likes`,
      getProfileAPI: `https://backend.gigachat.cloudns.org/api/user/profile/`,
    },
  }

  const [profile, setProfile] = useState()
  useEffect(() => {
    if (root !== "" && root !== user.username)
    ProfileRequests.getOtherprofile(false,APIs,root,setProfile,token)
  }, [root])

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (root !== "")
      axios
        .get(APIs.actual.getUserTweets, {
          params: {
            page: 1,
            count: 150,
            username: root,
          },
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
         
          if (res.status === 200) {
            if (res.data.posts) {
              
              setPosts(
                res.data.posts.map((post) => ({
                  isFollowed: post.isFollowed,
                  isFollowingMe: post.isFollowingMe,
                  isLiked: post.isLiked,
                  isRtweeted: post.isRetweeted,
                  tweetDetails: post,
                  type: post.type,
                  followingUser: { username: root },
                }))
              )
            }
          }
        })
        .catch((error) => {
          setNoposts(true)
          
        })
  }, [root])
  return (
    <>
    {!noposts && <div id="Profile-Likes" className="">
      <PostsContainer posts={posts} setPosts={setPosts} />
    </div>}
    {noposts && <EmptyProfileReplies type = {0} tag={root} />}
    </>
  )
}

export default ProfileLikes;
