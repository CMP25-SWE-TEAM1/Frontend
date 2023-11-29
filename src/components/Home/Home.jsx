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
  useEffect(()=>{
    axios.get(APIs.mock.getAllTweetsAPI).then((response)=>{
    if(response.status === 200)
    {
      console.log(response.data[0].data.tweet_owner.nickname)
      console.log(response.data)
      setTweets(response.data);
    }
  })
},[])

  const handleNewTweet = (newTweet)=>{
    console.log("handleNewTweet");
    setTweets([newTweet,...tweets]);
    console.log(tweets);
  }

  // const postsTst = [
  //   {
  //     userName: "Mohamed Samir",
  //     userTag: "MSamir245",
  //     date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
  //     replyCount: "23K",
  //     repostCount: "45K",
  //     likeCount: "64K",
  //     viewCount: "1M",
  //   },
  //   {
  //     userName: "Mohamed Taher",
  //     userTag: "MTaher25",
  //     date: "Thu Oct 26 2023 22:28:01 GMT+0200 (Eastern European Standard Time)",
  //     replyCount: "2",
  //     repostCount: "45",
  //     likeCount: "4",
  //     viewCount: "10",
  //   },
  //   {
  //     userName: "Ismail Ramadan",
  //     userTag: "IRamadan",
  //     date: "Thu Oct 26 2023 14:28:01 GMT+0200 (Eastern European Standard Time)",
  //     replyCount: "23",
  //     repostCount: "12",
  //     likeCount: "40",
  //     viewCount: "250",
  //   },
  //   {
  //     userName: "Youssif Haggag",
  //     userTag: "YH1212",
  //     date: "Thu Oct 26 2023 19:28:01 GMT+0200 (Eastern European Standard Time)",
  //     replyCount: "52",
  //     repostCount: "15",
  //     likeCount: "156",
  //     viewCount: "1K",
  //   },
  //   {
  //     userName: "Hefney",
  //     userTag: "MHefny441",
  //     date: "Thu Oct 26 2023 11:28:01 GMT+0200 (Eastern European Standard Time)",
  //     replyCount: "21",
  //     repostCount: "55",
  //     likeCount: "64",
  //     viewCount: "156",
  //   },
  // ]

  return (
    <div className="flex flex-1">
      {/* {user && <Sidebar user={user} setUser={setUser} />} */}

      <div className="home ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder sm:w-[600px]">
        <div className="sticky top-0 z-50 mb-0 border-0 border-b border-lightBorder dark:border-darkBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:bg-inherit dark:bg-opacity-[99%] ">
          {/* <div className="h-[53px] flex justify-start items-center">
          <h2 className="font-semibold text-xl text-gray-800 pl-6 dark:text-white">
            Home
          </h2>
        </div> */}
          <div className="flex h-[53px] items-center">
            <HorizontalNavbar urls={homeNavLinks} originalUrl={"/home"} />
          </div>
        </div>
        <ComposePost handleNewTweet={(newTweet)=>handleNewTweet(newTweet)}/>
        <PostsContainer posts={tweets} />
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