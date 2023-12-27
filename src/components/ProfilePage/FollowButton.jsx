import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import ProfileRequests from "./profilerequests"

const FollowButton = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { token } = useSelector((state) => state.user)
  const mock = false

  // there should be a conditional rendering by back

  const APIs = {
    followmock: { postfollowProfileAPI: `https://localhost:3001/api/user/${props.tag}/follow` },
    followactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/follow` },
    unfollowmock: { postfollowProfileAPI: `https://localhost:3001/api/user/${props.tag}/unfollow` },
    unfollowactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/unfollow` },
    unblockmock: { unBlock: `https://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/unblock` },
    muteactual: { mute: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/mute` },
  }
  function HandleClick(e) {
    e.stopPropagation()
    if (props.buttonName === "Follow") {
      ProfileRequests.follow(false, APIs, token, props.setButtonState, props.setDetailsPos, props.setFollowersnum, props.followersnum)
    } else if (props.buttonName === "Following") {
      console.log(props.followersnum)
      ProfileRequests.unfollow(false, APIs, token, props.setButtonState, props.setDetailsPos, props.setFollowersnum, props.followersnum)
    } else {
      ProfileRequests.unblock(false, APIs, token)
    }
  }

  return (
    <>
      <button
        id="follow-button"
        onClick={(e) => {
          HandleClick(e)
        }}
        className={` ${props.display}
              ${
                darkMode
                  ? props.buttonName === "Follow"
                    ? `w-[80px] bg-white
                        text-black hover:bg-darkHover dark:hover:bg-lightHover`
                    : `bt w-[120px] bg-black text-white
                        hover:border-[rgb(244,33,46)] hover:bg-lightHover  hover:text-[rgb(244,33,46)] dark:hover:bg-darkHover `
                  : props.buttonName === "Follow"
                  ? `w-[80px] bg-black text-white hover:bg-darkHover  dark:hover:bg-lightHover`
                  : `bt w-[120px] bg-white text-black
                        hover:border-[rgb(244,33,46)] hover:bg-lightHover  hover:text-[rgb(244,33,46)] dark:hover:bg-darkHover`
              } 
                relative h-[40px]  
                rounded-full border border-lightBorder text-center  font-[500]
                dark:border-darkBorder`}
      >
        <span>{props.buttonName}</span>
      </button>
    </>
  )
}

export default FollowButton
