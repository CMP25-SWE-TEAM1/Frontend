import {useState} from "react"
import GeneralButton from "../Sidebar/Button"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"

function Person({nickname,username,profileImage,bio,isFollowed,index}){
    const user = useSelector((state) =>state.user.user)
    const [unfollow, setUnfollow] = useState("Following")
    const [color, setColor] = useState("text-black dark:text-white")
    const [bgColor, setBgColor] = useState("")
    const [borderColor, setBorderColor] = useState("border-gray-200")
    isFollowed=true; //just for test
    const handleMouseOver = ()=>{
      setUnfollow("Unfollow");
      setColor("text-red-600");
      setBgColor("bg-red-200 dark:bg-[#0f0303]");
      setBorderColor("border-red-400");
    }

    const handleMouseLeave = ()=>{
      setUnfollow("Following");
      setColor("text-black dark:text-white");
      setBgColor("dark:bg-black");
      setBorderColor("border-gray-200");
    }
    return(
      <Link to={`/${username}`}>
        <div  className=" flex w-full hover:bg-gray-100 dark:hover:bg-[#080808] xs:!p-3">
          <div className="mr-3">
          <Avatar alt={nickname} src={profileImage} />
          </div>
          <div className="flex w-full items-center flex-wrap">
          <div className="flex w-full items-center justify-between">
          <div>
            <div className="truncate font-semibold hover:underline" id="mahmoud_name">{nickname}</div>
            <div className="truncate text-secondary" id="mahmoud_username">@{username}</div>
          </div>
          {user.username!==username && <Link>
          <div onMouseOver={isFollowed && handleMouseOver} onMouseLeave={isFollowed && handleMouseLeave}>
          <GeneralButton name={isFollowed? unfollow:"Follow"} height="h-8" width={isFollowed? "w-28":"w-20"} backgroundColor={isFollowed? `${bgColor}`:"bg-black dark:bg-white"} color={isFollowed? `${color}`:"text-white dark:text-black"} other={`border ${borderColor}`}/>
          </div>
          </Link>}
          </div>
          {bio && <div className="w-full">{bio}</div>} 
          </div>         
          </div>
          </Link>
    )
}
export default Person