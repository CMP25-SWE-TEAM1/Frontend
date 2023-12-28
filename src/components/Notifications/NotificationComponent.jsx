import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"

import PersonAddIcon from "@mui/icons-material/PersonAdd"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CachedIcon from "@mui/icons-material/Cached"
import MessageIcon from "@mui/icons-material/Message"
import ReplyIcon from "@mui/icons-material/Reply"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"

import { APIs } from "../../constants/signupConstants"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

import React from "react"

/**
 * Renders individual notifications with informative icons, text, dates, and notifier details, providing clear visual cues and navigation to relevant profiles.
 *
 * @component
 */
const NotificationComponent = ({ logo, type, text, date, notifier }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const timestamp = new Date(date)
  const day = timestamp.getDate()
  const month = timestamp.getMonth() + 1 // Months are zero-indexed
  const year = timestamp.getFullYear()
  const hour = timestamp.getHours()
  const minute = timestamp.getMinutes()

  const formattedDate = `${hour}:${minute} on ${day}/${month}/${year}`

  const userToken = useSelector((state) => state.user.token)

  const navigate = useNavigate()
  return (
    <div
      onClick={() => {
        navigate(`/${notifier ? notifier.username : text.split(" ")[0]}`)
      }}
      className="flex min-h-[64px] cursor-pointer flex-col items-center pb-3 pl-4 pr-4 pt-3 hover:bg-lightHover dark:hover:bg-darkHover"
    >
      <div className="flex items-center gap-3 self-start" data-testid="notification-icon">
        {type === "retweet" && <CachedIcon className="text-4xl text-green-500" />}
        {type === "like" && <FavoriteIcon className="text-4xl text-red-500" />}
        {type === "follow" && <PersonAddIcon className="text-4xl text-blue-500" />}
        {type === "mention" && <AlternateEmailIcon className="text-4xl text-green-500" />}
        {type === "message" && <MessageIcon className="text-4xl text-blue-500" />}
        {type === "reply" && <ReplyIcon className="text-4xl text-blue-500" />}

        <Avatar className="mr-3" alt={"j"} src={logo} sx={{ width: 30, height: 30 }} />
      </div>
      <div className="text ml-14 mt-2 flex-1 self-start ">
        <div className=" text-md">
          <span className="font-semibold">{notifier ? notifier.nickname : text.split(" ")[0]}</span>
          <span>{" " + text.split(" ").slice(1).join(" ")}</span>
        </div>
      </div>
      <div className="self-end">
        <span className=" text-xs ">{formattedDate}</span>
      </div>
    </div>
  )
}

// NotificationComponent.propTypes = {
//   /**
//    * The logo URL to display
//    */
//   logo: React.PropTypes.string.isRequired,
//   /**
//    * The type of notification
//    */
//   type: React.PropTypes.string.isRequired,
//   /**
//    * The text content of the notification
//    */
//   text: React.PropTypes.string.isRequired,
//   /**
//    * The date and time of the notification
//    */
//   date: React.PropTypes.string.isRequired,
//   /**
//    * Information about the notifier, if applicable
//    */
//   notifier: React.PropTypes.object, // Optional prop
// }

export default NotificationComponent
