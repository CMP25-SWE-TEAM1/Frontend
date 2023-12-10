import { useEffect } from "react"
import axios from "axios"

import { useSelector } from "react-redux"

import { useState } from "react"

import PostsContainer from "../Home/Posts/PostsContainer"

import { useLocation } from "react-router"

const ProfilePosts = () => {
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)

  const location = useLocation()
  const [root, setRoot] = useState("")
  useEffect(() => {
    // console.log(location.pathname.split("/"))
    setRoot(location.pathname.split("/")[1])
  }, [])

  const APIs = {
    mock: { getAllTweetsAPI: "https://aa80e208-6b14-409e-8ca1-1155aaa93e81.mock.pstmn.io/posts" },
    actual: {
      getAllTweetsAPI: "http://backend.gigachat.cloudns.org/api/homepage/following",
      getUserTweets: `http://backend.gigachat.cloudns.org/api/profile/${root}/tweets`,
      getProfileAPI: `http://backend.gigachat.cloudns.org/api/user/profile/`,
    },
  }

  const [profile, setProfile] = useState()
  useEffect(() => {
    if (root !== "")
      axios
        .get(APIs.actual.getProfileAPI + `${root}`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setProfile(res.data.user)
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }, [root])

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (root !== "")
      axios
        .get(APIs.actual.getUserTweets, {
          params: {
            page: 1,
            count: 10,
            username: user.username,
          },
          headers: {
            authorization: "Bearer " + userToken,
          },
        })
        .then((res) => {
          // console.log("Here")
          if (res.status === 200) {
            if (res.data.posts) {
              console.log(res.data)
              setPosts((prevState) => [
                ...prevState,
                ...res.data.posts.map((post) => ({
                  tweetDetails: post,
                  followingUser: post.tweet_owner,
                })),
              ])
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }, [root])
  return (
    <div className="pt-5">
      <PostsContainer posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default ProfilePosts
