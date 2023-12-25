import { useState } from "react"
import GeneralButton from "../Sidebar/Button"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import FollowButton from "../ProfilePage/FollowButton"

function Person({ nickname, username, profile_image, bio, isFollowed }) {
  const user = useSelector((state) => state.user.user)
  
  const [color, setColor] = useState("text-black dark:text-white")
  const [bgColor, setBgColor] = useState("")
  const [borderColor, setBorderColor] = useState("border-gray-200")
  const[buttonstate,setButtonState]=useState(isFollowed? "Following":"Follow")
  isFollowed = true //just for test
  const handleMouseOver = () => {
    setColor("text-red-600")
    setBgColor("bg-red-200 dark:bg-[#0f0303]")
    setBorderColor("border-red-400")
  }

  const handleMouseLeave = () => {
    setColor("text-black dark:text-white")
    setBgColor("dark:bg-black")
    setBorderColor("border-gray-200")
  }
  return (
    <Link to={`/${username}`}>
      <div className=" flex w-full hover:bg-gray-100 dark:hover:bg-[#080808] xs:!p-3">
        <div className="mr-3">
          <Avatar alt={nickname} src={profile_image} />
        </div>
        <div className="flex w-full flex-wrap items-center">
          <div className="flex w-full items-center justify-between">
            <div>
              <div className="truncate font-semibold hover:underline" id="mahmoud_name">
                {nickname}
              </div>
              <div className="truncate text-secondary" id="mahmoud_username">
                @{username}
              </div>
            </div>
            <div className="z-100">
            {user.username !== username && <FollowButton buttonName={buttonstate} setButtonState={setButtonState} tag={username} />}
            </div>
          </div>
          {bio && <div className="w-full">{bio}</div>}
        </div>
      </div>
    </Link>
  )
}
export default Person
