import React from 'react'
import HorizontalNavbar from '../HorizontalNavbar';
import RepliesContainer from './RepliesContainer';
import Widgets from '../Widgets';
function PostPage() {
    const postNavLink = [{ title: "Post", location: "" }];
    const replies=[{
      userName: "Mohamed Samir",
      userTag: "MSamir245",
      date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "23K",
      repostCount: "45K",
      likeCount: "64K",
      viewCount: "1M",
    },
    {userName: "Ismail Shaheen",
      userTag: "IShaheen02",
      date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "23K",
      repostCount: "45K",
      likeCount: "64K",
      viewCount: "1M",
    }]
  return (
    <div className="flex flex-1">
    {/* {user && <Sidebar user={user} setUser={setUser} />} */}

    <div className="ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder sm:w-[600px]">
      <div className="sticky top-0 z-50 mb-3 border-0 border-b border-lightBorder dark:border-darkBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:bg-inherit dark:bg-opacity-[99%] ">
        {/* <div className="h-[53px] flex justify-start items-center">
        <h2 className="font-semibold text-xl text-gray-800 pl-6 dark:text-white">
          Home
        </h2>
      </div> */}
        <div className="flex h-[53px] items-center">
        <HorizontalNavbar urls={postNavLink} originalUrl={"/replies"} />
        </div>
      </div>
      <RepliesContainer replies={replies}/>
    </div>
    {/* <div>
      <p>name: {user.name}</p>
      <p>email: {user.email}</p>
      <img src={user.picture} alt="profile" />
    </div> */}
    <Widgets />
  </div>
  )
}

export default PostPage