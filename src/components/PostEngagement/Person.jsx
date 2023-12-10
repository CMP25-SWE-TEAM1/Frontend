import react from "react"
import GeneralButton from "../Sidebar/Button"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"

function Person({nickname,username,profileImage,bio}){
    
    return(
      <Link to={`/${username}`}>
        <div className=" flex w-full hover:bg-gray-100 dark:hover:bg-[#080808] xs:!p-3">
          <div className="mr-3">
          <Avatar alt={nickname} src={profileImage} />
          </div>
          <div className="flex w-full items-center flex-wrap">
          <div className="flex w-full items-center justify-between">
          <div>
            <div className="truncate font-semibold hover:underline" id="mahmoud_name">{nickname}</div>
            <div className="truncate text-secondary" id="mahmoud_username">@{username}</div>
          </div>
          <Link>
          <GeneralButton name="Follow" height="h-8" width="w-20" backgroundColor="bg-black dark:bg-white" color="text-white dark:text-black"/>
          </Link>
          </div>
          {bio && <div className="w-full">{bio}</div>} 
          </div>         
          </div>
          </Link>
    )
}
export default Person