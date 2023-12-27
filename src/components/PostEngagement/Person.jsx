import { useState } from "react"
import GeneralButton from "../Sidebar/Button"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import FollowButton from "../ProfilePage/FollowButton"

function Person({ nickname, username, profile_image, bio, isFollowed }) {
  const user = useSelector((state) => state.user.user)

  const [buttonstate, setButtonState] = useState(isFollowed ? "Following" : "Follow")

  return (
    <div className=" flex w-full hover:bg-gray-100 dark:hover:bg-[#080808] xs:!p-3">
      <Link to={`/${username}`}>
        <div className="mr-3">
          <Avatar alt={nickname} src={profile_image} />
        </div>
      </Link>
      <div className="flex w-full flex-wrap items-center">
        <div className="flex w-full items-center justify-between">
          <Link to={`/${username}`}>
            <div>
              <div className="truncate font-semibold hover:underline" id="mahmoud_name">
                {nickname}
              </div>
              <div className="truncate text-secondary" id="mahmoud_username">
                @{username}
              </div>
            </div>
          </Link>
          <div>{user.username !== username && <FollowButton buttonName={buttonstate} setButtonState={setButtonState} tag={username} />}</div>
        </div>
        <Link to={`/${username}`}>{bio && <div className="w-full">{bio}</div>}</Link>
      </div>
    </div>
  )
}
export default Person
