import React from "react"
import HorizontalNavbar from "../General/HorizontalNavbar"
import RepliesContainer from "./RepliesContainer"
import Widgets from "../Widgets"
import Post from "../Home/Posts/Post"
import WestIcon from "@mui/icons-material/West"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import UpperNavbar from "../General/UpperNavbar"

function PostPage({ post }) {
  const { user } = useSelector((state) => state.user)

  const postNavLink = [
    { title: <WestIcon />, location: "" },
    { title: "Post", location: "" },
  ]
  const replies = [
    {
      userName: "Mohamed Samir",
      userTag: "MSamir245",
      date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "23K",
      repostCount: "45K",
      likeCount: "64K",
      viewCount: "1M",
    },
    { userName: "Ismail Shaheen", userTag: "IShaheen02", date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)", replyCount: "23K", repostCount: "45K", likeCount: "64K", viewCount: "1M" },
  ]
  return (
    <div className="flex flex-1">
      <div className="ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder sm:w-[600px]">
        <div className="sticky top-0 z-50 mb-3 border-0 border-b border-lightBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-darkBorder dark:bg-inherit dark:bg-opacity-[99%] ">
        <UpperNavbar name="Post"/>
        </div>
        <div>
        post
        </div>
        
        {/* <Post userName={post.userName} userTag={post.userTag} date={post.date} replyCount={post.replyCount} repostCount={post.repostCount} likeCount={post.likeCount} viewCount={post.viewCount} key={post.userTag} /> */}
        {/* <RepliesContainer replies={replies}/> */}
      </div>
       <Widgets parent={"postPage"} />
    </div>
  )
}

export default PostPage
