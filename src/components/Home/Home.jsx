import "../../styles/home.css"
import PostsContainer from "./Posts/PostsContainer"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { useState, useEffect, useRef } from "react"
import Widgets from "../Widgets/Widgets"
import getUser from "../../constants/index"
import PostPopup from "./ComposePost/PostPopup"
import RepliesContainer from "../PostPage/RepliesContainer"
import ComposePost from "./ComposePost/ComposePost"
import axios from "axios"
import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"

const Home = () => {
  const user = useSelector((state) => state.user.user)

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])
  const userToken = useSelector((state) => state.user.token)
  // const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA4ZDJhNGZkNGQ4MmE3OTcwZDgxZSIsImlhdCI6MTcwMTQ1NDQxMiwiZXhwIjoxNzA5MjMwNDEyfQ.AXj2UJzw8YGxajhtFrywNKWDvZmIF7yo1WSe3hXoUdY"
  const [posts, setPosts] = useState([])

  const homeNavLinks = [
    { title: "For you", location: "foryou" },
    { title: "Following", location: "following" },
  ]
  const APIs = {
    mock: { getAllTweetsAPI: "httpss://aa80e208-6b14-409e-8ca1-1155aaa93e81.mock.pstmn.io/posts" },
    actual: {
      getAllTweetsAPI: "https://backend.gigachat.cloudns.org/api/homepage/following",
      getUserTweets: `https://backend.gigachat.cloudns.org/api/profile/${user.username}/tweets`,
    },
  }
  const [pageNumber, setPageNumber] = useState(1)
  const [finshed, setFinished] = useState(false)

  const fetchPosts = () => {
    console.log("fetching new posts...")
    axios
      .get(APIs.actual.getAllTweetsAPI, {
        params: {
          page: pageNumber,
          count: 10,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log(response.data.tweetList)
        if (response.status === 200) {
          // console.log("in then ");
          if (response.data.tweetList) {
            setPosts((prevState) => [...prevState, ...response.data.tweetList.sort(() => Math.random() - 0.5)])
          }
          if (response.data.tweetList.length < 10) {
            setFinished(true)
          }
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (finshed === false) fetchPosts()
  }, [pageNumber])

  // useEffect(() => {
  //   // console.log("token")
  //   // console.log(userToken)

  //   axios
  //     .get(APIs.actual.getAllTweetsAPI, {
  //       params: {
  //         page: pageNumber,
  //         count: 10,
  //       },
  //       headers: {
  //         authorization: "Bearer " + userToken,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log(response)
  //       if (response.status === 200) {
  //         // console.log("in then ");
  //         if (response.data.tweetList) {
  //           setPosts(response.data.tweetList.sort(() => Math.random() - 0.5))
  //         } else setPosts([])

  //         return axios.get(APIs.actual.getUserTweets, {
  //           params: {
  //             page: 1,
  //             count: 10,
  //             username: user.username,
  //           },
  //           headers: {
  //             authorization: "Bearer " + userToken,
  //           },
  //         })
  //       }
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // console.log("user posts ", res.data)
  //         if (res.data.posts) {
  //           setPosts((prevState) => [
  //             ...prevState,
  //             ...res.data.posts
  //               .map((post) => ({
  //                 tweetDetails: post,
  //                 followingUser: user,
  //               }))
  //               .sort(() => Math.random() - 0.5),
  //           ])
  //           // console.log(res)
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  const handleNewPost = (newPost) => {
    setPosts([{ tweetDetails: newPost.data }, ...posts])
    console.log("handle new post")
    console.log(posts)
  }

  const feedRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      const container = feedRef.current

      if (container.scrollHeight - Math.ceil(container.scrollTop) === container.clientHeight) {
        setPageNumber((prevState) => prevState + 1)
      }
    }

    const container = feedRef.current
    container.addEventListener("scroll", handleScroll)

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [feedRef])

  return (
    <div className="flex flex-1 flex-grow-[8]  ">
      <div ref={feedRef} id="homeFeed" className="home ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-xs:border-l-0 max-xs:border-r-0 sm:w-[600px]">
        <ComposePost buttonName="Post" handleNewPost={(newPost) => handleNewPost(newPost)} postType="tweet" />
        <PostsContainer posts={posts} setPosts={setPosts} />
        {/* .sort(() => Math.random() - 0.5) */}
      </div>
      {user && <Widgets parent={"home"} />}
    </div>
  )
}

export default Home
