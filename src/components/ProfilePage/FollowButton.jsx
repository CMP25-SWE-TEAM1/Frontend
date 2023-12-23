import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import ProfileRequests from "./profilerequests"

const FollowButton = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { token } = useSelector((state) => state.user)
  const mock = false
  const [buttonstate, setbuttonstate] = useState(props.buttonName)

  
  // there should be a conditional rendering by back
  useEffect(() => {
    setbuttonstate(props.buttonName)
  }, [props.buttonName])
  
  const APIs = {
    followmock: { postfollowProfileAPI: `http://localhost:3001/api/user/${props.tag}/follow` },
    followactual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/follow` },
    unfollowmock: { postfollowProfileAPI: `http://localhost:3001/api/user/${props.tag}/unfollow` },
    unfollowactual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unfollow` },
    unblockmock: { unBlock:   `http://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unblock` },
  }
  function HandleClick() {
  if (buttonstate === "Follow") {
     ProfileRequests.follow(false,APIs,token,setbuttonstate,props.setDetailsPos)
    } else if(buttonstate === "Following") {
    ProfileRequests.unfollow(false,APIs,token,setbuttonstate,props.setDetailsPos)
    }
    else {
      ProfileRequests.unblock(false,APIs,token)
    }
  }
  console.log(buttonstate)
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
                  ? buttonstate === "Follow"
                      ? `bg-white text-black
                        hover:bg-darkHover dark:hover:bg-lightHover w-[80px]`
                      :
                       `bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover
                        bt hover:border-[rgb(244,33,46)]  hover:text-[rgb(244,33,46)] w-[120px] `
                  : buttonstate === "Follow"
                      ? `bg-black text-white hover:bg-darkHover dark:hover:bg-lightHover  w-[80px]`
                      :
                       `bg-white text-black hover:bg-lightHover dark:hover:bg-darkHover
                        bt hover:border-[rgb(244,33,46)]  hover:text-[rgb(244,33,46)]`
                } 
                h-[40px]  
                rounded-full border border-lightBorder text-center  font-[500]
                dark:border-darkBorder`}
      >
        <span>{buttonstate}</span>
      </button>
     
    </>
  )
}

export default FollowButton
