import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import ProfileRequests from "./profilerequests"

const FollowButton = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { token } = useSelector((state) => state.user)
  const mock = false
  console.log(props);

  
  // there should be a conditional rendering by back
 
  const APIs = {
    followmock: { postfollowProfileAPI: `https://localhost:3001/api/user/${props.tag}/follow` },
    followactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/follow` },
    unfollowmock: { postfollowProfileAPI: `https://localhost:3001/api/user/${props.tag}/unfollow` },
    unfollowactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/unfollow` },
    unblockmock: { unBlock:   `https://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/unblock` },
    muteactual: { mute: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/mute` },
  }
  function HandleClick() {
  if (props.buttonName === "Follow") {
     ProfileRequests.follow(false,APIs,token,props.setButtonstate,props.setDetailsPos)
    } else if(props.buttonName === "Following") {
     ProfileRequests.unfollow(false,APIs,token,props.setButtonstate,props.setDetailsPos)
    }
    else {
      ProfileRequests.unblock(false,APIs,token)
    }
  }
  
  return (
    <>
      <button
        id="follow-button"
        onClick={() => {
          HandleClick()
        }}
        className={` ${props.display}
              ${
                darkMode
                  ? props.buttonName === "Follow"
                      ? `bg-white text-black
                        hover:bg-darkHover dark:hover:bg-lightHover w-[80px]`
                      :
                       `bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover
                        bt hover:border-[rgb(244,33,46)]  hover:text-[rgb(244,33,46)] w-[120px] `
                  : props.buttonName === "Follow"
                      ? `bg-black text-white hover:bg-darkHover dark:hover:bg-lightHover  w-[80px]`
                      :
                       `bg-white text-black hover:bg-lightHover dark:hover:bg-darkHover
                        bt hover:border-[rgb(244,33,46)]  hover:text-[rgb(244,33,46)] w-[120px]`
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
