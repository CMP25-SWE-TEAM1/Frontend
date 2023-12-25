import React from 'react'
import { getColor } from "../../constants"
import { useSelector } from "react-redux"

function ReplyingTo({username, leftMargin}) {
    const themeColor = useSelector((state) => state.theme.color)
  return (
    <div className={`ml-${leftMargin} text-sm text-ternairy dark:text-secondary`}>
              Replying to <span className={`${"text-" + getColor(themeColor)}`}>@{username}</span>
            </div>
  )
}

export default ReplyingTo
