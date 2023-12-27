import React from 'react'
import { getColor } from "../../constants"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function ReplyingTo({username, leftMargin}) {
    const themeColor = useSelector((state) => state.theme.color)
  return (
    <div className={`ml-${leftMargin} text-sm text-ternairy dark:text-secondary`}>
              Replying to <Link className={`${"text-" + getColor(themeColor)} hover:underline`} to={`/${username}`}>@{username}</Link>
            </div>
  )
}

export default ReplyingTo
