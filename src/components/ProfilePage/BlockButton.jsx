import React, { useEffect, useState } from "react"
import ProfileRequests from "./profilerequests"
import { useSelector } from "react-redux"
const BlockButton = ({ isblocked, tag }) => {
  const [display, setDisplay] = useState()
  const { token } = useSelector((state) => state.user)
  const APIs = {
    unblockmock: { unBlock: `https://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `https://backend.gigachat.cloudns.org/api/user/${tag}/unblock` },
  }
  useEffect(() => {
    isblocked ? setDisplay("block") : setDisplay("hidden")
  }, [isblocked])
  return (
    <>
      <button
        id="block-button"
        onClick={() => {
          ProfileRequests.unblock(false, APIs, token)
        }}
        className={`blockedbt ${display} h-[35px] w-[85px] rounded-full 
      border border-lightBorder bg-[rgb(244,33,46)] text-center font-sans font-[700]
      text-white  dark:border-darkBorder `}
      >
        <span>Blocked</span>
      </button>
    </>
  )
}

export default BlockButton
