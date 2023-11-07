import HorizontalNavbar from "./HorizontalNavbar"
import "../styles/home.css"
import PostsContainer from "./PostsContainer"
import { useState } from "react"
import Sidebar from "./Sidebar"
import { useNavigate } from "react-router"

function getUser() {
  let user = localStorage.getItem("user")
  if (user) {
    user = JSON.parse(user)
  } else {
    user = null
  }
  return user
}

const Home = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  const [user, setUser] = useState(getUser())

  const homeNavLinks = [
    { title: "For you", location: "foryou" },
    { title: "Following", location: "following" },
  ]

  const postsTst = [
    {
      userName: "Mohamed Samir",
      userTag: "MSamir245",
      date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "23K",
      repostCount: "45K",
      likeCount: "64K",
      viewCount: "1M",
    },
    {
      userName: "Mohamed Taher",
      userTag: "MTaher25",
      date: "Thu Oct 26 2023 22:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "2",
      repostCount: "45",
      likeCount: "4",
      viewCount: "10",
    },
    {
      userName: "Ismail Ramadan",
      userTag: "IRamadan",
      date: "Thu Oct 26 2023 14:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "23",
      repostCount: "12",
      likeCount: "40",
      viewCount: "250",
    },
    {
      userName: "Youssif Haggag",
      userTag: "YH1212",
      date: "Thu Oct 26 2023 19:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "52",
      repostCount: "15",
      likeCount: "156",
      viewCount: "1K",
    },
    {
      userName: "Hefney",
      userTag: "MHefny441",
      date: "Thu Oct 26 2023 11:28:01 GMT+0200 (Eastern European Standard Time)",
      replyCount: "21",
      repostCount: "55",
      likeCount: "64",
      viewCount: "156",
    },
  ]

  return (
    <>
      {user && <Sidebar />}

      <div className="home ml-0 mr-1 w-[85%] max-w-[600px] shrink-0 overflow-y-scroll border border-b-0 border-t-0 border-gray-100 text-center dark:border-gray-600 sm:w-[600px]">
        <div className="sticky top-0 z-50 mb-3 border-0 border-b border-b-gray-100 bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-b-gray-600  dark:bg-inherit dark:bg-opacity-[99%] ">
          {/* <div className="h-[53px] flex justify-start items-center">
          <h2 className="font-semibold text-xl text-gray-800 pl-6 dark:text-white">
            Home
          </h2>
        </div> */}
          <div className="flex h-[53px] items-center">
            <HorizontalNavbar urls={homeNavLinks} originalUrl={"/home"} />
          </div>
        </div>
        <PostsContainer posts={postsTst} />
      </div>
      <button type="button" onClick={handleLogout} className="h-10 bg-black text-white">
        logout
      </button>
      <div>
        <p>name: {user.name}</p>
        <p>email: {user.email}</p>
        <img src={user.picture} alt="profile" />
      </div>
    </>
  )
}

export default Home
