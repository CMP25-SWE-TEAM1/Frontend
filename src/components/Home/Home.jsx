import "../../styles/home.css"
import PostsContainer from "./PostsContainer"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { useState, useEffect } from "react"
import Widgets from "../Widgets"
import getUser from "../../constants/index"

import RepliesContainer from "../PostPage/RepliesContainer"
import ComposePost from "./ComposePost"
import axios from "axios"

const Home = () => {
  const [user, setUser] = useState(getUser())
  const [tweets, setTweets] = useState([])
  const homeNavLinks = [
    { title: "For you", location: "foryou" },
    { title: "Following", location: "following" },
  ]
  const APIs = {
    mock: { getAllTweetsAPI: "https://d93f6897-d144-47d7-9946-fe63b27f73ea.mock.pstmn.io/testAPIs/tweets" },
    actual: { getAllTweetsAPI: "" },
  }
  // useEffect(() => {
  //   axios.get(APIs.mock.getAllTweetsAPI).then((response) => {
  //     if (response.status === 200) {
  //       console.log(response.data[0].data.tweet_owner.nickname)
  //       console.log(response.data)
  //       setTweets(response.data)
  //     }
  //   })
  // }, [])

  const handleNewTweet = (newTweet) => {
    console.log("handleNewTweet")
    setTweets([newTweet, ...tweets])
    console.log(tweets)
  }

  const postsTst = [
    {
      status: "Tweet Get Success",
      data: {
        id: "652c16b01e15482dcdd5c361",
        referredTweetId: "tweetId",
        description: "tweet 1",
        viewsNum: 214,
        likesNum: 50,
        repliesNum: 6,
        repostsNum: 7,
        media: [
          {
            type: "jpg",
            data: "www.photo.png",
          },
        ],
        type: "tweet",
        creation_time: "2013-10-02T01:11:18.965+00:00",
        tweet_owner: {
          id: "652c16b01e15482dcdd5c361",
          username: "loca22_eng",
          nickname: "malek hossam",
          bio: "I'm the Real Batman",
          profile_image: "photo.jpg",
          followers_num: 36,
          following_num: 36,
        },
        isLiked: true,
        isRetweeted: true,
      },
    },
    {
      status: "Tweet Get Success",
      data: {
        id: "652c16b01e15482dcdd5c361",
        referredTweetId: "tweetId",
        description: "tweet 1",
        viewsNum: 214,
        likesNum: 50,
        repliesNum: 6,
        repostsNum: 7,
        media: [
          {
            type: "jpg",
            data: "www.photo.png",
          },
        ],
        type: "tweet",
        creation_time: "2013-10-02T01:11:18.965+00:00",
        tweet_owner: {
          id: "652c16b01e15482dcdd5c361",
          username: "loca22_eng",
          nickname: "malek hossam",
          bio: "I'm the Real Batman",
          profile_image: "photo.jpg",
          followers_num: 36,
          following_num: 36,
        },
        isLiked: true,
        isRetweeted: true,
      },
    },
    {
      status: "Tweet Get Success",
      data: {
        id: "652c16b01e15482dcdd5c361",
        referredTweetId: "tweetId",
        description: "tweet 1",
        viewsNum: 214,
        likesNum: 50,
        repliesNum: 6,
        repostsNum: 7,
        media: [
          {
            type: "jpg",
            data: "www.photo.png",
          },
        ],
        type: "tweet",
        creation_time: "2013-10-02T01:11:18.965+00:00",
        tweet_owner: {
          id: "652c16b01e15482dcdd5c361",
          username: "loca22_eng",
          nickname: "malek hossam",
          bio: "I'm the Real Batman",
          profile_image: "photo.jpg",
          followers_num: 36,
          following_num: 36,
        },
        isLiked: true,
        isRetweeted: true,
      },
    },
  ]

  return (
    <div className="flex flex-1">
      {/* {user && <Sidebar user={user} setUser={setUser} />} */}

      <div className="home ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder sm:w-[600px]">
        <div className="sticky top-0 z-50 mb-0 border-0 border-b border-lightBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-darkBorder dark:bg-inherit dark:bg-opacity-[99%] ">
          {/* <div className="h-[53px] flex justify-start items-center">
          <h2 className="font-semibold text-xl text-gray-800 pl-6 dark:text-white">
            Home
          </h2>
        </div> */}
          <div className="flex h-[53px] items-center">
            <HorizontalNavbar urls={homeNavLinks} originalUrl={"/home"} />
          </div>
        </div>
        <ComposePost handleNewTweet={(newTweet) => handleNewTweet(newTweet)} />
        <PostsContainer posts={postsTst} />
      </div>
      {/* <div>
        <p>name: {user.name}</p>
        <p>email: {user.email}</p>
        <img src={user.picture} alt="profile" />
      </div> */}
      {user && <Widgets />}
    </div>
  )
}

export default Home
